import { useEffect } from "react";
import { motion } from "motion/react";
import { Button } from "../app/components/ui/button";
import { Card } from "../app/components/ui/card";
import { Badge } from "../app/components/ui/badge";
import { Trophy, Award, TrendingUp, Star, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";

interface ResultScreenProps {
  quizScore: number;
  xpEarned: number;
  portfolioValue: number;
  achievements: string[];
  onPlayAgain: () => void;
}

export default function ResultScreen({
  quizScore,
  xpEarned,
  portfolioValue,
  achievements,
  onPlayAgain
}: ResultScreenProps) {

  const totalXP = xpEarned + (achievements.length * 50);
  const profitLoss = portfolioValue - 10000;
  const profitPercentage = ((profitLoss / 10000) * 100).toFixed(1);

  const getInvestorPersonality = () => {
    if (achievements.includes("Diversification Master")) {
      return {
        title: "Smart Diversifier 🌈",
        description: "You spread your investments wisely across multiple companies!",
        color: "from-[#6366F1] to-[#A855F7]"
      };
    } else if (profitLoss > 2000) {
      return {
        title: "Risk Taker 🚀",
        description: "You took bold risks and they paid off!",
        color: "from-[#FB7185] to-[#F43F5E]"
      };
    } else if (profitLoss > 0) {
      return {
        title: "Long-Term Thinker 📈",
        description: "Steady and smart - you made consistent gains!",
        color: "from-[#34D399] to-[#10B981]"
      };
    } else {
      return {
        title: "Learning Investor 📚",
        description: "Every investor starts somewhere - you're learning valuable lessons!",
        color: "from-[#FBBF24] to-[#F59E0B]"
      };
    }
  };

  const personality = getInvestorPersonality();

  useEffect(() => {
    // Trigger celebration confetti
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#6366F1', '#A855F7', '#34D399', '#FBBF24']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#6366F1', '#A855F7', '#34D399', '#FBBF24']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-[#FEF3F2] to-[#F0FDF4] p-6 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="text-8xl mb-4">🎉</div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#6366F1] via-[#A855F7] to-[#6366F1] bg-clip-text text-transparent mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Congratulations!
          </h1>
          <p className="text-xl text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
            You've completed the StockVille experience! 🚀
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 text-center bg-gradient-to-br from-[#6366F1] to-[#A855F7] text-white">
              <Star className="w-8 h-8 mx-auto mb-3 fill-white" />
              <p className="text-sm opacity-90 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Total XP Earned</p>
              <p className="text-4xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>{totalXP}</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 text-center bg-gradient-to-br from-[#34D399] to-[#10B981] text-white">
              <TrendingUp className="w-8 h-8 mx-auto mb-3" />
              <p className="text-sm opacity-90 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Portfolio Value</p>
              <p className="text-4xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>₹{portfolioValue.toLocaleString()}</p>
              <p className="text-sm mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {profitLoss >= 0 ? '+' : ''}{profitPercentage}%
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6 text-center bg-gradient-to-br from-[#FBBF24] to-[#F59E0B] text-white">
              <Trophy className="w-8 h-8 mx-auto mb-3" />
              <p className="text-sm opacity-90 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Quiz Score</p>
              <p className="text-4xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>{quizScore}/8</p>
              <p className="text-sm mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {Math.round((quizScore / 8) * 100)}% Correct
              </p>
            </Card>
          </motion.div>
        </div>

        {/* Investor Personality */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <Card className={`p-8 text-center bg-gradient-to-r ${personality.color} text-white`}>
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Your Investor Personality
            </h2>
            <h3 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {personality.title}
            </h3>
            <p className="text-lg opacity-90" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {personality.description}
            </p>
          </Card>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <Card className="p-6 bg-white/70 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-7 h-7 text-[#FBBF24]" />
              <h3 className="text-2xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Achievements Unlocked
              </h3>
            </div>

            {achievements.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + idx * 0.1 }}
                    className="flex items-center gap-3 bg-gradient-to-r from-[#FBBF24]/20 to-[#F59E0B]/20 p-4 rounded-xl border-2 border-[#FBBF24]"
                  >
                    <span className="text-3xl">🏆</span>
                    <div>
                      <p className="font-semibold text-gray-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {achievement}
                      </p>
                      <p className="text-xs text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        +50 XP
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  No achievements yet - try to diversify your investments next time!
                </p>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Key Learnings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-8"
        >
          <Card className="p-6 bg-white/70 backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              📚 What You Learned
            </h3>
            <ul className="space-y-3">
              {[
                "Stocks represent ownership in companies",
                "Stock prices change based on supply, demand, and news",
                "Diversification helps reduce investment risk",
                "Higher risk investments can lead to higher rewards (or losses)",
              ].map((learning, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + idx * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <Badge className="bg-[#34D399] text-white mt-1 flex-shrink-0">✓</Badge>
                  <span className="text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {learning}
                  </span>
                </motion.li>
              ))}
            </ul>
          </Card>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center"
        >
          <Button
            onClick={onPlayAgain}
            className="bg-gradient-to-r from-[#6366F1] to-[#A855F7] hover:from-[#5558E3] hover:to-[#9745E8] text-white px-12 py-6 rounded-xl text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Play Again
          </Button>

          <p className="text-sm text-gray-600 mt-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Ready to improve your investing skills? Start a new game!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
