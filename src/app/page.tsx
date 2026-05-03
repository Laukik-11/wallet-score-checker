import { Hero } from '@/components/Hero';
import { WalletScoreChecker } from '@/components/WalletScoreChecker';
import { WalletStatus } from '@/components/WalletStatus';

/** Skip static prerender for this route (RainbowKit / wagmi client stack). */
export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-5 pb-16 pt-14 md:px-6 md:pb-20 md:pt-14">
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:28px_28px] [mask-image:radial-gradient(circle_at_center,black_40%,transparent_100%)]"
        aria-hidden
      />
      <div className="relative z-10 mx-auto flex max-w-[960px] flex-col gap-7 md:gap-9">
        <Hero />
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start lg:gap-8">
          <WalletScoreChecker />
          <WalletStatus />
        </div>
      </div>
    </main>
  );
}
