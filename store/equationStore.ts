import { create } from "zustand";
import type {
  DifficultyLevel,
  EquationExplanation,
} from "@/lib/types";

export interface EquationState {
  difficulty: DifficultyLevel;
  currentResult: EquationExplanation | null;
  history: EquationExplanation[];
  activeTermId: string | null;
  isLoading: boolean;
  setDifficulty: (difficulty: DifficultyLevel) => void;
  setResult: (result: EquationExplanation) => void;
  setActiveTermId: (termId: string | null) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

export const useEquationStore = create<EquationState>((set) => ({
  difficulty: "eli12",
  currentResult: null,
  history: [],
  activeTermId: null,
  isLoading: false,
  setDifficulty: (difficulty) =>
    set(() => ({
      difficulty,
    })),
  setResult: (result) =>
    set((state) => ({
      currentResult: result,
      history: [result, ...state.history].slice(0, 20),
      activeTermId:
        result.terms.length > 0 ? result.terms[0]?.id ?? null : null,
    })),
  setLoading: (loading) =>
    set(() => ({
      isLoading: loading,
    })),
  setActiveTermId: (termId) =>
    set(() => ({
      activeTermId: termId,
    })),
  reset: () =>
    set(() => ({
      currentResult: null,
      history: [],
      activeTermId: null,
      difficulty: "eli12",
      isLoading: false,
    })),
}));

