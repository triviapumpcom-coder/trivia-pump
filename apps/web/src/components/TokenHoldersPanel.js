import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
export function TokenHoldersPanel() {
    // Get contract address from environment
    const mint = import.meta.env?.VITE_CONTRACT_ADDRESS || "demo";
    console.log('🔧 TokenHolders: Mint from env:', mint);
    console.log('🔧 TokenHolders: All env vars:', import.meta.env);
    const [holders, setHolders] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(0); // 0 for first 5, 1 for second 5
    const [isTransitioning, setIsTransitioning] = React.useState(false);
    const scrollRef = React.useRef(null);
    // Mock data for now - extended to 10
    const mockHolders = React.useMemo(() => [
        { owner: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM", amount: 1250000 },
        { owner: "4vJ9JU1bJJE96FWSJKvHsmmFADCg4gpZQff4P3bkLKi", amount: 890000 },
        { owner: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgHRv", amount: 675000 },
        { owner: "2B5UoYWdKHh9yiQZQUHg6hSWiqnUoaBXyxhqVjuGuDqF", amount: 543000 },
        { owner: "8M9xa2BfDNUkkbXPnqgdQgNrVHCKaRgveGxVGkxpAWwM", amount: 432000 },
        { owner: "5N2dHuAWnXrHRNRicoFuoTbhOsi4GLyydHdTzSKv1Fy7", amount: 321000 },
        { owner: "3K8vJ2mBnHgRqoNvVeCDqARrwpdPMJDqvQXuBuqKAXrM", amount: 298000 },
        { owner: "6P9wL3nCdGhSrMNuVfBDqBRtxpdQMKDrvRYvCvqLBXwN", amount: 187000 },
        { owner: "7L4kN8pCfGhTrONvVfCDqBRtxpdQMKDrvRYvCvqLBXwO", amount: 156000 },
        { owner: "9M2xJ5nBdFgSqMNuVeCDqARrwpdPMJDqvQXuBuqKAXrP", amount: 134000 },
    ], []);
    // Page switching animation every 6 seconds (slower)
    React.useEffect(() => {
        const interval = setInterval(() => {
            setIsTransitioning(true); // Start fade effect
            setTimeout(() => {
                setCurrentPage(prev => prev === 0 ? 1 : 0); // Toggle between 0 and 1
            }, 200); // Small delay for fade effect
        }, 6000); // 6 seconds - even more time to read
        return () => clearInterval(interval);
    }, []);
    // Very slow smooth scroll animation when page changes
    React.useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer || holders.length === 0)
            return;
        // Calculate the height of 5 cards (each card is approximately 60px with spacing)
        const cardHeight = 60; // Approximate height per card including spacing
        const targetScroll = currentPage === 0 ? 0 : cardHeight * 5;
        const currentScroll = scrollContainer.scrollTop;
        const distance = targetScroll - currentScroll;
        const duration = 2000; // 2 seconds - very slow transition
        const startTime = Date.now();
        const smoothScrollTo = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Easing function for very smooth animation
            const easeInOutQuart = (t) => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
            const easedProgress = easeInOutQuart(progress);
            scrollContainer.scrollTop = currentScroll + (distance * easedProgress);
            if (progress < 1) {
                requestAnimationFrame(smoothScrollTo);
            }
            else {
                // Animation finished, remove fade effect
                setIsTransitioning(false);
            }
        };
        requestAnimationFrame(smoothScrollTo);
    }, [currentPage, holders]);
    const load = React.useCallback(async () => {
        console.log('🔍 Loading holders for:', mint);
        // Real API call first (fallback to mock data on error)
        if (mint !== "demo") {
            try {
                const response = await fetch(`/api/token/${mint}/top-holders`);
                if (response.ok) {
                    const data = await response.json();
                    console.log('👑 Holders API response:', data);
                    if (data.holders && Array.isArray(data.holders)) {
                        // Format the real data to match our interface
                        const formattedHolders = data.holders.map((holder) => ({
                            owner: holder.address,
                            amount: holder.amount
                        }));
                        console.log('✅ Using real holders data:', formattedHolders.length, 'holders');
                        setHolders(formattedHolders);
                        return;
                    }
                }
            }
            catch (error) {
                console.error('❌ Failed to fetch real holders:', error);
            }
        }
        // Fallback to mock data
        console.log('⚠️ Using mock holders data');
        setHolders(mockHolders);
    }, [mint, mockHolders]);
    React.useEffect(() => {
        load();
        const id = setInterval(load, 30000); // Reduced frequency for mock data
        return () => clearInterval(id);
    }, [load]);
    const formatAmount = (amount) => {
        if (amount >= 1000000) {
            return `${(amount / 1000000).toFixed(1)}M`;
        }
        if (amount >= 1000) {
            return `${(amount / 1000).toFixed(1)}K`;
        }
        return amount.toLocaleString();
    };
    const shortAddress = (addr) => {
        return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
    };
    return (_jsxs("div", { className: "rounded-2xl bg-black/30 p-3 shadow border border-white/10 h-full flex flex-col", children: [_jsxs("div", { className: "flex items-center justify-between mb-3 flex-shrink-0", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-base", children: "\uD83D\uDC8E" }), _jsx("h3", { className: "text-white font-bold text-sm", children: "Top Holders" })] }), _jsx("span", { className: "text-xs text-blue-400 bg-blue-400/20 px-2 py-1 rounded-full", children: "Live" })] }), _jsxs("div", { ref: scrollRef, className: `overflow-y-auto scrollbar-hide space-y-1 transition-opacity duration-300 ${isTransitioning ? 'opacity-30' : 'opacity-100'}`, style: { height: "300px" }, children: [holders.length === 0 && (_jsxs("div", { className: "text-center py-4 text-white/60", children: [_jsx("div", { className: "text-xl mb-1", children: "\uD83D\uDCCA" }), _jsx("div", { className: "text-xs", children: "Loading holders..." })] })), holders.map((h, idx) => (_jsxs("div", { className: "flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10", children: [_jsxs("div", { className: "flex items-center gap-2 flex-1 min-w-0", children: [_jsxs("span", { className: "text-white/50 text-xs font-mono w-4", children: [idx + 1, "."] }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("div", { className: "font-mono text-white/90 text-sm", children: shortAddress(h.owner) }), _jsx("div", { className: "text-xs text-white/50", children: "Wallet" })] })] }), _jsxs("div", { className: "flex flex-col items-end flex-shrink-0", children: [_jsx("div", { className: "font-bold text-white text-sm", children: formatAmount(h.amount) }), _jsx("div", { className: "text-xs text-white/50", children: "tokens" })] })] }, h.owner)))] })] }));
}
