import { useState, useEffect } from "react";
import SongCard from "./SongCard";
import { useAudio } from "../context/AudioContext";

function Home() {
  const { playSong, recentlyPlayed, setActiveTab } = useAudio();
  const [trendingSongs, setTrendingSongs] = useState([]);
  const [customSongs, setCustomSongs] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [loading, setLoading] = useState(true);

  const genres = ["All", "Pop", "Electronic", "Hip-Hop", "Rock", "Chill"];

  useEffect(() => {
    // Fetch Trending Hits
    fetch("http://localhost:5000/search/trending")
      .then((res) => res.json())
      .then((data) => {
        setTrendingSongs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Trending fetch error:", err);
        setLoading(false);
      });

    // Fetch Custom Uploads
    fetch("http://localhost:5000/songs")
      .then((res) => res.json())
      .then((data) => setCustomSongs(data))
      .catch((err) => console.error("Custom songs error:", err));
  }, []);

  const filteredSongs =
    selectedGenre === "All"
      ? trendingSongs
      : trendingSongs.filter(
          (s) => s.genre?.toLowerCase() === selectedGenre.toLowerCase()
        );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {/* HERO HERO BANNER */}
      <div
        style={{
          background: "linear-gradient(135deg, #1db954 0%, #0d5c28 50%, #121212 100%)",
          borderRadius: "16px",
          padding: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 12px 32px rgba(29, 185, 84, 0.25)"
        }}
      >
        <div style={{ maxWidth: "500px" }}>
          <span
            style={{
              textTransform: "uppercase",
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "1.5px",
              color: "#a3f3be"
            }}
          >
            VERIFIED PLAYLIST
          </span>
          <h1
            style={{
              fontSize: "42px",
              fontWeight: "800",
              margin: "8px 0 12px 0",
              lineHeight: 1.1,
              color: "white"
            }}
          >
            Today's Top Hits
          </h1>
          <p style={{ color: "#e0e0e0", fontSize: "15px", marginBottom: "24px" }}>
            The hottest tracks right now. Powered by Deezer & Soundify Music Community.
          </p>

          <div style={{ display: "flex", gap: "14px" }}>
            <button
              onClick={() => {
                if (trendingSongs.length > 0) playSong(trendingSongs[0], trendingSongs);
              }}
              style={{
                backgroundColor: "#1DB954",
                color: "black",
                border: "none",
                padding: "14px 28px",
                borderRadius: "30px",
                fontWeight: "700",
                fontSize: "15px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 6px 16px rgba(0,0,0,0.3)"
              }}
            >
              <span>▶</span> Play All
            </button>

            <button
              onClick={() => setActiveTab("search")}
              style={{
                backgroundColor: "rgba(255,255,255,0.15)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.3)",
                padding: "14px 24px",
                borderRadius: "30px",
                fontWeight: "600",
                fontSize: "15px",
                cursor: "pointer"
              }}
            >
              🔍 Explore
            </button>
          </div>
        </div>

        <div style={{ display: "none" }}>{/* Media Graphic placeholder */}</div>
      </div>

      {/* GENRE FILTER PILLS */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {genres.map((genre) => {
          const isSelected = selectedGenre === genre;
          return (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              style={{
                padding: "8px 18px",
                borderRadius: "20px",
                border: "none",
                backgroundColor: isSelected ? "#1DB954" : "#242424",
                color: isSelected ? "#000" : "#fff",
                fontWeight: isSelected ? "700" : "500",
                fontSize: "13px",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              {genre}
            </button>
          );
        })}
      </div>

      {/* RECENTLY PLAYED SECTION */}
      {recentlyPlayed.length > 0 && (
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "16px" }}>
            Recently Played
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: "20px"
            }}
          >
            {recentlyPlayed.map((song, idx) => (
              <SongCard key={idx} song={song} queue={recentlyPlayed} />
            ))}
          </div>
        </div>
      )}

      {/* TRENDING CHARTS GRID */}
      <div>
        <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "16px" }}>
          Popular & Trending
        </h2>

        {loading ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: "20px"
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                style={{
                  height: "220px",
                  backgroundColor: "#181818",
                  borderRadius: "10px",
                  animation: "pulse 1.5s infinite"
                }}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: "20px"
            }}
          >
            {filteredSongs.map((song) => (
              <SongCard key={song.id} song={song} queue={filteredSongs} />
            ))}
          </div>
        )}
      </div>

      {/* CUSTOM UPLOADS SECTION */}
      {customSongs.length > 0 && (
        <div>
          <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "16px" }}>
            Uploaded by Community
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: "20px"
            }}
          >
            {customSongs.map((song) => (
              <SongCard key={song._id || song.id} song={song} queue={customSongs} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
