import React from "react";

export function TokenHoldersPanel(): JSX.Element {
  // Get contract address from environment
  const mint = (import.meta as any).env?.VITE_CONTRACT_ADDRESS || "42btZmafsPsz87LbEwHnma9VxMjfZJ3C8YwMzerjpump";
  
  const [holders, setHolders] = React.useState<Array<{ owner: string; amount: number }>>([]);
  const [currentPage, setCurrentPage] = React.useState(0); // 0 for first 5, 1 for second 5
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

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
    if (!scrollContainer || !holders || !Array.isArray(holders) || holders.length === 0) return;

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
      const easeInOutQuart = (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
      const easedProgress = easeInOutQuart(progress);
      
      scrollContainer.scrollTop = currentScroll + (distance * easedProgress);
      
      if (progress < 1) {
        requestAnimationFrame(smoothScrollTo);
      } else {
        // Animation finished, remove fade effect
        setIsTransitioning(false);
      }
    };

    requestAnimationFrame(smoothScrollTo);
  }, [currentPage, holders]);


  const load = React.useCallback(async () => {
    
    try {
      // Real API call first (fallback to mock data on error)
      if (mint !== "demo") {
        const response = await fetch(`/api/token/top-holders?mint=${mint}`);
        if (response.ok) {
          const data = await response.json();
          
          if (data && data.holders && Array.isArray(data.holders) && data.holders.length > 0) {
            // Format the real data to match our interface
            const formattedHolders = data.holders
              .filter((holder: any) => holder && (holder.owner || holder.address)) // Filter out invalid entries
              .map((holder: any) => ({
                owner: holder.owner || holder.address, // Support both formats
                amount: Number(holder.amount) || 0
              }));
            
            if (formattedHolders.length > 0) {
              setHolders(formattedHolders);
              return;
            }
          }
        }
      }
    } catch (error) {
      // Silent error handling
    }
    
    // Fallback to mock data
    if (Array.isArray(mockHolders) && mockHolders.length > 0) {
      setHolders(mockHolders);
    } else {
      setHolders([]); // Ensure we always set an array
    }
  }, [mint, mockHolders]);

  React.useEffect(() => {
    load();
    const id = setInterval(load, 30000); // Reduced frequency for mock data
    return () => clearInterval(id);
  }, [load]);

  const formatAmount = (amount: number) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)}K`;
    }
    return amount.toLocaleString();
  };

  const shortAddress = (addr: string) => {
    return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
  };

  return (
    <div className="rounded-2xl bg-black/30 p-3 shadow border border-white/10 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-base">💎</span>
          <h3 className="text-white font-bold text-sm">Top Holders</h3>
        </div>
        <span className="text-xs text-blue-400 bg-blue-400/20 px-2 py-1 rounded-full">Live</span>
      </div>
      <div ref={scrollRef} className={`overflow-y-auto scrollbar-hide space-y-1 transition-opacity duration-300 ${isTransitioning ? 'opacity-30' : 'opacity-100'}`} style={{ height: "300px" }}>
        {(!holders || holders.length === 0) && (
          <div className="text-center py-4 text-white/60">
            <div className="text-xl mb-1">📊</div>
            <div className="text-xs">Loading holders...</div>
          </div>
        )}
        {(holders || []).map((h, idx) => (
          <div key={h.owner} className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="text-white/50 text-xs font-mono w-4">{idx + 1}.</span>
              <div className="min-w-0 flex-1">
                <div className="font-mono text-white/90 text-sm">{shortAddress(h.owner)}</div>
                <div className="text-xs text-white/50">Wallet</div>
              </div>
            </div>
            <div className="flex flex-col items-end flex-shrink-0">
              <div className="font-bold text-white text-sm">{formatAmount(h.amount)}</div>
              <div className="text-xs text-white/50">tokens</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


