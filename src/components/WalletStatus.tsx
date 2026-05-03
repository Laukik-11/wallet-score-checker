'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Wallet } from 'lucide-react';
import { useAccount } from 'wagmi';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export function WalletStatus() {
  const { address, isConnected, chain } = useAccount();

  const formattedAddress = useMemo(() => {
    if (!address) return 'Not connected';
    return shortenAddress(address);
  }, [address]);

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card className="p-7 md:p-8">
        <CardHeader className="gap-2 pb-5">
          <div className="flex items-center gap-2 text-muted">
            <span className="inline-flex rounded-lg border border-border bg-white/[0.05] p-2 text-accent">
              <Wallet className="size-[18px]" aria-hidden />
            </span>
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.16em]">Wallet access</span>
          </div>
          <CardTitle className="text-xl font-semibold tracking-tight">Connect for faster checks</CardTitle>
          <CardDescription className="text-[0.95rem] leading-relaxed">
            Link your wallet to autofill the scorer, or paste any address manually in the panel beside this card.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-5">
          <div className="flex justify-start [&_button]:rounded-xl">
            <ConnectButton showBalance={false} chainStatus="icon" accountStatus="address" />
          </div>

          <dl className="grid gap-3 border-t border-white/[0.08] pt-5">
            <div className="grid gap-1 sm:grid-cols-[108px_1fr] sm:items-center sm:gap-4">
              <dt className="text-sm text-muted">Status</dt>
              <dd>
                <Badge variant={isConnected ? 'success' : 'destructive'}>
                  {isConnected ? 'Connected' : 'Disconnected'}
                </Badge>
              </dd>
            </div>

            <div className="grid gap-1 border-t border-white/[0.06] pt-3 sm:grid-cols-[108px_1fr] sm:items-center sm:gap-4">
              <dt className="text-sm text-muted">Wallet</dt>
              <dd className="font-mono text-sm text-foreground">{formattedAddress}</dd>
            </div>

            <div className="grid gap-1 border-t border-white/[0.06] pt-3 sm:grid-cols-[108px_1fr] sm:items-center sm:gap-4">
              <dt className="text-sm text-muted">Network</dt>
              <dd className="text-sm text-foreground">{chain?.name ?? '—'}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </motion.div>
  );
}
