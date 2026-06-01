import { createContext, useContext, useState, type ReactNode } from 'react';

interface GameState {
  score: number;
  currentStep: number;
  totalSteps: number;
  incrementScore: (by?: number) => void;
  setStep: (step: number) => void;
  reset: () => void;
}

const GameContext = createContext<GameState | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [score, setScore] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 5;

  const incrementScore = (by = 1) => setScore((s) => s + by);
  const reset = () => { setScore(0); setCurrentStep(0); };

  return (
    <GameContext.Provider value={{ score, currentStep, totalSteps, incrementScore, setStep: setCurrentStep, reset }}>
      {children}
    </GameContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
