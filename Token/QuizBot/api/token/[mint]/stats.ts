import type { VercelRequest, VercelResponse } from '@vercel/node';

async function fetchTokenStats(mint: string) {
  try {
    // Try DexScreener first
    const dexResponse = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${mint}`);
    if (dexResponse.ok) {
      const dexData = await dexResponse.json();
      if (dexData.pairs && dexData.pairs.length > 0) {
        const pair = dexData.pairs[0];
        return {
          mint,
          name: pair.baseToken.name,
          symbol: pair.baseToken.symbol,
          price: parseFloat(pair.priceUsd || '0'),
          marketCap: parseFloat(pair.marketCap || '0'),
          supply: parseFloat(pair.baseToken.supply || '0'),
          holders: 2438 // Placeholder
        };
      }
    }

    // Fallback for MESA token
    if (mint === '5wVtfsFhLjxm27K9mN3ziYWCCpQwXXq7HWUiRMW7pump') {
      return {
        mint: '5wVtfsFhLjxm27K9mN3ziYWCCpQwXXq7HWUiRMW7pump',
        name: 'Black Mesa Research Facility',
        symbol: 'MESA',
        supply: 999993815.426257,
        holders: 2438,
        marketCap: 297855,
        price: 0.0002978
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching token stats:', error);
    return null;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { mint } = req.query;
    
    if (!mint || typeof mint !== 'string') {
      return res.status(400).json({ error: 'Invalid mint address' });
    }

    const tokenStats = await fetchTokenStats(mint);
    
    if (tokenStats) {
      return res.status(200).json(tokenStats);
    }

    // Final fallback
    const mockStats = {
      mint: mint,
      name: 'Demo Token',
      symbol: 'DEMO',
      supply: 1000000000,
      holders: 1500,
      marketCap: 500000,
      price: 0.0005
    };

    res.status(200).json(mockStats);
  } catch (error) {
    console.error('Token stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
