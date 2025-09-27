export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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

  res.status(200).json(mockWinners);
}
