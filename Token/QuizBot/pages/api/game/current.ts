import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
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
    // Mock current game state
    const mockGameState = {
      id: "round_" + Date.now(),
      question: "What is the largest cryptocurrency by market cap?",
      options: ["Bitcoin", "Ethereum", "Solana", "Cardano"],
      endsAt: Date.now() + 30000, // 30 seconds from now
      durationSec: 30,
      category: "Crypto",
      difficulty: "easy",
      phase: "question",
      optionStats: { A: 5, B: 3, C: 1, D: 2 },
      totalAnswers: 11
    };

    res.status(200).json(mockGameState);
  } catch (error) {
    console.error('Game current error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
