"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { EquationTerm, TermType } from "@/lib/types";
import { renderLatexToHtml } from "@/lib/katex-utils";
import { Badge } from "@/components/ui/Badge";

interface TermCardProps {
  term: EquationTerm;
  isActive: boolean;
  onHover: (termId: string | null) => void;
}

const termTypeLabel: Record<TermType, string> = {
  variable: "Variable",
  operator: "Operator",
  constant: "Constant",
  greek: "Greek symbol",
  function: "Function",
  subscript: "Subscript / index",
};

const termTypeTone: Record<TermType, "sky" | "pink" | "teal" | "amber" | "violet" | "muted"> =
  {
    variable: "sky",
    operator: "pink",
    constant: "teal",
    greek: "amber",
    function: "violet",
    subscript: "muted",
  };

const termBorderColor: Record<TermType, string> = {
  variable: "border-l-[color:var(--accent-sky)]",
  operator: "border-l-[color:var(--accent-pink)]",
  constant: "border-l-[color:var(--accent-teal)]",
  greek: "border-l-[color:var(--accent-amber)]",
  function: "border-l-[color:var(--accent-violet)]",
  subscript: "border-l-[color:var(--text-secondary)]",
};

export const TermCard: React.FC<TermCardProps> = ({
  term,
  isActive,
  onHover,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const { html: symbolHtml } = renderLatexToHtml(term.symbol || term.latex);

  const handleMouseEnter = () => {
    onHover(term.id);
  };

  const handleMouseLeave = () => {
    onHover(null);
  };

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  const baseBg = isActive
    ? "bg-[color:var(--bg-tertiary)]/80"
    : "bg-[color:var(--bg-secondary)]/80";

  return (
    <motion.button
      type="button"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleToggle}
      className={`w-full text-left rounded-xl border border-[color:var(--border)] ${termBorderColor[term.termType]} border-l-4 px-4 py-3 ${baseBg} transition-colors hover:border-[color:var(--border-bright)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-violet)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg-primary)]`}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <Badge tone={termTypeTone[term.termType]}>
            {termTypeLabel[term.termType]}
          </Badge>
          <div className="flex items-center gap-2 mt-1">
            <div
              className="text-lg text-[color:var(--text-primary)]"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: symbolHtml }}
            />
            <span className="text-sm text-[color:var(--text-secondary)]">
              {term.name}
            </span>
          </div>
        </div>
        <span className="text-xs text-[color:var(--text-tertiary)] mt-1">
          {expanded ? "Hide details" : "Show details"}
        </span>
      </div>
      <p className="mt-2 text-sm text-[color:var(--text-primary)]">
        {term.plainEnglish}
      </p>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="mt-3 space-y-2 text-xs text-[color:var(--text-secondary)]"
          >
            <div>
              <span className="font-semibold text-[color:var(--text-primary)]">
                Physical role:
              </span>{" "}
              {term.physicalMeaning}
            </div>
            {term.units && (
              <div>
                <span className="font-semibold text-[color:var(--text-primary)]">
                  Units:
                </span>{" "}
                {term.units}
              </div>
            )}
            <div>
              <span className="font-semibold text-[color:var(--text-primary)]">
                Intuition:
              </span>{" "}
              {term.analogy}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default TermCard;

