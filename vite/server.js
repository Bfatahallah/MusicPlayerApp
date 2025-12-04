import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Enable CORS for all routes
app.use(cors());

// Search endpoint
app.get('/api/search', async (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({ error: 'Query parameter required' });
  }

  try {
    const deezerUrl = `https://api.deezer.com/search?q=${encodeURIComponent(q)}&limit=50`;
    console.log(`[Backend] Fetching from Deezer: ${deezerUrl}`);
    
    const response = await fetch(deezerUrl);
    
    if (!response.ok) {
      throw new Error(`Deezer API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`[Backend] Successfully fetched ${data.data?.length || 0} tracks`);
    
    res.json(data);
  } catch (error) {
    console.error(`[Backend] Search error: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🎵 Music Player Backend running on http://localhost:${PORT}`);
});
