export interface QuizQuestion {
  id: number;
  lessonId: number;
  question: string;
  type: 'multiple-choice' | 'true-false';
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const quizzes: QuizQuestion[] = [
  // Quiz for Lesson 1: What is a Stock?
  {
    id: 1,
    lessonId: 1,
    question: "What does owning a stock mean?",
    type: 'multiple-choice',
    options: [
      "You own a piece of the company",
      "You work for the company",
      "You can control the company",
      "You get free products"
    ],
    correctAnswer: 0,
    explanation: "When you buy a stock, you become a part-owner of that company!"
  },
  {
    id: 2,
    lessonId: 1,
    question: "Companies sell stocks to raise money for their business.",
    type: 'true-false',
    options: ["True", "False"],
    correctAnswer: 0,
    explanation: "Correct! Companies sell stocks to raise capital for growth and expansion."
  },

  // Quiz for Lesson 2: Why Stock Prices Change
  {
    id: 3,
    lessonId: 2,
    question: "Stock prices go up when:",
    type: 'multiple-choice',
    options: [
      "More people want to sell",
      "More people want to buy",
      "The company closes",
      "Nothing happens"
    ],
    correctAnswer: 1,
    explanation: "When demand increases (more buyers), prices rise!"
  },
  {
    id: 4,
    lessonId: 2,
    question: "News and events don't affect stock prices.",
    type: 'true-false',
    options: ["True", "False"],
    correctAnswer: 1,
    explanation: "False! News, events, and company performance greatly affect stock prices."
  },

  // Quiz for Lesson 3: Risk vs Reward
  {
    id: 5,
    lessonId: 3,
    question: "Which investment has higher potential rewards?",
    type: 'multiple-choice',
    options: [
      "Low risk investments",
      "High risk investments",
      "Both are the same",
      "Neither has rewards"
    ],
    correctAnswer: 1,
    explanation: "High risk investments have higher potential rewards, but also bigger potential losses!"
  },
  {
    id: 6,
    lessonId: 3,
    question: "Smart investors only choose high-risk stocks.",
    type: 'true-false',
    options: ["True", "False"],
    correctAnswer: 1,
    explanation: "False! Smart investors balance their portfolio with both high-risk and low-risk investments."
  },

  // Quiz for Lesson 4: Diversification
  {
    id: 7,
    lessonId: 4,
    question: "What is diversification?",
    type: 'multiple-choice',
    options: [
      "Putting all money in one stock",
      "Spreading money across different stocks",
      "Only buying expensive stocks",
      "Selling all your stocks"
    ],
    correctAnswer: 1,
    explanation: "Diversification means spreading your investments to reduce risk!"
  },
  {
    id: 8,
    lessonId: 4,
    question: "Diversification helps protect you from losing everything at once.",
    type: 'true-false',
    options: ["True", "False"],
    correctAnswer: 0,
    explanation: "True! If one stock drops, your other investments can still perform well."
  }
];
