"use client";

import { motion } from "framer-motion";

interface AnimationProps {
  color: string;
  animationParams?: Record<string, number | string>;
}

const WIDTH = 280;
const HEIGHT = 200;

const FallbackDiagram: React.FC<AnimationProps> = ({ color }) => {
  return (
    <div className="w-[280px] h-[200px] rounded-lg border border-[color:var(--border)] bg-[color:var(--bg-tertiary)] overflow-hidden flex items-center justify-center">
      <motion.div
        className="rounded-full border-2"
        style={{
          borderColor: color,
          width: 96,
          height: 96,
        }}
        initial={{ boxShadow: "0 0 0 0 rgba(124,92,252,0.0)" }}
        animate={{
          boxShadow: [
            `0 0 0 0 ${color}33`,
            `0 0 40px 12px ${color}55`,
            `0 0 0 0 ${color}11`,
          ],
        }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      >
        <div className="w-full h-full flex items-center justify-center text-sm tracking-wide uppercase text-[color:var(--text-secondary)]">
          symbol
        </div>
      </motion.div>
    </div>
  );
};

export default FallbackDiagram;

