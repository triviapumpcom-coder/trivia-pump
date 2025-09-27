import React from "react";
import { useState, useEffect } from 'react';
import { SoundToggle } from "./SoundToggle";

interface TokenStats {
  name: string;
  symbol: string;
  marketCap: number;
  holders: number;
  price: number;
}

export function HeaderBar(): JSX.Element {
  // Use environment variable with fallback
  const contract = (import.meta as any).env?.VITE_CONTRACT_ADDRESS || "42btZmafsPsz87LbEwHnma9VxMjfZJ3C8YwMzerjpump";
  
  const [tokenStats, setTokenStats] = useState<TokenStats | null>(null);
  const [loading, setLoading] = useState(true);
  
  const short = (s?: string) => (s && s.length > 12 ? `${s.slice(0, 6)}…${s.slice(-6)}` : s || "N/A");

  // Fetch token stats
  useEffect(() => {
    
    const fetchTokenStats = async () => {
      if (!contract || contract === 'demo') {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const response = await fetch(`/api/token/stats?mint=${contract}`);
        
        if (response.ok) {
          const stats = await response.json();
          setTokenStats(stats);
        }
      } catch (error) {
        // Silent error handling
      } finally {
        setLoading(false);
      }
    };

    fetchTokenStats();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchTokenStats, 30000);
    return () => clearInterval(interval);
  }, [contract]);

  const formatMarketCap = (value: number) => {
    if (!value || value === 0) return 'Loading...';
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value.toFixed(0)}`;
  };

  const formatHolders = (count: number) => {
    if (!count || count === 0) return 'Loading...';
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="rounded-xl bg-black/40 border border-white/10 p-2">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <div className="px-1.5 py-0.5 rounded bg-red-600 text-white text-xs">LIVE</div>
          <img src="/trivia-logo.png" alt="Trivia Pump" className="w-6 h-6" />
          <h1 className="text-sm font-bold text-white">Trivia Pump Stream</h1>
        </div>
        
            <div className="flex items-center gap-2">
              <SoundToggle />
              <a
                href="https://x.com/TriviaPump"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 bg-black/30 hover:bg-black/50 rounded border border-white/20 transition-colors"
                title="Follow @TriviaPump on X"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <div className="text-xs text-white/60 bg-black/30 px-2 py-1 rounded border border-white/20">
                Chat: /background
              </div>
            </div>
      </div>
      
      {tokenStats && !loading && (
        <div className="flex items-center justify-center gap-2 text-xs text-gray-400 bg-black/20 rounded-lg p-1">
          <span className="text-green-400 font-semibold">{tokenStats.symbol}</span>
          <span className="text-yellow-400">{tokenStats.price && tokenStats.price > 0 ? `$${tokenStats.price.toFixed(6)}` : 'Loading...'}</span>
          <span className="text-blue-400">{formatMarketCap(tokenStats.marketCap)} MC</span>
          <span className="text-purple-400">{formatHolders(tokenStats.holders)} holders</span>
          {/* DEBUG: Show all API values */}
          <span className="text-red-500 bg-red-500/20 px-1 rounded text-xs">DEBUG: {JSON.stringify(tokenStats)}</span>
          
          {/* Contract Address with Copy */}
          <div className="flex items-center gap-1 bg-black/30 px-1.5 py-0.5 rounded border border-white/20">
            <span className="text-white/90 font-mono text-xs">
              {contract && contract !== 'demo' ? (
                <>
                  <span className="hidden sm:inline">{contract}</span>
                  <span className="sm:hidden">{short(contract)}</span>
                </>
              ) : 'Demo'}
            </span>
            <button
              onClick={() => {
                if (contract && contract !== 'demo') {
                  navigator.clipboard.writeText(contract);
                  // Simple feedback - you could add a toast here
                }
              }}
              className="text-white/60 hover:text-white/90 transition-colors"
              title="Copy contract address"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
          </div>
        </div>
      )}
      
      {loading && contract && contract !== 'demo' && (
        <div className="flex items-center justify-center text-xs text-gray-500 bg-black/20 rounded-lg p-1">
          <div className="animate-pulse">Loading token data...</div>
        </div>
      )}
    </div>
  );
}


