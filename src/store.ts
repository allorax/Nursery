import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type QuestLevel = 'Easy' | 'Medium' | 'Hard';

export interface Quest {
  id: string;
  title: string;
  level: QuestLevel;
  reward: number;
  icon: string;
  completed: boolean;
}

export interface Vase {
  id: string;
  month: string;
  plantType: string;
  isKintsugi: boolean;
  date: string;
}

export type ThemeType = 'soft-spring' | 'summer-bliss' | 'calm-monsoon' | 'warm-winter';

interface NurseryState {
  growth: number;
  nutrients: number;
  quests: Quest[];
  gallery: Vase[];
  theme: ThemeType;
  addGrowth: (amount: number) => void;
  addQuest: (quest: Omit<Quest, 'completed'>) => void;
  completeQuest: (id: string) => void;
  addVaseToGallery: (vase: Vase) => void;
  resetGrowth: () => void;
  setTheme: (theme: ThemeType) => void;
}

const INITIAL_QUESTS: Quest[] = [
  { id: '1', title: 'Brew a Cup of Tea', level: 'Easy', reward: 5, icon: '☕', completed: false },
  { id: '2', title: '5-Min Mindful Breathe', level: 'Medium', reward: 15, icon: '🌬️', completed: false },
  { id: '3', title: 'Gentle Walk & Sketch', level: 'Hard', reward: 30, icon: '🎨', completed: false },
];

export const useStore = create<NurseryState>()(
  persist(
    (set) => ({
      growth: 10,
      nutrients: 0,
      quests: INITIAL_QUESTS,
      gallery: [
        { id: 'm1', month: 'March', plantType: 'Lavender', isKintsugi: false, date: '2026-03-31' },
        { id: 'm2', month: 'April', plantType: 'Ferns', isKintsugi: true, date: '2026-04-30' },
      ],
      theme: 'soft-spring',
      addGrowth: (amount) => set((state) => ({ growth: Math.min(state.growth + amount, 100) })),
      addQuest: (quest) => set((state) => ({ 
        quests: [...state.quests, { ...quest, completed: false }] 
      })),
      completeQuest: (id) => set((state) => ({
        quests: state.quests.map(q => q.id === id ? { ...q, completed: true } : q),
        growth: Math.min(state.growth + (state.quests.find(q => q.id === id)?.reward || 0), 100)
      })),
      addVaseToGallery: (vase) => set((state) => ({ gallery: [...state.gallery, vase] })),
      resetGrowth: () => set({ growth: 0 }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'nursery-storage',
    }
  )
);
