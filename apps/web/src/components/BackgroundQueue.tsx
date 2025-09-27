import React from "react";
import { useBackgroundStore } from "../store/background";
import { useFlashStore } from "../store/flash";

export function BackgroundQueue(): JSX.Element {
  const { queue, currentBackground, backgrounds } = useBackgroundStore();
  const { flashes } = useFlashStore();

  const currentBg = backgrounds[currentBackground];

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Background Image */}
      {currentBg && (
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
          style={{ 
            backgroundImage: currentBg.type === 'gradient' ? currentBg.value : `url(${currentBg.value})`,
            opacity: 0.3
          }}
        />
      )}
      
      {/* Flash Effects for each choice */}
      {flashes && Object.entries(flashes).map(([choice, intensity]) => 
        intensity > 0 ? (
          <div
            key={choice}
            className="absolute inset-0 transition-opacity duration-100"
            style={{ 
              backgroundColor: `rgba(34, 197, 94, ${intensity * 0.2})`, // Green flash
              opacity: intensity
            }}
          />
        ) : null
      )}
    </div>
  );
}
