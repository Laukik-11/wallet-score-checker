'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { isAddress } from 'viem';
import { useAccount } from 'wagmi';
import { Loader2, ShieldCheck, Sparkles } from 'lucide-react';
import { fetchWalletScore, type WalletScoreResponse } from '@/lib/walletScoreApi';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type UiState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: WalletScoreResponse };

const SCORE_MIN = 300;
const SCORE_MAX = 850;

function tierFromScore(score: number): 'Strong' | 'Stable' | 'Developing' | 'Elevated risk' {
  if (score >= 750) return 'Strong';
  if (score >= 650) return 'Stable';
  if (score >= 550) return 'Developing';
  return 'Elevated risk';
}

function scoreToPercent(score: number): number {
  return Math.min(100, Math.max(0, ((score - SCORE_MIN) / (SCORE_MAX - SCORE_MIN)) * 100));
}

function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

const fadeUp = {
  initial: false as const,
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export function WalletScoreChecker() {
  const { address: connectedAddress } = useAccount();
  const [input, setInput] = useState('');
  const [ui, setUi] = useState<UiState>({ status: 'idle' });

  const fillPercent = useMemo(() => {
    if (ui.status !== 'success') return 0;
    return scoreToPercent(ui.data.score);
  }, [ui]);

  const fillTier = useMemo(() => {
    if (ui.status !== 'success') return null;
    return tierFromScore(ui.data.score);
  }, [ui]);

  const fillFromWallet = useCallback(() => {
    if (connectedAddress) setInput(connectedAddress);
  }, [connectedAddress]);

  /** Autofill when a wallet connects; keep the field if the user already entered a different address. */
  useEffect(() => {
    if (!connectedAddress) return;
    setInput((prev) => {
      const t = prev.trim();
      if (t === '') return connectedAddress;
      if (t.toLowerCase() === connectedAddress.toLowerCase()) return connectedAddress;
      return prev;
    });
  }, [connectedAddress]);

  const addressPlaceholder = connectedAddress
    ? `${shortenAddress(connectedAddress)} · connected`
    : '0x… or paste any address';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) {
      setUi({ status: 'error', message: 'Paste a wallet address to run the check.' });
      return;
    }
    if (!isAddress(trimmed)) {
      setUi({ status: 'error', message: 'That does not look like a valid EVM address.' });
      return;
    }

    setUi({ status: 'loading' });
    try {
      const data = await fetchWalletScore(trimmed);
      setUi({ status: 'success', data });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong.';
      setUi({ status: 'error', message });
    }
  };

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card className="overflow-hidden p-7 md:p-8">
        <CardHeader className="gap-3 pb-6">
          <div className="flex items-center gap-2 text-accent">
            <motion.span
              initial={false}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              className="inline-flex rounded-xl border border-accent/35 bg-accent/10 p-2"
              aria-hidden
            >
              <Sparkles className="size-5" strokeWidth={2} />
            </motion.span>
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-muted">
              On-chain trust signal
            </span>
          </div>
          <CardTitle className="text-balance text-2xl font-semibold tracking-tight text-foreground md:text-[1.65rem]">
            Wallet credit estimate
          </CardTitle>
          <CardDescription className="max-w-[52ch] text-[0.97rem] leading-relaxed text-muted">
            A structured read on wallet behaviour and counterparties—akin to a bureau-style score, tuned for Web3. Paste
            any address; your backend applies AI-assisted scoring over on-chain signals you define.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-8">
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <Label htmlFor="wallet-address">Wallet address</Label>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <Input
                id="wallet-address"
                name="wallet-address"
                autoComplete="off"
                spellCheck={false}
                placeholder={addressPlaceholder}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={ui.status === 'loading'}
                className="flex-1"
              />
              <Button type="submit" disabled={ui.status === 'loading'} className="shrink-0 sm:min-w-[132px]">
                {ui.status === 'loading' ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                    Scoring…
                  </>
                ) : (
                  <>
                    <ShieldCheck className="size-4 opacity-90" aria-hidden />
                    Get score
                  </>
                )}
              </Button>
            </div>
            <AnimatePresence mode="wait">
              {connectedAddress ? (
                <motion.div key="fill-wallet" {...fadeUp} transition={{ duration: 0.25 }}>
                  <Button type="button" variant="ghost" size="sm" className="h-auto p-0 text-[0.88rem]" onClick={fillFromWallet}>
                    Replace with connected wallet
                  </Button>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </form>

          <AnimatePresence mode="wait">
            {ui.status === 'error' ? (
              <motion.div
                key="error"
                role="alert"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.28 }}
                className="overflow-hidden"
              >
                <div className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm leading-relaxed text-[#ffc9d0]">
                  {ui.message}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <div className="border-t border-white/[0.08] pt-8">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted">
                Estimated score
              </span>
              <AnimatePresence mode="wait">
                {fillTier ? (
                  <motion.div key={fillTier} initial={false} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                    <Badge variant="default">{fillTier}</Badge>
                  </motion.div>
                ) : (
                  <motion.span
                    key="placeholder-badge"
                    initial={false}
                    animate={{ opacity: 1 }}
                    className="text-xs text-muted/80"
                  >
                    Awaiting result
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-2" aria-hidden={ui.status !== 'success'}>
              <div className="h-2 overflow-hidden rounded-full bg-white/[0.07]">
                <motion.div
                  className={cn(
                    'h-full rounded-full bg-gradient-to-r from-accent via-accent-strong to-success',
                    'shadow-[0_0_24px_rgb(106_165_255_/35%)]',
                  )}
                  initial={false}
                  animate={{ width: `${fillPercent}%` }}
                  transition={{ type: 'spring', stiffness: 110, damping: 24 }}
                />
              </div>
              <div className="flex justify-between text-[0.68rem] tabular-nums text-muted">
                <span>{SCORE_MIN}</span>
                <span className="text-muted/70">575</span>
                <span>{SCORE_MAX}</span>
              </div>
            </div>

            <div className="relative mt-6 min-h-[5.5rem]">
              <AnimatePresence mode="wait">
                {ui.status === 'success' ? (
                  <motion.div
                    key="result"
                    {...fadeUp}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-3"
                  >
                    <motion.output
                      className="block text-5xl font-bold tabular-nums tracking-tight text-foreground md:text-6xl"
                      aria-live="polite"
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    >
                      {ui.data.score}
                    </motion.output>
                    <p className="text-base text-muted">{ui.data.tier}</p>
                    {ui.data.highlights && ui.data.highlights.length > 0 ? (
                      <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
                        {ui.data.highlights.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    ) : null}
                  </motion.div>
                ) : (
                  <motion.p
                    key="placeholder"
                    {...fadeUp}
                    transition={{ duration: 0.28 }}
                    className="text-[0.95rem] leading-relaxed text-muted"
                  >
                    Your score summary will appear here after the API responds.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <p className="mt-6 text-[0.78rem] leading-snug text-muted/75">
              Illustrative only—not financial or legal advice. Trust decisions belong to your product and compliance
              stack; scoring runs server-side once you connect it.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
