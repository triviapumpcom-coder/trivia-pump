import { Router } from "express";
import { Connection, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { getRedis } from "../lib/redis";
import { getTopHolders, getTokenStats } from "../integrations/solana";
import { getCurrentRoundId } from "../game/current";

export const router = Router();

// Debug middleware
router.use((req, res, next) => {
  console.log(`🔍 Route hit: ${req.method} ${req.path}`);
  next();
});

// Simple test route
router.get("/test", (req, res) => {
  console.log('✅ Simple test route hit');
  res.json({ message: 'Router working', timestamp: new Date().toISOString() });
});

router.get("/leaderboard/weekly", async (req, res) => {
  try {
    const limit = Number(req.query.limit ?? 50);
    const redis = getRedis();
    
    const flat = await (redis as any).zrevrange("scores:weekly", 0, limit - 1, "WITHSCORES");
    const items: Array<{ userId: string; name: string; score: number }> = [];
    for (let i = 0; i < flat.length; i += 2) {
      const userId = flat[i];
      const score = Number(flat[i + 1] ?? 0);
      items.push({ userId, name: `Player ${userId.slice(-4)}`, score }); // Default name for now
    }
    
    res.json({ items });
  } catch (error) {
    console.error("Error fetching weekly leaderboard:", error);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});

// QuickNode test endpoint
router.get("/token/:mint/test", async (req, res) => {
  const mint = req.params.mint;
  console.log(`🧪 QuickNode test for: ${mint}`);
  
  try {
    const rpcUrl = process.env.QUICKNODE_RPC || 'https://api.mainnet-beta.solana.com';
    console.log(`🔗 Using RPC: ${rpcUrl.substring(0, 50)}...`);
    
    const connection = new Connection(rpcUrl, 'confirmed');
    const mintPk = new PublicKey(mint);
    
    // Test basic RPC call
    const supply = await connection.getTokenSupply(mintPk);
    console.log(`✅ Token supply: ${supply.value.uiAmount}`);
    
    res.json({ 
      message: 'QuickNode test successful',
      mint,
      supply: supply.value.uiAmount,
      rpcUsed: rpcUrl.includes('quiknode') ? 'QuickNode' : 'Public RPC',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ QuickNode test failed:', error);
    res.status(500).json({ 
      error: 'QuickNode test failed',
      details: error instanceof Error ? error.message : String(error),
      mint
    });
  }
});

// Token statistics endpoint
router.get("/token/:mint/stats", async (req, res) => {
  try {
    const mint = req.params.mint;
    console.log(`📊 Token stats requested for: ${mint}`);
    
    console.log('🔍 Calling getTokenStats...');
    const stats = await getTokenStats(mint);
    console.log('📊 getTokenStats result:', stats);
    
    if (!stats) {
      console.log('❌ No stats returned from getTokenStats. Using QuickNode direct fallback.');
      try {
        const rpcUrl = process.env.QUICKNODE_RPC || process.env.SOLANA_RPC || 'https://api.mainnet-beta.solana.com';
        const connection = new Connection(rpcUrl, 'confirmed');
        const mintPk = new PublicKey(mint);

        // Supply
        const supplyResp = await connection.getTokenSupply(mintPk);
        const supply = supplyResp.value.uiAmount || 0;

        // Holders (count non-zero token accounts)
        const accounts = await connection.getParsedProgramAccounts(TOKEN_PROGRAM_ID, {
          filters: [
            { dataSize: 165 },
            { memcmp: { offset: 0, bytes: mintPk.toBase58() } },
          ],
        });
        let holders = 0;
        for (const acc of accounts) {
          const info: any = (acc.account.data as any).parsed.info;
          const amt = parseFloat(info.tokenAmount.uiAmount || '0');
          if (amt > 0) holders++;
        }

        const fallback = {
          mint,
          name: 'Pump Token',
          symbol: 'PUMP',
          supply,
          holders,
          marketCap: 0,
          price: 0,
        };
        console.log('✅ QuickNode fallback stats:', fallback);
        return res.json(fallback);
      } catch (e) {
        console.error('❌ QuickNode fallback failed:', e);
        return res.status(404).json({ error: 'Token not found' });
      }
    }
    
    console.log('✅ Returning token stats:', stats);
    res.json(stats);
  } catch (error) {
    console.error('❌ Error in token stats route:', error);
    console.error('❌ Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    res.status(500).json({ error: 'Failed to fetch token stats' });
  }
});

router.get("/token/:mint/top-holders", async (req, res) => {
  try {
    const mint = req.params.mint;
    console.log(`👑 Top holders requested for: ${mint}`);
    
    const redis = getRedis();
    const cacheKey = `token:holders:${mint}`;
    const exists = await (redis as any).exists(cacheKey);
    if (exists) {
      // naive memory redis keeps only existence; real Redis would return value. For demo, bypass.
    }
    const holders = await getTopHolders(mint);
    await (redis as any).setex(cacheKey, 30, JSON.stringify(holders));
    
    // Format for frontend compatibility
    const formattedHolders = holders.map(holder => ({
      address: holder.address,
      amount: holder.amount,
      percentage: holder.percentage
    }));
    
    res.json({ mint, holders: formattedHolders });
  } catch (error) {
    console.error('Error fetching top holders:', error);
    res.status(500).json({ error: 'Failed to fetch top holders' });
  }
});

router.get("/me", (_req, res) => {
  res.json(null);
});

router.get("/health", (_req, res) => {
  res.json({ 
    ok: true, 
    version: process.env.npm_package_version || '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

router.get("/game/current", async (_req, res) => {
  try {
    const currentRoundId = getCurrentRoundId();
    if (!currentRoundId) {
      return res.json({ round: null, events: [], winners: [] });
    }

    const redis = getRedis();
    const roundKey = `round:${currentRoundId}`;
    const roundData = await (redis as any).hgetall(roundKey);
    
    if (!roundData || !roundData.question) {
      return res.json({ round: null, events: [], winners: [] });
    }

    // Get current round answers for statistics
    const answersKey = `answers:${currentRoundId}`;
    const answers = await (redis as any).hgetall(answersKey);
    const optionStats = { A: 0, B: 0, C: 0, D: 0 };
    Object.values(answers).forEach((choice: any) => {
      if (optionStats[choice as keyof typeof optionStats] !== undefined) {
        optionStats[choice as keyof typeof optionStats]++;
      }
    });

    const round = {
      roundId: currentRoundId,
      question: roundData.question,
      options: JSON.parse(roundData.options || '["A", "B", "C", "D"]'),
      endsAt: parseInt(roundData.endsAt || '0'),
      durationSec: parseInt(roundData.durationSec || '30'),
      category: roundData.category || 'General',
      difficulty: roundData.difficulty || 'medium',
      media: JSON.parse(roundData.media || '[]'),
      status: 'running'
    };

    res.json({ 
      round, 
      optionStats,
      totalAnswers: Object.keys(answers).length
    });
  } catch (error) {
    console.error('Error fetching current game state:', error);
    res.json({ round: null, events: [], winners: [] });
  }
});

// Recent events endpoint
router.get("/events/recent", async (_req, res) => {
  try {
    const redis = getRedis();
    const events = await (redis as any).lrange("events:recent", 0, 19);
    const parsedEvents = events.map((e: string) => JSON.parse(e)).reverse();
    res.json({ events: parsedEvents });
  } catch (error) {
    console.error('Error fetching recent events:', error);
    res.json({ events: [] });
  }
});

// Recent winners endpoint  
router.get("/winners/recent", async (_req, res) => {
  try {
    const redis = getRedis();
    const winners = await (redis as any).lrange("winners:recent", 0, 9);
    const parsedWinners = winners.map((w: string) => JSON.parse(w)).reverse();
    res.json({ winners: parsedWinners });
  } catch (error) {
    console.error('Error fetching recent winners:', error);
    res.json({ winners: [] });
  }
});


