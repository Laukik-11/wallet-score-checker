import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft, BarChart3, BookOpen, Code2, Layers, Rocket, Scale, Workflow } from 'lucide-react';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'The idea',
  description:
    'Wallet score summarizes trust from chain history so teams can align on counterparty risk beyond informal reputation.',
  openGraph: {
    title: `The idea · ${siteConfig.name}`,
    description:
      'Why a portable wallet score matters for treasury hires and DeFi risk plus how it differs from informal reputation.',
    url: '/docs',
  },
  alternates: { canonical: '/docs' },
};

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="mb-4 border-b border-white/[0.08] pb-2 text-xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      <div className="space-y-3 text-[0.97rem] leading-relaxed text-muted">{children}</div>
    </section>
  );
}

const deckBlocks: {
  id: string;
  title: string;
  icon: typeof Layers;
  bullets: string[];
}[] = [
  {
    id: 'built',
    title: 'What we built',
    icon: Layers,
    bullets: [
      'Wallet trust “score” UI—a bureau-style lens on Ethereum addresses (CIBIL analogy).',
      'Paste any address or connect a wallet → band (300–850), tier, short driver lines.',
      'This page explains the idea; the app proves the interaction loop.',
      'Demo uses a stable mock scorer today; a real API plugs in via one env URL.',
    ],
  },
  {
    id: 'works',
    title: 'How it works',
    icon: Workflow,
    bullets: [
      'Input: checksum-valid EVM address; wallet connect can autofill the field.',
      'Client asks for a score—deterministic mock locally or POST /score with { address }.',
      'Output: score, tier, optional highlights—UI shows bar, badge, bullets.',
      'Framing: counterparty trust preview from behaviour—not loan repayment.',
    ],
  },
  {
    id: 'made',
    title: 'How it’s made',
    icon: Code2,
    bullets: [
      'Next.js + React, Tailwind UI, RainbowKit · wagmi · viem for wallets.',
      'Small Radix-based components + Framer Motion for motion.',
      'SEO/share: metadata, OG & Twitter images, sitemap, robots, manifest.',
    ],
  },
  {
    id: 'future',
    title: 'Future work',
    icon: Rocket,
    bullets: [
      'Real scorer: index txs, protocols, recency, risk lists—weighted, explainable pillars.',
      'Thin-file caps, published methodology, appeals, versioned models.',
      'Anti-gaming: sybil/wash detection, monitoring, policy overrides.',
      'Privacy & consent; plug-ins where scores are one signal among many.',
    ],
  },
];

