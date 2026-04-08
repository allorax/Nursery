import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore, Quest } from '../store';
import { CheckCircle2, Circle, Plus, LayoutGrid, Wind } from 'lucide-react';
import confetti from 'canvas-confetti';
import MemoryGame from './MemoryGame';
import BreathingWindow from './BreathingWindow';

export default function Quests() {
  const { quests, completeQuest, addQuest } = useStore();
  const [isMemoryOpen, setIsMemoryOpen] = useState(false);
  const [isBreathingOpen, setIsBreathingOpen] = useState(false);

  const handleComplete = (quest: Quest) => {
    if (quest.completed) return;
    
    completeQuest(quest.id);
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#768E78', '#FCAC83', '#EBDEC0']
    });
  };

  const handleAddEntry = () => {
    const randomQuests = [
      { title: 'Water your plants', level: 'Easy', reward: 5, icon: '🪴' },
      { title: 'Listen to birds', level: 'Easy', reward: 5, icon: '🐦' },
      { title: 'Stretch for 2 mins', level: 'Medium', reward: 10, icon: '🧘' },
      { title: 'Read a poem', level: 'Medium', reward: 10, icon: '📖' },
      { title: 'Organize a drawer', level: 'Hard', reward: 20, icon: '🧹' },
    ];
    const random = randomQuests[Math.floor(Math.random() * randomQuests.length)];
    addQuest({
      id: Math.random().toString(36).substr(2, 9),
      ...random as any
    });
  };

  return (
    <div className="flex flex-col h-full px-8 pt-12 pb-24 watercolor-bg relative">
      <header className="text-center mb-10">
        <h2 className="font-serif text-3xl text-ink mb-2">Daily Invitations</h2>
        <p className="text-ink/40 text-xs tracking-widest uppercase">Choose your path to presence</p>
      </header>

      <div className="space-y-4 overflow-y-auto no-scrollbar pb-4">
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
                ? 'bg-fern/10 border-fern/20 opacity-60' 
                : 'bg-white border-ink/5 shadow-sm hover:shadow-md hover:border-fern/30'}
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
                  <span className="text-[10px] font-bold text-fern">
                    +{quest.reward} Growth
                  </span>
                </div>
                <h3 className="font-serif text-lg text-ink leading-tight">
                  {quest.title}
                </h3>
              </div>
              <div className={quest.completed ? 'text-fern' : 'text-ink/10'}>
                {quest.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
              </div>
            </div>
            
            {quest.completed && (
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                className="absolute bottom-0 left-0 h-1 bg-fern rounded-full"
                style={{ width: '100%' }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Bottom Action Bar */}
      <div className="absolute bottom-6 left-8 right-8 flex items-center justify-between">
        {/* Breathing Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsBreathingOpen(true)}
          className="w-14 h-14 rounded-full bg-peony shadow-lg flex items-center justify-center text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-peach/20 mix-blend-overlay" />
          <Wind size={24} />
        </motion.button>

        {/* Add Entry Button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleAddEntry}
          className="w-16 h-16 rounded-full bg-fern shadow-xl flex items-center justify-center text-white"
        >
          <Plus size={32} />
        </motion.button>

        {/* Memory Game Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMemoryOpen(true)}
          className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-ink/60"
        >
          <LayoutGrid size={24} />
        </motion.button>
      </div>

      {/* Overlays */}
      <AnimatePresence>
        {isMemoryOpen && (
          <MemoryGame onClose={() => setIsMemoryOpen(false)} />
        )}
        {isBreathingOpen && (
          <BreathingWindow onClose={() => setIsBreathingOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
