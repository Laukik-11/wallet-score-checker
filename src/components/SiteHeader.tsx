import Link from 'next/link';
import { siteConfig } from '@/lib/site';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#070c18]/85 backdrop-blur-xl supports-[backdrop-filter]:bg-[#070c18]/72">
      <div className="mx-auto flex max-w-[960px] items-center justify-between gap-4 px-5 py-3.5 md:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span
            className="flex size-9 items-center justify-center rounded-xl border border-accent/35 bg-accent/10 text-lg font-bold text-accent transition-colors group-hover:border-accent/55"
            aria-hidden
          >
            ◈
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-foreground">{siteConfig.shortName}</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Primary">
          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-white/[0.06] hover:text-foreground"
          >
            App
          </Link>
          <span className="text-muted/40 select-none" aria-hidden>
            ·
          </span>
          <Link
            href="/docs"
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-white/[0.06] hover:text-accent"
          >
            The idea
          </Link>
        </nav>
      </div>
    </header>
  );
}
