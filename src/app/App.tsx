import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import LandingPage from "../pages/LandingPage";
import LearningModules from "../pages/LearningModules";
import QuizSection from "../pages/QuizSection";
import SimulationGame from "../pages/SimulationGame";
import ResultScreen from "../pages/ResultScreen";
import { Toaster } from "./components/ui/sonner";

type AppState = 'landing' | 'learning' | 'quiz' | 'simulation' | 'results';

interface GameData {
  lessonsCompleted: number;
  quizScore: number;
  xpEarned: number;
  portfolioValue: number;
  achievements: string[];
}

export default function App() {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [gameData, setGameData] = useState<GameData>({
    lessonsCompleted: 0,
    quizScore: 0,
    xpEarned: 0,
    portfolioValue: 10000,
    achievements: []
  });

  const handleStartLearning = () => {
    setCurrentState('learning');
  };

  const handlePlayDemo = () => {
    setCurrentState('simulation');
  };

  const handleLearningComplete = () => {
    setCurrentState('quiz');
  };

  const handleUpdateProgress = (completed: number) => {
    setGameData(prev => ({ ...prev, lessonsCompleted: completed }));
  };

  const handleQuizComplete = (score: number, xp: number) => {
    setGameData(prev => ({
      ...prev,
      quizScore: score,
      xpEarned: xp
    }));
    setCurrentState('simulation');
  };

  const handleSimulationComplete = (portfolioValue: number, achievements: string[]) => {
    setGameData(prev => ({
      ...prev,
      portfolioValue,
      achievements
    }));
    setCurrentState('results');
  };

  const handlePlayAgain = () => {
    setGameData({
      lessonsCompleted: 0,
      quizScore: 0,
      xpEarned: 0,
      portfolioValue: 10000,
      achievements: []
    });
    setCurrentState('landing');
  };

  const renderCurrentState = () => {
    switch (currentState) {
      case 'landing':
        return (
          <LandingPage
            onStartLearning={handleStartLearning}
            onPlayDemo={handlePlayDemo}
          />
        );

      case 'learning':
        return (
          <LearningModules
            onComplete={handleLearningComplete}
            onUpdateProgress={handleUpdateProgress}
          />
        );

      case 'quiz':
        return (
          <QuizSection
            onComplete={handleQuizComplete}
          />
        );

      case 'simulation':
        return (
          <SimulationGame
            onComplete={handleSimulationComplete}
          />
        );

      case 'results':
        return (
          <ResultScreen
            quizScore={gameData.quizScore}
            xpEarned={gameData.xpEarned}
            portfolioValue={gameData.portfolioValue}
            achievements={gameData.achievements}
            onPlayAgain={handlePlayAgain}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="min-h-screen w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentState}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderCurrentState()}
          </motion.div>
        </AnimatePresence>
      </div>
      <Toaster position="top-center" richColors />
    </>
  );
}
