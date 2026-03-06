"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useEquationStore } from "@/store/equationStore";
import { ANIMATION_COMPONENTS } from "@/lib/animation-map";

const termAccentColor: Record<
  "variable" | "operator" | "constant" | "greek" | "function" | "subscript",
  string
> = {
  variable: "var(--accent-sky)",
  operator: "var(--accent-pink)",
  constant: "var(--accent-teal)",
  greek: "var(--accent-amber)",
  function: "var(--accent-violet)",
  subscript: "var(--text-secondary)",
};

export const AnimationPanel: React.FC = () => {
  const result = useEquationStore((state) => state.currentResult);
  const activeTermId = useEquationStore((state) => state.activeTermId);
  const isLoading = useEquationStore((state) => state.isLoading);

  const activeTerm = useMemo(() => {
    if (!result || result.terms.length === 0) {
      return null;
    }
    if (!activeTermId) {
      return result.terms[0] ?? null;
    }
    return result.terms.find((term) => term.id === activeTermId) ?? null;
  }, [activeTermId, result]);

  if (!result || !activeTerm) {
    return (
      <aside className="sticky top-20 rounded-2xl border border-dashed border-[color:var(--border)] bg-[color:var(--bg-secondary)]/60 px-4 py-4 text-xs text-[color:var(--text-tertiary)]">
        Visual intuition for the currently highlighted term will appear here.
      </aside>
    );
  }

  const color = termAccentColor[activeTerm.termType];
  const AnimationComponent =
    ANIMATION_COMPONENTS[activeTerm.animationHint] ??
    ANIMATION_COMPONENTS.none;

  return (
    <aside className="relative sticky top-20 rounded-2xl border border-[color:var(--border-bright)] bg-[color:var(--bg-secondary)]/90 px-4 py-4 shadow-[0_18px_45px_rgba(0,0,0,0.45)]">
      <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--text-tertiary)] mb-3">
        Visual intuition
      </p>
      <motion.div
        key={activeTerm.id}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex flex-col items-center gap-3"
      >
        <AnimationComponent
          color={color}
          animationParams={activeTerm.animationParams}
        />
        <div className="w-full space-y-1.5">
          <p className="text-xs font-semibold text-[color:var(--text-secondary)]">
            {activeTerm.name}
          </p>
          <p className="text-xs text-[color:var(--text-primary)]">
            {activeTerm.physicalMeaning}
          </p>
          {activeTerm.units && (
            <p className="text-[11px] text-[color:var(--text-tertiary)]">
              Units: {activeTerm.units}
            </p>
          )}
        </div>
      </motion.div>
      {isLoading && (
        <div className="pointer-events-none absolute inset-0 rounded-2xl border border-[color:var(--border-bright)]/80 bg-[color:var(--bg-secondary)]/40 shimmer" />
      )}
    </aside>
  );
};

export default AnimationPanel;

