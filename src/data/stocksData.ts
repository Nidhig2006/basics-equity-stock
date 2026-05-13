export interface Stock {
  id: number;
  name: string;
  symbol: string;
  currentPrice: number;
  initialPrice: number;
  riskLevel: 'low' | 'medium' | 'high';
  description: string;
  industry: string;
  icon: string;
}

export interface MarketEvent {
  id: number;
  stockId: number;
  message: string;
  priceChange: number; // percentage
  type: 'positive' | 'negative';
}

export const stocks: Stock[] = [
  {
    id: 1,
    name: "GameForge",
    symbol: "GAME",
    currentPrice: 150,
    initialPrice: 150,
    riskLevel: 'high',
    description: "Leading gaming company developing VR consoles and next-gen games",
    industry: "Gaming & Entertainment",
    icon: "🎮"
  },
  {
    id: 2,
    name: "EcoRide",
    symbol: "ECO",
    currentPrice: 200,
    initialPrice: 200,
    riskLevel: 'medium',
    description: "Electric vehicle manufacturer focused on sustainable transportation",
    industry: "Automotive & Green Tech",
    icon: "🚗"
  },
  {
    id: 3,
    name: "FunBite",
    symbol: "FOOD",
    currentPrice: 100,
    initialPrice: 100,
    riskLevel: 'low',
    description: "Popular food delivery and restaurant chain with steady growth",
    industry: "Food & Delivery",
    icon: "🍔"
  },
  {
    id: 4,
    name: "SkyTech",
    symbol: "SKY",
    currentPrice: 250,
    initialPrice: 250,
    riskLevel: 'high',
    description: "Innovative aerospace and satellite communication company",
    industry: "Aerospace & Technology",
    icon: "🚀"
  }
];

export const marketEvents: MarketEvent[] = [
  // GameForge Events
  {
    id: 1,
    stockId: 1,
    message: "GameForge launched a revolutionary VR console! 🎮📈",
    priceChange: 15,
    type: 'positive'
  },
  {
    id: 2,
    stockId: 1,
    message: "GameForge's latest game received poor reviews 😞📉",
    priceChange: -12,
    type: 'negative'
  },
  {
    id: 3,
    stockId: 1,
    message: "GameForge announced partnership with major gaming platform! 🤝",
    priceChange: 10,
    type: 'positive'
  },

  // EcoRide Events
  {
    id: 4,
    stockId: 2,
    message: "EcoRide factory faced production delays 🏭📉",
    priceChange: -8,
    type: 'negative'
  },
  {
    id: 5,
    stockId: 2,
    message: "EcoRide won government green energy contract! 🌱📈",
    priceChange: 12,
    type: 'positive'
  },
  {
    id: 6,
    stockId: 2,
    message: "EcoRide's new electric model breaks sales records! ⚡",
    priceChange: 14,
    type: 'positive'
  },

  // FunBite Events
  {
    id: 7,
    stockId: 3,
    message: "FunBite opened 50 new locations nationwide! 🍕📈",
    priceChange: 7,
    type: 'positive'
  },
  {
    id: 8,
    stockId: 3,
    message: "Food safety concerns at FunBite locations 😷📉",
    priceChange: -10,
    type: 'negative'
  },
  {
    id: 9,
    stockId: 3,
    message: "FunBite introduces healthy menu options! 🥗",
    priceChange: 5,
    type: 'positive'
  },

  // SkyTech Events
  {
    id: 10,
    stockId: 4,
    message: "SkyTech successfully launched new satellite! 🛰️📈",
    priceChange: 18,
    type: 'positive'
  },
  {
    id: 11,
    stockId: 4,
    message: "SkyTech rocket test failed during launch 🚀📉",
    priceChange: -15,
    type: 'negative'
  },
  {
    id: 12,
    stockId: 4,
    message: "SkyTech secured $500M investment round! 💰",
    priceChange: 20,
    type: 'positive'
  }
];
