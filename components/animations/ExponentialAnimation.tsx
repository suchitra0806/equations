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

const ExponentialAnimation: React.FC<AnimationProps> = ({
  color,
  animationParams,
}) => {
  const type =
    typeof animationParams?.type === "string"
      ? animationParams.type
      : "growth";
  const rate =
    typeof animationParams?.rate === "number" ? animationParams.rate : 1;

  const { pathData, samples } = useMemo(() => {
    const xScale = d3.scaleLinear().domain([0, 4]).range([20, WIDTH - 20]);
    const yScale = d3
      .scaleLinear()
      .domain([0, 1.2])
      .range([HEIGHT - 20, 20]);

    const pts: { x: number; y: number }[] = [];
    const sampleCount = 60;
    for (let i = 0; i <= sampleCount; i += 1) {
      const t = (4 * i) / sampleCount;
      let y: number;
      if (type === "decay") {
        y = Math.exp(-rate * t);
      } else {
        const raw = Math.exp(rate * (t - 2));
        y = Math.min(raw / (1 + raw), 1);
      }
      pts.push({ x: xScale(t), y: yScale(y) });
    }

    const line = d3
      .line<{ x: number; y: number }>()
      .x((d) => d.x)
      .y((d) => d.y)
      .curve(d3.curveMonotoneX);

    return { pathData: line(pts) ?? "", samples: pts };
  }, [rate, type]);

  return (
    <div className="w-[280px] h-[200px] rounded-lg border border-[color:var(--border)] bg-[color:var(--bg-tertiary)] overflow-hidden flex items-center justify-center">
      <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
        <motion.path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth={2}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        />
        {samples.length > 0 && (
          <motion.circle
            r={4}
            fill={color}
            initial={{ cx: samples[0].x, cy: samples[0].y }}
            animate={{
              cx: samples.map((p) => p.x),
              cy: samples.map((p) => p.y),
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut",
            }}
          />
        )}
      </svg>
    </div>
  );
};

export default ExponentialAnimation;

