/**
 * Default Ethereum RPC when no Alchemy key / explicit URL is set (ENS-compatible + browser CORS).
 * Individual overrides: NEXT_PUBLIC_ETHEREUM_RPC_URL, NEXT_PUBLIC_BASE_RPC_URL, NEXT_PUBLIC_ARBITRUM_RPC_URL.
 */
const DEFAULT_PUBLIC_ETH_HTTP = 'https://eth.llamarpc.com';

function trimEnv(name: keyof NodeJS.ProcessEnv): string | undefined {
  const v = process.env[name];
  if (typeof v !== 'string') return undefined;
  const t = v.trim();
  return t.length > 0 ? t : undefined;
}

/** Same dashboard API key works across Ethereum, Base, Arbitrum (enabled networks on your Alchemy app). */
function alchemyApiKey(): string | undefined {
  return trimEnv('NEXT_PUBLIC_ALCHEMY_API_KEY');
}

/** Used by wagmi mainnet in the browser. */
export function ethereumHttpRpcUrlForClient(): string {
  const key = alchemyApiKey();
  if (key) return `https://eth-mainnet.g.alchemy.com/v2/${key}`;
  return trimEnv('NEXT_PUBLIC_ETHEREUM_RPC_URL') ?? DEFAULT_PUBLIC_ETH_HTTP;
}

/** Used by wagmi Base — falls back to viem default when unset and no Alchemy key. */
export function baseHttpRpcUrlForClient(): string | undefined {
  const key = alchemyApiKey();
  if (key) return `https://base-mainnet.g.alchemy.com/v2/${key}`;
  return trimEnv('NEXT_PUBLIC_BASE_RPC_URL');
}

/** Used by wagmi Arbitrum One — falls back to viem default when unset and no Alchemy key. */
export function arbitrumHttpRpcUrlForClient(): string | undefined {
  const key = alchemyApiKey();
  if (key) return `https://arb-mainnet.g.alchemy.com/v2/${key}`;
  return trimEnv('NEXT_PUBLIC_ARBITRUM_RPC_URL');
}

/** Used by `/api/resolve-ens` (Ethereum mainnet only — ENS registry lives there). */
export function ethereumHttpRpcUrlForServer(): string {
  const explicitServer = trimEnv('ETHEREUM_RPC_URL');
  const explicitPublic = trimEnv('NEXT_PUBLIC_ETHEREUM_RPC_URL');
  const key = alchemyApiKey();
  const fromAlchemy = key ? `https://eth-mainnet.g.alchemy.com/v2/${key}` : undefined;
  return explicitServer ?? explicitPublic ?? fromAlchemy ?? DEFAULT_PUBLIC_ETH_HTTP;
}
