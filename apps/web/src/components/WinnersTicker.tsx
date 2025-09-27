import React from "react";
import { useGameStore } from "../store/game";
import { short } from "../lib/string";

type TickerItem = { 
  id: string; 
  text: string; 
  data?: Array<{ rank: number; name: string; val: number; latencyText: string }> 
};

export function WinnersTicker(): JSX.Element {
  const round = useGameStore((s) => s.round);
  const [items, setItems] = React.useState<TickerItem[]>([]);
  const scores = useGameStore((s) => s.scores);
  const latencies = useGameStore((s) => s.latencies);

  React.useEffect(() => {
    if (round.status === "ended" && round.winners?.length) {
      const list = round.winners.map((w, idx) => {
        const val = scores[w.id] ?? 0;
        const latency = latencies[w.id];
        const latencyText = typeof latency === "number" ? latency.toFixed(1) : "-.--";
        const rank = idx + 1;
        const name = w.id && w.id.length > 8 ? `${w.id.slice(0, 4)}...${w.id.slice(-4)}` : (w.id || 'Player');
        return { id: w.id, rank, name, val, latencyText };
      });
      const id = `${Date.now()}`;
      setItems((prev) => [...prev, { id, text: "", data: list }].slice(-5));
    }
  }, [round.status, round.winners, scores, latencies]);
  const last = items[items.length - 1] ?? { id: "placeholder", text: "Waiting for winners…", data: undefined };
  
  const renderContent = () => {
    if (last.data && Array.isArray(last.data) && last.data.length > 0) {
      return last.data.slice(0, 10).map((winner, idx) => (
        <span key={`${last.id}-${winner.id}-${winner.rank}`} className="mx-4 text-xs">
          <span className="text-white/90">{winner.rank}. 👑 </span>
          <span className="text-white font-semibold text-xs">{winner.name}</span>
          <span className="text-white/70 text-xs"> (</span>
          <span className="text-green-400 font-bold text-xs">{winner.val}</span>
          <span className="text-white/70 text-xs"> correct in </span>
          <span className="text-green-400 font-bold text-xs">{winner.latencyText}s</span>
          <span className="text-white/70 text-xs">)</span>
        </span>
      ));
    }
    return <span className="mx-4 text-white/60 text-xs">{last.text}</span>;
  };

  return (
    <div className="w-full overflow-hidden rounded-xl bg-black/30 border border-white/10 h-8 flex items-center">
      <div className="flex-shrink-0 px-2">
        <span className="text-green-400 font-bold text-xs">Last Tour Win</span>
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="ticker">
          <div className="ticker__track flex items-center h-full">
            {renderContent()}
            {renderContent()}
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
