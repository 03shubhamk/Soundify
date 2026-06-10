const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: String,
  artist: String,
  file: String,
});

module.exports = mongoose.model("Song", songSchema);
