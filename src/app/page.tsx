import { Hero } from '@/components/Hero';
import { WalletStatus } from '@/components/WalletStatus';

export default function HomePage() {
  return (
    <main className="app-shell">
      <div className="app-shell__backdrop" aria-hidden />
      <div className="app-shell__content">
        <Hero />
        <WalletStatus />
      </div>
    </main>
  );
}
