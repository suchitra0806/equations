"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import * as d3 from "d3";

interface AnimationProps {
  color: string;
  animationParams?: Record<string, number | string>;
}

const WIDTH = 280;
const HEIGHT = 200;

const ProbabilityDistributionAnimation: React.FC<AnimationProps> = ({
  color,
  animationParams,
}) => {
  const distributionType =
    typeof animationParams?.distributionType === "string"
      ? animationParams.distributionType
      : "normal";

  const bars = useMemo(() => {
    const count = 12;
    const values: number[] = [];
    for (let i = 0; i < count; i += 1) {
      const x = -2 + (4 * i) / (count - 1);
      let y = 0;
      if (distributionType === "uniform") {
        y = 0.6;
      } else if (distributionType === "poisson") {
        const lambda = 4;
        const k = i;
        y = (Math.exp(-lambda) * lambda ** k) / (k === 0 ? 1 : k);
      } else {
        y = Math.exp(-x * x);
      }
      values.push(y);
    }

    const max = Math.max(...values);
    return values.map((v, index) => ({
      index,
      height: v / max,
    }));
  }, [distributionType]);

  const barWidth = (WIDTH - 40) / bars.length;

  return (
    <div className="w-[280px] h-[200px] rounded-lg border border-[color:var(--border)] bg-[color:var(--bg-tertiary)] overflow-hidden flex items-center justify-center">
      <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
        {bars.map((bar) => (
          <motion.rect
            key={bar.index}
            x={20 + bar.index * barWidth}
            y={HEIGHT - 30}
            width={barWidth - 4}
            initial={{ height: 0 }}
            animate={{ height: -bar.height * (HEIGHT - 60) }}
            fill={color}
            opacity={0.8}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 4,
              ease: "easeInOut",
              delay: (bar.index * 0.08) % 1.2,
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default ProbabilityDistributionAnimation;

