import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PlantProps {
  growth: number; // 0 to 100
}

export default function Plant({ growth }: PlantProps) {
  const scale = 0.5 + (growth / 100) * 0.5;
  const height = 40 + (growth / 100) * 120;
  
  return (
    <div className="relative flex flex-col items-center justify-end h-64 w-full">
      {/* The Plant */}
      <div className="absolute bottom-16 flex flex-col items-center">
        {/* Stem */}
        <motion.div 
          className="w-1.5 bg-fern rounded-full origin-bottom"
          animate={{ height: height }}
          transition={{ type: "spring", stiffness: 50, damping: 15 }}
        >
          {/* Leaves/Flowers based on growth */}
          <AnimatePresence>
            {growth > 20 && (
              <Leaf side="left" top="70%" delay={0.2} />
            )}
            {growth > 40 && (
              <Leaf side="right" top="50%" delay={0.4} />
            )}
            {growth > 60 && (
              <Leaf side="left" top="30%" delay={0.6} />
            )}
            {growth > 80 && (
              <Flower top="-10px" />
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* The Vase */}
      <div className="relative z-10">
        <VaseSVG />
      </div>
    </div>
  );
}

function Leaf({ side, top, delay }: { side: 'left' | 'right', top: string, delay: number }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`absolute w-6 h-4 bg-pistachio rounded-full ${side === 'left' ? '-left-5 -rotate-45' : '-right-5 rotate-45'}`}
      style={{ top }}
      transition={{ delay, type: "spring" }}
    />
  );
}

function Flower({ top }: { top: string }) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -45 }}
      animate={{ scale: 1, rotate: 0 }}
      className="absolute w-10 h-10 bg-peony rounded-full -left-4 flex items-center justify-center"
      style={{ top }}
    >
      <div className="w-4 h-4 bg-honey rounded-full blur-[1px]" />
      {/* Petals */}
      {[0, 72, 144, 216, 288].map((deg) => (
        <div 
          key={deg}
          className="absolute w-6 h-4 bg-peony rounded-full origin-center"
          style={{ transform: `rotate(${deg}deg) translateX(12px)` }}
        />
      ))}
    </motion.div>
  );
}

function VaseSVG() {
  return (
    <svg width="100" height="120" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 110C20 115.523 24.4772 120 30 120H70C75.5228 120 80 115.523 80 110V90C80 70 95 60 95 40C95 20 80 0 50 0C20 0 5 20 5 40C5 60 20 70 20 90V110Z" fill="#FCAC83" fillOpacity="0.9"/>
      <path d="M50 10C30 10 15 25 15 40C15 50 25 55 25 70V110H75V70C75 55 85 50 85 40C85 25 70 10 50 10Z" fill="white" fillOpacity="0.1"/>
      {/* Texture lines */}
      <path d="M30 100H70" stroke="black" strokeOpacity="0.05" strokeWidth="2" strokeLinecap="round"/>
      <path d="M35 110H65" stroke="black" strokeOpacity="0.05" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
