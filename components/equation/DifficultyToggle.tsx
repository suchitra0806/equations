"use client";

import { useTransition } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useEquationStore } from "@/store/equationStore";
import type { DifficultyLevel, EquationExplanation } from "@/lib/types";
import { Button } from "@/components/ui/Button";

const labels: Record<DifficultyLevel, string> = {
  eli12: "ELI12",
  undergrad: "Undergrad",
  expert: "Expert",
};

const descriptions: Record<DifficultyLevel, string> = {
  eli12: "Middle school friendly",
  undergrad: "Calculus-level detail",
  expert: "Full technical precision",
};

async function refetchExplanation(
  latex: string,
  difficulty: DifficultyLevel,
): Promise<EquationExplanation> {
  const response = await fetch("/api/explain", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ latex, difficulty }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Failed to fetch explanation");
  }

  return (await response.json()) as EquationExplanation;
}

export const DifficultyToggle: React.FC = () => {
  const [isPending, startTransition] = useTransition();
  const difficulty = useEquationStore((state) => state.difficulty);
  const currentResult = useEquationStore((state) => state.currentResult);
  const setDifficulty = useEquationStore((state) => state.setDifficulty);
  const setResult = useEquationStore((state) => state.setResult);
  const setLoading = useEquationStore((state) => state.setLoading);

  const handleChange = (level: DifficultyLevel) => {
    if (level === difficulty) {
      return;
    }
    if (!currentResult) {
      setDifficulty(level);
      return;
    }

    startTransition(async () => {
      try {
        setDifficulty(level);
        setLoading(true);
        const next = await refetchExplanation(
          currentResult.equationLatex,
          level,
        );
        setResult(next);
      } catch (error) {
        toast.error(
          (error as Error).message ??
            "Could not fetch the explanation at this level.",
        );
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <div className="mt-4 flex items-center justify-between gap-3">
      <div className="inline-flex items-center gap-1 rounded-full border border-[color:var(--border)] bg-[color:var(--bg-secondary)]/90 p-0.5">
        {(Object.keys(labels) as DifficultyLevel[]).map((level) => (
          <Button
            key={level}
            type="button"
            size="sm"
            variant={level === difficulty ? "primary" : "ghost"}
            className="rounded-full"
            onClick={() => handleChange(level)}
            disabled={isPending}
          >
            {labels[level]}
          </Button>
        ))}
      </div>
      <motion.span
        className="text-xs text-[color:var(--text-secondary)]"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        key={difficulty}
      >
        {descriptions[difficulty]}
        {isPending ? " · Refining…" : ""}
      </motion.span>
    </div>
  );
};

export default DifficultyToggle;

