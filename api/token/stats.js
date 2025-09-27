export default async function handler(req, res) {
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
    
    return res.status(200).json(tokenStats);
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

  res.status(200).json(mockStats);
}
