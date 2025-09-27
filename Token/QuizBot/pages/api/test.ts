import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  res.status(200).json({
    message: '🎉 Vercel API Functions Working!',
    timestamp: new Date().toISOString(),
    env: {
      CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS || 'Not set',
      QUICKNODE_RPC: process.env.QUICKNODE_RPC ? 'Set' : 'Not set',
      NODE_ENV: process.env.NODE_ENV || 'Not set'
    }
  });
}
