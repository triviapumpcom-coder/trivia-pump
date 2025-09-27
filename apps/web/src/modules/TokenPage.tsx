import React from "react";
import { useParams } from "react-router-dom";

export function TokenPage(): JSX.Element {
  const { mint } = useParams();
  const [holders, setHolders] = React.useState<Array<{ owner: string; amount: number }>>([]);

  React.useEffect(() => {
    if (!mint) return;
    fetch(`/api/token/${mint}/top-holders`)
      .then((r) => r.json())
      .then((d) => setHolders(d.holders ?? []))
      .catch(() => setHolders([]));
  }, [mint]);

  return (
    <main className="grid gap-4">
      <div className="rounded-2xl bg-black/20 p-6 shadow">
        <h2 className="text-xl font-semibold text-white">Token Top Holders</h2>
        <div className="mt-4 grid gap-2">
          {holders.map((h) => (
            <div key={h.owner} className="flex items-center justify-between text-white/90">
              <div className="truncate">{h.owner}</div>
              <div className="font-mono">{h.amount}</div>
            </div>
          ))}
          {!holders.length && <div className="text-white/60">No data.</div>}
        </div>
      </div>
    </main>
  );
}


