"use client";

import { motion } from "framer-motion";

interface AnimationProps {
  color: string;
  animationParams?: Record<string, number | string>;
}

const WIDTH = 280;
const HEIGHT = 200;

const MatrixTransformAnimation: React.FC<AnimationProps> = ({ color }) => {
  return (
    <div className="w-[280px] h-[200px] rounded-lg border border-[color:var(--border)] bg-[color:var(--bg-tertiary)] overflow-hidden flex items-center justify-center">
      <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
        <motion.rect
          x={90}
          y={50}
          width={100}
          height={100}
          rx={10}
          ry={10}
          fill="none"
          stroke={color}
          strokeWidth={2}
          initial={{ rotate: 0, x: 0, y: 0, skewX: 0 } as any}
          animate={[
            { rotate: 15, x: -10, y: -5, skewX: 5 },
            { rotate: -10, x: 10, y: 5, skewX: -5 },
            { rotate: 0, x: 0, y: 0, skewX: 0 },
          ] as any}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "140px 100px" }}
        />
        <motion.line
          x1={40}
          y1={HEIGHT - 40}
          x2={WIDTH - 40}
          y2={HEIGHT - 40}
          stroke={color}
          strokeWidth={1}
          strokeDasharray="4 4"
          initial={{ opacity: 0.4 }}
          animate={{ opacity: [0.2, 0.7, 0.4] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />
        <motion.line
          x1={WIDTH / 2}
          y1={30}
          x2={WIDTH / 2}
          y2={HEIGHT - 30}
          stroke={color}
          strokeWidth={1}
          strokeDasharray="4 4"
          initial={{ opacity: 0.4 }}
          animate={{ opacity: [0.2, 0.7, 0.4] }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
            delay: 0.8,
          }}
        />
      </svg>
    </div>
  );
};

export default MatrixTransformAnimation;

