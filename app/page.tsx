"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { LibraryEquation } from "@/lib/types";
import { useEquationStore } from "@/store/equationStore";
import Header from "@/components/layout/Header";
import EquationInput from "@/components/equation/EquationInput";
import EquationDisplay from "@/components/equation/EquationDisplay";
import DifficultyToggle from "@/components/equation/DifficultyToggle";
import PlainEnglishSummary from "@/components/equation/PlainEnglishSummary";
import TermCardList from "@/components/equation/TermCardList";
import IntuitionBlock from "@/components/equation/IntuitionBlock";
import AnimationPanel from "@/components/equation/AnimationPanel";
import LibraryGrid from "@/components/library/LibraryGrid";
import { EQUATION_LIBRARY } from "@/lib/equation-library";

const TRY_THESE: LibraryEquation[] = EQUATION_LIBRARY.slice(0, 5);

export default function Home() {
  const [seedEquation, setSeedEquation] = useState<LibraryEquation | null>(
    null,
  );
  const setDifficulty = useEquationStore((state) => state.setDifficulty);
  const resetStore = useEquationStore((state) => state.reset);

  const handleLibrarySelect = (equation: LibraryEquation) => {
    setSeedEquation(equation);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleTryEquation = (equation: LibraryEquation) => {
    resetStore();
    setDifficulty("eli12");
    setSeedEquation(equation);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[color:var(--bg-primary)] text-[color:var(--text-primary)]">
      <div className="bg-gradient-mesh fixed inset-0 opacity-40 -z-10" />
      <Header />
      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-16 pt-10">
        <section className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mb-6"
            >
              <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--text-tertiary)]">
                Equation lab
              </p>
              <h1 className="mt-2 font-display text-5xl md:text-6xl tracking-tight text-[color:var(--text-primary)]">
                ∑ explain
              </h1>
              <p className="mt-3 max-w-xl text-sm text-[color:var(--text-secondary)]">
                Paste any equation. Understand everything. Hover over symbols to
                see what they mean and watch them come alive as visual
                animations.
              </p>
            </motion.div>
            <EquationInput initialLatex={seedEquation?.latex ?? ""} />
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[color:var(--text-tertiary)]">
              <span className="uppercase tracking-[0.18em]">
                Try these
              </span>
              {TRY_THESE.map((equation) => (
                <button
                  key={equation.id}
                  type="button"
                  onClick={() => handleTryEquation(equation)}
                  className="rounded-full border border-[color:var(--border)] bg-[color:var(--bg-secondary)]/80 px-3 py-1 text-[11px] text-[color:var(--text-secondary)] hover:border-[color:var(--accent-violet)] hover:text-[color:var(--accent-sky)]"
                >
                  {equation.name}
                </button>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <AnimationPanel />
          </div>
        </section>

        <section className="grid gap-8 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-start">
          <div>
            <EquationDisplay />
            <DifficultyToggle />
            <PlainEnglishSummary />
            <TermCardList />
            <IntuitionBlock />
          </div>
          <div className="md:hidden">
            <AnimationPanel />
          </div>
        </section>

        <LibraryGrid onEquationSelect={handleLibrarySelect} />
      </main>
    </div>
  );
}
