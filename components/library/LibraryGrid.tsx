"use client";

import { useEquationStore } from "@/store/equationStore";
import { EQUATION_LIBRARY } from "@/lib/equation-library";
import type { LibraryEquation } from "@/lib/types";
import LibraryCard from "./LibraryCard";

interface LibraryGridProps {
  onEquationSelect: (equation: LibraryEquation) => void;
}

export const LibraryGrid: React.FC<LibraryGridProps> = ({ onEquationSelect }) => {
  const currentResult = useEquationStore((state) => state.currentResult);

  return (
    <section id="library" className="mt-16">
      <div className="flex items-baseline justify-between gap-2 mb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--text-tertiary)]">
            Equation library
          </p>
          <h2 className="font-display text-xl text-[color:var(--text-primary)]">
            Canonical equations to explore
          </h2>
        </div>
        {currentResult && (
          <p className="hidden text-xs text-[color:var(--text-secondary)] md:block">
            Currently exploring: {currentResult.equationName}
          </p>
        )}
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {EQUATION_LIBRARY.slice(0, 6).map((equation) => (
          <LibraryCard
            key={equation.id}
            equation={equation}
            onSelect={onEquationSelect}
          />
        ))}
      </div>
    </section>
  );
};

export default LibraryGrid;

