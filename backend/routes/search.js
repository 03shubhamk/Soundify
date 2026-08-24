const express = require("express");

const router = express.Router();

// Rich mock dataset to guarantee high quality songs even without API key
const MOCK_TRENDING = [
  {
    id: "tr-1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    genre: "Pop",
    cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&auto=format&fit=crop&q=80",
    preview: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
  },
  {
    id: "tr-2",
    title: "Starboy",
    artist: "The Weeknd ft. Daft Punk",
    album: "Starboy",
    genre: "Pop",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80",
    preview: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=creative-technology-14388.mp3"
  },
  {
    id: "tr-3",
    title: "As It Was",
    artist: "Harry Styles",
    album: "Harry's House",
    genre: "Pop",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&auto=format&fit=crop&q=80",
    preview: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=chill-abstract-intention-12099.mp3"
  },
  {
    id: "tr-4",
    title: "Levitating",
    artist: "Dua Lipa",
    album: "Future Nostalgia",
    genre: "Pop",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80",
    preview: "https://cdn.pixabay.com/download/audio/2021/09/06/audio_8b056157f7.mp3?filename=ambient-piano-amp-strings-10711.mp3"
  },
  {
    id: "tr-5",
    title: "Save Your Tears",
    artist: "The Weeknd",
    album: "After Hours",
    genre: "Pop",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=80",
    preview: "https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f7e593.mp3?filename=electronic-future-beats-117897.mp3"
  },
  {
    id: "tr-6",
    title: "Midnight City",
    artist: "M83",
    album: "Hurry Up, We're Dreaming",
    genre: "Electronic",
    cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&auto=format&fit=crop&q=80",
    preview: "https://cdn.pixabay.com/download/audio/2022/03/24/audio_34b3f88fdf.mp3?filename=inspiring-cinematic-ambient-116199.mp3"
  },
  {
    id: "tr-7",
    title: "Sunflower",
    artist: "Post Malone & Swae Lee",
    album: "Spider-Man: Into the Spider-Verse",
    genre: "Hip-Hop",
    cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&auto=format&fit=crop&q=80",
    preview: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=chill-abstract-intention-12099.mp3"
  },
  {
    id: "tr-8",
    title: "Stay",
    artist: "The Kid LAROI & Justin Bieber",
    album: "F*CK LOVE 3: OVER YOU",
    genre: "Pop",
    cover: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&auto=format&fit=crop&q=80",
    preview: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
  }
];

// GET TRENDING / TOP CHARTS
router.get("/trending", async (req, res) => {
  try {
    if (process.env.RAPID_API_KEY) {
      const response = await fetch(
        `https://deezerdevs-deezer.p.rapidapi.com/chart`,
        {
          headers: {
            "X-RapidAPI-Key": process.env.RAPID_API_KEY,
            "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
          },
        }
      );
      const data = await response.json();
      if (data && data.tracks && data.tracks.data) {
        const songs = data.tracks.data.map((song) => ({
          id: String(song.id),
          title: song.title,
          artist: song.artist.name,
          album: song.album?.title || "Top Chart",
          preview: song.preview,
          cover: song.album.cover_medium,
        }));
        return res.json(songs);
      }
    }
    // Fallback to mock trending dataset
    res.json(MOCK_TRENDING);
  } catch (err) {
    console.error("Trending fetch error, falling back to mock:", err);
    res.json(MOCK_TRENDING);
  }
});

// SEARCH MUSIC
router.get("/:query", async (req, res) => {
  try {
    const rawQuery = req.params.query;
    const query = encodeURIComponent(rawQuery);

    if (process.env.RAPID_API_KEY) {
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

      if (data && data.data && data.data.length > 0) {
        const songs = data.data.map((song) => ({
          id: String(song.id),
          title: song.title,
          artist: song.artist.name,
          album: song.album?.title || "Single",
          preview: song.preview,
          cover: song.album.cover_medium,
        }));

        return res.json(songs);
      }
    }

    // Fallback mock filtering if no API key or empty API response
    const filtered = MOCK_TRENDING.filter(
      s => s.title.toLowerCase().includes(rawQuery.toLowerCase()) ||
           s.artist.toLowerCase().includes(rawQuery.toLowerCase()) ||
           s.genre.toLowerCase().includes(rawQuery.toLowerCase())
    );

    res.json(filtered.length > 0 ? filtered : MOCK_TRENDING);
  } catch (err) {
    console.error("Search error, using fallback:", err);
    res.json(MOCK_TRENDING);
  }
});

module.exports = router;
