import { useCallback, useRef, useState, useEffect } from 'react';

export type SoundType = 
  | 'round-start'
  | 'tick'
  | 'tick-urgent'
  | 'final-beep'
  | 'time-up';

interface UseAudioOptions {
  volume?: number;
  preload?: boolean;
}

interface AudioState {
  isLoading: boolean;
  isPlaying: boolean;
  error: string | null;
  isReady: boolean;
  userInteracted: boolean;
}

export function useAudio(soundType: SoundType, options: UseAudioOptions = {}) {
  const { volume = 0.7, preload = true } = options;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<AudioState>({
    isLoading: false,
    isPlaying: false,
    error: null,
    isReady: false,
    userInteracted: false,
  });
  
  const isInitializedRef = useRef(false);

  // Initialize audio element
  const initAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio(`/sounds/${soundType}.mp3`);
      audio.volume = volume;
      audio.preload = preload ? 'auto' : 'none';
      
      audio.addEventListener('loadstart', () => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
      });
      
      audio.addEventListener('canplaythrough', () => {
        setState(prev => ({ ...prev, isLoading: false, isReady: true }));
      });
      
      audio.addEventListener('play', () => {
        setState(prev => ({ ...prev, isPlaying: true }));
      });
      
      audio.addEventListener('ended', () => {
        setState(prev => ({ ...prev, isPlaying: false }));
      });
      
      audio.addEventListener('pause', () => {
        setState(prev => ({ ...prev, isPlaying: false }));
      });
      
      audio.addEventListener('error', (e) => {
        setState(prev => ({ 
          ...prev, 
          isLoading: false, 
          isPlaying: false,
          error: `Failed to load sound: ${soundType}` 
        }));
        console.warn(`Audio error for ${soundType}:`, e);
      });
      
      audioRef.current = audio;
    }
    return audioRef.current;
  }, [soundType, volume, preload]);

  // Check user interaction on first click/touch
  useEffect(() => {
    const handleUserInteraction = () => {
      setState(prev => ({ ...prev, userInteracted: true }));
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };

    if (!state.userInteracted) {
      document.addEventListener('click', handleUserInteraction);
      document.addEventListener('touchstart', handleUserInteraction);
      document.addEventListener('keydown', handleUserInteraction);
    }

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, [state.userInteracted]);

  // Play sound with better error handling
  const play = useCallback(async () => {
    try {
      // Don't play if user hasn't interacted yet
      if (!state.userInteracted) {
        console.log(`⏸️ Waiting for user interaction to play ${soundType}`);
        return;
      }

      const audio = initAudio();
      
      // Stop any currently playing audio to prevent conflicts
      if (!audio.paused) {
        audio.pause();
      }
      
      // Reset audio to beginning
      audio.currentTime = 0;
      
      // Play the sound
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        await playPromise;
        if (process.env.NODE_ENV === 'development') {
          console.log(`🔊 Successfully played ${soundType}`);
        }
      }
    } catch (error: any) {
      // Handle specific error types
      if (error.name === 'NotAllowedError') {
        console.log(`🔇 Browser blocked autoplay for ${soundType} - waiting for user interaction`);
        setState(prev => ({ ...prev, userInteracted: false }));
      } else if (error.name === 'AbortError') {
        console.log(`⏹️ Audio playback interrupted for ${soundType} (normal behavior)`);
      } else {
        console.warn(`❌ Failed to play sound ${soundType}:`, error);
        setState(prev => ({ 
          ...prev, 
          error: `Failed to play sound: ${soundType}` 
        }));
      }
    }
  }, [initAudio, soundType, state.userInteracted]);

  // Stop sound - Agresif durdurma
  const stop = useCallback(() => {
    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        // Completely reload the audio file
        audioRef.current.load();
        if (process.env.NODE_ENV === 'development') {
          console.log(`🔇 Aggressively stopped sound: ${soundType}`);
        }
      } catch (error) {
        console.warn(`Error stopping sound ${soundType}:`, error);
      }
    }
  }, [soundType]);

  // Set volume
  const setVolume = useCallback((newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, newVolume));
    }
  }, []);

  // Cleanup
  const cleanup = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeEventListener('loadstart', () => {});
      audioRef.current.removeEventListener('canplaythrough', () => {});
      audioRef.current.removeEventListener('play', () => {});
      audioRef.current.removeEventListener('ended', () => {});
      audioRef.current.removeEventListener('pause', () => {});
      audioRef.current.removeEventListener('error', () => {});
      audioRef.current = null;
    }
  }, []);

  return {
    play,
    stop,
    setVolume,
    cleanup,
    ...state,
  };
}

// Global audio context for user interaction
let globalUserInteracted = false;

// Hook for managing multiple sounds
export function useAudioManager() {
  const roundStart = useAudio('round-start', { volume: 0.8 });
  const tick = useAudio('tick', { volume: 0.6 });
  const tickUrgent = useAudio('tick-urgent', { volume: 0.7 });
  const finalBeep = useAudio('final-beep', { volume: 0.9 });
  const timeUp = useAudio('time-up', { volume: 1.0 });

  // Check if any sound is ready and user has interacted
  const isReady = roundStart.isReady && roundStart.userInteracted;

  const playSound = useCallback((soundType: SoundType) => {
    switch (soundType) {
      case 'round-start':
        return roundStart.play();
      case 'tick':
        return tick.play();
      case 'tick-urgent':
        return tickUrgent.play();
      case 'final-beep':
        return finalBeep.play();
      case 'time-up':
        return timeUp.play();
      default:
        console.warn(`Unknown sound type: ${soundType}`);
    }
  }, [roundStart, tick, tickUrgent, finalBeep, timeUp]);

  const stopAllSounds = useCallback(() => {
    roundStart.stop();
    tick.stop();
    tickUrgent.stop();
    finalBeep.stop();
    timeUp.stop();
  }, [roundStart, tick, tickUrgent, finalBeep, timeUp]);

  const cleanup = useCallback(() => {
    roundStart.cleanup();
    tick.cleanup();
    tickUrgent.cleanup();
    finalBeep.cleanup();
    timeUp.cleanup();
  }, [roundStart, tick, tickUrgent, finalBeep, timeUp]);

  return {
    playSound,
    stopAllSounds,
    cleanup,
    isReady,
    sounds: {
      roundStart,
      tick,
      tickUrgent,
      finalBeep,
      timeUp,
    },
  };
}
