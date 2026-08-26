const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

// Main Soundify Express Backend Server Entrypoint
const app = express();


app.use(cors());
app.use(express.json());

// Serve static uploaded audio & image files
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// 🔥 ROUTES
const { router: authRoutes } = require("./routes/auth");
const playlistRoutes = require("./routes/playlists");
const songRoutes = require("./routes/songs");
const searchRoutes = require("./routes/search");

app.use("/api/auth", authRoutes);
app.use("/playlists", playlistRoutes);
app.use("/songs", songRoutes);
app.use("/search", searchRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Soundify Backend Running - v2.0");
});

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/soundify";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.warn("⚠️ MongoDB connection warning (app running with fallback state):", err.message);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Soundify server running on http://localhost:${PORT}`);
});
