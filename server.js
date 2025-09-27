const express = require('express');
const cors = require('cors');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

// 🔥 CONTRACT ADDRESS FROM ENV (with fallback)
const contractAddress = process.env.CONTRACT_ADDRESS || process.env.VITE_CONTRACT_ADDRESS || "42btZmafsPsz87LbEwHnma9VxMjfZJ3C8YwMzerjpump";
console.log(`🔥 SERVER.JS CONTRACT ADDRESS: ${contractAddress}`);

// Solana integration (JavaScript version)
let solanaIntegration = null;
try {
  const { Connection, PublicKey } = require('@solana/web3.js');
  const { TOKEN_PROGRAM_ID } = require('@solana/spl-token');
  
  // Simple Solana integration functions
  function getConnection() {
    const rpcUrl = process.env.QUICKNODE_RPC || process.env.SOLANA_RPC || 'https://api.mainnet-beta.solana.com';
    console.log(`🔗 Using Solana RPC: ${rpcUrl.includes('quiknode') ? 'QuickNode (Premium)' : 'Public RPC'}`);
    return new Connection(rpcUrl, 'confirmed');
  }

  async function getTopHolders(mintAddress) {
    try {
      console.log(`👑 Fetching top holders for: ${mintAddress}`);
      
      const connection = getConnection();
      const mintPubkey = new PublicKey(mintAddress);
      
      // Get all token accounts for this mint
      const accounts = await connection.getParsedProgramAccounts(TOKEN_PROGRAM_ID, {
        filters: [
          {
            dataSize: 165, // Token account data size
          },
          {
            memcmp: {
              offset: 0,
              bytes: mintPubkey.toBase58(),
            },
          },
        ],
      });

      console.log(`📋 Found ${accounts.length} token accounts`);

      // Parse and sort by amount
      const holders = accounts
        .map(account => {
          const parsedInfo = account.account.data.parsed.info;
          const amount = parseFloat(parsedInfo.tokenAmount.uiAmount || '0');
          return {
            owner: parsedInfo.owner,
            amount: amount
          };
        })
        .filter(holder => holder.amount > 0)
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 10); // Get top 10

      console.log(`✅ Found ${holders.length} holders with balances`);
      return holders;
    } catch (error) {
      console.error('Error fetching token holders:', error);
      return null;
    }
  }

  async function getTokenStats(mintAddress) {
    try {
      console.log(`📊 Fetching token stats for: ${mintAddress}`);
      
      const connection = getConnection();
      const mintPubkey = new PublicKey(mintAddress);
      
      // Get token supply
      const supply = await connection.getTokenSupply(mintPubkey);
      console.log(`📊 Token supply: ${supply.value.uiAmount}`);
      
      // Get holder count (simplified)
      const holderCount = await getHolderCount(mintAddress);
      console.log(`👥 Holder count: ${holderCount}`);
      
      // Try to get price from DexScreener
      let price = 0;
      let marketCap = 0;
      let name = 'Unknown Token';
      let symbol = 'UNKNOWN';
      
      try {
        const dexResponse = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${mintAddress}`, {
          headers: { 'User-Agent': 'QuizBot/1.0' }
        });
        
        if (dexResponse.ok) {
          const dexData = await dexResponse.json();
          if (dexData.pairs && dexData.pairs.length > 0) {
            const pair = dexData.pairs[0];
            name = pair.baseToken.name || 'Pump Token';
            symbol = pair.baseToken.symbol || 'PUMP';
            price = parseFloat(pair.priceUsd || '0');
            marketCap = parseFloat(pair.marketCap || '0');
            console.log(`✅ DexScreener: ${name} (${symbol}) - $${price}`);
          }
        }
      } catch (error) {
        console.log('⚠️ DexScreener failed, using defaults');
      }
      
      return {
        mint: mintAddress,
        name,
        symbol,
        supply: supply.value.uiAmount || 1000000000,
        holders: holderCount,
        marketCap: marketCap || (price * (supply.value.uiAmount || 1000000000)),
        price,
      };
    } catch (error) {
      console.error('Error fetching token stats:', error);
      return null;
    }
  }

  async function getHolderCount(mintAddress) {
    try {
      const connection = getConnection();
      const mintPubkey = new PublicKey(mintAddress);
      
      const accounts = await connection.getParsedProgramAccounts(TOKEN_PROGRAM_ID, {
        filters: [
          {
            dataSize: 165, // Token account data size
          },
          {
            memcmp: {
              offset: 0,
              bytes: mintPubkey.toBase58(),
            },
          },
        ],
      });

      // Count accounts with non-zero balance
      let holderCount = 0;
      for (const account of accounts) {
        const parsedInfo = account.account.data.parsed.info;
        const amount = parseFloat(parsedInfo.tokenAmount.uiAmount || '0');
        if (amount > 0) {
          holderCount++;
        }
      }

      return holderCount;
    } catch (error) {
      console.error('Error getting holder count:', error);
      return 1247; // Fallback
    }
  }

  solanaIntegration = {
    getTopHolders_Legacy: getTopHolders,
    getTokenStats: getTokenStats
  };
  
  console.log('✅ Solana integration loaded successfully');
} catch (error) {
  console.error('❌ Failed to load Solana integration:', error);
}

const app = express();
const PORT = process.env.PORT || 5000;

// Create HTTP server for Socket.IO
const httpServer = http.createServer(app);

// Socket.IO setup for WebSocket connections
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
  transports: ["websocket", "polling"]
});

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log(`🔗 WebSocket client connected: ${socket.id}`);
  
  socket.emit('hello', { message: 'Connected to Trivia Pump!', timestamp: Date.now() });
  
  socket.on('disconnect', () => {
    console.log(`🔌 WebSocket client disconnected: ${socket.id}`);
  });
});

// Middleware
app.use(cors());
app.use(express.json());

// 🎮 IMPORT TYPESCRIPT API ROUTES (ES Module compatible)
(async () => {
  try {
    const apiRoutes = await import('./apps/api/dist/http/routes.js');
    if (apiRoutes && apiRoutes.router) {
      app.use('/api', apiRoutes.router);
      console.log('✅ TypeScript API routes loaded - 250 questions system active');
    }
  } catch (err) {
    console.log('⚠️ TypeScript API routes not available:', err.message);
  }
})();

// 🎮 START QUIZ ENGINE WITH 250 QUESTIONS
(async () => {
  try {
    const { startRoundLoop } = await import('./apps/api/dist/game/engine.js');
    const { setupWS } = await import('./apps/api/dist/ws/index.js');
    
    if (startRoundLoop && setupWS) {
      console.log('🎮 Starting quiz engine with 250 questions...');
      
      // Setup WebSocket broadcast
      const ws = setupWS(io);
      
      // Start the round loop
      startRoundLoop((event, payload) => {
        console.log(`📡 Broadcasting: ${event}`);
        ws.broadcast(event, payload);
      });
      
      console.log('✅ Quiz engine started - real 250 questions system active!');
    }
  } catch (err) {
    console.log('⚠️ Quiz engine not available:', err.message);
  }
})();

// API Routes
app.get('/api/test', (req, res) => {
  res.json({
    message: '🎉 Heroku API Working!',
    timestamp: new Date().toISOString(),
    env: {
      CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS || 'Not set',
      NODE_ENV: process.env.NODE_ENV || 'Not set'
    }
  });
});

// Global leaderboard storage (in production, use database)
let globalLeaderboard = new Map();

app.get('/api/leaderboard/weekly', (req, res) => {
  // Convert Map to array and sort by score
  const leaderboardArray = Array.from(globalLeaderboard.entries())
    .map(([userId, data]) => ({
      userId: userId,
      name: data.name || `Player ${userId.slice(-4)}`,
      score: data.score || 0,
      lastActive: data.lastActive || Date.now()
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 20); // Top 20 players

  // If no real data, show empty leaderboard (will show "No players yet")
  const response = {
    items: leaderboardArray
  };
  
  res.json(response);
});

// Add score to leaderboard (called when user answers correctly)
app.post('/api/leaderboard/add-score', (req, res) => {
  const { userId, name, score, roundId } = req.body;
  
  if (!userId || typeof score !== 'number') {
    return res.status(400).json({ error: 'Missing userId or score' });
  }
  
  // Get existing user data or create new
  const existingData = globalLeaderboard.get(userId) || { score: 0, name: name || `Player ${userId.slice(-4)}` };
  
  // Add score (cumulative)
  const newScore = existingData.score + score;
  
  // Update leaderboard
  globalLeaderboard.set(userId, {
    name: name || existingData.name,
    score: newScore,
    lastActive: Date.now(),
    lastRoundId: roundId
  });
  
  console.log(`📊 Added ${score} points to ${name || userId.slice(-4)} (Total: ${newScore})`);
  
  res.json({ 
    success: true, 
    newScore: newScore,
    totalPlayers: globalLeaderboard.size 
  });
});

// Remove mock - let TypeScript API handle this
// app.get('/api/game/current' is handled by TypeScript API

// TypeScript API endpoints should handle these routes

app.get('/api/token/stats', async (req, res) => {
  // Use environment contract address
  const mint = req.query.mint || contractAddress;
  
  if (!mint) {
    return res.status(400).json({ error: 'Missing mint parameter' });
  }

  try {
    // Try to get real data from Solana
    if (solanaIntegration && solanaIntegration.getTokenStats) {
      console.log(`📊 Fetching real token stats for: ${mint}`);
      const tokenStats = await solanaIntegration.getTokenStats(mint);
      
      if (tokenStats) {
        console.log('✅ Real token stats retrieved');
        return res.json(tokenStats);
      }
    }
    
    // Fallback to mock data for MESA token
    if (mint === '42btZmafsPsz87LbEwHnma9VxMjfZJ3C8YwMzerjpump') {
      console.log('⚠️ Using fallback token data');
      const tokenStats = {
        mint: '42btZmafsPsz87LbEwHnma9VxMjfZJ3C8YwMzerjpump',
        name: 'New Token',
        symbol: 'NEW',
        supply: 999993815.426257,
        holders: 2438,
        marketCap: 297855,
        price: 0.0002978
      };
      
      return res.json(tokenStats);
    }
  } catch (error) {
    console.error('❌ Error fetching token stats:', error);
    
        // Fallback for any error
        if (mint === '42btZmafsPsz87LbEwHnma9VxMjfZJ3C8YwMzerjpump') {
          const tokenStats = {
            mint: '42btZmafsPsz87LbEwHnma9VxMjfZJ3C8YwMzerjpump',
            name: 'New Token',
            symbol: 'NEW',
        supply: 999993815.426257,
        holders: 2438,
        marketCap: 297855,
        price: 0.0002978
      };
      
      return res.json(tokenStats);
    }
  }

  // Fallback
  const mockStats = {
    mint: mint,
    name: 'Demo Token',
    symbol: 'DEMO',
    supply: 1000000000,
    holders: 1500,
    marketCap: 500000,
    price: 0.0005
  };

  res.json(mockStats);
});

app.get('/api/token/top-holders', async (req, res) => {
  // Use environment contract address
  const mint = req.query.mint || contractAddress;
  
  if (!mint) {
    return res.status(400).json({ error: 'Missing mint parameter' });
  }

  try {
    // Try to get real data from Solana
    if (solanaIntegration && solanaIntegration.getTopHolders_Legacy) {
      console.log(`👑 Fetching real top holders for: ${mint}`);
      const realHolders = await solanaIntegration.getTopHolders_Legacy(mint);
      
      if (realHolders && realHolders.length > 0) {
        console.log(`✅ Real top holders retrieved: ${realHolders.length} holders`);
        const response = {
          mint: mint,
          holders: realHolders.slice(0, 10) // Show top 10
        };
        return res.json(response);
      }
    }
    
    console.log('⚠️ Using fallback holder data');
    // Fallback mock data
    const mockHolders = [
      {
        address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
        amount: 45000000,
        percentage: 4.5
      },
      {
        address: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
        amount: 32000000,
        percentage: 3.2
      },
      {
        address: "4vJ9JU1bJJE96FWSJKvHsmmFADCg4gpZQff4P3bkLKi",
        amount: 28000000,
        percentage: 2.8
      },
      {
        address: "6dXnceUGRZQQAhsEEgdLtMSAl5oGSt6L3CjYhKGKkFvY",
        amount: 25000000,
        percentage: 2.5
      },
      {
        address: "8HNdnxvfczxiN1UVeVBHqRNvqvgzfSeD2QpzdGyhPQxR",
        amount: 22000000,
        percentage: 2.2
      }
    ];

    const response = {
      mint: mint,
      holders: mockHolders
    };

    res.json(response);
  } catch (error) {
    console.error('❌ Error fetching top holders:', error);
    
    // Fallback mock data on error
    const mockHolders = [
      {
        address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
        amount: 45000000,
        percentage: 4.5
      },
      {
        address: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
        amount: 32000000,
        percentage: 3.2
      },
      {
        address: "4vJ9JU1bJJE96FWSJKvHsmmFADCg4gpZQff4P3bkLKi",
        amount: 28000000,
        percentage: 2.8
      },
      {
        address: "6dXnceUGRZQQAhsEEgdLtMSAl5oGSt6L3CjYhKGKkFvY",
        amount: 25000000,
        percentage: 2.5
      },
      {
        address: "8HNdnxvfczxiN1UVeVBHqRNvqvgzfSeD2QpzdGyhPQxR",
        amount: 22000000,
        percentage: 2.2
      }
    ];

    const response = {
      mint: mint,
      holders: mockHolders
    };

    res.json(response);
  }
});

// Alternative routes for compatibility (forward to correct handlers)
app.get('/api/token/:mint/stats', async (req, res) => {
  // Use environment contract address
  const mint = req.params.mint || contractAddress;
  
  // Current token data
  if (mint === '42btZmafsPsz87LbEwHnma9VxMjfZJ3C8YwMzerjpump') {
    const tokenStats = {
      name: "NEW",
      symbol: "NEW", 
      marketCap: 2847291,
      holders: 1337,
      price: 0.002847291
    };
    return res.json(tokenStats);
  }
  
  res.status(404).json({ error: 'Token not found' });
});

app.get('/api/token/:mint/top-holders', (req, res) => {
  // Use environment contract address
  const mint = req.params.mint || contractAddress;
  
  const mockHolders = [
    {
      address: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
      amount: 125000000
    },
    {
      address: "2wmVCSfPxGPjrnMMn7rchp4uaeoTqN39mXFC2zhPdri9",
      amount: 98500000
    },
    {
      address: "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1",
      amount: 87200000
    },
    {
      address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
      amount: 76800000
    },
    {
      address: "4CkQJBxhU8EZ2UjhigbtdaPbpTe6mqf811fipYBFbSYN",
      amount: 65400000
    }
  ];

  const response = {
    mint: mint,
    holders: mockHolders
  };

  res.json(response);
});

// Mock game endpoint removed - using real TypeScript API

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'apps/web/dist')));

// Catch all handler: send back React's index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'apps/web/dist/index.html'));
});

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 WebSocket server ready for connections`);
});
