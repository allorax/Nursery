import React from 'react';
import { motion } from 'motion/react';
import { useStore } from '../store';
import Plant from './Plant';
import { ChevronUp } from 'lucide-react';

export default function Home({ onOpenLogging }: { onOpenLogging: () => void }) {
  const { growth } = useStore();
  
  const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date());

  return (
    <div className="flex flex-col h-full px-8 pt-12 pb-8">
      <header className="text-center mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-4xl text-ink mb-2"
        >
          Lotus Sanctuary
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-ink/60 font-medium tracking-widest uppercase text-[10px]"
        >
          Nurturing Mindful Moments
        </motion.p>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center">
        <Plant growth={growth} />
        
        <div className="mt-12 text-center">
          <p className="font-cormorant italic text-xl text-ink/80">
            Your {monthName} Vase ({Math.floor(growth/10)}/12)
          </p>
          <div className="w-48 h-1 bg-ink/5 rounded-full mt-4 overflow-hidden">
            <motion.div 
              className="h-full bg-fern"
              initial={{ width: 0 }}
              animate={{ width: `${growth}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
      </div>

      <motion.button
        onClick={onOpenLogging}
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.95 }}
        className="mt-auto flex flex-col items-center gap-2 text-ink/40 hover:text-ink/60 transition-colors"
      >
        <ChevronUp size={20} className="animate-bounce" />
        <span className="font-cormorant italic text-sm">Swipe up to log a thought</span>
      </motion.button>
    </div>
  );
}
