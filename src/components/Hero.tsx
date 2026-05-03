'use client';

import { motion } from 'framer-motion';

export function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      className="px-1 pt-2 md:px-1"
    >
      <motion.p
        initial={{ opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.06, duration: 0.35 }}
        className="mb-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-accent"
      >
        Wallet trust · Web3
      </motion.p>
      <h1 className="max-w-[760px] text-balance text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.07] tracking-[-0.03em] text-foreground">
        On-chain credit signal for wallets you rely on
      </h1>
      <p className="mt-4 max-w-[720px] text-[1.03rem] leading-relaxed text-muted">
        Combine AI-assisted interpretation with verifiable history so protocols and peers have another parameter—not a
        verdict—for trust.
      </p>
    </motion.section>
  );
}
