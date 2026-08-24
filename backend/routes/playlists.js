const express = require("express");
const Playlist = require("../models/Playlist");
const { authMiddleware } = require("./auth");

const router = express.Router();

// GET USER PLAYLISTS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const playlists = await Playlist.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch playlists" });
  }
});

// CREATE PLAYLIST
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, description, cover } = req.body;
    if (!name) return res.status(400).json({ error: "Playlist name is required" });

    const newPlaylist = new Playlist({
      name,
      description: description || "Custom User Playlist",
      cover: cover || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80",
      user: req.user._id,
      songs: []
    });

    await newPlaylist.save();
    res.status(201).json(newPlaylist);
  } catch (err) {
    res.status(500).json({ error: "Failed to create playlist" });
  }
});

// ADD SONG TO PLAYLIST
router.post("/:id/songs", authMiddleware, async (req, res) => {
  try {
    const { song } = req.body;
    const playlist = await Playlist.findOne({ _id: req.params.id, user: req.user._id });
    if (!playlist) return res.status(404).json({ error: "Playlist not found" });

    const songId = String(song.id || song._id);
    const exists = playlist.songs.some(s => String(s.id || s._id) === songId);

    if (!exists) {
      playlist.songs.push({
        id: songId,
        title: song.title,
        artist: song.artist,
        cover: song.cover,
        preview: song.preview,
        album: song.album || "Single"
      });
      await playlist.save();
    }

    res.json(playlist);
  } catch (err) {
    res.status(500).json({ error: "Failed to add song to playlist" });
  }
});

// REMOVE SONG FROM PLAYLIST
router.delete("/:id/songs/:songId", authMiddleware, async (req, res) => {
  try {
    const playlist = await Playlist.findOne({ _id: req.params.id, user: req.user._id });
    if (!playlist) return res.status(404).json({ error: "Playlist not found" });

    playlist.songs = playlist.songs.filter(s => String(s.id || s._id) !== req.params.songId);
    await playlist.save();

    res.json(playlist);
  } catch (err) {
    res.status(500).json({ error: "Failed to remove song from playlist" });
  }
});

// DELETE PLAYLIST
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Playlist.deleteOne({ _id: req.params.id, user: req.user._id });
    res.json({ message: "Playlist deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete playlist" });
  }
});

module.exports = router;
