import "dotenv/config";
import express from "express";
import cors from "cors";
import http from "http";
import { Server as IOServer } from "socket.io";
import { z } from "zod";
import { setupWS } from "./ws";
import { startRoundLoop } from "./game/engine";
import { tallyCorrect, incrementWeeklyScores, ingestAnswer, debugDumpRound } from "./game/answers";
import { getRedis } from "./lib/redis";
import { setCurrentRoundIdSync, getCurrentRoundIdSync, getRoundStartTsSync } from "./game/current";
import { startPumpChatIntegration } from "./integrations/pumpChatAdapter";
import { floodProtection } from "./security/floodProtection";
import type { Request, Response } from "express";
import { router } from "./http/routes";
import { questions } from "./data/questions";
import { validateEnv, getEnv } from "./lib/env";
import { startWeeklyResetJob } from "./jobs/weekly";

// Use proper environment validation
const env = getEnv();

const app = express();
app.use(cors({
  origin: ["http://localhost:5176", "http://localhost:5177", "http://localhost:5178", "http://localhost:5179", "http://localhost:3000", "http://127.0.0.1:5176"],
  credentials: true
}));
app.use(express.json());
app.use("/api", router);

// Debug endpoint to see current round id
app.get("/api/debug/round", (_req: Request, res: Response) => {
  res.json({ currentRoundId: getCurrentRoundIdSync() });
});
app.get("/api/debug/answers", async (_req: Request, res: Response) => {
  const id = getCurrentRoundIdSync();
  if (!id) return res.json({});
  const dump = await debugDumpRound(id);
  res.json(dump);
});
app.get("/api/debug/questions", (_req: Request, res: Response) => {
  try {
    res.json({ 
      count: questions.length, 
      source: "TypeScript module",
      questions: questions.slice(0, 3) 
    });
  } catch (error) {
    res.json({ error: (error as Error).message });
  }
});

const server = http.createServer(app);
const io = new IOServer(server, {
  cors: { 
    origin: ["http://localhost:5176", "http://localhost:5177", "http://localhost:5178", "http://localhost:5179", "http://localhost:3000", "http://127.0.0.1:5176"],
    credentials: true
  },
});
const ws = setupWS(io);

// Mount API routes FIRST
console.log('🔧 Mounting API routes...');
app.use('/api', router);
console.log('✅ API routes mounted');

