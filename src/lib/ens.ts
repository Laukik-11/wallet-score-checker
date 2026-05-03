import { isAddress } from 'viem';
import { normalize } from 'viem/ens';

/** True when input might be an ENS name (not a hex address, contains a label separator). */
function looksLikeEnsName(input: string): boolean {
  const s = input.trim();
  return !isAddress(s) && s.includes('.');
}

export type ResolveWalletInputResult =
  | { ok: true; address: string }
  | { ok: false; message: string };

/**
 * Resolves a pasted `0x` address locally; resolves ENS via `/api/resolve-ens` (server-side RPC, no browser CORS).
 */
export async function resolveWalletInput(input: string): Promise<ResolveWalletInputResult> {
  const trimmed = input.trim();
  if (!trimmed) {
    return { ok: false, message: 'Paste a wallet address or ENS name to run the check.' };
  }

  if (isAddress(trimmed)) {
    return { ok: true, address: trimmed.toLowerCase() };
  }

  if (!looksLikeEnsName(trimmed)) {
    return { ok: false, message: 'That does not look like a valid EVM address or ENS name.' };
  }

  try {
    normalize(trimmed);
  } catch {
    return { ok: false, message: 'That ENS name is not valid.' };
  }

  let res: Response;
  try {
    res = await fetch('/api/resolve-ens', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: trimmed }),
    });
  } catch {
    return { ok: false, message: 'Network error while resolving ENS. Check your connection and try again.' };
  }

  let data: { address?: string; message?: string };
  try {
    data = (await res.json()) as { address?: string; message?: string };
  } catch {
    return { ok: false, message: 'Unexpected response from ENS resolver.' };
  }

  if (!res.ok) {
    return {
      ok: false,
      message:
        typeof data.message === 'string' && data.message.length > 0
          ? data.message
          : 'Could not resolve that ENS name.',
    };
  }

  const address = data.address;
  if (!address || !isAddress(address)) {
    return { ok: false, message: 'Invalid response from ENS resolver.' };
  }

  return { ok: true, address: address.toLowerCase() };
}
