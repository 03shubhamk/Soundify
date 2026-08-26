const express = require("express");

const router = express.Router();

// Official Curated Dataset of Famous Hindi & Bollywood Chartbusters with 600x600 Artwork and M4A Audio Previews
const MOCK_TRENDING = [

  {
    id: "hn-1",
    title: "Kesariya",
    artist: "Arijit Singh & Pritam",
    album: "Brahmastra",
    genre: "Romantic",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/9f/13/ca/9f13ca3b-e533-03e0-f19a-f0aaa774581d/196589311191.jpg/600x600bb.jpg",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/38/4c/5c/384c5c8f-3ff8-e457-b2f7-3158ce108649/mzaf_12389299033886433185.plus.aac.p.m4a"
  },
  {
    id: "hn-2",
    title: "Apna Bana Le",
    artist: "Arijit Singh & Sachin-Jigar",
    album: "Bhediya",
    genre: "Bollywood",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/2e/0b/c0/2e0bc070-112f-a827-6ad8-6bc64f7caaff/840214460180.png/600x600bb.jpg",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/09/51/0d/09510dea-6579-5cd0-b13b-696abc2c520b/mzaf_10718921821360997069.plus.aac.p.m4a"
  },
  {
    id: "hn-3",
    title: "Chaleya",
    artist: "Arijit Singh & Shilpa Rao",
    album: "Jawan",
    genre: "Pop",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/bb/f4/f5/bbf4f511-3c12-c25e-a475-b6d06faa8c13/8902894362047_cover.jpg/600x600bb.jpg",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/76/05/d9/7605d905-f631-517d-df7f-e162affcd414/mzaf_9976541859961700749.plus.aac.p.m4a"
  },
  {
    id: "hn-4",
    title: "Tum Hi Ho",
    artist: "Arijit Singh & Mithoon",
    album: "Aashiqui 2",
    genre: "Romantic",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/bb/23/ee/bb23eeed-0c35-4f1d-2b11-485622777ae4/8902894353007_cover.jpg/600x600bb.jpg",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/38/de/b9/38deb942-d44a-f2bb-205c-ddf05be84693/mzaf_9747647124859107103.plus.aac.p.m4a"
  },
  {
    id: "hn-5",
    title: "Raataan Lambiyan",
    artist: "Jubin Nautiyal & Asees Kaur",
    album: "Shershaah",
    genre: "Romantic",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/61/65/ae/6165aee9-8bb9-0bd4-02b0-5d0f1e6257a3/886449510238.jpg/600x600bb.jpg",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/99/0c/38/990c381b-0530-8c0d-87a9-18b050b97f0a/mzaf_10418866714500530894.plus.aac.p.m4a"
  },
  {
    id: "hn-6",
    title: "Tere Vaaste",
    artist: "Varun Jain & Sachin-Jigar",
    album: "Zara Hatke Zara Bachke",
    genre: "Bollywood",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/33/03/f2/3303f270-fce2-293a-5bfc-4b9de994abf9/197188946401.jpg/600x600bb.jpg",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/a6/b1/db/a6b1db3b-7353-f705-acd5-ca1d19f5fbba/mzaf_1179784728000321890.plus.aac.p.m4a"
  },
  {
    id: "hn-7",
    title: "Heeriye",
    artist: "Jasleen Royal & Arijit Singh",
    album: "Heeriye Single",
    genre: "Pop",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/f0/8c/2a/f08c2aeb-3903-8738-d0a5-8c2e4547eed7/5054197711039.jpg/600x600bb.jpg",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/14/9b/ac/149bac62-12f1-2f55-a742-f38429b94c83/mzaf_17225240189976438593.plus.aac.p.m4a"
  },
  {
    id: "hn-8",
    title: "O Maahi",
    artist: "Arijit Singh & Pritam",
    album: "Dunki",
    genre: "Bollywood",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/cf/cf/af/cfcfaf49-f337-eeab-2351-dd0a137dc740/8902894362139_cover.jpg/600x600bb.jpg",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/a9/82/78/a9827837-5ca7-1fe3-fc24-3dedeffb86e4/mzaf_4678729972431007397.plus.aac.p.m4a"
  },
  {
    id: "hn-9",
    title: "Satranga",
    artist: "Arijit Singh & Shreyas Puranik",
    album: "Animal",
    genre: "Bollywood",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/db/ad/5e/dbad5e8b-0bee-d962-92d4-021c90e375ac/8902894362092_cover.jpg/600x600bb.jpg",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/f9/c4/db/f9c4db6d-efa0-0b8b-c80a-046b06499f2b/mzaf_3150095649021462379.plus.aac.p.m4a"
  }
];

// GET TRENDING / TOP CHARTS
router.get("/trending", async (req, res) => {
  try {
    res.json(MOCK_TRENDING);
  } catch (err) {
    console.error("Trending fetch error:", err);
    res.json(MOCK_TRENDING);
  }
});

// SEARCH MUSIC
router.get("/:query", async (req, res) => {
  try {
    const rawQuery = req.params.query;
    const query = encodeURIComponent(rawQuery);

    // Filter local dataset first if matching query
    const filtered = MOCK_TRENDING.filter(
      s => s.title.toLowerCase().includes(rawQuery.toLowerCase()) ||
           s.artist.toLowerCase().includes(rawQuery.toLowerCase()) ||
           s.album.toLowerCase().includes(rawQuery.toLowerCase()) ||
           s.genre.toLowerCase().includes(rawQuery.toLowerCase())
    );

    if (filtered.length > 0) {
      return res.json(filtered);
    }

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

    res.json(MOCK_TRENDING);
  } catch (err) {
    console.error("Search error, using fallback:", err);
    res.json(MOCK_TRENDING);
  }
});

module.exports = router;
