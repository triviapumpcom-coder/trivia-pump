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

  res.status(200).json(mockEvents);
}
