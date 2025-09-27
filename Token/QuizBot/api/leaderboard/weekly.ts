import type { VercelRequest, VercelResponse } from '@vercel/node';

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
    // Mock leaderboard data for now
    const mockLeaderboard = [
      { id: "user1", score: 150, rank: 1 },
      { id: "user2", score: 120, rank: 2 },
      { id: "user3", score: 100, rank: 3 },
      { id: "user4", score: 85, rank: 4 },
      { id: "user5", score: 70, rank: 5 },
      { id: "user6", score: 55, rank: 6 }
    ];

    res.status(200).json(mockLeaderboard);
  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
