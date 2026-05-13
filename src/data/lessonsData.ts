export interface Lesson {
  id: number;
  title: string;
  description: string;
  content: string[];
  example?: string;
  animationUrl?: string;
}

export const lessons: Lesson[] = [
  {
    id: 1,
    title: "What is a Stock?",
    description: "Learn the basics of stocks and ownership",
    content: [
      "A stock is like owning a small piece of a company! 🎯",
      "When you buy a stock, you become a part-owner of that company.",
      "Companies sell stocks to raise money for growing their business.",
    ],
    example: "If GameForge has 100 stocks and you own 1, you own 1% of the company!",
    animationUrl: "stock-basics"
  },
  {
    id: 2,
    title: "Why Stock Prices Change",
    description: "Understand how supply and demand work",
    content: [
      "Stock prices go up ⬆️ when more people want to buy them.",
      "Stock prices go down ⬇️ when more people want to sell them.",
      "News, events, and company performance affect stock prices daily.",
    ],
    example: "If GameForge releases a hit game, more people want their stock, so the price increases!",
    animationUrl: "price-changes"
  },
  {
    id: 3,
    title: "Risk vs Reward",
    description: "Learn about balancing safety and growth",
    content: [
      "Higher risk = Higher potential rewards (but also bigger losses) ⚡",
      "Lower risk = Safer investments (but smaller gains) 🛡️",
      "Smart investors balance their portfolio with both types.",
    ],
    example: "A new startup (high risk) might grow 10x, while a stable company (low risk) grows steadily.",
    animationUrl: "risk-reward"
  },
  {
    id: 4,
    title: "Diversification",
    description: "Don't put all your eggs in one basket",
    content: [
      "Diversification means spreading your money across different stocks. 🌈",
      "If one stock drops, others might still do well!",
      "This protects you from losing everything at once.",
    ],
    example: "Instead of investing ₹10,000 in just GameForge, split it between GameForge, EcoRide, and SkyTech!",
    animationUrl: "diversification"
  }
];
