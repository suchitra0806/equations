export type TermType =
  | "variable"
  | "operator"
  | "constant"
  | "greek"
  | "function"
  | "subscript";

export type AnimationHint =
  | "wave_function"
  | "vector_field"
  | "area_under_curve"
  | "exponential_decay"
  | "exponential_growth"
  | "matrix_transform"
  | "oscillator"
  | "probability_distribution"
  | "gradient_descent"
  | "fourier_decomposition"
  | "none";

export type DifficultyLevel = "eli12" | "undergrad" | "expert";

export interface EquationTerm {
  id: string;
  latex: string;
  symbol: string;
  name: string;
  termType: TermType;
  plainEnglish: string;
  units?: string;
  physicalMeaning: string;
  analogy: string;
  animationHint: AnimationHint;
  animationParams?: Record<string, number | string>;
}

export interface EquationExplanation {
  equationName: string;
  equationLatex: string;
  field: string;
  difficulty: DifficultyLevel;
  summary: string;
  terms: EquationTerm[];
  analogy: string;
  realWorldApplication: string;
  famousUse?: string;
}

export interface LibraryEquation {
  id: string;
  name: string;
  latex: string;
  field: string;
  hook: string;
}

