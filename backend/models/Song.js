const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  id: { type: String }, // track id (Deezer or custom uuid)
  title: { type: String, required: true },
  artist: { type: String, required: true },
  cover: { type: String },
  preview: { type: String, required: true }, // preview url or local uploaded file path
  duration: { type: Number, default: 30 },
  album: { type: String, default: "Single" },
  genre: { type: String, default: "Pop" },
  isCustom: { type: Boolean, default: false },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Song", songSchema);

