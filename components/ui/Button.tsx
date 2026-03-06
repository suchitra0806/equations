"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";

type ButtonVariant = "primary" | "ghost" | "outline";
type ButtonSize = "md" | "sm";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const baseClasses =
  "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-violet)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg-primary)] disabled:opacity-50 disabled:cursor-not-allowed font-body";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[color:var(--accent-violet)] hover:bg-[color:var(--accent-violet-dim)] text-[color:var(--text-primary)] shadow-[0_0_0_1px_rgba(124,92,252,0.4)]",
  ghost:
    "bg-transparent hover:bg-[color:var(--bg-tertiary)] text-[color:var(--text-secondary)]",
  outline:
    "border border-[color:var(--border-bright)] hover:border-[color:var(--accent-violet)] bg-[color:var(--bg-secondary)] text-[color:var(--text-primary)]",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "h-11 px-5 text-sm",
  sm: "h-9 px-4 text-xs",
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) => {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className ?? ""}`}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
};

export default Button;

