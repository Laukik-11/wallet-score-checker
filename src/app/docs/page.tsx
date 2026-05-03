import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft, BarChart3, BookOpen, Scale } from 'lucide-react';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'The idea',
  description:
    'Wallet trust scores for Web3—what a “CIBIL for wallets” could mean, why it matters, and how on-chain behaviour might inform it.',
  openGraph: {
    title: `The idea · ${siteConfig.name}`,
    description:
      'Concept note: bureau-style trust signals for Ethereum wallets—not lending advice, but a lens on counterparty behaviour.',
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
          Back to app
        </Link>

        <header className="mb-14">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
            <Scale className="size-3.5" aria-hidden />
            Concept note
          </div>
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-white md:text-[2.15rem]">
            A CIBIL-style signal—for wallets, not bank accounts
          </h1>
          <p className="mt-3 max-w-[62ch] text-lg text-muted">
            In India, <strong className="font-medium text-foreground">CIBIL</strong> and similar bureaus summarize repayment
            history so lenders share a common view of creditworthiness. Public blockchains don&apos;t have payslips or EMI
            tapes—but they do have <strong className="font-medium text-foreground">years of verifiable behaviour</strong>{' '}
            attached to each address. This project is about that analogy: a{' '}
            <strong className="font-medium text-foreground">single number (and narrative)</strong> that helps people and
            protocols answer a softer question:{' '}
            <em className="text-foreground/90">&quot;Given what this wallet has actually done on-chain, how much trust do I start with?&quot;</em>
          </p>
        </header>

        <div className="flex flex-col gap-14">
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

          <Section id="tradfi-vs-chain" title="What transfers from TradFi—and what doesn&apos;t">
            <div className="flex items-start gap-3 rounded-2xl border border-border bg-card-muted/40 p-4 backdrop-blur-sm">
              <BookOpen className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
              <div className="space-y-3">
                <p>
                  <strong className="text-foreground">Similar:</strong> a bounded score band (often{' '}
                  <strong className="font-medium text-foreground">300–850</strong>-style), tiers (strong / stable / weak),
                  and short <strong className="font-medium text-foreground">reason lines</strong> so the output is discussable,
                  not just a black box.
                </p>
                <p>
                  <strong className="text-foreground">Different:</strong> there is no employer or bank reconciling your ledger.
                  Signals come from <strong className="font-medium text-foreground">transactions, counterparties, protocols,
                  timing, and optionally attestations</strong> (e.g. ENS, credentials). Privacy and pseudonymity mean any real
                  product must be careful about <strong className="font-medium text-foreground">what is inferred vs. proven</strong>{' '}
                  and what users consent to share.
                </p>
              </div>
            </div>
          </Section>

          <Section id="signals" title="What typically feeds such a score">
            <div className="flex items-start gap-3 rounded-2xl border border-accent/25 bg-accent/8 p-4 text-[0.93rem] leading-relaxed">
              <BarChart3 className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
              <p className="text-foreground/95">
                The interactive demo on the home page shows{' '}
                <strong className="text-foreground">illustrative numbers</strong> so anyone can feel the UX. A serious scorer
                behind it would ingest chain data (and possibly ML) along lines like the pillars below—not every project needs
                all of them.
              </p>
            </div>

            <h3 className="mt-8 text-base font-semibold tracking-tight text-foreground">Activity &amp; throughput</h3>
            <p>
              How often does the wallet transact, over what windows (30 / 90 / 365 days), and is usage{' '}
              <strong className="font-medium text-foreground">steady</strong> versus one suspicious burst? Low activity
              doesn&apos;t mean “bad,” but it limits how confident you can be—similar to thin credit files in TradFi.
            </p>

            <h3 className="mt-8 text-base font-semibold tracking-tight text-foreground">Breadth across protocols</h3>
            <p>
              Does the wallet interact with <strong className="font-medium text-foreground">many meaningful venues</strong>
              —DEXs, lending, staking, NFT markets, bridges—or only repeat dust interactions? Diversity can signal lived-in
              participation; spam patterns can be discounted.
            </p>

            <h3 className="mt-8 text-base font-semibold tracking-tight text-foreground">Recency &amp; continuity</h3>
            <p>
              Last-seen activity, long dormancy, sudden reactivation after years of silence—these shape{' '}
              <strong className="font-medium text-foreground">confidence</strong> and sometimes trigger manual review rather than
              a numeric tweak alone.
            </p>

            <h3 className="mt-8 text-base font-semibold tracking-tight text-foreground">Counterparty &amp; risk hygiene</h3>
            <p>
              Heavy weights usually apply to ties to <strong className="font-medium text-foreground">known exploit flows</strong>,{' '}
              risky routers, or patterns that look like layering—exact lists and rules are policy choices for each issuer,
              like bureau exclusion lists in TradFi.
            </p>

            <h3 className="mt-8 text-base font-semibold tracking-tight text-foreground">Maturity &amp; proxies</h3>
            <p>
              <strong className="font-medium text-foreground">Wallet age</strong>, transaction count / nonce, optional links to
              identity layers (ENS, verifiable credentials): these help separate brand-new throwaways from accounts with a long,
              observable trail.
            </p>

            <h3 className="mt-8 text-base font-semibold tracking-tight text-foreground">Optional: AI over the trail</h3>
            <p>
              Models can compress messy histories into anomalies or clusters; for legitimacy and regulation, outputs should
              still tie back to <strong className="font-medium text-foreground">explainable drivers</strong> where possible—not
              only a silent embedding.
            </p>

            <div className="overflow-x-auto rounded-xl border border-border bg-black/35">
              <table className="w-full min-w-[520px] border-collapse text-left text-[0.88rem]">
                <thead>
                  <tr className="border-b border-border bg-white/[0.04] text-[0.72rem] font-semibold uppercase tracking-wider text-muted">
                    <th className="px-4 py-3 font-semibold">Lens</th>
                    <th className="px-4 py-3 font-semibold">Examples</th>
                    <th className="px-4 py-3 font-semibold">Intuition</th>
                  </tr>
                </thead>
                <tbody className="text-muted">
                  <tr className="border-b border-white/[0.06]">
                    <td className="px-4 py-3 font-medium text-foreground">More transactions</td>
                    <td className="px-4 py-3">Counts in rolling windows, failed vs success mix</td>
                    <td className="px-4 py-3">Richer trail → more statistical confidence (with caps against bots).</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="px-4 py-3 font-medium text-foreground">More protocols</td>
                    <td className="px-4 py-3">Distinct apps, category spread, bridge usage</td>
                    <td className="px-4 py-3">Participation across ecosystems vs single-hop loops.</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="px-4 py-3 font-medium text-foreground">Activity shape</td>
                    <td className="px-4 py-3">Regular cadence, dormancy, bursts</td>
                    <td className="px-4 py-3">Behavioural “credit character,” not just totals.</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="px-4 py-3 font-medium text-foreground">Risk edges</td>
                    <td className="px-4 py-3">Exploit-adjacent hops, sanction/policy lists</td>
                    <td className="px-4 py-3">Hard negatives—often override softer positives.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-foreground">Tenure</td>
                    <td className="px-4 py-3">First-seen block, cumulative usage</td>
                    <td className="px-4 py-3">Thin-file wallets get bounded scores until history grows.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="mt-8 text-base font-semibold tracking-tight text-foreground">Turning pillars into one number</h3>
            <p>
              A common approach: score each pillar on a bounded scale, choose{' '}
              <strong className="font-medium text-foreground">weights</strong> that match your risk appetite, combine, then map
              into a public band like <strong className="font-medium text-foreground">300–850</strong> with named tiers. Sparse
              data should <strong className="font-medium text-foreground">cap</strong> how high or low the score can go until
              enough observations exist—much like bureau handling of thin files.
            </p>
          </Section>

          <Section id="limits" title="Limits, gaming, and ethics">
            <p>
              On-chain scores can be <strong className="font-medium text-foreground">gamed</strong> (wash volume, sybil
              clusters). Any serious issuer needs{' '}
              <strong className="font-medium text-foreground">monitoring, appeals, and versioned methodology</strong>, similar
              to how bureaus dispute processes evolved. Scores must never be sold as{' '}
              <strong className="font-medium text-foreground">investment advice</strong> or guaranteed repayment likelihood—only
              as a <strong className="font-medium text-foreground">risk and trust aid</strong> your lawyers are comfortable
              with.
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
                Try the app →
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
