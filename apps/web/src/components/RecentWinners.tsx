import React from "react";
import { useGameStore } from "../store/game";

export function RecentWinners(): JSX.Element {
  const history = useGameStore((s) => s.winnersHistory);
  
  return (
    <div className="rounded-2xl bg-black/30 p-2 shadow border border-white/10 h-full flex flex-col">
      <div className="flex items-center justify-between mb-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-sm">🎉</span>
          <h3 className="text-white font-bold text-xs">Recent Winners</h3>
        </div>
        <span className="text-xs text-purple-400 bg-purple-400/20 px-1 py-0.5 rounded-full">Latest</span>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide space-y-1">
        {history.length === 0 && (
          <div className="text-center py-2 text-white/60">
            <div className="text-lg mb-1">🏅</div>
            <div className="text-xs">No winners yet</div>
          </div>
        )}
        {(history || []).slice(-2).reverse().map((h) => (
          <div key={h.roundId} className="p-1.5 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-1">
              <span className="text-white/70 text-xs font-mono">Round #{h.roundId}</span>
              <span className="text-green-400 text-xs">✓</span>
            </div>
            <div className="space-y-0.5">
              {(h.winners || []).slice(0, 10).map((w, idx) => (
                <div key={w.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-xs">
                      {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `${idx + 1}.`}
                    </span>
                    <span className="text-white/90 text-xs font-mono">
                      {short(w.name || w.id)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    {w.score && (
                      <span className="text-green-400">{w.score}</span>
                    )}
                    {w.latencySec && (
                      <span className="text-blue-400">{w.latencySec.toFixed(1)}s</span>
                    )}
                  </div>
                </div>
              ))}
              {h.winners.length > 2 && (
                <div className="text-white/50 text-xs text-center">
                  +{h.winners.length - 2} more
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function short(s: string | undefined): string {
  if (!s) return 'Unknown';
  return s.length > 10 ? `${s.slice(0, 4)}…${s.slice(-4)}` : s;
}


