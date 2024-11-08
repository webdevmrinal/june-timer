import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { LampContainer } from "@/components/ui/lamp-container";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface Quote {
  content: string;
  author: string;
}

const TARGET_DATE = new Date("2025-06-10T00:00:00");
const START_DATE = new Date("2024-11-01T00:00:00");
const TOTAL_TIME = TARGET_DATE.getTime() - START_DATE.getTime();

const quotes: Quote[] = [
  {
    content: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    content: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  },
  {
    content: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius"
  },
  {
    content: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    content: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    content: "Strive not to be a success, but rather to be of value.",
    author: "Albert Einstein"
  },
  {
    content: "The only limit to our realization of tomorrow will be our doubts of today.",
    author: "Franklin D. Roosevelt"
  },
  {
    content: "Do what you can, with what you have, where you are.",
    author: "Theodore Roosevelt"
  },
  {
    content: "Everything you've ever wanted is on the other side of fear.",
    author: "George Addair"
  },
  {
    content: "Success is not how high you have climbed, but how you make a positive difference to the world.",
    author: "Roy T. Bennett"
  }
];

function App() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [progress, setProgress] = useState(0);
  const [quote, setQuote] = useState<Quote>(quotes[0]);

  useEffect(() => {
    const getRandomQuote = () => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
    };

    getRandomQuote();
    const quoteInterval = setInterval(getRandomQuote, 60000);

    return () => clearInterval(quoteInterval);
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = TARGET_DATE.getTime() - new Date().getTime();
      const timeRemaining = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };

      setTimeLeft(timeRemaining);

      const now = new Date().getTime();
      const elapsed = now - START_DATE.getTime();
      const progressPercentage = (elapsed / TOTAL_TIME) * 100;
      setProgress(Math.min(100, Math.max(0, progressPercentage)));
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden bg-background">
      <LampContainer>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="w-[90vw] max-w-3xl mx-auto px-4"
        >
          <Card className="bg-black/30 backdrop-blur-md border-neutral-800 shadow-xl min-h-[40vh] flex items-center justify-center">
            <div className="w-full p-6 sm:p-8 flex flex-col items-center justify-center space-y-6">
              <motion.h1
                className="text-xl sm:text-3xl font-light bg-gradient-to-br from-slate-200 to-slate-400 py-2 bg-clip-text text-transparent text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                Time Until June 10, 2025
              </motion.h1>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full max-w-xl">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <motion.div
                    key={unit}
                    className="flex flex-col items-center"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="countdown-number text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-cyan-300 to-cyan-600">
                      {value.toString().padStart(2, "0")}
                    </span>
                    <span className="text-xs sm:text-sm text-neutral-400 capitalize mt-1">
                      {unit}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="progress-wrapper w-full max-w-lg">
                <Progress value={progress} className="h-1.5" />
              </div>
              <p className="text-xs text-neutral-400 text-center">
                {progress.toFixed(1)}% completed
              </p>

              <motion.div
                className="mt-6 text-center w-full max-w-xl min-h-[60px] flex flex-col items-center justify-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-sm text-neutral-300 italic px-4">
                  {quote.content}
                </p>
                <p className="text-xs text-neutral-500 mt-2">
                  — {quote.author}
                </p>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </LampContainer>
    </div>
  );
}

export default App;