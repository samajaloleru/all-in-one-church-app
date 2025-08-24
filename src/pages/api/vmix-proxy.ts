import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow GET requests for security
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { host, port, ...queryParams } = req.query;
  
  if (!host || !port) {
    return res.status(400).json({ error: 'Host and port parameters are required' });
  }

  try {
    // Construct the V-Mix API URL
    const queryString = new URLSearchParams(queryParams as Record<string, string>).toString();
    const vmixUrl = `http://${host}:${port}/api?${queryString}`;
    
    // Forward the request to V-Mix
    const response = await fetch(vmixUrl);
    
    if (!response.ok) {
      throw new Error(`V-Mix API responded with status ${response.status}`);
    }
    
    // Return the response from V-Mix
    const data = await response.text();
    res.status(200).send(data);
  } catch (error) {
    console.error('V-Mix proxy error:', error);
    res.status(500).json({ error: 'Failed to connect to V-Mix' });
  }
}