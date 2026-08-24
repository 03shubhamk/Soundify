const express = require("express");
const bcrypt = require("bcryptjs");
const jwtLib = require("jsonwebtoken");
const User = require("../models/User");


const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "soundify_secret_key_12345";

// Middleware to authenticate token
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized: No token provided" });

    const decoded = jwtLib.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(401).json({ error: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

// 1. REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Username, email and password are required" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: "Username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    const token = jwtLib.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        avatar: newUser.avatar,
        likedSongs: newUser.likedSongs
      }
    });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// 2. LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwtLib.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        likedSongs: user.likedSongs
      }
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

// 3. GET ME
router.get("/me", authMiddleware, async (req, res) => {
  res.json({ user: req.user });
});

// 4. TOGGLE LIKED SONG
router.post("/toggle-like", authMiddleware, async (req, res) => {
  try {
    const { song } = req.body;
    if (!song || (!song.id && !song._id)) {
      return res.status(400).json({ error: "Invalid song payload" });
    }

    const songId = String(song.id || song._id);
    const user = req.user;

    const existingIndex = user.likedSongs.findIndex(s => String(s.id || s._id) === songId);

    if (existingIndex > -1) {
      // Remove from liked
      user.likedSongs.splice(existingIndex, 1);
    } else {
      // Add to liked
      user.likedSongs.push({
        id: songId,
        title: song.title,
        artist: song.artist,
        cover: song.cover,
        preview: song.preview,
        album: song.album || "Single"
      });
    }

    await user.save();
    res.json({ likedSongs: user.likedSongs, isLiked: existingIndex === -1 });
  } catch (err) {
    console.error("Toggle Like Error:", err);
    res.status(500).json({ error: "Failed to update liked songs" });
  }
});

module.exports = { router, authMiddleware };
