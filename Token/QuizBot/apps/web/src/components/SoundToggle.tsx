import React from 'react';
import { useAudioStore } from '../store/audio';

export function SoundToggle(): JSX.Element {
  const { isSoundEnabled, toggleSound } = useAudioStore();

  return (
    <button
      onClick={toggleSound}
      className={`
        flex items-center gap-1 px-2 py-1 rounded border transition-all duration-200
        ${isSoundEnabled 
          ? 'bg-green-500/20 border-green-400/50 text-green-300 hover:bg-green-500/30' 
          : 'bg-red-500/20 border-red-400/50 text-red-300 hover:bg-red-500/30'
        }
      `}
      title={isSoundEnabled ? 'Turn Off Sound' : 'Turn On Sound'}
    >
      <span className="text-xs">
        {isSoundEnabled ? '🔊' : '🔇'}
      </span>
      <span className="text-xs font-medium hidden sm:block">
        {isSoundEnabled ? 'ON' : 'OFF'}
      </span>
    </button>
  );
}
