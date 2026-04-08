import React from 'react';
import { motion } from 'motion/react';
import { useStore } from '../store';
import { Sparkles } from 'lucide-react';

export default function Gallery() {
  const { gallery } = useStore();

  return (
    <div className="flex flex-col h-full px-8 pt-12 pb-8 bg-sage-dark/10">
      <header className="text-center mb-10">
        <h2 className="font-serif text-3xl text-ink mb-2">The Botanical Gallery</h2>
        <p className="text-ink/40 text-xs tracking-widest uppercase">Your chronicle of growth</p>
      </header>

      <div className="grid grid-cols-2 gap-6">
        {gallery.map((vase, index) => (
          <motion.div
            key={vase.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center"
          >
            <div className={`
              relative w-full aspect-[3/4] rounded-3xl p-4 flex flex-col items-center justify-end
              ${vase.isKintsugi ? 'bg-ink/5' : 'bg-white shadow-sm'}
              border border-ink/5
            `}>
              {vase.isKintsugi && (
                <div className="absolute top-3 right-3 text-terracotta">
                  <Sparkles size={14} />
                </div>
              )}
              
              <div className="mb-4 transform scale-75 origin-bottom">
                <MiniVase plantType={vase.plantType} isKintsugi={vase.isKintsugi} />
              </div>

              <div className="text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-ink/40 mb-1">
                  {vase.month}
                </p>
                <p className="font-serif text-xs text-ink/80">
                  {vase.plantType} Vase
                </p>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Placeholder for current month */}
        <div className="flex flex-col items-center opacity-40">
          <div className="w-full aspect-[3/4] rounded-3xl border-2 border-dashed border-ink/10 flex items-center justify-center">
            <p className="font-cormorant italic text-xs">Growing...</p>
          </div>
        </div>
      </div>

      {/* Wooden Shelf Visual */}
      <div className="mt-8 h-4 w-full bg-[#5D4037] rounded-full shadow-lg border-b-4 border-black/20" />
    </div>
  );
}

function MiniVase({ plantType, isKintsugi }: { plantType: string, isKintsugi: boolean }) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Stylized Plant */}
      <div className="mb-[-10px] flex flex-col items-center">
        <div className="w-1 h-12 bg-sage-dark rounded-full" />
        <div className="absolute top-0 w-6 h-6 bg-sage/40 rounded-full blur-[2px]" />
      </div>
      {/* Vase */}
      <div className={`w-12 h-16 rounded-t-full rounded-b-xl relative overflow-hidden ${isKintsugi ? 'bg-slate-400' : 'bg-terracotta'}`}>
        {isKintsugi && (
          <div className="absolute inset-0">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 20 L40 50 L20 80 M60 0 L80 40 L50 100" stroke="#FFD700" strokeWidth="2" fill="none" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
