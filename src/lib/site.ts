/** Canonical marketing copy + URLs for metadata, OG, manifest, and docs. */

export const siteConfig = {
  name: 'Wallet Score Checker',
  shortName: 'WalletScore',
  titleTemplate: '%s · Wallet Score Checker',
  description:
    'On-chain wallet trust signal for Ethereum and EVM chains—paste an address, connect a scoring API, and surface AI-assisted counterparty context for Web3 products.',
  tagline: 'Trust signals for wallets you rely on',
  keywords: [
    'Ethereum',
    'Web3',
    'wallet score',
    'on-chain credit',
    'RainbowKit',
    'wagmi',
    'viem',
    'EVM',
    'hackathon',
    'ETHGlobal',
    'trust',
    'counterparty risk',
  ],
  /** Set in production for correct OG URLs (e.g. https://your-app.vercel.app). */
  urlEnv: 'NEXT_PUBLIC_SITE_URL',
} as const;

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return 'http://localhost:3000';
  try {
    const href = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    const url = new URL(href);
    const path = url.pathname.replace(/\/$/, '');
    return `${url.origin}${path}`;
  } catch {
    return 'http://localhost:3000';
  }
}

export function getMetadataBase(): URL {
  try {
    return new URL(getSiteUrl());
  } catch {
    return new URL('http://localhost:3000');
  }
}
