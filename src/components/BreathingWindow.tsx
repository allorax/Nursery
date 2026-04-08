import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Wind } from 'lucide-react';
import { useStore } from '../store';

export default function BreathingWindow({ onClose }: { onClose: () => void }) {
  const [duration, setDuration] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const { addGrowth } = useStore();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      addGrowth(10); // Reward for finishing
      setTimeout(onClose, 2000);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, addGrowth, onClose]);

  const startBreathing = (mins: number) => {
    setDuration(mins * 60);
    setTimeLeft(mins * 60);
    setIsActive(true);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const progress = duration ? (timeLeft / duration) : 1;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 bg-cream/95 backdrop-blur-xl flex flex-col p-8"
    >
      <header className="flex items-center justify-between mb-8">
        <button onClick={onClose} className="p-2 text-ink/40 hover:text-ink/60">
          <X size={24} />
        </button>
        <h2 className="font-serif text-2xl text-ink">Deep Breathing</h2>
        <div className="w-10" />
      </header>

      <div className="flex-1 flex flex-col items-center justify-center">
        {!duration ? (
          <div className="space-y-8 text-center">
            <p className="font-cormorant italic text-xl text-ink/60">Choose your moment of stillness</p>
            <div className="flex gap-4">
              {[1, 3, 5].map((m) => (
                <button
                  key={m}
                  onClick={() => startBreathing(m)}
                  className="w-16 h-16 rounded-2xl bg-white border border-ink/5 shadow-sm hover:border-fern hover:text-fern transition-all flex flex-col items-center justify-center"
                >
                  <span className="text-xl font-serif">{m}</span>
                  <span className="text-[8px] uppercase font-bold tracking-widest">Min</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="relative flex items-center justify-center w-64 h-64">
            {/* Outer Rim - Progress Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                className="text-ink/5"
              />
              <motion.circle
                cx="128"
                cy="128"
                r="120"
                stroke="currentColor"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray={754} // 2 * PI * 120
                animate={{ strokeDashoffset: 754 * (1 - progress) }}
                className="text-fern"
              />
            </svg>

            {/* Breathing Circle */}
            <motion.div
              animate={{
                scale: [1, 1.4, 1],
              }}
              transition={{
                duration: 8, // 4s in, 4s out
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-40 h-40 rounded-full bg-peach flex flex-col items-center justify-center shadow-2xl relative overflow-hidden"
            >
              {/* Honey accent overlay */}
              <div className="absolute inset-0 bg-honey/20 mix-blend-overlay pointer-events-none" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={timeLeft}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-white font-serif text-3xl"
                >
                  {timeLeft > 0 ? formatTime(timeLeft) : "Restored"}
                </motion.div>
              </AnimatePresence>
              
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="text-white/60 text-[10px] uppercase tracking-[0.3em] mt-2"
              >
                {/* Simple breath guide */}
                {timeLeft % 8 < 4 ? "Inhale" : "Exhale"}
              </motion.div>
            </motion.div>
          </div>
        )}
      </div>

      <footer className="mt-auto text-center pb-8">
        <p className="font-cormorant italic text-sm text-ink/40">
          "Breath is the bridge which connects life to consciousness."
        </p>
      </footer>
    </motion.div>
  );
}
