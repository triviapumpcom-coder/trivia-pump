import React from "react";

type Item = { userId: string; name: string; score: number };

export function LeaderboardPanel(): JSX.Element {
  const [items, setItems] = React.useState<Item[]>([]);

  const load = React.useCallback(() => {
    fetch("/api/leaderboard/weekly")
      .then((r) => r.json())
      .then((d) => {
        if (d && Array.isArray(d.items)) {
          setItems(d.items);
        } else {
          setItems([]);
        }
      })
      .catch(() => setItems([]));
  }, []);

  React.useEffect(() => {
    load();
    const id = setInterval(load, 5000);
    return () => clearInterval(id);
  }, [load]);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return "🥇";
      case 1: return "🥈";
      case 2: return "🥉";
      default: return `${index + 1}.`;
    }
  };

  const getRankColor = (index: number) => {
    switch (index) {
      case 0: return "text-yellow-400";
      case 1: return "text-gray-300";
      case 2: return "text-orange-400";
      default: return "text-white/70";
    }
  };

  return (
    <div className="rounded-2xl bg-black/30 p-2 shadow border border-white/10 h-full flex flex-col">
      <div className="flex items-center justify-between mb-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-sm">🏆</span>
          <h3 className="text-white font-bold text-xs">Leaderboard</h3>
        </div>
        <span className="text-xs text-green-400 bg-green-400/20 px-1 py-0.5 rounded-full">
          {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </span>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide space-y-1">
        {items.length === 0 && (
          <div className="text-center py-2 text-white/60">
            <div className="text-lg mb-1">🎯</div>
            <div className="text-xs">No players yet</div>
          </div>
        )}
        {(items || []).slice(0, 4).map((it, idx) => (
          <div key={it.userId} className={`flex items-center justify-between p-1.5 rounded-lg bg-white/5 border border-white/10 ${getRankColor(idx)}`}>
            <div className="flex items-center gap-1.5 flex-1 min-w-0">
              <span className="text-xs flex-shrink-0">{getRankIcon(idx)}</span>
              <div className="min-w-0 flex-1">
                <div className="font-semibold truncate text-xs">{it.name}</div>
                <div className="text-xs text-white/50">#{it.userId.slice(-4)}</div>
              </div>
            </div>
            <div className="flex flex-col items-end flex-shrink-0">
              <div className="font-bold text-xs">{it.score}</div>
              <div className="text-xs text-white/50">
                {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


