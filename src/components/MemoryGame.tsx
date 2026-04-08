import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

// Simple Audio Synthesizer for Marimba-like notes
const playNote = (frequency: number) => {
  const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);

  gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.5);
};

const NOTES = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
const COLORS = ['bg-fennel', 'bg-pistachio', 'bg-peony', 'bg-peach'];

export default function MemoryGame({ onClose }: { onClose: () => void }) {
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameOver'>('idle');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const startNewGame = () => {
    const firstNote = Math.floor(Math.random() * 4);
    setSequence([firstNote]);
    setUserSequence([]);
    setGameState('playing');
    showSequence([firstNote]);
  };

  const showSequence = async (seq: number[]) => {
    setIsShowingSequence(true);
    for (let i = 0; i < seq.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setActiveIndex(seq[i]);
      playNote(NOTES[seq[i]]);
      await new Promise(resolve => setTimeout(resolve, 400));
      setActiveIndex(null);
    }
    setIsShowingSequence(false);
  };

  const handleTileClick = (index: number) => {
    if (isShowingSequence || gameState !== 'playing') return;

    playNote(NOTES[index]);
    const newUserSequence = [...userSequence, index];
    setUserSequence(newUserSequence);

    if (index !== sequence[newUserSequence.length - 1]) {
      setGameState('gameOver');
      return;
    }

    if (newUserSequence.length === sequence.length) {
      if (sequence.length % 5 === 0) {
        confetti({ particleCount: 50, spread: 60, colors: ['#768E78', '#FCAC83'] });
      }
      
      const nextSequence = [...sequence, Math.floor(Math.random() * 4)];
      setSequence(nextSequence);
      setUserSequence([]);
      setTimeout(() => showSequence(nextSequence), 1000);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="absolute inset-0 z-50 bg-cream paper-texture flex flex-col p-8"
    >
      <header className="flex items-center justify-between mb-8">
        <button onClick={onClose} className="p-2 text-ink/40 hover:text-ink/60">
          <X size={24} />
        </button>
        <div className="text-center">
          <h2 className="font-serif text-2xl text-ink">Memory Garden</h2>
          <p className="text-[10px] font-bold uppercase tracking-widest text-ink/40">Score: {sequence.length > 0 ? sequence.length - 1 : 0}</p>
        </div>
        <div className="w-10" />
      </header>

      <div className="flex-1 flex flex-col items-center justify-center">
        {gameState === 'idle' ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startNewGame}
            className="flex flex-col items-center gap-4 group"
          >
            <div className="w-24 h-24 rounded-full bg-fern/20 flex items-center justify-center text-fern group-hover:bg-fern group-hover:text-white transition-all">
              <Play size={40} fill="currentColor" />
            </div>
            <span className="font-serif text-xl text-ink">Begin the Melody</span>
          </motion.button>
        ) : (
          <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
            {COLORS.map((color, i) => (
              <motion.button
                key={i}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleTileClick(i)}
                className={`
                  aspect-square rounded-3xl border-4 transition-all duration-200
                  ${color} 
                  ${activeIndex === i ? 'border-fern scale-105 shadow-lg brightness-110' : 'border-ink/5'}
                  ${gameState === 'gameOver' ? 'opacity-50 grayscale' : ''}
                `}
              />
            ))}
          </div>
        )}

        {gameState === 'gameOver' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 text-center"
          >
            <p className="font-serif text-2xl text-peony mb-4">The melody faded...</p>
            <button 
              onClick={startNewGame}
              className="flex items-center gap-2 px-6 py-3 bg-fern text-white rounded-full font-medium shadow-lg hover:bg-fern transition-all"
            >
              <RotateCcw size={18} />
              Try Again
            </button>
          </motion.div>
        )}
      </div>

      <footer className="mt-auto text-center pb-4">
        <p className="font-cormorant italic text-sm text-ink/40">
          Listen closely to the rhythm of the garden.
        </p>
      </footer>
    </motion.div>
  );
}
