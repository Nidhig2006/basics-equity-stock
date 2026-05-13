import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../app/components/ui/button";
import { Card } from "../app/components/ui/card";
import { Progress } from "../app/components/ui/progress";
import { quizzes } from "../data/quizzesData";
import { CheckCircle2, XCircle, Star, Trophy } from "lucide-react";
import confetti from "canvas-confetti";

interface QuizSectionProps {
  onComplete: (score: number, xp: number) => void;
}

export default function QuizSection({ onComplete }: QuizSectionProps) {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);

  const currentQuiz = quizzes[currentQuizIndex];
  const progress = ((currentQuizIndex + 1) / quizzes.length) * 100;
  const isCorrect = selectedAnswer === currentQuiz.correctAnswer;

  const handleAnswerSelect = (index: number) => {
    if (!showFeedback) {
      setSelectedAnswer(index);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      setShowFeedback(true);
      setAnsweredQuestions(answeredQuestions + 1);

      if (isCorrect) {
        setScore(score + 1);
        // Trigger confetti for correct answers
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handleNext = () => {
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      // Quiz complete
      const finalScore = score + (isCorrect ? 1 : 0);
      const xpEarned = finalScore * 10;

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      setTimeout(() => {
        onComplete(finalScore, xpEarned);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-[#FEF3F2] to-[#F8FAFC] p-6 flex items-center justify-center">
      <div className="max-w-3xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-[#FBBF24]" />
            <h1 className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Knowledge Quiz
            </h1>
          </div>
          <div className="mb-2">
            <div className="flex justify-between text-sm text-gray-600 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <span>Question {currentQuizIndex + 1} of {quizzes.length}</span>
              <span className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#FBBF24] fill-[#FBBF24]" />
                Score: {score}/{answeredQuestions}
              </span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
        </motion.div>

        {/* Quiz Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuizIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border-2 border-white/50">
              {/* Question */}
              <div className="mb-8">
                <div className="inline-block bg-gradient-to-r from-[#6366F1] to-[#A855F7] text-white px-4 py-1 rounded-full text-sm mb-4">
                  {currentQuiz.type === 'multiple-choice' ? 'Multiple Choice' : 'True or False'}
                </div>
                <h2 className="text-2xl font-semibold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {currentQuiz.question}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-4 mb-8">
                {currentQuiz.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isThisCorrect = index === currentQuiz.correctAnswer;

                  let buttonClass = "w-full p-4 rounded-xl text-left transition-all duration-300 border-2 ";

                  if (showFeedback) {
                    if (isThisCorrect) {
                      buttonClass += "bg-[#34D399]/20 border-[#34D399] text-gray-800";
                    } else if (isSelected && !isCorrect) {
                      buttonClass += "bg-[#FB7185]/20 border-[#FB7185] text-gray-800";
                    } else {
                      buttonClass += "bg-gray-100 border-gray-200 text-gray-500";
                    }
                  } else {
                    if (isSelected) {
                      buttonClass += "bg-[#6366F1]/20 border-[#6366F1] text-gray-800";
                    } else {
                      buttonClass += "bg-white border-gray-200 text-gray-700 hover:border-[#6366F1] hover:bg-[#6366F1]/5";
                    }
                  }

                  return (
                    <motion.button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={buttonClass}
                      whileHover={!showFeedback ? { scale: 1.02 } : {}}
                      whileTap={!showFeedback ? { scale: 0.98 } : {}}
                      disabled={showFeedback}
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{option}</span>
                        {showFeedback && isThisCorrect && (
                          <CheckCircle2 className="w-6 h-6 text-[#34D399]" />
                        )}
                        {showFeedback && isSelected && !isCorrect && (
                          <XCircle className="w-6 h-6 text-[#FB7185]" />
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Feedback */}
              <AnimatePresence>
                {showFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`p-4 rounded-xl mb-6 ${
                      isCorrect
                        ? 'bg-[#34D399]/10 border-2 border-[#34D399]'
                        : 'bg-[#FB7185]/10 border-2 border-[#FB7185]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle2 className="w-6 h-6 text-[#34D399] flex-shrink-0 mt-1" />
                      ) : (
                        <XCircle className="w-6 h-6 text-[#FB7185] flex-shrink-0 mt-1" />
                      )}
                      <div>
                        <h3 className="font-semibold mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {isCorrect ? '🎉 Correct! Great job!' : '😊 Not quite right'}
                        </h3>
                        <p className="text-sm text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {currentQuiz.explanation}
                        </p>
                        {isCorrect && (
                          <div className="mt-2 inline-flex items-center gap-2 bg-[#FBBF24]/20 px-3 py-1 rounded-full">
                            <Star className="w-4 h-4 text-[#FBBF24] fill-[#FBBF24]" />
                            <span className="text-sm font-medium text-gray-700">+10 XP</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="flex justify-end gap-4">
                {!showFeedback ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={selectedAnswer === null}
                    className="bg-gradient-to-r from-[#6366F1] to-[#A855F7] hover:from-[#5558E3] hover:to-[#9745E8] text-white rounded-xl px-8"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    className="bg-gradient-to-r from-[#6366F1] to-[#A855F7] hover:from-[#5558E3] hover:to-[#9745E8] text-white rounded-xl px-8"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {currentQuizIndex === quizzes.length - 1 ? 'Complete Quiz' : 'Next Question'} →
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Encouraging Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6"
        >
          <p className="text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {currentQuizIndex < 2 ? "You're doing great! Keep it up! 💪" :
             currentQuizIndex < 5 ? "Awesome progress! You're learning fast! 🌟" :
             "Almost there! Finish strong! 🚀"}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
