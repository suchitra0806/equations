"use client";

import Link from "next/link";
import { Github } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-30 border-b border-[color:var(--border)] bg-[color:var(--bg-primary)]/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-2xl tracking-tight text-[color:var(--text-primary)]">
            ∑ explain
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--text-tertiary)]">
            Equation Beautifier
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="#library"
            className="text-xs uppercase tracking-[0.18em] text-[color:var(--text-secondary)] hover:text-[color:var(--accent-sky)]"
          >
            Library
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--border-bright)] bg-[color:var(--bg-secondary)] text-[color:var(--text-secondary)] hover:border-[color:var(--accent-violet)] hover:text-[color:var(--accent-violet)]"
            aria-label="View source on GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;

