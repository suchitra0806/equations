"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEquationStore } from "@/store/equationStore";
import TermCard from "./TermCard";

export const TermCardList: React.FC = () => {
  const result = useEquationStore((state) => state.currentResult);
  const activeTermId = useEquationStore((state) => state.activeTermId);
  const setActiveTermId = useEquationStore((state) => state.setActiveTermId);
  const isLoading = useEquationStore((state) => state.isLoading);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!activeTermId) {
      return;
    }
    const container = containerRef.current;
    if (!container) {
      return;
    }
    const card = container.querySelector<HTMLDivElement>(
      `[data-term-card-id="${activeTermId}"]`,
    );
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [activeTermId]);

  if (!result || result.terms.length === 0) {
    if (!isLoading) {
      return null;
    }
    return (
      <div className="mt-4 space-y-3">
        <div className="h-20 rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-secondary)] shimmer" />
        <div className="h-20 rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-secondary)] shimmer" />
      </div>
    );
  }

  return (
    <div className="mt-4">
      <p className="mb-3 text-xs uppercase tracking-[0.18em] text-[color:var(--text-tertiary)]">
        Terms
      </p>
      <div
        ref={containerRef}
        className="space-y-3 max-h-[420px] overflow-y-auto pr-1"
      >
        <AnimatePresence>
          {result.terms.map((term, index) => (
            <motion.div
              key={term.id}
              data-term-card-id={term.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
                delay: index * 0.08,
              }}
            >
              <TermCard
                term={term}
                isActive={activeTermId === term.id}
                onHover={setActiveTermId}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TermCardList;

