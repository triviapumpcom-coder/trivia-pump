import { create } from 'zustand';
import { persist } from 'zustand/middleware';
export const useAudioStore = create()(persist((set) => ({
    isSoundEnabled: true,
    toggleSound: () => set((state) => ({ isSoundEnabled: !state.isSoundEnabled })),
    enableSound: () => set({ isSoundEnabled: true }),
    disableSound: () => set({ isSoundEnabled: false }),
}), {
    name: 'quiz-audio-settings', // localStorage key
}));