function DeckGrid() {
  return (
    <section id="deck" className="scroll-mt-28" aria-labelledby="deck-heading">
      <div className="grid gap-4 sm:grid-cols-2">
        {deckBlocks.map(({ id, title, icon: Icon, bullets }) => (
          <div
            key={id}
            id={`deck-${id}`}
            className="rounded-2xl border border-border bg-card-muted/35 p-4 backdrop-blur-sm md:p-5"
          >
            <div className="mb-3 flex items-center gap-2.5">
              <span className="inline-flex rounded-lg border border-accent/35 bg-accent/10 p-2 text-accent">
                <Icon className="size-[18px]" aria-hidden />
              </span>
              <h3 className="text-[0.95rem] font-semibold tracking-tight text-foreground">{title}</h3>
            </div>
            <ul className="list-disc space-y-1.5 pl-4 text-[0.84rem] leading-snug text-muted marker:text-accent/70">
              {bullets.map((line) => (
                <li key={line} className="text-pretty">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function DocsPage() {
  return (
    <div className="bg-app-gradient min-h-screen pb-20 pt-6 md:pb-28 md:pt-8">
      <div
        className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[length:28px_28px] [mask-image:radial-gradient(circle_at_center,black_35%,transparent_95%)]"
        aria-hidden
      />

      <article className="relative z-10 mx-auto max-w-[820px] px-5 md:px-6">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-strong"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back to demo
        </Link>

        <header className="mb-14">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
            <Scale className="size-3.5" aria-hidden />
            Concept note
          </div>
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-white md:text-[2.15rem]">
            CIBIL style trust for wallets
          </h1>
          <ul className="mt-4 max-w-[62ch] list-disc space-y-2 pl-5 text-[0.95rem] leading-snug text-muted md:text-[1.02rem] marker:text-accent/65">
            <li className="text-pretty">
              <strong className="font-medium text-foreground">Wallet score</strong> is one summary per address:{' '}
              <strong className="font-medium text-foreground">300–850</strong> band, tier, short driver lines.
            </li>
            <li className="text-pretty">
              Same idea as bureau scores like <strong className="font-medium text-foreground">CIBIL</strong> but inputs are{' '}
              <strong className="font-medium text-foreground">on-chain behaviour</strong> not payslips or loan files.
            </li>
            <li className="text-pretty">
              Teams keep deciding trust for treasury, contributors, and protocol counterparties.
            </li>
            <li className="text-pretty">
              Informal reputation and private allowlists scale poorly and rarely show why someone passed or failed.
            </li>
            <li className="text-pretty">
              A shared score gives everyone the same starting read from chain history: faster paths for honest wallets, deeper review for risky ones.
            </li>
            <li className="text-pretty">
              One input among many. Not a final verdict on a person or a promise to repay debt.
            </li>
          </ul>
        </header>

        <div className="flex flex-col gap-14">
          <DeckGrid />

          <Section id="why-it-matters" title="Why Web3 wants something like this">
            <p>
              Today, teams rely on <strong className="font-medium text-foreground">allowlists</strong>, Discord reputations,
              snapshot votes, or gut feel before sending treasury funds, hiring contributors, or opening credit lines in DeFi.
              None of that scales. A portable <strong className="font-medium text-foreground">wallet score</strong>—used as
              one input among many—could reduce friction for honest actors and surface wallets that look rushed, recycled, or
              entangled with toxic flows (exploits, launderers, sybil farms). It is{' '}
              <strong className="font-medium text-foreground">not</strong> a promise that someone will repay a loan; it is a
              structured lens on <strong className="font-medium text-foreground">history and hygiene</strong>.
            </p>
          </Section>

          <Section id="signals" title="What typically feeds such a score">
            <div className="flex items-start gap-3 rounded-2xl border border-accent/25 bg-accent/8 p-4 text-[0.93rem] leading-relaxed">
              <BarChart3 className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
              <div className="space-y-2 text-foreground/95">
                <p>
                  A scorer turns <strong className="text-foreground">public ledger facts</strong> into a few{' '}
                  <strong className="text-foreground">pillars</strong>, scores each pillar, then{' '}
                  <strong className="text-foreground">combines</strong> them into one band (e.g.{' '}
                  <strong className="text-foreground">300–850</strong>) plus short <strong className="text-foreground">reason lines</strong>.
                  The home demo uses <strong className="text-foreground">placeholder math</strong>; a production model would follow
                  the same shape—just backed by real ingestion rules.
                </p>
                <p className="text-muted">
                  Nothing here is mandatory: pick pillars and weights to match your risk policy.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-border bg-black/35 mt-6">
              <table className="w-full min-w-[540px] border-collapse text-left text-[0.84rem] leading-snug">
                <thead>
                  <tr className="border-b border-border bg-white/[0.04] text-[0.7rem] font-semibold uppercase tracking-wider text-muted">
                    <th className="px-3 py-2.5 font-semibold md:px-4 md:py-3">Pillar</th>
                    <th className="px-3 py-2.5 font-semibold md:px-4 md:py-3">What we measure (on-chain)</th>
                    <th className="px-3 py-2.5 font-semibold md:px-4 md:py-3">Why it affects trust</th>
                  </tr>
                </thead>
                <tbody className="text-muted">
                  <tr className="border-b border-white/[0.06]">
                    <td className="px-3 py-2.5 align-top font-medium text-foreground md:px-4 md:py-3">Activity</td>
                    <td className="px-3 py-2.5 align-top md:px-4 md:py-3">
                      How often the wallet sends txs; counts over 30 / 90 / 365 days; failed vs successful txs.
                    </td>
                    <td className="px-3 py-2.5 align-top md:px-4 md:py-3">
                      More history usually means <strong className="font-medium text-foreground">statistical confidence</strong>.
                      Very little activity isn&apos;t “evil”—it&apos;s a <strong className="font-medium text-foreground">thin file</strong>{' '}
                      (harder to judge).
                    </td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="px-3 py-2.5 align-top font-medium text-foreground md:px-4 md:py-3">Protocol breadth</td>
                    <td className="px-3 py-2.5 align-top md:px-4 md:py-3">
                      Distinct contracts/apps touched—DEX, lending, staking, NFT venues, bridges—not just one loop.
                    </td>
                    <td className="px-3 py-2.5 align-top md:px-4 md:py-3">
                      Breadth suggests <strong className="font-medium text-foreground">real participation</strong>; repetitive dust or
                      wash loops can be discounted or penalized.
                    </td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="px-3 py-2.5 align-top font-medium text-foreground md:px-4 md:py-3">Recency</td>
                    <td className="px-3 py-2.5 align-top md:px-4 md:py-3">
                      Last-seen time; long gaps; sudden bursts after silence.
                    </td>
                    <td className="px-3 py-2.5 align-top md:px-4 md:py-3">
                      Shows whether behaviour is <strong className="font-medium text-foreground">continuous</strong>; odd patterns may
                      trigger review instead of a tiny score tick.
                    </td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="px-3 py-2.5 align-top font-medium text-foreground md:px-4 md:py-3">Risk hygiene</td>
                    <td className="px-3 py-2.5 align-top md:px-4 md:py-3">
                      Counterparties and flows—proximity to known exploits, launder patterns, policy lists you maintain.
                    </td>
                    <td className="px-3 py-2.5 align-top md:px-4 md:py-3">
                      Often <strong className="font-medium text-foreground">hard negatives</strong>: they can outweigh many soft positives,
                      like bureau exclusion logic.
                    </td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="px-3 py-2.5 align-top font-medium text-foreground md:px-4 md:py-3">Maturity</td>
                    <td className="px-3 py-2.5 align-top md:px-4 md:py-3">
                      Wallet age, cumulative txs/nonce; optionally ENS or attestations.
                    </td>
                    <td className="px-3 py-2.5 align-top md:px-4 md:py-3">
                      Separates <strong className="font-medium text-foreground">brand-new throwaways</strong> from accounts with a long,
                      observable trail.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2.5 align-top font-medium text-foreground md:px-4 md:py-3">Optional ML</td>
                    <td className="px-3 py-2.5 align-top md:px-4 md:py-3">
                      Clustering / anomaly flags over the full tx graph—still audited against rules.
                    </td>
                    <td className="px-3 py-2.5 align-top md:px-4 md:py-3">
                      Helps prioritize review; outputs should still map to{' '}
                      <strong className="font-medium text-foreground">explainable drivers</strong>, not a silent score.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-5 text-[0.93rem] leading-relaxed text-muted">
              Each pillar becomes a sub-score; you choose <strong className="font-medium text-foreground">weights</strong>, sum or blend,
              then <strong className="font-medium text-foreground">cap</strong> outcomes when data is sparse so the headline number never
              overclaims—same intuition as thin-file handling in credit bureaus.
            </p>
          </Section>

          <Section id="about-demo" title="About this site">
            <p>
              <strong className="font-medium text-foreground">{siteConfig.name}</strong> is a small interactive front-end: you
              paste or connect a wallet and see a score-shaped response.{' '}
              <strong className="font-medium text-foreground">Numbers are illustrative</strong> unless you plug in your own
              scoring service—the goal here is to communicate the <strong className="font-medium text-foreground">idea</strong>{' '}
              of bureau-like clarity meeting Web3 openness, not to certify real-world credit.
            </p>
            <p>
              <Link href="/" className="font-medium text-accent underline-offset-4 hover:underline">
                Try the demo →
              </Link>
            </p>
          </Section>

          <footer className="border-t border-white/[0.08] pt-10 text-center text-sm text-muted">
            <p>
              Educational framing only—not financial, legal, or credit advice. Bureau names are used for analogy; this project
              is not affiliated with any credit bureau.
            </p>
          </footer>
        </div>
      </article>
    </div>
  );
}
