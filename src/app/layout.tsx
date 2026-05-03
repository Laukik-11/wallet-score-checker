import type { Metadata } from 'next';
import { ReactNode } from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import './globals.css';
import { Web3Provider } from '@/providers/Web3Provider';

export const metadata: Metadata = {
  title: 'Wallet Score Checker',
  description:
    'On-chain wallet trust signal—paste an address and connect your AI-assisted scoring API for Web3 counterparties.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[radial-gradient(1200px_500px_at_20%_-10%,rgb(31_50_104)_0%,transparent_60%),radial-gradient(1200px_500px_at_100%_0%,rgb(49_32_95)_0%,transparent_55%),#06080f] font-sans text-[15px] text-foreground antialiased">
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
