export type WalletScoreResponse = {
  /** Normalized trust score (e.g. 300–850 style band). */
  score: number;
  /** Short human-readable tier label from the model. */
  tier: string;
  /** Optional bullet lines explaining drivers of the score. */
  highlights?: string[];
};

const SCORE_MIN = 300;
const SCORE_MAX = 850;

/** Deterministic pseudo-random from address so demos stay stable per wallet. */
function addressSeed(address: string): number {
  const hex = address.slice(2).toLowerCase();
  let h = 2166136261;
  for (let i = 0; i < hex.length; i++) {
    h ^= hex.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function tierForScore(score: number): string {
  if (score >= 750) return 'Strong';
  if (score >= 650) return 'Stable';
  if (score >= 550) return 'Developing';
  return 'Elevated risk';
}

const HIGHLIGHT_POOL = [
  'Account age and continuity look favourable versus cohort baseline.',
  'Limited interaction with flagged counterparties in the sampled window.',
  'Healthy diversity of protocol categories (DEX, lending, staking).',
  'Gas usage pattern suggests regular human-operated activity.',
  'No concentrated spikes tied to known exploit launderers in this slice.',
  'Stable native balance trajectory relative to outbound transfers.',
] as const;

function mockResponse(address: string): WalletScoreResponse {
  const seed = addressSeed(address);
  const span = SCORE_MAX - SCORE_MIN + 1;
  const score = SCORE_MIN + (seed % span);
  const tier = tierForScore(score);

  const i1 = seed % HIGHLIGHT_POOL.length;
  const i2 = (seed >> 8) % HIGHLIGHT_POOL.length;
  const i3 = (seed >> 16) % HIGHLIGHT_POOL.length;
  const picks = new Set([i1, i2, i3]);
  const highlights = [...picks].slice(0, 3).map((i) => HIGHLIGHT_POOL[i]);

  return { score, tier, highlights };
}

/**
 * Replace with a real API when ready. If `NEXT_PUBLIC_WALLET_SCORE_API_URL` is set,
 * this function POSTs `{ address }` to `{base}/score` and expects JSON matching `WalletScoreResponse`.
 */
export async function fetchWalletScore(address: string): Promise<WalletScoreResponse> {
  const base = process.env.NEXT_PUBLIC_WALLET_SCORE_API_URL?.trim().replace(/\/$/, '');

  if (base) {
    const res = await fetch(`${base}/score`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address }),
    });
    if (!res.ok) {
      throw new Error(`Score API error: ${res.status} ${res.statusText}`);
    }
    return res.json() as Promise<WalletScoreResponse>;
  }

  await new Promise((r) => setTimeout(r, 550 + (addressSeed(address) % 400)));
  return mockResponse(address);
}
