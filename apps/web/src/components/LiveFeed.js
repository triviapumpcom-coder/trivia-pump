import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { useGameStore } from "../store/game";
function getEventIcon(type) {
    switch (type) {
        case "round_start": return "🚀";
        case "round_end": return "🏁";
        case "answer": return "💬";
        case "system": return "⚙️";
        default: return "📝";
    }
}
function getEventColor(type, status) {
    switch (type) {
        case "round_start": return "text-yellow-400 bg-yellow-400/10";
        case "round_end": return "text-blue-400 bg-blue-400/10";
        case "answer":
            return status === "accepted"
                ? "text-green-400 bg-green-400/10"
                : "text-red-400 bg-red-400/10";
        case "system": return "text-gray-400 bg-gray-400/10";
        default: return "text-white/80 bg-white/5";
    }
}
export function LiveFeed({ events }) {
    const roundGroups = useGameStore((s) => s.roundGroups);
    const topRef = React.useRef(null);
    React.useEffect(() => {
        topRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [roundGroups]);
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };
    const formatDuration = (start, end) => {
        const duration = (end || Date.now()) - start;
        return `${Math.floor(duration / 1000)}s`;
    };
    // Get all events from all rounds for horizontal display
    const allEvents = roundGroups
        .flatMap(round => round.events)
        .filter((event, index, arr) => {
        // Remove duplicate round_end events
        if (event.type === "round_end") {
            return arr.findIndex(e => e.type === "round_end" && e.roundId === event.roundId) === index;
        }
        return true;
    })
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 20);
    return (_jsx("div", { className: "rounded-2xl bg-black/30 shadow border border-white/10 scrollbar-hide", style: { height: "80px" }, "aria-live": "polite", children: _jsxs("div", { className: "p-2 h-full", children: [_jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [_jsx("span", { className: "text-white/70 text-xs font-semibold", children: "Live Activity" }), _jsx("span", { className: "w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" }), _jsx("div", { className: "flex-1 h-px bg-white/10" })] }), _jsxs("div", { className: "h-full overflow-x-auto overflow-y-hidden scrollbar-hide", children: [_jsx("div", { ref: topRef }), _jsxs("div", { className: "flex gap-3 pb-2", style: { width: "max-content" }, children: [allEvents.length === 0 && (_jsxs("div", { className: "flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 text-white/60", children: [_jsx("span", { children: "\uD83C\uDFAF" }), _jsx("span", { className: "text-sm", children: "Waiting for activity..." })] })), allEvents.map((event) => {
                                    // Special compact styling for answer events
                                    if (event.type === "answer" && event.choice) {
                                        const isAccepted = event.status === "accepted";
                                        const shortWallet = event.userId?.slice(0, 3) + "..." + event.userId?.slice(-3);
                                        return (_jsxs("div", { className: `flex items-center gap-1.5 px-2 py-1 rounded border flex-shrink-0 ${isAccepted
                                                ? "border-green-400/50 bg-green-400/10 text-green-400"
                                                : "border-red-400/50 bg-red-400/10 text-red-400"}`, style: { minWidth: "140px", maxWidth: "180px" }, children: [_jsx("div", { className: `w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${isAccepted ? "bg-green-400/20 text-green-300" : "bg-red-400/20 text-red-300"}`, children: event.choice }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "text-xs font-medium truncate", children: [shortWallet, " \u2192 ", event.choice] }), _jsx("div", { className: "text-xs opacity-60", children: formatTime(event.timestamp) })] })] }, event.id));
                                    }
                                    // Compact styling for other events
                                    return (_jsxs("div", { className: `flex items-center gap-1.5 px-2 py-1 rounded border border-white/10 flex-shrink-0 ${getEventColor(event.type, event.status)}`, style: { minWidth: "120px", maxWidth: "160px" }, children: [_jsx("span", { className: "text-xs flex-shrink-0", children: getEventIcon(event.type) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("div", { className: "text-xs font-medium truncate", children: event.text }), _jsx("div", { className: "text-xs opacity-60", children: formatTime(event.timestamp) })] })] }, event.id));
                                })] })] })] }) }));
}
