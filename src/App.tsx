import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import Quests from './components/Quests';
import Gallery from './components/Gallery';
import Logging from './components/Logging';
import { AnimatePresence, motion } from 'motion/react';
import { Settings, Shield, Bell, Heart, Palette, ChevronRight, Check } from 'lucide-react';
import { useStore, ThemeType } from './store';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoggingOpen, setIsLoggingOpen] = useState(false);
  const { theme } = useStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home onOpenLogging={() => setIsLoggingOpen(true)} />;
      case 'quests':
        return <Quests />;
      case 'gallery':
        return <Gallery />;
      case 'profile':
        return <Profile />;
      default:
        return <Home onOpenLogging={() => setIsLoggingOpen(true)} />;
    }
  };

  return (
    <div className="relative">
      <Layout activeTab={activeTab} onTabChange={setActiveTab}>
        {renderContent()}
      </Layout>

      <AnimatePresence>
        {isLoggingOpen && (
          <Logging onClose={() => setIsLoggingOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function Profile() {
  const [view, setView] = useState<'main' | 'settings'>('main');

  return (
    <AnimatePresence mode="wait">
      {view === 'main' ? (
        <motion.div 
          key="profile-main"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="flex flex-col h-full px-8 pt-12 pb-8 watercolor-bg"
        >
          <header className="flex flex-col items-center mb-10">
            <div className="w-24 h-24 rounded-full bg-fern/20 border-4 border-white shadow-sm flex items-center justify-center mb-4">
              <span className="text-3xl">🌿</span>
            </div>
            <h2 className="font-serif text-2xl text-ink">Gardener Halim</h2>
            <p className="text-ink/40 text-[10px] tracking-widest uppercase mt-1">Level 4 Mindful Soul</p>
          </header>

          <div className="space-y-6">
            <section>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-ink/30 mb-4">Garden Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-ink/5">
                  <p className="text-2xl font-serif text-fern">12</p>
                  <p className="text-[10px] text-ink/40 uppercase">Vases Collected</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-ink/5">
                  <p className="text-2xl font-serif text-peach">42</p>
                  <p className="text-[10px] text-ink/40 uppercase">Mindful Days</p>
                </div>
              </div>
            </section>

            <section className="space-y-2">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-ink/30 mb-4">Preferences</h3>
              <ProfileItem icon={<Bell size={18} />} label="Daily Invitations" value="9:00 AM" />
              <ProfileItem icon={<Palette size={18} />} label="Theme & Aesthetic" onClick={() => setView('settings')} />
              <ProfileItem icon={<Shield size={18} />} label="Privacy & Security" />
              <ProfileItem icon={<Settings size={18} />} label="Settings" />
            </section>
          </div>

          <div className="mt-auto text-center">
            <p className="text-[10px] text-ink/20 uppercase tracking-widest">Version 1.0.4 • Made with Love</p>
          </div>
        </motion.div>
      ) : (
        <SettingsView onBack={() => setView('main')} />
      )}
    </AnimatePresence>
  );
}

function SettingsView({ onBack }: { onBack: () => void }) {
  const { theme, setTheme } = useStore();

  const themes: { id: ThemeType; name: string; colors: string[] }[] = [
    { id: 'soft-spring', name: 'Soft Spring', colors: ['#768E78', '#C6C09C', '#EBDEC0', '#E79897', '#FCAC83', '#FCC88A'] },
    { id: 'summer-bliss', name: 'Summer Bliss', colors: ['#ABC270', '#FEC868', '#FDA769', '#473C33'] },
    { id: 'calm-monsoon', name: 'Calm Monsoon', colors: ['#407D6C', '#8BA1AD', '#B5C7CC', '#244C66', '#587B89', '#7DB290'] },
    { id: 'warm-winter', name: 'Warm Winter', colors: ['#2B4E43', '#D7CABD', '#E6E0D2', '#590411', '#956451', '#9FBACD'] },
  ];

  return (
    <motion.div 
      key="profile-settings"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col h-full px-8 pt-12 pb-8 bg-paper paper-texture"
    >
      <header className="flex items-center gap-4 mb-10">
        <button onClick={onBack} className="p-2 text-ink/40 hover:text-ink/60">
          <ChevronRight className="rotate-180" size={24} />
        </button>
        <h2 className="font-serif text-2xl text-ink">Theme Settings</h2>
      </header>

      <div className="space-y-4">
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={`
              w-full p-6 rounded-3xl border transition-all text-left
              ${theme === t.id ? 'bg-white border-fern shadow-md' : 'bg-white/50 border-ink/5 hover:bg-white'}
            `}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-serif text-lg text-ink">{t.name}</span>
              {theme === t.id && <Check size={20} className="text-fern" />}
            </div>
            <div className="flex gap-2">
              {t.colors.map((c, i) => (
                <div 
                  key={i} 
                  className="w-6 h-6 rounded-full border border-ink/5" 
                  style={{ backgroundColor: c }} 
                />
              ))}
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

function ProfileItem({ icon, label, value, onClick }: { icon: React.ReactNode, label: string, value?: string, onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="flex items-center justify-between p-4 bg-white/50 rounded-2xl border border-ink/5 hover:bg-white transition-colors cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <div className="text-ink/40">{icon}</div>
        <span className="text-sm font-medium text-ink/70">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {value && <span className="text-xs text-fern font-bold">{value}</span>}
        <ChevronRight size={16} className="text-ink/20" />
      </div>
    </div>
  );
}
