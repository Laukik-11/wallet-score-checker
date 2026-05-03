# Wallet Score Checker

On-chain **wallet trust signal** UI for Ethereum / EVM—paste an address, connect with **RainbowKit**, and plug in your AI-assisted scoring API. Built as a polished **hackathon-ready** Next.js app with docs at **`/docs`**.

## Features

- Wallet connect (RainbowKit · wagmi · viem)
- Address paste + validation + score panel (backend stub in `src/lib/walletScoreApi.ts`)
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

Open [http://localhost:3000](http://localhost:3000) — documentation: [http://localhost:3000/docs](http://localhost:3000/docs).

## Deploy / hackathon

1. Deploy (e.g. Vercel).
2. Set **`NEXT_PUBLIC_SITE_URL`** to your production URL (no trailing slash) so OG tags, sitemap, and canonical URLs resolve correctly for judges.

## Build

```bash
npm run build
npm start
```
