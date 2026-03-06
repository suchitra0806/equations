import type { ComponentType } from "react";
import type { AnimationHint } from "./types";
import WaveAnimation from "@/components/animations/WaveAnimation";
import VectorFieldAnimation from "@/components/animations/VectorFieldAnimation";
import AreaUnderCurveAnimation from "@/components/animations/AreaUnderCurveAnimation";
import ExponentialAnimation from "@/components/animations/ExponentialAnimation";
import MatrixTransformAnimation from "@/components/animations/MatrixTransformAnimation";
import OscillatorAnimation from "@/components/animations/OscillatorAnimation";
import ProbabilityDistributionAnimation from "@/components/animations/ProbabilityDistributionAnimation";
import FallbackDiagram from "@/components/animations/FallbackDiagram";

export interface AnimationComponentProps {
  color: string;
  animationParams?: Record<string, number | string>;
}

export const ANIMATION_COMPONENTS: Record<
  AnimationHint,
  ComponentType<AnimationComponentProps>
> = {
  wave_function: WaveAnimation,
  vector_field: VectorFieldAnimation,
  area_under_curve: AreaUnderCurveAnimation,
  exponential_decay: ExponentialAnimation,
  exponential_growth: ExponentialAnimation,
  matrix_transform: MatrixTransformAnimation,
  oscillator: OscillatorAnimation,
  probability_distribution: ProbabilityDistributionAnimation,
  gradient_descent: VectorFieldAnimation,
  fourier_decomposition: AreaUnderCurveAnimation,
  none: FallbackDiagram,
};

