import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../app/components/ui/button";
import { Card } from "../app/components/ui/card";
import { Badge } from "../app/components/ui/badge";
import { Progress } from "../app/components/ui/progress";
import { stocks as initialStocks, marketEvents, Stock } from "../data/stocksData";
import { TrendingUp, TrendingDown, Wallet, Award, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

interface SimulationGameProps {
  onComplete: (portfolioValue: number, achievements: string[]) => void;
}

interface Portfolio {
  [stockId: number]: number; // stockId -> quantity
}

export default function SimulationGame({ onComplete }: SimulationGameProps) {
  const [money, setMoney] = useState(10000);
  const [stocks, setStocks] = useState(initialStocks);
  const [portfolio, setPortfolio] = useState<Portfolio>({});
  const [eventQueue, setEventQueue] = useState<number[]>([]);
  const [currentEvent, setCurrentEvent] = useState<typeof marketEvents[0] | null>(null);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [roundsPlayed, setRoundsPlayed] = useState(0);

  const portfolioValue = stocks.reduce((total, stock) => {
    const quantity = portfolio[stock.id] || 0;
    return total + (stock.currentPrice * quantity);
  }, 0);

  const totalValue = money + portfolioValue;

  // Trigger random market events
  useEffect(() => {
    const interval = setInterval(() => {
      if (roundsPlayed < 10) {
        triggerMarketEvent();
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [roundsPlayed, stocks]);

  const triggerMarketEvent = () => {
    const randomEvent = marketEvents[Math.floor(Math.random() * marketEvents.length)];
    setCurrentEvent(randomEvent);

    // Update stock price
    setStocks(prevStocks =>
      prevStocks.map(stock => {
        if (stock.id === randomEvent.stockId) {
          const newPrice = stock.currentPrice * (1 + randomEvent.priceChange / 100);
          return { ...stock, currentPrice: Math.round(newPrice) };
        }
        return stock;
      })
    );

    // Add small random fluctuations to other stocks
    setStocks(prevStocks =>
      prevStocks.map(stock => {
        if (stock.id !== randomEvent.stockId) {
          const randomChange = (Math.random() - 0.5) * 4; // -2% to +2%
          const newPrice = stock.currentPrice * (1 + randomChange / 100);
          return { ...stock, currentPrice: Math.max(50, Math.round(newPrice)) };
        }
        return stock;
      })
    );

    setRoundsPlayed(r => r + 1);

    // Hide event after 5 seconds
    setTimeout(() => setCurrentEvent(null), 5000);
  };

  const buyStock = (stock: Stock) => {
    if (money >= stock.currentPrice) {
      setMoney(money - stock.currentPrice);
      setPortfolio(prev => ({
        ...prev,
        [stock.id]: (prev[stock.id] || 0) + 1
      }));

      toast.success(`Bought 1 share of ${stock.name} for ₹${stock.currentPrice}`, {
        description: "Great investment choice! 📈"
      });

      // Check achievements
      checkAchievements();
    } else {
      toast.error("Not enough money!", {
        description: "You need more funds to buy this stock."
      });
    }
  };

  const sellStock = (stock: Stock) => {
    const quantity = portfolio[stock.id] || 0;
    if (quantity > 0) {
      setMoney(money + stock.currentPrice);
      setPortfolio(prev => ({
        ...prev,
        [stock.id]: quantity - 1
      }));

      toast.success(`Sold 1 share of ${stock.name} for ₹${stock.currentPrice}`, {
        description: "Smart move! 💰"
      });
    } else {
      toast.error("You don't own this stock!", {
        description: "Buy some shares first."
      });
    }
  };

  const checkAchievements = () => {
    const newAchievements = [...achievements];

    // First Investor
    if (Object.keys(portfolio).length > 0 && !achievements.includes("First Investor")) {
      newAchievements.push("First Investor");
      toast("🏆 Achievement Unlocked!", {
        description: "First Investor - Made your first purchase!"
      });
    }

    // Diversification Master
    const diversificationCount = Object.values(portfolio).filter(q => q > 0).length;
    if (diversificationCount >= 3 && !achievements.includes("Diversification Master")) {
      newAchievements.push("Diversification Master");
      toast("🏆 Achievement Unlocked!", {
        description: "Diversification Master - Invested in 3+ companies!"
      });
    }

    setAchievements(newAchievements);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-[#34D399] text-white';
      case 'medium': return 'bg-[#FBBF24] text-white';
      case 'high': return 'bg-[#FB7185] text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getPriceChangeColor = (stock: Stock) => {
    const change = stock.currentPrice - stock.initialPrice;
    if (change > 0) return 'text-[#34D399]';
    if (change < 0) return 'text-[#FB7185]';
    return 'text-gray-500';
  };

  const getPriceChange = (stock: Stock) => {
    const change = stock.currentPrice - stock.initialPrice;
    const percentage = ((change / stock.initialPrice) * 100).toFixed(1);
    return { change, percentage };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-[#F0FDF4] to-[#F8FAFC] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Stock Market Simulation 📊
              </h1>
              <p className="text-gray-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Invest wisely and grow your portfolio!
              </p>
            </div>

            <div className="flex gap-4">
              <Card className="px-6 py-3 bg-gradient-to-r from-[#34D399] to-[#10B981] text-white">
                <div className="flex items-center gap-2">
                  <Wallet className="w-5 h-5" />
                  <div>
                    <p className="text-xs opacity-90" style={{ fontFamily: 'Poppins, sans-serif' }}>Cash</p>
                    <p className="text-xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>₹{money.toLocaleString()}</p>
                  </div>
                </div>
              </Card>

              <Card className="px-6 py-3 bg-gradient-to-r from-[#6366F1] to-[#A855F7] text-white">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  <div>
                    <p className="text-xs opacity-90" style={{ fontFamily: 'Poppins, sans-serif' }}>Total Value</p>
                    <p className="text-xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>₹{totalValue.toLocaleString()}</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </motion.div>

        {/* Market Event Notification */}
        <AnimatePresence>
          {currentEvent && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              className="mb-6"
            >
              <Card className={`p-4 ${currentEvent.type === 'positive' ? 'bg-[#34D399]/10 border-[#34D399]' : 'bg-[#FB7185]/10 border-[#FB7185]'} border-2`}>
                <div className="flex items-center gap-3">
                  {currentEvent.type === 'positive' ? (
                    <TrendingUp className="w-6 h-6 text-[#34D399]" />
                  ) : (
                    <TrendingDown className="w-6 h-6 text-[#FB7185]" />
                  )}
                  <p className="font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Market News: {currentEvent.message}
                  </p>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stocks.map((stock, idx) => {
            const { change, percentage } = getPriceChange(stock);
            const owned = portfolio[stock.id] || 0;

            return (
              <motion.div
                key={stock.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-6 hover:shadow-xl transition-all duration-300 bg-white/70 backdrop-blur-sm border-2 border-white/50">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-4xl mb-2">{stock.icon}</div>
                      <h3 className="font-bold text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {stock.name}
                      </h3>
                      <p className="text-xs text-gray-500" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {stock.symbol}
                      </p>
                    </div>
                    <Badge className={getRiskColor(stock.riskLevel)}>
                      {stock.riskLevel}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {stock.industry}
                  </p>

                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        ₹{stock.currentPrice}
                      </p>
                      <p className={`text-sm font-semibold ${getPriceChangeColor(stock)}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                        {change >= 0 ? '+' : ''}{percentage}%
                      </p>
                    </div>
                    {owned > 0 && (
                      <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        You own: {owned} share{owned > 1 ? 's' : ''}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => buyStock(stock)}
                      className="flex-1 bg-gradient-to-r from-[#34D399] to-[#10B981] hover:from-[#2DD492] hover:to-[#0FA974] text-white"
                      size="sm"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      Buy
                    </Button>
                    <Button
                      onClick={() => sellStock(stock)}
                      variant="outline"
                      className="flex-1"
                      size="sm"
                      disabled={owned === 0}
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      Sell
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Achievements & Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Achievements */}
          <Card className="p-6 bg-white/70 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-6 h-6 text-[#FBBF24]" />
              <h3 className="text-xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Achievements
              </h3>
            </div>
            <div className="space-y-2">
              {achievements.length > 0 ? (
                achievements.map((achievement, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 bg-gradient-to-r from-[#FBBF24]/20 to-[#F59E0B]/20 p-3 rounded-lg"
                  >
                    <span className="text-2xl">🏆</span>
                    <span className="font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {achievement}
                    </span>
                  </motion.div>
                ))
              ) : (
                <p className="text-gray-500" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Start investing to unlock achievements!
                </p>
              )}
            </div>
          </Card>

          {/* Progress & Actions */}
          <Card className="p-6 bg-white/70 backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Game Progress
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <span>Market Events</span>
                  <span>{roundsPlayed}/10</span>
                </div>
                <Progress value={(roundsPlayed / 10) * 100} className="h-2" />
              </div>

              <div className="pt-4">
                <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {roundsPlayed < 5
                    ? "Keep investing and watch the market evolve!"
                    : roundsPlayed < 10
                    ? "You're doing great! Almost ready to see results."
                    : "Market simulation complete! Ready to see your results?"}
                </p>
                <Button
                  onClick={() => onComplete(totalValue, achievements)}
                  disabled={roundsPlayed < 10}
                  className="w-full bg-gradient-to-r from-[#6366F1] to-[#A855F7] hover:from-[#5558E3] hover:to-[#9745E8] text-white"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {roundsPlayed < 10 ? 'Keep Playing...' : 'View Results 🎉'}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
