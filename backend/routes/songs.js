const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Song = require("../models/Song");
const { authMiddleware } = require("./auth");

const router = express.Router();

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "../public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 } // 20MB max file size
});

// GET all curated & uploaded songs
router.get("/", async (req, res) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch songs" });
  }
});

// UPLOAD a custom MP3 audio song
router.post(
  "/upload",
  authMiddleware,
  upload.fields([
    { name: "audio", maxCount: 1 },
    { name: "cover", maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const { title, artist, genre, album } = req.body;
      if (!req.files || !req.files.audio) {
        return res.status(400).json({ error: "Audio file (.mp3) is required" });
      }

      const audioFile = req.files.audio[0];
      const audioUrl = `http://localhost:5000/uploads/${audioFile.filename}`;

      let coverUrl = "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=80";
      if (req.files.cover && req.files.cover[0]) {
        coverUrl = `http://localhost:5000/uploads/${req.files.cover[0].filename}`;
      }

      const newSong = new Song({
        id: "custom-" + Date.now(),
        title: title || audioFile.originalname.replace(/\.[^/.]+$/, ""),
        artist: artist || "Unknown Artist",
        cover: coverUrl,
        preview: audioUrl,
        album: album || "Custom Uploads",
        genre: genre || "General",
        isCustom: true,
        uploadedBy: req.user ? req.user._id : null
      });

      await newSong.save();
      res.status(201).json(newSong);
    } catch (err) {
      console.error("Upload Error:", err);
      res.status(500).json({ error: "Failed to upload song file" });
    }
  }
);

// ADD song metadata manually (legacy route)
router.post("/", async (req, res) => {
  try {
    const song = new Song({
      ...req.body,
      id: req.body.id || "song-" + Date.now()
    });
    await song.save();
    res.json(song);
  } catch (err) {
    res.status(500).json({ error: "Failed to add song" });
  }
});

module.exports = router;
