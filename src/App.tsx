import React, { useState } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import Quests from './components/Quests';
import Gallery from './components/Gallery';
import Logging from './components/Logging';
import { AnimatePresence } from 'motion/react';
import { Settings, Shield, Bell, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoggingOpen, setIsLoggingOpen] = useState(false);

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
  return (
    <div className="flex flex-col h-full px-8 pt-12 pb-8 watercolor-bg">
      <header className="flex flex-col items-center mb-10">
        <div className="w-24 h-24 rounded-full bg-sage/20 border-4 border-white shadow-sm flex items-center justify-center mb-4">
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
              <p className="text-2xl font-serif text-sage">12</p>
              <p className="text-[10px] text-ink/40 uppercase">Vases Collected</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-ink/5">
              <p className="text-2xl font-serif text-terracotta">42</p>
              <p className="text-[10px] text-ink/40 uppercase">Mindful Days</p>
            </div>
          </div>
        </section>

        <section className="space-y-2">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-ink/30 mb-4">Preferences</h3>
          <ProfileItem icon={<Bell size={18} />} label="Daily Invitations" value="9:00 AM" />
          <ProfileItem icon={<Shield size={18} />} label="Privacy & Security" />
          <ProfileItem icon={<Heart size={18} />} label="Support Nursery" />
          <ProfileItem icon={<Settings size={18} />} label="Settings" />
        </section>
      </div>

      <div className="mt-auto text-center">
        <p className="text-[10px] text-ink/20 uppercase tracking-widest">Version 1.0.4 • Made with Love</p>
      </div>
    </div>
  );
}

function ProfileItem({ icon, label, value }: { icon: React.ReactNode, label: string, value?: string }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white/50 rounded-2xl border border-ink/5 hover:bg-white transition-colors cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="text-ink/40">{icon}</div>
        <span className="text-sm font-medium text-ink/70">{label}</span>
      </div>
      {value && <span className="text-xs text-sage font-bold">{value}</span>}
    </div>
  );
}
