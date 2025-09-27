import { create } from "zustand";

export interface BackgroundItem {
  type: 'gradient' | 'image';
  value: string;
  name: string;
}

export interface BackgroundState {
  currentBackground: number;
  backgrounds: BackgroundItem[];
  queue: number[];
  isProcessingQueue: boolean;
  queueTimer: NodeJS.Timeout | null;
  resetTimer: NodeJS.Timeout | null;
  setBackground: (index: number) => void;
  addToQueue: (index: number) => void;
  processQueue: () => void;
  clearQueue: () => void;
  startQueueProcessor: () => void;
  stopQueueProcessor: () => void;
  processOnRoundStart: () => void;
}

// Background list - Gradient and Image alternating
const BACKGROUNDS: BackgroundItem[] = [
  // 1. Gradient - Deep Space Blue
  {
    type: 'gradient',
    value: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 25%, #2a2a5a 50%, #3a3a7a 100%)',
    name: '🌌 Deep Space'
  },
  
  // 2. Image - Local Background 1
  {
    type: 'image', 
    value: '/backgrounds/1.jpg',
    name: '🖼️ Background 1'
  },
  
  // 3. Gradient - Nebula Blue
  {
    type: 'gradient',
    value: 'linear-gradient(135deg, #0d1421 0%, #1a2332 25%, #2d3748 50%, #4a5568 100%)',
    name: '🌌 Nebula Blue'
  },
  
  // 4. Image - Local Background 2
  {
    type: 'image',
    value: '/backgrounds/2.jpg',
    name: '🖼️ Background 2'
  },
  
  // 5. Gradient - Cosmic Blue
  {
    type: 'gradient',
    value: 'linear-gradient(135deg, #1a202c 0%, #2d3748 25%, #4a5568 50%, #718096 100%)',
    name: '🌌 Cosmic Blue'
  },
  
  // 6. Image - Local Background 3
  {
    type: 'image',
    value: '/backgrounds/3.jpg',
    name: '🖼️ Background 3'
  },
  
  // 7. Gradient - Stellar Blue
  {
    type: 'gradient',
    value: 'linear-gradient(135deg, #1e2a3a 0%, #2c3e50 25%, #34495e 50%, #5d6d7e 100%)',
    name: '🌌 Stellar Blue'
  },
  
  // 8. Image - Local Background 4
  {
    type: 'image',
    value: '/backgrounds/4.jpg',
    name: '🖼️ Background 4'
  },
  
  // 9. Gradient - Galaxy Blue
  {
    type: 'gradient',
    value: 'linear-gradient(135deg, #0f1419 0%, #1a252f 25%, #2c3e50 50%, #34495e 100%)',
    name: '🌌 Galaxy Blue'
  },
  
  // 10. Image - Local Background 5
  {
    type: 'image',
    value: '/backgrounds/5.jpg',
    name: '🖼️ Background 5'
  },
  
  // 11. Gradient - Midnight Blue
  {
    type: 'gradient',
    value: 'linear-gradient(135deg, #191970 0%, #1e3a8a 25%, #1d4ed8 50%, #3b82f6 100%)',
    name: '🌌 Midnight Blue'
  },
  
  // 12. Gradient - Astral Blue
  {
    type: 'gradient',
    value: 'linear-gradient(135deg, #0c1426 0%, #1e293b 25%, #334155 50%, #475569 100%)',
    name: '🌌 Astral Blue'
  },
  
  // 13. Gradient - Void Blue
  {
    type: 'gradient',
    value: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #64748b 100%)',
    name: '🌌 Void Blue'
  },
  
  // 14. Gradient - Interstellar Blue
  {
    type: 'gradient',
    value: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 25%, #3730a3 50%, #4338ca 100%)',
    name: '🌌 Interstellar'
  }
  
  // Example for local image themes:
  /*
  {
    type: 'image',
    value: '/backgrounds/custom-space.jpg',
    name: '🚀 Custom Space'
  }
  */
];

