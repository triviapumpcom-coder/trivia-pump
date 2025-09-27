import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
export function LeaderboardPanel() {
    const [items, setItems] = React.useState([]);
    const load = React.useCallback(() => {
        fetch("/api/leaderboard/weekly")
            .then((r) => r.json())
            .then((d) => setItems(d.items ?? []))
            .catch(() => { });
    }, []);
    React.useEffect(() => {
        load();
        const id = setInterval(load, 5000);
        return () => clearInterval(id);
    }, [load]);
    const getRankIcon = (index) => {
        switch (index) {
            case 0: return "🥇";
            case 1: return "🥈";
            case 2: return "🥉";
            default: return `${index + 1}.`;
        }
    };
    const getRankColor = (index) => {
        switch (index) {
            case 0: return "text-yellow-400";
            case 1: return "text-gray-300";
            case 2: return "text-orange-400";
            default: return "text-white/70";
        }
    };
    return (_jsxs("div", { className: "rounded-2xl bg-black/30 p-2 shadow border border-white/10 h-full flex flex-col", children: [_jsxs("div", { className: "flex items-center justify-between mb-2 flex-shrink-0", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-sm", children: "\uD83C\uDFC6" }), _jsx("h3", { className: "text-white font-bold text-xs", children: "Leaderboard" })] }), _jsx("span", { className: "text-xs text-green-400 bg-green-400/20 px-1 py-0.5 rounded-full", children: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) })] }), _jsxs("div", { className: "flex-1 overflow-y-auto scrollbar-hide space-y-1", children: [items.length === 0 && (_jsxs("div", { className: "text-center py-2 text-white/60", children: [_jsx("div", { className: "text-lg mb-1", children: "\uD83C\uDFAF" }), _jsx("div", { className: "text-xs", children: "No players yet" })] })), items.slice(0, 4).map((it, idx) => (_jsxs("div", { className: `flex items-center justify-between p-1.5 rounded-lg bg-white/5 border border-white/10 ${getRankColor(idx)}`, children: [_jsxs("div", { className: "flex items-center gap-1.5 flex-1 min-w-0", children: [_jsx("span", { className: "text-xs flex-shrink-0", children: getRankIcon(idx) }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("div", { className: "font-semibold truncate text-xs", children: it.name }), _jsxs("div", { className: "text-xs text-white/50", children: ["#", it.userId.slice(-4)] })] })] }), _jsxs("div", { className: "flex flex-col items-end flex-shrink-0", children: [_jsx("div", { className: "font-bold text-xs", children: it.score }), _jsx("div", { className: "text-xs text-white/50", children: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) })] })] }, it.userId)))] })] }));
}