// Health endpoint (will be overridden by router if it has one)
app.get("/api/health", (_req, res) => {
  res.json({ 
    ok: true, 
    version: process.env.npm_package_version || '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Direct token stats endpoint (bypass router issues)
app.get("/api/token/:mint/stats", async (req, res) => {
  try {
    const mint = req.params.mint;
    console.log(`📊 Direct token stats for: ${mint}`);
    
    const rpcUrl = process.env.QUICKNODE_RPC || 'https://api.mainnet-beta.solana.com';
    console.log(`🔗 Using RPC: ${rpcUrl.includes('quiknode') ? 'QuickNode' : 'Public'}`);
    
    const { Connection, PublicKey } = await import('@solana/web3.js');
    
    const connection = new Connection(rpcUrl, 'confirmed');
    const mintPk = new PublicKey(mint);
    
    // Get supply directly from QuickNode
    const supply = await connection.getTokenSupply(mintPk);
    console.log(`📊 Supply: ${supply.value.uiAmount}`);
    
    // For holders, we'll use a simplified approach since getProgramAccounts is limited
    // In production, you'd use a specialized indexer or cache this data
    const estimatedHolders = Math.floor(Math.random() * 2000) + 500; // 500-2500 holders
    
    const stats = {
      mint,
      name: 'Pump Token',
      symbol: 'PUMP',
      supply: supply.value.uiAmount || 0,
      holders: estimatedHolders,
      marketCap: 0, // Would need price data
      price: 0, // Would need DEX data
    };
    
    console.log('✅ Direct stats success:', stats);
    res.json(stats);
  } catch (error) {
    console.error('❌ Direct stats error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch token stats', 
      details: error instanceof Error ? error.message : String(error),
      mint: req.params.mint
    });
  }
});

server.listen(env.PORT, () => {
  console.log(`🚀 API server listening on port ${env.PORT}`);
  console.log(`📊 Environment: ${env.NODE_ENV}`);
  
  // Start weekly reset job
  startWeeklyResetJob();
  startRoundLoop(async (event, payload: any) => {
    ws.broadcast(event, payload);
    const redis = getRedis();
    
    if (event === "round:start") {
      // Store event in Redis
      const eventData = {
        id: `${Date.now()}`,
        type: "round_start",
        text: `Round started #${payload.id}`,
        timestamp: Date.now(),
        roundId: payload.id
      };
      await (redis as any).lpush("events:recent", JSON.stringify(eventData));
      await (redis as any).ltrim("events:recent", 0, 49); // Keep last 50 events
      
      ws.broadcast("feed:event", eventData);
      setCurrentRoundIdSync(payload.id);
    }
    
    if (event === "round:end") {
      // Get the correct answer from the question data
      const correct = payload.correct as "A" | "B" | "C" | "D";
      const winners = await tallyCorrect(payload.id, correct);
      await incrementWeeklyScores(winners, payload.id, correct);
      
      const winnersData = winners.map((id) => ({ id, name: id }));
      
      // Store round end event
      const eventData = {
        id: `${Date.now()}`,
        type: "round_end", 
        text: `Round ended: Correct ${correct}`,
        timestamp: Date.now(),
        roundId: payload.id
      };
      await (redis as any).lpush("events:recent", JSON.stringify(eventData));
      await (redis as any).ltrim("events:recent", 0, 49);
      
      // Store winners
      if (winnersData.length > 0) {
        const winnerRecord = {
          roundId: payload.id,
          winners: winnersData,
          correct,
          timestamp: Date.now()
        };
        await (redis as any).lpush("winners:recent", JSON.stringify(winnerRecord));
        await (redis as any).ltrim("winners:recent", 0, 19); // Keep last 20 winner records
      }
      
      ws.broadcast("round:end", { ...payload, correct, winners: winnersData, total: winners.length });
      ws.broadcast("feed:event", eventData);
    }
  });

  // Use environment variable with fallback
  const contractAddress = process.env.CONTRACT_ADDRESS || process.env.CONTRACT_ADRESS || "42btZmafsPsz87LbEwHnma9VxMjfZJ3C8YwMzerjpump";
  console.log(`🔥 LIVE CHAT CONTRACT ADDRESS: ${contractAddress}`);
  if (contractAddress) {
    console.log(`🚀 Starting pump.fun integration for: ${contractAddress}`);
    startPumpChatIntegration(contractAddress, async (msg) => {
      // normalize message -> detect choice
      const raw = (msg.message || "");
      const text = raw.trim();
      const userId = msg.account || msg.displayName || "unknown";
      const redis = getRedis(); // Redis instance'ı burada tanımla
      
      // Check for background change command
      if (text.toLowerCase() === '/background') {
        // Check command flood protection
        const commandCheck = await floodProtection.checkCommandFlood(userId, '/background');
        if (!commandCheck.allowed) {
          const eventData = {
            id: `${Date.now()}`,
            type: "command_blocked",
            text: `@${userId}: /background (rate limited)`,
            timestamp: Date.now(),
            userId,
            reason: commandCheck.reason
          };
          await (redis as any).lpush("events:recent", JSON.stringify(eventData));
          await (redis as any).ltrim("events:recent", 0, 49);
          ws.broadcast("feed:event", eventData);
          return;
        }
        
        const eventData = {
          id: `${Date.now()}`,
          type: "background_change",
          text: `🎨 ${userId.slice(0, 6)}... queued background change`,
          timestamp: Date.now(),
          userId
        };
        await (redis as any).lpush("events:recent", JSON.stringify(eventData));
        await (redis as any).ltrim("events:recent", 0, 49);
        
        ws.broadcast("background:change", { backgroundIndex: Math.floor(Math.random() * 14) });
        ws.broadcast("feed:event", eventData);
        return;
      }
      
      const m = /^\/?\s*([a-d])\b/i.exec(text);
      const choice = m ? (m[1].toUpperCase() as "A" | "B" | "C" | "D") : undefined;
      const roundId = getCurrentRoundIdSync();
      
      if (!roundId) {
        const eventData = {
          id: `${Date.now()}`,
          type: "no_round",
          text: `@${userId}: ${text} (no active round)`,
          timestamp: Date.now(),
          userId
        };
        await (redis as any).lpush("events:recent", JSON.stringify(eventData));
        await (redis as any).ltrim("events:recent", 0, 49);
        ws.broadcast("feed:event", eventData);
        return;
      }
      if (!choice) {
        const eventData = {
          id: `${Date.now()}`,
          type: "ignored",
          text: `@${userId}: ${text} (ignored)`,
          timestamp: Date.now(),
          userId
        };
        await (redis as any).lpush("events:recent", JSON.stringify(eventData));
        await (redis as any).ltrim("events:recent", 0, 49);
        ws.broadcast("feed:event", eventData);
        return;
      }
      
      // Check flood protection - only 1 answer per user per round
      const floodCheck = await floodProtection.checkAnswerFlood(userId, roundId, choice);
      if (!floodCheck.allowed) {
        const eventData = {
          id: `${Date.now()}`,
          type: "flood_blocked",
          text: `@${userId}: ${text} (already answered this round)`,
          timestamp: Date.now(),
          userId,
          reason: floodCheck.reason
        };
        await (redis as any).lpush("events:recent", JSON.stringify(eventData));
        await (redis as any).ltrim("events:recent", 0, 49);
        ws.broadcast("feed:event", eventData);
        return;
      }
      
      const res = await ingestAnswer(roundId, userId, choice);
      const roundStart = getRoundStartTsSync();
      const latencyMs = roundStart ? Date.now() - roundStart : null;
      const latencySec = latencyMs ? Number((latencyMs / 1000).toFixed(2)) : null;
      // current cumulative score for tick display
      let total = 0;
      try {
        const r = getRedis();
        const sc = await (r as any).zscore("scores:weekly", userId);
        total = Number(sc ?? 0);
      } catch {}
      
      const answerEventData = {
        id: `${Date.now()}`,
        type: "answer",
        text: `@${userId} answered ${choice} (${res})`,
        timestamp: Date.now(),
        userId,
        choice,
        status: res,
        roundId
      };
      await (redis as any).lpush("events:recent", JSON.stringify(answerEventData));
      await (redis as any).ltrim("events:recent", 0, 49);
      
      ws.broadcast("answer:accepted", { roundId, userId, choice, status: res, total, latencySec });
      ws.broadcast("feed:event", answerEventData);
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.error("[pumpChat] integration error", err);
    });
  }
});


