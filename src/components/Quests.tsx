import React from 'react';
import { motion } from 'motion/react';
import { useStore, Quest } from '../store';
import { CheckCircle2, Circle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Quests() {
  const { quests, completeQuest } = useStore();

  const handleComplete = (quest: Quest) => {
    if (quest.completed) return;
    
    completeQuest(quest.id);
    
    // Trigger confetti for delight
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#8BA88E', '#D97757', '#FDFCF8']
    });
  };

  return (
    <div className="flex flex-col h-full px-8 pt-12 pb-8 watercolor-bg">
      <header className="text-center mb-10">
        <h2 className="font-serif text-3xl text-ink mb-2">Daily Invitations</h2>
        <p className="text-ink/40 text-xs tracking-widest uppercase">Choose your path to presence</p>
      </header>

      <div className="space-y-4">
        {quests.map((quest, index) => (
          <motion.div
            key={quest.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleComplete(quest)}
            className={`
              relative p-6 rounded-3xl border transition-all cursor-pointer group
              ${quest.completed 
                ? 'bg-sage/10 border-sage/20 opacity-60' 
                : 'bg-white border-ink/5 shadow-sm hover:shadow-md hover:border-sage/30'}
            `}
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl grayscale group-hover:grayscale-0 transition-all">
                {quest.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-tighter text-ink/40">
                    {quest.level} Quest
                  </span>
                  <span className="text-[10px] font-bold text-sage">
                    +{quest.reward} Growth
                  </span>
                </div>
                <h3 className="font-serif text-lg text-ink leading-tight">
                  {quest.title}
                </h3>
              </div>
              <div className={quest.completed ? 'text-sage' : 'text-ink/10'}>
                {quest.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
              </div>
            </div>
            
            {quest.completed && (
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                className="absolute bottom-0 left-0 h-1 bg-sage rounded-full"
                style={{ width: '100%' }}
              />
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-auto p-6 bg-paper/50 rounded-3xl border border-ink/5">
        <p className="font-cormorant italic text-sm text-ink/60 text-center">
          "The forest is not just trees, it is the space between them."
        </p>
      </div>
    </div>
  );
}
