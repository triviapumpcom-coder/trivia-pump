const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

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

app.get('/api/leaderboard/weekly', (req, res) => {
  const mockLeaderboard = [
    { id: "user1", score: 150, rank: 1 },
    { id: "user2", score: 120, rank: 2 },
    { id: "user3", score: 100, rank: 3 },
    { id: "user4", score: 85, rank: 4 },
    { id: "user5", score: 70, rank: 5 },
    { id: "user6", score: 55, rank: 6 }
  ];
  res.json(mockLeaderboard);
});

app.get('/api/game/current', (req, res) => {
  const mockGameState = {
    id: "round_" + Date.now(),
    question: "What is the largest cryptocurrency by market cap?",
    options: ["Bitcoin", "Ethereum", "Solana", "Cardano"],
    endsAt: Date.now() + 30000,
    durationSec: 30,
    category: "Crypto",
    difficulty: "easy",
    phase: "question",
    optionStats: { A: 5, B: 3, C: 1, D: 2 },
    totalAnswers: 11
  };
  res.json(mockGameState);
});

app.get('/api/events/recent', (req, res) => {
  const mockEvents = [
    {
      id: "event_1",
      type: "answer",
      text: "@user123 answered A",
      timestamp: Date.now() - 5000,
      userId: "user123",
      choice: "A",
      status: "accepted",
      roundId: "round_1"
    },
    {
      id: "event_2", 
      type: "answer",
      text: "@user456 answered B",
      timestamp: Date.now() - 3000,
      userId: "user456",
      choice: "B", 
      status: "accepted",
      roundId: "round_1"
    }
  ];
  res.json(mockEvents);
});

app.get('/api/winners/recent', (req, res) => {
  const mockWinners = [
    {
      id: "winner_1",
      userId: "user123",
      roundId: "round_1",
      correctAnswers: 15,
      latency: 2.3,
      timestamp: Date.now() - 60000
    },
    {
      id: "winner_2", 
      userId: "user456",
      roundId: "round_2",
      correctAnswers: 12,
      latency: 3.1,
      timestamp: Date.now() - 120000
    }
  ];
  res.json(mockWinners);
});

app.get('/api/token/stats', async (req, res) => {
  const { mint } = req.query;
  
  if (!mint) {
    return res.status(400).json({ error: 'Missing mint parameter' });
  }

  // MESA token data
  if (mint === '5wVtfsFhLjxm27K9mN3ziYWCCpQwXXq7HWUiRMW7pump') {
    const tokenStats = {
      mint: '5wVtfsFhLjxm27K9mN3ziYWCCpQwXXq7HWUiRMW7pump',
      name: 'Black Mesa Research Facility',
      symbol: 'MESA',
      supply: 999993815.426257,
      holders: 2438,
      marketCap: 297855,
      price: 0.0002978
    };
    
    return res.json(tokenStats);
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

app.get('/api/token/top-holders', (req, res) => {
  const { mint } = req.query;
  
  if (!mint) {
    return res.status(400).json({ error: 'Missing mint parameter' });
  }

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
});

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'apps/web/dist')));

// Catch all handler: send back React's index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'apps/web/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
