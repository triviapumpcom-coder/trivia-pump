import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
export function LeaderboardPage() {
    const [items, setItems] = React.useState([]);
    React.useEffect(() => {
        fetch("/api/leaderboard/weekly", { headers: { "x-relay": "web" } })
            .then((r) => r.json())
            .then((d) => setItems(d.items ?? []))
            .catch(() => setItems([]));
    }, []);
    return (_jsx("main", { className: "grid gap-4", children: _jsxs("div", { className: "rounded-2xl bg-black/20 p-6 shadow", children: [_jsx("h2", { className: "text-xl font-semibold text-white", children: "Leaderboard" }), _jsxs("div", { className: "mt-4 grid gap-2", children: [items.map((it) => (_jsxs("div", { className: "flex items-center justify-between text-white/90", children: [_jsx("div", { className: "truncate", children: it.name }), _jsx("div", { className: "font-mono", children: it.score })] }, it.userId))), !items.length && _jsx("div", { className: "text-white/60", children: "No entries yet." })] })] }) }));
}
