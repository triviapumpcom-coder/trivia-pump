import React from "react";
import { useBackgroundStore } from "../store/background";
import { useFlashStore } from "../store/flash";

export function BackgroundQueue(): JSX.Element {
  const { queue, currentBackground } = useBackgroundStore();
  const { flashes } = useFlashStore();

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* DEBUG: Show background info */}
      <div className="fixed top-0 left-0 bg-red-500 text-white p-1 text-xs z-50 pointer-events-none">
        BG: {currentBackground} | Q: {queue.length}
      </div>
      {/* Background Image */}
      {currentBackground && (
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
          style={{ 
            backgroundImage: `url(${currentBackground})`,
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