export const useBackgroundStore = create<BackgroundState>((set, get) => ({
  currentBackground: 0,
  backgrounds: BACKGROUNDS,
  queue: [],
  isProcessingQueue: false,
  queueTimer: null,
  resetTimer: null,
  
  setBackground: (index: number) => {
    const { backgrounds } = get();
    if (index >= 0 && index < backgrounds.length) {
      set({ currentBackground: index });
    }
  },
  
  addToQueue: (index: number) => {
    const { backgrounds, queue, currentBackground } = get();
    console.log('[Background] Adding to queue:', index, backgrounds[index]?.name);
    console.log('[Background] Current:', currentBackground, 'Queue length:', queue.length);
    
    if (index >= 0 && index < backgrounds.length) {
      // Check if this theme is already in queue or is current
      if (index === currentBackground) {
        console.log('[Background] Skipping - theme is already current');
        return;
      }
      
      if (queue.includes(index)) {
        console.log('[Background] Skipping - theme is already in queue');
        return;
      }
      
      const newQueue = [...queue, index];
      set({ queue: newQueue });
      
      console.log('[Background] Queue updated:', newQueue.length, 'items');
      console.log('[Background] Queue contents:', newQueue.map(i => backgrounds[i]?.name));
      
      // Start queue processor if not already running
      const { isProcessingQueue } = get();
      if (!isProcessingQueue) {
        console.log('[Background] Starting queue processor');
        get().startQueueProcessor();
      } else {
        console.log('[Background] Queue processor already running');
      }
    }
  },
  
  processQueue: () => {
    const { queue, backgrounds } = get();
    console.log('[Background] Processing queue:', queue.length, 'items');
    
    if (queue.length > 0) {
      const nextIndex = queue[0];
      const remainingQueue = queue.slice(1);
      
      console.log('[Background] Changing to:', nextIndex, backgrounds[nextIndex]?.name);
      
      set({ 
        currentBackground: nextIndex,
        queue: remainingQueue 
      });
      
      // If queue is empty, stop processor
      if (remainingQueue.length === 0) {
        console.log('[Background] Queue empty, stopping processor');
        get().stopQueueProcessor();
      }
    } else {
      console.log('[Background] Queue is empty, nothing to process');
    }
  },
  
  clearQueue: () => {
    set({ queue: [] });
    get().stopQueueProcessor();
  },
  
  startQueueProcessor: () => {
    const { queueTimer, resetTimer } = get();
    
    console.log('[Background] Starting queue processor...');
    
    // Clear existing timers
    if (queueTimer) {
      console.log('[Background] Clearing existing queue timer');
      clearInterval(queueTimer);
    }
    if (resetTimer) {
      console.log('[Background] Clearing existing reset timer');
      clearTimeout(resetTimer);
    }
    
    // Process first item immediately
    console.log('[Background] Processing first item immediately');
    get().processQueue();
    
    // Note: We don't set up automatic timers anymore
    // Background changes will be triggered by round events
    
    // Reset queue after 2 minutes (longer timeout for round-based system)
    const newResetTimer = setTimeout(() => {
      console.log('[Background] 2 minute timeout - clearing queue');
      get().clearQueue();
    }, 120000);
    
    set({ 
      isProcessingQueue: true,
      queueTimer: null, // No automatic timer
      resetTimer: newResetTimer
    });
    
    console.log('[Background] Queue processor started (round-based mode)');
  },
  
  // New method for round-triggered background changes
  processOnRoundStart: () => {
    const { queue } = get();
    console.log('[Background] Round started - checking queue:', queue.length, 'items');
    
    if (queue.length > 0) {
      console.log('[Background] Processing background change for new round');
      get().processQueue();
    } else {
      console.log('[Background] No background changes queued for this round');
    }
  },
  
  stopQueueProcessor: () => {
    const { queueTimer, resetTimer } = get();
    
    if (queueTimer) {
      clearInterval(queueTimer);
    }
    if (resetTimer) {
      clearTimeout(resetTimer);
    }
    
    set({ 
      isProcessingQueue: false,
      queueTimer: null,
      resetTimer: null
    });
  },
}));
