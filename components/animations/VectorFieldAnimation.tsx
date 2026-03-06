"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

interface AnimationProps {
  color: string;
  animationParams?: Record<string, number | string>;
}

const WIDTH = 280;
const HEIGHT = 200;

const VectorFieldAnimation: React.FC<AnimationProps> = ({
  color,
  animationParams,
}) => {
  const fieldType =
    typeof animationParams?.fieldType === "string"
      ? animationParams.fieldType
      : "gradient";

  const arrows = useMemo(() => {
    const cols = 8;
    const rows = 6;
    const cellWidth = WIDTH / cols;
    const cellHeight = HEIGHT / rows;
    const result: { x: number; y: number; angle: number }[] = [];

    for (let i = 0; i < cols; i += 1) {
      for (let j = 0; j < rows; j += 1) {
        const x = (i + 0.5) * cellWidth;
        const y = (j + 0.5) * cellHeight;
        let angle = 0;

        if (fieldType === "curl") {
          angle = Math.atan2(y - HEIGHT / 2, x - WIDTH / 2) + Math.PI / 2;
        } else if (fieldType === "divergence") {
          angle = Math.atan2(y - HEIGHT / 2, x - WIDTH / 2);
        } else {
          angle = (x / WIDTH) * Math.PI;
        }

        result.push({ x, y, angle });
      }
    }

    return result;
  }, [fieldType]);

  return (
    <div className="w-[280px] h-[200px] rounded-lg border border-[color:var(--border)] bg-[color:var(--bg-tertiary)] overflow-hidden flex items-center justify-center">
      <svg width={WIDTH} height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
        <motion.g
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
          style={{ originX: "50%", originY: "50%" }}
        >
          {arrows.map((arrow) => (
            <g
              key={`${arrow.x}-${arrow.y}`}
              transform={`translate(${arrow.x}, ${arrow.y}) rotate(${(arrow.angle * 180) / Math.PI})`}
            >
              <line
                x1={-10}
                y1={0}
                x2={10}
                y2={0}
                stroke={color}
                strokeWidth={1.2}
                strokeLinecap="round"
                opacity={0.8}
              />
              <polygon
                points="10,0 5,-3 5,3"
                fill={color}
                opacity={0.9}
              />
            </g>
          ))}
        </motion.g>
      </svg>
    </div>
  );
};

export default VectorFieldAnimation;

