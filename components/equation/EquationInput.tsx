"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import type { DifficultyLevel, EquationExplanation } from "@/lib/types";
import { renderLatexToHtml } from "@/lib/katex-utils";
import { useEquationStore } from "@/store/equationStore";
import Button from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const DEBOUNCE_MS = 300;

async function explainEquation(
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
    throw new Error(text || "Failed to explain equation");
  }

  return (await response.json()) as EquationExplanation;
}

interface EquationInputProps {
  initialLatex?: string;
}

export const EquationInput: React.FC<EquationInputProps> = ({
  initialLatex = "",
}) => {
  const [latex, setLatex] = useState<string>(initialLatex);
  const [previewLatex, setPreviewLatex] = useState<string>(initialLatex);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const difficulty = useEquationStore((state) => state.difficulty);
  const setResult = useEquationStore((state) => state.setResult);
  const setLoading = useEquationStore((state) => state.setLoading);
  const initialLatexRef = useRef<string | null>(null);

  useEffect(() => {
    const handle = window.setTimeout(() => {
      setPreviewLatex(latex);
    }, DEBOUNCE_MS);
    return () => window.clearTimeout(handle);
  }, [latex]);

  const { html: previewHtml, error: previewError } = useMemo(
    () => renderLatexToHtml(previewLatex),
    [previewLatex],
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!latex.trim()) {
      toast.error("Paste a LaTeX equation first.");
      return;
    }
    setIsSubmitting(true);
    setLoading(true);
    try {
      const explanation = await explainEquation(latex.trim(), difficulty);
      setResult(explanation);
    } catch (error) {
      toast.error(
        (error as Error).message ?? "Something went wrong while explaining.",
      );
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialLatexRef.current === null) {
      initialLatexRef.current = initialLatex;
      setLatex(initialLatex);
      setPreviewLatex(initialLatex);
      return;
    }

    if (initialLatex === initialLatexRef.current) {
      return;
    }

    initialLatexRef.current = initialLatex;
    setLatex(initialLatex);
    setPreviewLatex(initialLatex);

    if (!initialLatex.trim()) {
      return;
    }

    setIsSubmitting(true);
    setLoading(true);
    void explainEquation(initialLatex.trim(), difficulty)
      .then((explanation) => {
        setResult(explanation);
      })
      .catch((error) => {
        toast.error(
          (error as Error).message ??
            "Something went wrong while explaining.",
        );
      })
      .finally(() => {
        setIsSubmitting(false);
        setLoading(false);
      });
  }, [difficulty, initialLatex, setLoading, setResult]);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-2xl border border-[color:var(--border-bright)] bg-[color:var(--bg-secondary)]/90 p-4 shadow-[0_22px_65px_rgba(0,0,0,0.55)]"
    >
      <label className="block text-xs uppercase tracking-[0.18em] text-[color:var(--text-tertiary)] mb-2">
        LaTeX equation
      </label>
      <textarea
        value={latex}
        onChange={(event) => setLatex(event.target.value)}
        placeholder="E = mc^2"
        className="w-full resize-none rounded-xl border border-[color:var(--border)] bg-[color:var(--bg-primary)] px-3 py-2 text-sm text-[color:var(--text-primary)] placeholder:text-[color:var(--text-tertiary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-violet)]"
        rows={3}
      />
      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="flex-1 rounded-xl border border-dashed border-[color:var(--border)] bg-[color:var(--bg-primary)]/80 px-3 py-2 min-h-[3rem]">
          {previewError ? (
            <code className="text-[11px] text-[color:var(--accent-amber)]">
              {previewLatex}
            </code>
          ) : (
            <motion.div
              key={previewHtml}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: previewHtml }}
            />
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <LoadingSpinner size={14} />
                Explaining…
              </span>
            ) : (
              "Explain"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EquationInput;

