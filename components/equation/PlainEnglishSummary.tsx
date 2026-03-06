"use client";

import { useEquationStore } from "@/store/equationStore";

export const PlainEnglishSummary: React.FC = () => {
  const result = useEquationStore((state) => state.currentResult);

  if (!result) {
    return null;
  }

  return (
    <section className="mt-6 rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-tertiary)]/70 px-5 py-4">
      <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--text-tertiary)] mb-2">
        In one glance
      </p>
      <p className="text-sm leading-relaxed text-[color:var(--text-primary)]">
        {result.summary}
      </p>
    </section>
  );
};

export default PlainEnglishSummary;

