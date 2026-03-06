"use client";

import { motion } from "framer-motion";

interface AnimationProps {
  color: string;
  animationParams?: Record<string, number | string>;
}

const WIDTH = 280;
const HEIGHT = 200;

const OscillatorAnimation: React.FC<AnimationProps> = ({
  color,
  animationParams,
}) => {
  const frequency =
    typeof animationParams?.frequency === "number"
      ? animationParams.frequency
      : 1;
  const damping =
    typeof animationParams?.damping === "number"
      ? animationParams.damping
      : 0.1;

  const period = 1 / Math.max(frequency, 0.1);

  return (
    <div className="w-[280px] h-[200px] rounded-lg border border-[color:var(--border)] bg-[color:var(--bg-tertiary)] overflow-hidden flex items-center justify-center">
      <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
        <line
          x1={WIDTH / 2}
          y1={20}
          x2={WIDTH / 2}
          y2={HEIGHT / 2 - 10}
          stroke={color}
          strokeWidth={2}
        />
        <motion.circle
          cx={WIDTH / 2}
          cy={HEIGHT / 2 + 30}
          r={10}
          fill={color}
          initial={{ x: -40 }}
          animate={{ x: [40, -40] }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 2 * period,
            ease: "easeInOut",
          }}
          style={{
            transformOrigin: `${WIDTH / 2}px ${HEIGHT / 2 - 10}px`,
          }}
        />
        <motion.line
          x1={40}
          y1={HEIGHT - 30}
          x2={WIDTH - 40}
          y2={HEIGHT - 30}
          stroke={color}
          strokeWidth={2}
          strokeDasharray="4 4"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 0.7, 0.3] }}
          transition={{
            repeat: Infinity,
            duration: 4 + damping * 6,
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  );
};

export default OscillatorAnimation;

