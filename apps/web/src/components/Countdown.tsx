import React from "react";
import { useAudio } from "../hooks/useAudio";

interface CountdownProps {
  endsAtMs: number;
  durationSec?: number;
  isActive?: boolean; // Controls whether the round is active
  enableSounds?: boolean; // Controls whether sounds should be played
}

export function Countdown({ endsAtMs, durationSec = 30, isActive = true, enableSounds = true }: CountdownProps): JSX.Element {
  const [, force] = React.useReducer((x) => x + 1, 0);
  const tickSound = useAudio('tick', { preload: true, volume: 0.8 });
  const tickUrgentSound = useAudio('tick-urgent', { preload: true, volume: 0.9 });
  const finalBeepSound = useAudio('final-beep', { preload: true, volume: 1.0 });
  const timeUpSound = useAudio('time-up', { preload: true, volume: 1.0 });
  
  const prevSecondsRef = React.useRef<number | null>(null);

  // Timer only runs when countdown is active
  React.useEffect(() => {
    if (!isActive) {
      console.log('⏹️ Countdown timer stopped - isActive:', isActive);
      
      // FORCE STOP ALL COUNTDOWN SOUNDS
      console.log('🔇 STOPPING ALL COUNTDOWN SOUNDS - isActive false');
      tickSound.stop();
      tickUrgentSound.stop();
      finalBeepSound.stop();
      timeUpSound.stop();
      
      return;
    }
    
    console.log('▶️ Countdown timer started - isActive:', isActive);
    const id = setInterval(() => force(), 200);
    return () => {
      console.log('🛑 Countdown timer cleanup');
      clearInterval(id);
    };
  }, [isActive, tickSound, tickUrgentSound, finalBeepSound, timeUpSound]);

  // Reset previous seconds when countdown starts/restarts or when component mounts
  React.useEffect(() => {
    prevSecondsRef.current = null;
    console.log('Reset prevSecondsRef - isActive:', isActive, 'endsAtMs:', endsAtMs);
  }, [isActive, endsAtMs]);
  
  // Also reset on component mount
  React.useEffect(() => {
    prevSecondsRef.current = null;
    console.log('Component mounted - reset prevSecondsRef');
  }, []);

  const now = Date.now();
  const remainingMs = isActive ? Math.max(0, endsAtMs - now) : 0;
  const remainingSec = isActive ? Math.ceil(remainingMs / 1000) : 0;
  const isDanger = remainingSec <= 10;
  const isUrgent = remainingSec <= 3;
  
  // Countdown is effectively inactive when time is up (0 seconds) or not active
  const isEffectivelyActive = isActive && remainingSec > 0;

  // Play sound effects based on countdown
  React.useEffect(() => {
    const prevSeconds = prevSecondsRef.current;
    
    // Debug log (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.log(`Countdown: ${remainingSec}s, isActive: ${isActive}`);
    }
    
    // Only play sounds if round is active, sounds enabled, and seconds actually changed
    if (isActive && enableSounds && prevSeconds !== null && prevSeconds !== remainingSec) {
      
      if (remainingSec === 0 && prevSeconds === 1) {
        // Time's up! (1 → 0) - This sound plays but then stops
        console.log('🔔 Playing time-up sound - COUNTDOWN FINISHED');
        timeUpSound.play();
        
      } else if (isEffectivelyActive) {
        // Only play tick sounds when countdown is active (remainingSec > 0)
        
        if (remainingSec === 1 && prevSeconds === 2) {
          // Final beep at 1 second (2 → 1)
          console.log('⚠️ Playing final-beep sound');
          finalBeepSound.play();
          
        } else if (remainingSec <= 3 && remainingSec > 1 && prevSeconds > remainingSec) {
          // Urgent tick for 3-2 seconds
          console.log('🚨 Playing urgent tick sound');
          tickUrgentSound.play();
          
        } else if (remainingSec <= 10 && remainingSec > 3 && prevSeconds > remainingSec) {
          // Normal tick for 10-4 seconds
          console.log('⏰ Playing normal tick sound');
          tickSound.play();
          
        } else if (remainingSec > 10 && prevSeconds > remainingSec) {
          // Tick for all seconds above 10 (full countdown)
          console.log('🕐 Playing full countdown tick sound');
          tickSound.play();
        }
      }
    } else if (!enableSounds && prevSeconds !== remainingSec) {
      // If sounds are disabled, just log
      console.log(`🔇 Silent countdown: ${remainingSec}s (sounds disabled)`);
    }
    
    prevSecondsRef.current = remainingSec;
  }, [remainingSec, tickSound, tickUrgentSound, finalBeepSound, timeUpSound, isActive, isEffectivelyActive]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-16 h-16 mb-2">
        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-white/20"
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className={isDanger ? "text-red-400" : "text-green-400"}
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            strokeDasharray={`${Math.max(0, (remainingMs / (durationSec * 1000)) * 100)}, 100`}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-xl font-black tabular-nums ${isDanger ? "text-red-400" : "text-white"}`}>
            {remainingSec}
          </span>
        </div>
      </div>
      <div className="text-white/70 text-xs font-semibold">seconds left</div>
    </div>
  );
}


