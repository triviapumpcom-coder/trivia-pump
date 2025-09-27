import React from "react";

export function LeaderboardPage(): JSX.Element {
  const [items, setItems] = React.useState<Array<{ userId: string; name: string; score: number }>>([]);

  React.useEffect(() => {
    fetch("/api/leaderboard/weekly", { headers: { "x-relay": "web" } })
      .then((r) => r.json())
      .then((d) => setItems(d.items ?? []))
      .catch(() => setItems([]));
  }, []);

  return (
    <main className="grid gap-4">
      <div className="rounded-2xl bg-black/20 p-6 shadow">
        <h2 className="text-xl font-semibold text-white">Leaderboard</h2>
        <div className="mt-4 grid gap-2">
          {items.map((it) => (
            <div key={it.userId} className="flex items-center justify-between text-white/90">
              <div className="truncate">{it.name}</div>
              <div className="font-mono">{it.score}</div>
            </div>
          ))}
          {!items.length && <div className="text-white/60">No entries yet.</div>}
        </div>
      </div>
    </main>
  );
}


