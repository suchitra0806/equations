"use client";

import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: number;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 18 }) => {
  return (
    <div className="inline-flex items-center justify-center" aria-hidden="true">
      <motion.span
        className="block rounded-full border-2 border-t-transparent border-[color:var(--accent-violet)]"
        style={{ width: size, height: size }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 0.9,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default LoadingSpinner;

