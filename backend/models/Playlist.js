const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  cover: { type: String, default: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  songs: [{
    id: String,
    title: String,
    artist: String,
    cover: String,
    preview: String,
    album: String
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Playlist", playlistSchema);
