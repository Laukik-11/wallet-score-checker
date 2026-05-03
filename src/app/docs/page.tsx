import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Layers, Rocket, Terminal, Webhook } from 'lucide-react';
import { siteConfig, getSiteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Documentation',
  description: `${siteConfig.name}: architecture, setup, and hackathon submission notes for Ethereum / EVM builders.`,
  openGraph: {
    title: `Documentation · ${siteConfig.name}`,
    description: siteConfig.description,
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
  const siteUrl = getSiteUrl();

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
            <BookOpen className="size-3.5" aria-hidden />
            Hackathon docs
          </div>
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-white md:text-[2.15rem]">
            {siteConfig.name}
          </h1>
          <p className="mt-3 max-w-[62ch] text-lg text-muted">{siteConfig.tagline}</p>
          <p className="mt-4 text-sm text-muted/85">
            Submission-ready overview for <strong className="font-medium text-foreground">Ethereum / ETHGlobal-style</strong>{' '}
            hackathons: what we built, how to run it, and where to plug your scoring backend.
          </p>
        </header>

        <div className="flex flex-col gap-14">
          <Section id="overview" title="Overview">
            <p>
              {siteConfig.name} is a production-shaped{' '}
              <strong className="font-medium text-foreground">Next.js 15</strong> frontend that demonstrates{' '}
              <strong className="font-medium text-foreground">wallet-attributed trust signals</strong>—similar in spirit to a
              credit bureau score, but for EVM addresses. Users paste an address (or connect via{' '}
              <strong className="font-medium text-foreground">RainbowKit</strong>
              ), and the UI requests a score from your backend.
            </p>
            <p>
              The scoring pipeline itself is intentionally <strong className="font-medium text-foreground">pluggable</strong>:
              implement <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.85em] text-accent">fetchWalletScore</code>{' '}
              in <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.85em] text-accent">src/lib/walletScoreApi.ts</code>{' '}
              to call your AI / indexer / risk API.
            </p>
          </Section>

          <Section id="problem" title="Problem">
            <p>
              Web3 lacks a portable, composable <strong className="font-medium text-foreground">“should I trust this counterparty?”</strong>{' '}
              signal. Protocols rely on allowlists, social graphs, or manual diligence—slow for hacks and demos.
            </p>
          </Section>

          <Section id="solution" title="Solution">
            <p>
              A <strong className="font-medium text-foreground">single UX surface</strong> for requesting an interpretable score:
              normalized band (e.g. 300–850-style), tier label, and optional highlights from your model—presented with clear
              compliance disclaimers.
            </p>
          </Section>

          <Section id="stack" title="Technology stack">
            <ul className="list-inside list-disc space-y-2 marker:text-accent">
              <li>Next.js 15 · React 19 · App Router</li>
              <li>RainbowKit · wagmi · viem (EVM)</li>
              <li>Tailwind CSS v4 · Radix primitives · Framer Motion</li>
              <li>TypeScript throughout</li>
            </ul>
          </Section>

          <Section id="architecture" title="Architecture">
            <div className="flex items-start gap-3 rounded-2xl border border-border bg-card-muted/40 p-4 backdrop-blur-sm">
              <Layers className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
              <div>
                <p className="font-medium text-foreground">Client</p>
                <p className="mt-1">
                  Validates addresses with <span className="font-mono text-[0.9em] text-accent">viem</span>, calls{' '}
                  <span className="font-mono text-[0.9em] text-accent">fetchWalletScore</span>, renders loading / error /
                  result states with motion for demos.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-border bg-card-muted/40 p-4 backdrop-blur-sm">
              <Webhook className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
              <div>
                <p className="font-medium text-foreground">Backend (yours)</p>
                <p className="mt-1">
                  Implement POST to your API from <span className="font-mono text-[0.9em] text-accent">walletScoreApi.ts</span>.
                  Suggested response shape:{' '}
                  <span className="font-mono text-[0.85em] text-accent">
                    {'{ score, tier, highlights? }'}
                  </span>
                  .
                </p>
              </div>
            </div>
          </Section>

          <Section id="setup" title="Local setup">
            <div className="flex items-start gap-3 rounded-2xl border border-border bg-black/30 p-4">
              <Terminal className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
              <div className="min-w-0 flex-1 space-y-3 font-mono text-[0.88rem] text-muted">
                <p className="text-[0.8rem] uppercase tracking-wider text-muted/70">Install &amp; dev</p>
                <pre className="overflow-x-auto rounded-xl bg-black/45 p-4 text-foreground/90">
                  npm install{'\n'}
                  npm run dev
                </pre>
                <p className="text-[0.8rem] uppercase tracking-wider text-muted/70">Production build</p>
                <pre className="overflow-x-auto rounded-xl bg-black/45 p-4 text-foreground/90">
                  npm run build{'\n'}
                  npm start
                </pre>
              </div>
            </div>
          </Section>

          <Section id="environment" title="Environment variables">
            <p>
              For correct <strong className="font-medium text-foreground">Open Graph URLs</strong>, canonical links, sitemap,
              and robots host hints after deployment, set:
            </p>
            <pre className="overflow-x-auto rounded-xl border border-border bg-black/40 p-4 font-mono text-[0.88rem] text-foreground/90">
              NEXT_PUBLIC_SITE_URL={siteUrl.startsWith('http') ? siteUrl : 'https://your-deployment-url'}
            </pre>
            <p className="text-sm">
              Example: <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-accent">https://wallet-score.vercel.app</code>
            </p>
          </Section>

          <Section id="submission" title="Hackathon checklist">
            <div className="flex items-start gap-3 rounded-2xl border border-accent/25 bg-accent/8 p-4">
              <Rocket className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
              <ul className="list-inside list-disc space-y-2 marker:text-accent">
                <li>Deploy frontend (Vercel, Netlify, Cloudflare Pages, etc.).</li>
                <li>Set <span className="font-mono text-accent">NEXT_PUBLIC_SITE_URL</span> to the live origin.</li>
                <li>Add repo + demo links to your ETHGlobal / Devfolio submission.</li>
                <li>Optional: wire scoring API and document model inputs (chains, windows, labels).</li>
              </ul>
            </div>
          </Section>

          <footer className="border-t border-white/[0.08] pt-10 text-center text-sm text-muted">
            <p>
              Built as an <strong className="text-foreground">Ethereum ecosystem</strong> tooling demo—not financial advice.
            </p>
            <p className="mt-2">
              Live metadata base URL for judges:{' '}
              <span className="break-all font-mono text-[0.85rem] text-accent">{siteUrl}</span>
            </p>
          </footer>
        </div>
      </article>
    </div>
  );
}
