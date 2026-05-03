# Wallet Score Checker

On-chain **wallet trust signal** UI for Ethereum / EVM—paste an address, connect with **RainbowKit**, and optionally plug in a scoring API. **`/docs`** explains the **CIBIL-style Web3 concept** (not stack setup).

## Features

- Wallet connect (RainbowKit · wagmi · viem)
- Address paste + validation + score panel (`src/lib/walletScoreApi.ts`: deterministic **mock** scores by default; optional `NEXT_PUBLIC_WALLET_SCORE_API_URL` for a real `/score` POST)
- Tailwind CSS v3, Radix primitives, Framer Motion
- **SEO**: metadata, Open Graph & Twitter images, `manifest`, `robots`, `sitemap`, JSON-LD
- Favicon (`icon.svg`) + generated **Apple touch icon**

## Stack

- Next.js `15.2.6`
- React `19.2.1`
- RainbowKit `2.x`, wagmi `2.x`, viem `2.x`

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — concept note: [http://localhost:3000/docs](http://localhost:3000/docs).

## Deploy / hackathon

1. Deploy (e.g. Vercel).
2. Set **`NEXT_PUBLIC_SITE_URL`** to your production URL (no trailing slash) so OG tags, sitemap, and canonical URLs resolve correctly for judges.

## Build

```bash
npm run build
npm start
```
