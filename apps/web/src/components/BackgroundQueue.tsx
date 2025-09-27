import React from "react";
import { useBackgroundStore } from "../store/background";
import { useFlashStore } from "../store/flash";

export function BackgroundQueue(): JSX.Element {
  const { queue, currentBackground } = useBackgroundStore();
  const { flashes } = useFlashStore();

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
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
      
      {/* Flash Effects */}
      {flashes.map((flash) => (
        <div
          key={flash.id}
          className={`absolute inset-0 transition-opacity duration-${flash.duration} ${
            flash.type === 'correct' ? 'bg-green-500/20' : 
            flash.type === 'incorrect' ? 'bg-red-500/20' : 
            'bg-blue-500/20'
          }`}
          style={{ opacity: flash.active ? 1 : 0 }}
        />
      ))}
    </div>
  );
}
