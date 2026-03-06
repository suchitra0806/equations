"use client";

import { useEquationStore } from "@/store/equationStore";

export const IntuitionBlock: React.FC = () => {
  const result = useEquationStore((state) => state.currentResult);

  if (!result) {
    return null;
  }

  return (
    <section className="mt-8 rounded-2xl border border-[color:var(--border-bright)] bg-gradient-to-br from-[color:var(--bg-tertiary)]/90 via-[color:var(--bg-secondary)]/90 to-[color:var(--accent-violet-dim)]/25 px-5 py-5">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--text-tertiary)] mb-1">
            Analogy
          </p>
          <p className="text-sm leading-relaxed text-[color:var(--text-primary)]">
            {result.analogy}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--text-tertiary)] mb-1">
            Real world
          </p>
          <p className="text-sm leading-relaxed text-[color:var(--text-primary)]">
            {result.realWorldApplication}
          </p>
          {result.famousUse && (
            <p className="mt-2 text-xs text-[color:var(--text-secondary)]">
              Famous use: {result.famousUse}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default IntuitionBlock;

