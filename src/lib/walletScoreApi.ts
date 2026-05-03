export type WalletScoreResponse = {
  /** Normalized trust score (e.g. 300–850 style band). */
  score: number;
  /** Short human-readable tier label from the model. */
  tier: string;
  /** Optional bullet lines explaining drivers of the score. */
  highlights?: string[];
};

/**
 * Calls your AI + on-chain scoring backend.
 *
 * Example:
 * ```ts
 * const base = process.env.NEXT_PUBLIC_WALLET_SCORE_API_URL;
 * const res = await fetch(`${base}/v1/score`, {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ address }),
 * });
 * return res.json();
 * ```
 */
export async function fetchWalletScore(_address: string): Promise<WalletScoreResponse> {
  return Promise.reject(new Error('WALLET_SCORE_API_NOT_IMPLEMENTED'));
}
