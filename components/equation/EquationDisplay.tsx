"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { renderLatexToHtml, decorateEquationHtml } from "@/lib/katex-utils";
import { useEquationStore } from "@/store/equationStore";

export const EquationDisplay: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const result = useEquationStore((state) => state.currentResult);
  const activeTermId = useEquationStore((state) => state.activeTermId);
  const setActiveTermId = useEquationStore((state) => state.setActiveTermId);
  const isLoading = useEquationStore((state) => state.isLoading);

  const { html, decoratedHtml, error } = useMemo(() => {
    if (!result) {
      return { html: "", decoratedHtml: "", error: undefined as string | undefined };
    }

    const rendered = renderLatexToHtml(result.equationLatex, true);
    const decorated =
      result.terms.length > 0
        ? decorateEquationHtml(rendered.html, result.terms)
        : rendered.html;

    return { html: rendered.html, decoratedHtml: decorated, error: rendered.error };
  }, [result]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const spans = container.querySelectorAll<HTMLSpanElement>("[data-term-id]");
    spans.forEach((span) => {
      const termId = span.dataset.termId;
      if (!termId) {
        return;
      }
      if (activeTermId && termId === activeTermId) {
        span.dataset.active = "true";
      } else {
        delete span.dataset.active;
      }
    });
  }, [activeTermId, decoratedHtml]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement | null;
    if (!target) {
      return;
    }
    const span = target.closest<HTMLSpanElement>("[data-term-id]");
    if (!span) {
      return;
    }
    const termId = span.dataset.termId ?? null;
    if (termId && termId !== activeTermId) {
      setActiveTermId(termId);
    }
  };

  const handleMouseLeave = () => {
    setActiveTermId(null);
  };

  if (!result) {
    return (
      <div className="rounded-2xl border border-dashed border-[color:var(--border)] bg-[color:var(--bg-secondary)]/60 px-6 py-8 text-sm text-[color:var(--text-tertiary)]">
        The equation will appear here once you submit it. You will be able to
        hover over any symbol to see its meaning and animation.
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-[color:var(--border-bright)] bg-[color:var(--bg-secondary)] px-6 py-4">
        <p className="text-sm font-semibold text-[color:var(--accent-amber)] mb-2">
          KaTeX rendering failed. Showing raw LaTeX instead.
        </p>
        <pre className="whitespace-pre-wrap break-all rounded-md bg-black/40 px-3 py-2 text-xs text-[color:var(--accent-sky)]">
          {result.equationLatex}
        </pre>
      </div>
    );
  }

  return (
    <motion.div
      className="relative rounded-2xl border border-[color:var(--border-bright)] bg-[color:var(--bg-secondary)]/80 px-6 py-5 shadow-[0_0_0_1px_rgba(61,53,96,0.35)]"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--text-tertiary)]">
            Equation
          </p>
          <p className="mt-1 text-lg font-display text-[color:var(--text-primary)]">
            {result.equationName}
          </p>
        </div>
        <p className="text-xs text-[color:var(--text-secondary)]">
          {result.field} · {result.difficulty.toUpperCase()}
        </p>
      </div>
      <div
        ref={containerRef}
        className="katex-display text-3xl leading-relaxed text-center"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: decoratedHtml || html }}
      />
      {isLoading && (
        <div className="pointer-events-none absolute inset-0 rounded-2xl border border-[color:var(--border-bright)]/80 bg-[color:var(--bg-secondary)]/40 shimmer" />
      )}
    </motion.div>
  );
};

export default EquationDisplay;

