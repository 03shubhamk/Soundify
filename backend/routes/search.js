const express = require("express");

const router = express.Router();

router.get("/:query", async (req, res) => {
  try {
    const query = encodeURIComponent(req.params.query);

    const response = await fetch(
      `https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`,
      {
        headers: {
          "X-RapidAPI-Key": process.env.RAPID_API_KEY,
          "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
        },
      }
    );

    const data = await response.json();

    const songs = data.data.map((song) => ({
      id: song.id,
      title: song.title,
      artist: song.artist.name,
      preview: song.preview,
      cover: song.album.cover_medium,
    }));

    res.json(songs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Search failed" });
  }
});

module.exports = router;
