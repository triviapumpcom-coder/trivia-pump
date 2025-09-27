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
    const { mint } = req.query;
    
    if (!mint || typeof mint !== 'string') {
      return res.status(400).json({ error: 'Invalid mint address' });
    }

    // Mock top holders data
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
      },
      {
        address: "5Nc1tbVYPuCBit8CdD2k3Rk9RoWmVLysbhJ8YjVo9PVH",
        amount: 20000000,
        percentage: 2.0
      },
      {
        address: "3CZnSdjwdvaNa2BE4VqzZB1GfzuWLkeMx5Hm4C2bDDWr",
        amount: 18000000,
        percentage: 1.8
      },
      {
        address: "2B5UoYWdKHh6hLw14C2AuA5D3w5CZrVfxzdNzhvZAoVn",
        amount: 15000000,
        percentage: 1.5
      },
      {
        address: "9gF8VTHPFDqSCgxWgYdBzfHBw8L3xwHcfm4XqNzBtjWr",
        amount: 12000000,
        percentage: 1.2
      },
      {
        address: "4D7VtHGGnYvgdcuUsdiPawxJ5VqjLMfUBXhGgzBvFqxW",
        amount: 10000000,
        percentage: 1.0
      }
    ];

    const response = {
      mint: mint,
      holders: mockHolders
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Top holders error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
