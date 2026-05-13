import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../app/components/ui/button";
import { Progress } from "../app/components/ui/progress";
import { Card } from "../app/components/ui/card";
import { lessons } from "../data/lessonsData";
import { ChevronRight, ChevronLeft, CheckCircle2, BookOpen } from "lucide-react";

interface LearningModulesProps {
  onComplete: () => void;
  onUpdateProgress: (completed: number) => void;
}

export default function LearningModules({ onComplete, onUpdateProgress }: LearningModulesProps) {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());

  const currentLesson = lessons[currentLessonIndex];
  const totalSlides = currentLesson.content.length + (currentLesson.example ? 1 : 0);
  const progress = ((currentLessonIndex + 1) / lessons.length) * 100;

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      // Mark lesson as complete
      const newCompleted = new Set(completedLessons);
      newCompleted.add(currentLesson.id);
      setCompletedLessons(newCompleted);
      onUpdateProgress(newCompleted.size);

      // Move to next lesson or complete
      if (currentLessonIndex < lessons.length - 1) {
        setCurrentLessonIndex(currentLessonIndex + 1);
        setCurrentSlide(0);
      } else {
        onComplete();
      }
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const getLessonIcon = (lessonId: number) => {
    const icons = ["📊", "📈", "⚖️", "🌈"];
    return icons[lessonId - 1] || "📚";
  };

  const renderSlideContent = () => {
    if (currentSlide < currentLesson.content.length) {
      return (
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="text-8xl mb-8"
          >
            {getLessonIcon(currentLesson.id)}
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl text-gray-700 leading-relaxed"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {currentLesson.content[currentSlide]}
          </motion.p>
        </div>
      );
    } else if (currentLesson.example) {
      return (
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="text-6xl mb-6"
          >
            💡
          </motion.div>
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-semibold text-[#6366F1] mb-4"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Example:
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-700 bg-gradient-to-r from-[#6366F1]/10 to-[#A855F7]/10 p-6 rounded-xl border border-[#6366F1]/20"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            {currentLesson.example}
          </motion.p>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-[#EEF2FF] to-[#F8FAFC] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-[#6366F1]" />
            <h1 className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Learning Modules
            </h1>
          </div>
          <div className="mb-2">
            <div className="flex justify-between text-sm text-gray-600 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <span>Progress: {currentLessonIndex + 1} of {lessons.length} lessons</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
        </motion.div>

        {/* Lesson Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLessonIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border-2 border-white/50">
              {/* Lesson Header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="inline-block bg-gradient-to-r from-[#6366F1] to-[#A855F7] text-white px-6 py-2 rounded-full mb-4"
                >
                  <span className="text-sm font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Lesson {currentLesson.id}
                  </span>
                </motion.div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {currentLesson.title}
                </h2>
                <p className="text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {currentLesson.description}
                </p>
              </div>

              {/* Slide Progress */}
              <div className="flex justify-center gap-2 mb-8">
                {Array.from({ length: totalSlides }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentSlide
                        ? 'w-8 bg-gradient-to-r from-[#6366F1] to-[#A855F7]'
                        : idx < currentSlide
                        ? 'w-2 bg-[#34D399]'
                        : 'w-2 bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="min-h-[300px] flex items-center justify-center"
                >
                  {renderSlideContent()}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-8">
                <Button
                  onClick={handlePrevious}
                  disabled={currentSlide === 0}
                  variant="outline"
                  className="rounded-xl"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Previous
                </Button>

                <Button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-[#6366F1] to-[#A855F7] hover:from-[#5558E3] hover:to-[#9745E8] text-white rounded-xl"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {currentSlide === totalSlides - 1 ? (
                    currentLessonIndex === lessons.length - 1 ? (
                      <>
                        Complete <CheckCircle2 className="w-5 h-5 ml-2" />
                      </>
                    ) : (
                      <>
                        Next Lesson <ChevronRight className="w-5 h-5 ml-2" />
                      </>
                    )
                  ) : (
                    <>
                      Next <ChevronRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Lessons Overview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {lessons.map((lesson, idx) => (
            <div
              key={lesson.id}
              className={`p-4 rounded-xl text-center transition-all ${
                completedLessons.has(lesson.id)
                  ? 'bg-[#34D399]/20 border-2 border-[#34D399]'
                  : idx === currentLessonIndex
                  ? 'bg-[#6366F1]/20 border-2 border-[#6366F1]'
                  : 'bg-white/50 border-2 border-gray-200'
              }`}
            >
              <div className="text-2xl mb-2">{getLessonIcon(lesson.id)}</div>
              <p className="text-xs font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {lesson.title}
              </p>
              {completedLessons.has(lesson.id) && (
                <CheckCircle2 className="w-4 h-4 text-[#34D399] mx-auto mt-2" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
