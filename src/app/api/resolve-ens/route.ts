import { NextResponse } from 'next/server';
import { createPublicClient, http, isAddress } from 'viem';
import { mainnet } from 'viem/chains';
import { normalize } from 'viem/ens';
import { ethereumHttpRpcUrlForServer } from '@/lib/ethereumRpc';

export const runtime = 'nodejs';

const CACHE_MS = 5 * 60 * 1000;
const cache = new Map<string, { address: string | null; at: number }>();

const client = createPublicClient({
  chain: mainnet,
  transport: http(ethereumHttpRpcUrlForServer(), {
    timeout: 15_000,
    retryCount: 2,
  }),
});

type Body = { name?: string };

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ message: 'Invalid JSON body.' }, { status: 400 });
  }

  const raw = typeof body.name === 'string' ? body.name.trim() : '';
  if (!raw) {
    return NextResponse.json({ message: 'Missing ENS name or address.' }, { status: 400 });
  }

  if (isAddress(raw)) {
    return NextResponse.json({ address: raw.toLowerCase() });
  }

  if (!raw.includes('.')) {
    return NextResponse.json({ message: 'Not a valid address or ENS name.' }, { status: 400 });
  }

  let normalized: string;
  try {
    normalized = normalize(raw);
  } catch {
    return NextResponse.json({ message: 'That ENS name is not valid.' }, { status: 400 });
  }

  const key = normalized.toLowerCase();
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < CACHE_MS) {
    if (!hit.address) {
      return NextResponse.json(
        {
          message:
            'Could not resolve that ENS name on Ethereum mainnet. Check spelling or try the wallet address.',
        },
        { status: 404 },
      );
    }
    return NextResponse.json({ address: hit.address });
  }

  try {
    const address = await client.getEnsAddress({ name: normalized });
    const resolved = address ? address.toLowerCase() : null;
    cache.set(key, { address: resolved, at: Date.now() });

    if (!resolved) {
      return NextResponse.json(
        {
          message:
            'Could not resolve that ENS name on Ethereum mainnet. Check spelling or try the wallet address.',
        },
        { status: 404 },
      );
    }

    return NextResponse.json({ address: resolved });
  } catch {
    return NextResponse.json(
      { message: 'ENS resolution failed. Check your RPC configuration or try again later.' },
      { status: 502 },
    );
  }
}
