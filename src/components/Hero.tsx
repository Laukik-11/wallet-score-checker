'use client';

import { motion } from 'framer-motion';

export function Hero() {
  return (
    <motion.section
      /* SSR + no-JS: never hide content behind opacity:0 (hydration / blocked scripts). */
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      className="px-1 pt-2 md:px-1"
    >
      <div className="rounded-3xl border border-white/[0.09] bg-slate-950/45 px-6 py-8 shadow-[inset_0_1px_0_rgb(255_255_255_/6%),0_20px_50px_rgb(0_0_0_/35%)] backdrop-blur-md md:px-9 md:py-10">
        <motion.p
          initial={false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.06, duration: 0.35 }}
          className="mb-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-accent"
        >
          Wallet trust · Web3
        </motion.p>
        <h1 className="max-w-[760px] text-balance text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.07] tracking-[-0.03em] text-white drop-shadow-[0_1px_28px_rgb(0_0_0_/45%)]">
          On-chain credit signal for wallets you rely on
        </h1>
        <p className="mt-4 max-w-[720px] text-[1.03rem] leading-relaxed text-muted">
          Combine AI-assisted interpretation with verifiable history so protocols and peers have another parameter—not a
          verdict—for trust.
        </p>
      </div>
    </motion.section>
  );
}
