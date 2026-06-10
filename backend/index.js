const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 ROUTES
const songRoutes = require("./routes/songs");
const searchRoutes = require("./routes/search");

app.use("/songs", songRoutes);
app.use("/search", searchRoutes);

// Test
app.get("/", (req, res) => {
  res.send("Soundify Backend Running");
});

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
