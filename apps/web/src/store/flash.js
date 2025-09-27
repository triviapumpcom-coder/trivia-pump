import { create } from "zustand";
export const useFlashStore = create((set, get) => ({
    flashes: { A: 0, B: 0, C: 0, D: 0 },
    addFlash: (choice) => {
        const { flashes } = get();
        // Add flash intensity (max 1.0)
        const newIntensity = Math.min(flashes[choice] + 0.3, 1.0);
        set({
            flashes: {
                ...flashes,
                [choice]: newIntensity
            }
        });
        // Gradually fade out the flash
        const fadeOut = () => {
            const currentFlashes = get().flashes;
            const currentIntensity = currentFlashes[choice];
            if (currentIntensity > 0) {
                const newIntensity = Math.max(currentIntensity - 0.05, 0);
                set({
                    flashes: {
                        ...currentFlashes,
                        [choice]: newIntensity
                    }
                });
                // Continue fading if still visible
                if (newIntensity > 0) {
                    setTimeout(fadeOut, 50); // 50ms intervals for smooth fade
                }
            }
        };
        // Start fade out after a brief delay
        setTimeout(fadeOut, 100);
    },
    clearFlashes: () => {
        set({ flashes: { A: 0, B: 0, C: 0, D: 0 } });
    },
}));
