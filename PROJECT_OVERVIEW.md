# Wallet Score Checker — 3–4 min demo script

Read straight through or use the **timing** as a guide (~520–750 words at a calm pace ≈ 3–4 minutes).

---

## 0:00–0:35 · Hook & idea

**Say:** Wallet Score Checker is a small Web3 app with one question: *how might we show a bureau-style trust signal for an Ethereum wallet—like a CIBIL score analogy—using verifiable on-chain history instead of bank records?*

**Say:** You get a **300–850-style number**, a **tier**, and short **highlight lines**—one input for protocols and people, not a legal verdict or repayment promise.

**Optional one-liner:** The **`/docs`** page spells out the concept, signal pillars, and ethics—I’ll skip it live unless you want depth.

---

## 0:35–2:15 · Screen demo (main beat)

1. **Home (`/`):** Dark UI, hero—“on-chain credit signal for wallets you rely on.”
2. **Connect wallet** (RainbowKit): shows network + shortened address in the side card.
3. **Scorer card:** Field accepts **`0x…` addresses or ENS names** (e.g. `vitalik.eth`). Connect **autofills**; “Replace with connected wallet” if you typed something else.
4. **Get score:** Bar + big number + tier badge (**Strong / Stable / Developing / Elevated risk**) + bullet “drivers.” Point at the **small disclaimer** next to the score: **illustrative mock** unless you plug in a real backend.
5. **Show variety:** Paste **another address** or **another ENS**—same input always resolves to the same mock score for that address (**deterministic demo**).

---

## 2:15–3:05 · What you added (technical, still audience-friendly)

**Say:**  
- **ENS** resolves on the **server** (`POST /api/resolve-ens`) so the browser never fights RPC CORS—Ethereum **mainnet** registry, **viem**, short **cache** to avoid hammering the RPC.  
- **RPCs:** One **`NEXT_PUBLIC_ALCHEMY_API_KEY`** can drive **Ethereum, Base, and Arbitrum** for wallet reads; optional per-chain URL overrides; sensible **public fallback** for mainnet if nothing is set.  
- **Scoring:** Still **`NEXT_PUBLIC_WALLET_SCORE_API_URL`** → `POST …/score` with `{ address }` when you’re ready; otherwise built-in **mock** after resolve.

---

## 3:05–3:35 · Why it matters

**Say:** Teams today lean on allowlists, Discord rep, or gut feel. A **portable, explainable wallet lens**—even as one factor—scales better for treasury, access, or counterparty chats. The UI is **demo-ready** and **backend-swappable**.

---

## 3:35–4:00 · Close & credibility

**Say:** Default scores are **not** real credit; ENS and RPC need sensible keys in production; scores can be **gamed**—real products need methodology and appeals.

**Say:** Not financial or legal advice; **not affiliated** with any credit bureau—CIBIL is **analogy only**.

**Stack (if asked):** Next.js 15, React 19, RainbowKit, wagmi, viem, Tailwind, Framer Motion.

---

*Aligned with: ENS via `src/lib/ens.ts` + `src/app/api/resolve-ens/route.ts`, RPC helpers in `src/lib/ethereumRpc.ts`, wagmi transports in `src/lib/wagmi.ts`, scorer UI in `src/components/WalletScoreChecker.tsx`.*
