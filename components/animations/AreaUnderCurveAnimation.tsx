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

const AreaUnderCurveAnimation: React.FC<AnimationProps> = ({
  color,
  animationParams,
}) => {
  const functionType =
    typeof animationParams?.functionType === "string"
      ? animationParams.functionType
      : "parabola";

  const { curvePath, areaPath } = useMemo(() => {
    const xScale = d3.scaleLinear().domain([-2, 2]).range([20, WIDTH - 20]);
    const yScale = d3
      .scaleLinear()
      .domain([-0.1, 1.1])
      .range([HEIGHT - 20, 20]);

    const points: [number, number][] = [];
    const sampleCount = 80;
    for (let i = 0; i <= sampleCount; i += 1) {
      const t = -2 + (4 * i) / sampleCount;
      let y = 0;

      if (functionType === "sine") {
        y = 0.5 + 0.4 * Math.sin(t * Math.PI);
      } else if (functionType === "gaussian") {
        y = Math.exp(-t * t);
      } else {
        y = 0.1 + 0.2 * t * t;
      }

      points.push([xScale(t), yScale(y)]);
    }

    const line = d3
      .line<[number, number]>()
      .x((d) => d[0])
      .y((d) => d[1])
      .curve(d3.curveCatmullRom.alpha(0.8));

    const curve = line(points) ?? "";

    const areaGenerator = d3
      .area<[number, number]>()
      .x((d) => d[0])
      .y0(HEIGHT - 20)
      .y1((d) => d[1])
      .curve(d3.curveCatmullRom.alpha(0.8));

    const area = areaGenerator(points) ?? "";

    return { curvePath: curve, areaPath: area };
  }, [functionType]);

  return (
    <div className="w-[280px] h-[200px] rounded-lg border border-[color:var(--border)] bg-[color:var(--bg-tertiary)] overflow-hidden flex items-center justify-center">
      <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
        <defs>
          <linearGradient
            id="areaGradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor={color} stopOpacity={0.35} />
            <stop offset="100%" stopColor={color} stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <motion.path
          d={areaPath}
          fill="url(#areaGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.1, 0.6, 0.1] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        />
        <motion.path
          d={curvePath}
          fill="none"
          stroke={color}
          strokeWidth={2}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
};

export default AreaUnderCurveAnimation;

