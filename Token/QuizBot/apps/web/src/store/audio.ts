import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AudioState {
  isSoundEnabled: boolean;
  toggleSound: () => void;
  enableSound: () => void;
  disableSound: () => void;
}

export const useAudioStore = create<AudioState>()(
  persist(
    (set) => ({
      isSoundEnabled: true,
      toggleSound: () => set((state) => ({ isSoundEnabled: !state.isSoundEnabled })),
      enableSound: () => set({ isSoundEnabled: true }),
      disableSound: () => set({ isSoundEnabled: false }),
    }),
    {
      name: 'quiz-audio-settings', // localStorage key
    }
  )
);
