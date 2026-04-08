import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send } from 'lucide-react';
import { useStore } from '../store';

export default function Logging({ onClose }: { onClose: () => void }) {
  const [text, setText] = useState('');
  const [isFolding, setIsFolding] = useState(false);
  const { addGrowth } = useStore();

  const handleRelease = () => {
    if (!text.trim()) return;
    
    setIsFolding(true);
    
    // Simulate the ritual
    setTimeout(() => {
      addGrowth(2); // Small reward for logging
      onClose();
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="absolute inset-0 z-50 bg-paper paper-texture flex flex-col p-8"
    >
      <header className="flex items-center justify-between mb-12">
        <button onClick={onClose} className="p-2 text-ink/40 hover:text-ink/60">
          <X size={24} />
        </button>
        <h2 className="font-serif text-xl text-ink">Fold & Release</h2>
        <div className="w-10" /> {/* Spacer */}
      </header>

      <div className="flex-1 flex flex-col items-center justify-center">
        <AnimatePresence>
          {!isFolding ? (
            <motion.div 
              key="paper"
              exit={{ 
                scale: 0.1, 
                rotateX: 90, 
                rotateY: 45,
                opacity: 0,
                y: -200
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="w-full max-w-xs aspect-square bg-white shadow-xl p-8 flex flex-col border border-ink/5 relative"
            >
              {/* Paper Lines */}
              <div className="absolute inset-0 opacity-5 pointer-events-none" 
                   style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px)', backgroundSize: '100% 2rem' }} />
              
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What's on your mind? Write it here, then release it to the garden..."
                className="flex-1 bg-transparent border-none outline-none resize-none font-cormorant text-lg text-ink/80 leading-relaxed z-10"
              />
              
              <motion.button
                onClick={handleRelease}
                disabled={!text.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  mt-4 self-end p-4 rounded-full transition-colors
                  ${text.trim() ? 'bg-sage text-white shadow-lg' : 'bg-ink/5 text-ink/20'}
                `}
              >
                <Send size={20} />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="releasing"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.2, 0], opacity: [1, 1, 0], y: [0, -100, -300] }}
              className="flex flex-col items-center gap-4"
            >
              <div className="w-4 h-4 bg-sage rounded-full animate-ping" />
              <p className="font-cormorant italic text-sage text-xl">Releasing...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className="mt-auto text-center pb-8">
        <p className="text-ink/30 text-[10px] uppercase tracking-[0.2em]">
          Your thoughts nourish your growth
        </p>
      </footer>
    </motion.div>
  );
}
