import { motion } from "motion/react";
import { Button } from "../app/components/ui/button";
import { TrendingUp, Sparkles, BarChart3, Target } from "lucide-react";

interface LandingPageProps {
  onStartLearning: () => void;
  onPlayDemo: () => void;
}

export default function LandingPage({ onStartLearning, onPlayDemo }: LandingPageProps) {
  const floatingIcons = [
    { Icon: TrendingUp, delay: 0, x: -20, y: -30 },
    { Icon: Sparkles, delay: 0.2, x: 20, y: -20 },
    { Icon: BarChart3, delay: 0.4, x: -30, y: 20 },
    { Icon: Target, delay: 0.6, x: 30, y: 30 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-[#EEF2FF] to-[#F8FAFC] flex items-center justify-center p-6 overflow-hidden relative">
      {/* Floating Icons Background */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingIcons.map(({ Icon, delay, x, y }, idx) => (
          <motion.div
            key={idx}
            className="absolute text-[#6366F1]/10"
            style={{
              left: `${20 + idx * 20}%`,
              top: `${20 + idx * 15}%`,
            }}
            animate={{
              x: [0, x, 0],
              y: [0, y, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 4,
              delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Icon className="w-16 h-16" />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full text-center relative z-10"
      >
        {/* Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="inline-block mb-6"
        >
          <div className="bg-gradient-to-r from-[#6366F1] to-[#A855F7] text-white px-6 py-2 rounded-full inline-flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Educational Finance Game</span>
          </div>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#6366F1] via-[#A855F7] to-[#6366F1] bg-clip-text text-transparent leading-tight"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Learn the Stock Market
          <br />
          by Playing
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Master stock market basics through interactive lessons, fun quizzes, and a realistic trading simulation.
          Perfect for students aged 11-16! 🎯
        </motion.p>

        {/* Illustration Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-12 relative"
        >
          <div className="w-64 h-64 mx-auto bg-gradient-to-br from-[#6366F1]/20 to-[#A855F7]/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/50">
            <div className="text-8xl">📈</div>
          </div>

          {/* Orbiting Elements */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-80 h-80"
            style={{ marginLeft: '-10rem', marginTop: '-10rem' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-0 left-1/2 -ml-6 w-12 h-12 bg-[#34D399] rounded-full flex items-center justify-center text-2xl">
              💰
            </div>
          </motion.div>

          <motion.div
            className="absolute top-1/2 left-1/2 w-80 h-80"
            style={{ marginLeft: '-10rem', marginTop: '-10rem' }}
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute bottom-0 left-1/2 -ml-6 w-12 h-12 bg-[#FBBF24] rounded-full flex items-center justify-center text-2xl">
              🎯
            </div>
          </motion.div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={onStartLearning}
            className="bg-gradient-to-r from-[#6366F1] to-[#A855F7] hover:from-[#5558E3] hover:to-[#9745E8] text-white px-8 py-6 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Start Learning 🚀
          </Button>

          <Button
            onClick={onPlayDemo}
            variant="outline"
            className="px-8 py-6 rounded-xl text-lg border-2 border-[#6366F1] text-[#6366F1] hover:bg-[#6366F1]/10 transition-all duration-300"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Play Demo 🎮
          </Button>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { icon: "📚", title: "Interactive Lessons", desc: "Learn with animations" },
            { icon: "🎯", title: "Fun Quizzes", desc: "Test your knowledge" },
            { icon: "💼", title: "Trading Game", desc: "Practice investing" }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
