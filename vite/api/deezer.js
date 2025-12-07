export default async function handler(req, res) {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Missing search query" });
  }

  try {
    const response = await fetch(
      `https://api.deezer.com/search?q=${encodeURIComponent(q)}`
    );

    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Deezer fetch failed" });
  }
}
