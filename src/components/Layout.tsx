import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Compass, Flower2, User } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4">
      {/* Mobile Frame */}
      <div className="relative w-full max-w-[400px] h-[800px] bg-cream rounded-[3rem] shadow-2xl overflow-hidden border-[8px] border-ink/5 flex flex-col paper-texture">
        
        {/* Status Bar Area */}
        <div className="h-8 w-full flex items-center justify-center">
          <div className="w-24 h-5 bg-ink/5 rounded-full mt-2" />
        </div>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto no-scrollbar relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Bottom Navigation */}
        <nav className="h-20 bg-cream/80 backdrop-blur-md border-t border-ink/5 flex items-center justify-around px-6 pb-2">
          <NavButton 
            active={activeTab === 'home'} 
            onClick={() => onTabChange('home')}
            icon={<Home size={24} />}
            label="Home"
          />
          <NavButton 
            active={activeTab === 'quests'} 
            onClick={() => onTabChange('quests')}
            icon={<Compass size={24} />}
            label="Quests"
          />
          <NavButton 
            active={activeTab === 'gallery'} 
            onClick={() => onTabChange('gallery')}
            icon={<Flower2 size={24} />}
            label="Gallery"
          />
          <NavButton 
            active={activeTab === 'profile'} 
            onClick={() => onTabChange('profile')}
            icon={<User size={24} />}
            label="Profile"
          />
        </nav>
      </div>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 transition-all duration-300",
        active ? "text-fern scale-110" : "text-ink/40 hover:text-ink/60"
      )}
    >
      <motion.div
        animate={active ? { y: -2 } : { y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {icon}
      </motion.div>
      <span className="text-[10px] font-medium uppercase tracking-widest">{label}</span>
      {active && (
        <motion.div 
          layoutId="nav-dot"
          className="w-1 h-1 bg-fern rounded-full absolute -bottom-1"
        />
      )}
    </button>
  );
}
