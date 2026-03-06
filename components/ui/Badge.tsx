"use client";

import type { ReactNode } from "react";

type BadgeVariant = "default" | "soft" | "outline";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  tone?: "violet" | "pink" | "teal" | "amber" | "sky" | "muted";
}

const toneToColor: Record<
  NonNullable<BadgeProps["tone"]>,
  { bg: string; text: string; border: string }
> = {
  violet: {
    bg: "bg-[color:var(--accent-violet-dim)]/30",
    text: "text-[color:var(--accent-violet)]",
    border: "border-[color:var(--accent-violet)]/40",
  },
  pink: {
    bg: "bg-[color:var(--accent-pink)]/10",
    text: "text-[color:var(--accent-pink)]",
    border: "border-[color:var(--accent-pink)]/40",
  },
  teal: {
    bg: "bg-[color:var(--accent-teal)]/10",
    text: "text-[color:var(--accent-teal)]",
    border: "border-[color:var(--accent-teal)]/35",
  },
  amber: {
    bg: "bg-[color:var(--accent-amber)]/10",
    text: "text-[color:var(--accent-amber)]",
    border: "border-[color:var(--accent-amber)]/40",
  },
  sky: {
    bg: "bg-[color:var(--accent-sky)]/10",
    text: "text-[color:var(--accent-sky)]",
    border: "border-[color:var(--accent-sky)]/40",
  },
  muted: {
    bg: "bg-[color:var(--bg-tertiary)]",
    text: "text-[color:var(--text-secondary)]",
    border: "border-[color:var(--border-bright)]",
  },
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "soft",
  tone = "muted",
}) => {
  const toneColors = toneToColor[tone];

  const base =
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] uppercase tracking-[0.16em] font-semibold font-body";

  const style =
    variant === "outline"
      ? `${toneColors.text} border-[color:var(--border-bright)] bg-transparent`
      : `${toneColors.bg} ${toneColors.text} ${toneColors.border}`;

  return <span className={`${base} ${style}`}>{children}</span>;
};

export default Badge;

