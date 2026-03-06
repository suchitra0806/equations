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

const WaveAnimation: React.FC<AnimationProps> = ({ color, animationParams }) => {
  const frequency =
    typeof animationParams?.frequency === "number"
      ? animationParams.frequency
      : 2;
  const amplitude =
    typeof animationParams?.amplitude === "number"
      ? animationParams.amplitude
      : 30;

  const pathData = useMemo(() => {
    const xScale = d3.scaleLinear().domain([0, WIDTH]).range([0, WIDTH]);
    const yScale = d3
      .scaleLinear()
      .domain([-1, 1])
      .range([HEIGHT / 2 + amplitude, HEIGHT / 2 - amplitude]);

    const points: [number, number][] = [];
    const sampleCount = 80;
    for (let i = 0; i <= sampleCount; i += 1) {
      const x = (i / sampleCount) * WIDTH * 2;
      const t = (i / sampleCount) * Math.PI * frequency;
      const y = Math.sin(t);
      points.push([xScale(x), yScale(y)]);
    }

    const line = d3
      .line<[number, number]>()
      .x((d) => d[0])
      .y((d) => d[1])
      .curve(d3.curveCatmullRom.alpha(0.8));

    return line(points) ?? "";
  }, [amplitude, frequency]);

  return (
    <div className="w-[280px] h-[200px] rounded-lg border border-[color:var(--border)] bg-[color:var(--bg-tertiary)] overflow-hidden flex items-center justify-center">
      <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity={0.2} />
            <stop offset="100%" stopColor={color} stopOpacity={0.7} />
          </linearGradient>
        </defs>
        <rect
          x="0"
          y="0"
          width={WIDTH}
          height={HEIGHT}
          fill="url(#waveGradient)"
          opacity={0.12}
        />
        <motion.g
          initial={{ x: 0 }}
          animate={{ x: [-WIDTH, 0] }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: "linear",
          }}
        >
          <path
            d={pathData}
            fill="none"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
          />
        </motion.g>
      </svg>
    </div>
  );
};

export default WaveAnimation;

