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

  res.status(200).json(response);
}
