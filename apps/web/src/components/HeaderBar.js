import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { SoundToggle } from "./SoundToggle";
export function HeaderBar() {
    const contract = import.meta.env?.VITE_CONTRACT_ADDRESS;
    console.log('🔧 HeaderBar: Contract from env:', contract);
    console.log('🔧 HeaderBar: All env vars:', import.meta.env);
    const [tokenStats, setTokenStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const short = (s) => (s && s.length > 12 ? `${s.slice(0, 6)}…${s.slice(-6)}` : s || "N/A");
    // Fetch token stats
    useEffect(() => {
        console.log('🔍 HeaderBar: useEffect triggered with contract:', contract);
        const fetchTokenStats = async () => {
            console.log('📡 HeaderBar: fetchTokenStats called with contract:', contract);
            if (!contract || contract === 'demo') {
                console.log('❌ HeaderBar: No contract or demo contract, skipping fetch');
                setLoading(false);
                return;
            }
            setLoading(true);
            console.log('📡 HeaderBar: Fetching from:', `/api/token/${contract}/stats`);
            try {
                const response = await fetch(`/api/token/${contract}/stats`);
                console.log('📡 HeaderBar: Response status:', response.status);
                if (response.ok) {
                    const stats = await response.json();
                    console.log('✅ HeaderBar: Token stats received:', stats);
                    setTokenStats(stats);
                }
                else {
                    console.error('❌ HeaderBar: Response not ok:', response.status, response.statusText);
                }
            }
            catch (error) {
                console.error('❌ HeaderBar: Fetch error:', error);
            }
            finally {
                setLoading(false);
                console.log('🏁 HeaderBar: fetchTokenStats completed');
            }
        };
        fetchTokenStats();
        // Refresh every 30 seconds
        const interval = setInterval(fetchTokenStats, 30000);
        return () => clearInterval(interval);
    }, [contract]);
    const formatMarketCap = (value) => {
        if (value >= 1000000) {
            return `$${(value / 1000000).toFixed(1)}M`;
        }
        else if (value >= 1000) {
            return `$${(value / 1000).toFixed(1)}K`;
        }
        return `$${value.toFixed(0)}`;
    };
    const formatHolders = (count) => {
        if (count >= 1000) {
            return `${(count / 1000).toFixed(1)}K`;
        }
        return count.toString();
    };
    return (_jsxs("div", { className: "rounded-xl bg-black/40 border border-white/10 p-2", children: [_jsxs("div", { className: "flex items-center justify-between mb-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "px-1.5 py-0.5 rounded bg-red-600 text-white text-xs", children: "LIVE" }), _jsx("img", { src: "/trivia-logo.png", alt: "Trivia Pump", className: "w-6 h-6" }), _jsx("h1", { className: "text-sm font-bold text-white", children: "Trivia Pump Stream" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(SoundToggle, {}), _jsx("a", { href: "https://x.com/TriviaPump", target: "_blank", rel: "noopener noreferrer", className: "flex items-center justify-center w-8 h-8 bg-black/30 hover:bg-black/50 rounded border border-white/20 transition-colors", title: "Follow @TriviaPump on X", children: _jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", className: "text-white", children: _jsx("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" }) }) }), _jsx("div", { className: "text-xs text-white/60 bg-black/30 px-2 py-1 rounded border border-white/20", children: "Chat: /background" })] })] }), tokenStats && !loading && (_jsxs("div", { className: "flex items-center justify-center gap-2 text-xs text-gray-400 bg-black/20 rounded-lg p-1", children: [_jsx("span", { className: "text-green-400 font-semibold", children: tokenStats.symbol }), _jsxs("span", { className: "text-yellow-400", children: ["$", tokenStats.price.toFixed(6)] }), _jsxs("span", { className: "text-blue-400", children: [formatMarketCap(tokenStats.marketCap), " MC"] }), _jsxs("span", { className: "text-purple-400", children: [formatHolders(tokenStats.holders), " holders"] }), _jsxs("div", { className: "flex items-center gap-1 bg-black/30 px-1.5 py-0.5 rounded border border-white/20", children: [_jsx("span", { className: "text-white/90 font-mono text-xs", children: contract && contract !== 'demo' ? contract : 'Demo' }), _jsx("button", { onClick: () => {
                                    if (contract && contract !== 'demo') {
                                        navigator.clipboard.writeText(contract);
                                        // Simple feedback - you could add a toast here
                                        console.log('Contract address copied!');
                                    }
                                }, className: "text-white/60 hover:text-white/90 transition-colors", title: "Copy contract address", children: _jsxs("svg", { width: "10", height: "10", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("rect", { x: "9", y: "9", width: "13", height: "13", rx: "2", ry: "2" }), _jsx("path", { d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" })] }) })] })] })), loading && contract && contract !== 'demo' && (_jsx("div", { className: "flex items-center justify-center text-xs text-gray-500 bg-black/20 rounded-lg p-1", children: _jsx("div", { className: "animate-pulse", children: "Loading token data..." }) }))] }));
}
