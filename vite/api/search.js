export default async function handler(req, res) {
  const { q, limit = 100 } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Query parameter "q" is required' });
  }

  try {
    const limitValue = Math.min(parseInt(limit), 250);
    const response = await fetch(
      `https://api.deezer.com/search?q=${encodeURIComponent(q)}&limit=${limitValue}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Deezer API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    // Cache results at CDN level for 1 hour
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=59');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json(data);
  } catch (error) {
    console.error('Search error:', error);
    return res.status(502).json({ error: error.message || 'Failed to fetch from Deezer' });
  }
}
