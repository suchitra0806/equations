"use client";

import { motion } from "framer-motion";
import type { LibraryEquation } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";

interface LibraryCardProps {
  equation: LibraryEquation;
  onSelect: (equation: LibraryEquation) => void;
}

export const LibraryCard: React.FC<LibraryCardProps> = ({
  equation,
  onSelect,
}) => {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(equation)}
      className="flex h-full flex-col justify-between rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-secondary)]/80 px-4 py-3 text-left transition-colors hover:border-[color:var(--border-bright)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-violet)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg-primary)]"
      whileHover={{ y: -3 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      <div className="space-y-2">
        <Badge tone="violet" variant="soft">
          {equation.field}
        </Badge>
        <p className="font-display text-lg leading-snug text-[color:var(--text-primary)]">
          {equation.name}
        </p>
        <p className="text-xs text-[color:var(--text-secondary)]">
          {equation.hook}
        </p>
      </div>
      <p className="mt-3 text-xs font-mono text-[color:var(--accent-sky)]">
        {equation.latex}
      </p>
    </motion.button>
  );
};

export default LibraryCard;

