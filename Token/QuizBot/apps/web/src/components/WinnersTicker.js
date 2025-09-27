import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { useGameStore } from "../store/game";
import { short } from "../lib/string";
export function WinnersTicker() {
    const round = useGameStore((s) => s.round);
    const [items, setItems] = React.useState([]);
    const scores = useGameStore((s) => s.scores);
    const latencies = useGameStore((s) => s.latencies);
    React.useEffect(() => {
        if (round.status === "ended" && round.winners?.length) {
            const list = round.winners.map((w, idx) => {
                const val = scores[w.id] ?? 0;
                const latency = latencies[w.id];
                const latencyText = typeof latency === "number" ? latency.toFixed(1) : "-.--";
                const rank = idx + 1;
                const name = short(w.name || w.id);
                return { rank, name, val, latencyText };
            });
            const id = `${Date.now()}`;
            setItems((prev) => [...prev, { id, text: "", data: list }].slice(-5));
        }
    }, [round.status, round.winners, scores, latencies]);
    const last = items[items.length - 1] ?? { id: "placeholder", text: "Waiting for winners…", data: undefined };
    const renderContent = () => {
        if (last.data && last.data.length > 0) {
            return last.data.slice(0, 10).map((winner, idx) => (_jsxs("span", { className: "mx-4 text-xs", children: [_jsxs("span", { className: "text-white/90", children: [winner.rank, ". \uD83D\uDC51 "] }), _jsx("span", { className: "text-white font-semibold text-xs", children: winner.name }), _jsx("span", { className: "text-white/70 text-xs", children: " (" }), _jsx("span", { className: "text-green-400 font-bold text-xs", children: winner.val }), _jsx("span", { className: "text-white/70 text-xs", children: " correct in " }), _jsxs("span", { className: "text-green-400 font-bold text-xs", children: [winner.latencyText, "s"] }), _jsx("span", { className: "text-white/70 text-xs", children: ")" })] }, idx)));
        }
        return _jsx("span", { className: "mx-4 text-white/60 text-xs", children: last.text });
    };
    return (_jsxs("div", { className: "w-full overflow-hidden rounded-xl bg-black/30 border border-white/10 h-8 flex items-center", children: [_jsx("div", { className: "flex-shrink-0 px-2", children: _jsx("span", { className: "text-green-400 font-bold text-xs", children: "Last Tour Win" }) }), _jsx("div", { className: "flex-1 overflow-hidden", children: _jsx("div", { className: "ticker", children: _jsxs("div", { className: "ticker__track flex items-center h-full", children: [renderContent(), renderContent(), renderContent()] }) }) })] }));
}
