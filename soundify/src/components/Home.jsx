import { useState, useEffect } from "react";
import { useAudio } from "../context/AudioContext";
import SongCard from "./SongCard";

function Home() {
  const { playSong, currentSong, isPlaying, likedSongs, toggleLikeSong } = useAudio();
  const [trendingSongs, setTrendingSongs] = useState([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/search/trending")
      .then((res) => res.json())
      .then((data) => {
        setTrendingSongs(data);

        // Group into mock albums
        setAlbums([
          { title: "The Light", artist: "Jose", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80" },
          { title: "Order Me", artist: "Mason Nail", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&auto=format&fit=crop&q=80" },
          { title: "Made For Me", artist: "Tyal Wass", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80" },
          { title: "Mood", artist: "What?", cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&auto=format&fit=crop&q=80" }
        ]);
      })
      .catch((err) => console.error("Home trending error:", err));
  }, []);

  const heroSong = trendingSongs[0] || {
    title: "In My Minds",
    artist: "Jay Karl",
    cover: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
    preview: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
  };

  const topMusicList = trendingSongs.slice(0, 5);
  const popularList = trendingSongs.slice(1, 5);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* 1. HERO BANNER ("Trending Now Hit") */}
      <div
        style={{
          position: "relative",
          borderRadius: "20px",
          padding: "36px 40px",
          background: "var(--hero-gradient)",
          color: "var(--text-main)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          overflow: "hidden",
          boxShadow: "0 12px 30px rgba(0, 210, 255, 0.15)",
          minHeight: "220px",
          transition: "background 0.3s"
        }}
      >
        {/* Decorative background circle graphics */}
        <div
          style={{
            position: "absolute",
            top: "-50px",
            left: "200px",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            pointerEvents: "none"
          }}
        />

        <div style={{ maxWidth: "420px", zIndex: 2 }}>
          <span
            style={{
              fontSize: "13px",
              fontWeight: "700",
              color: "var(--text-hero-sub)",
              display: "block",
              marginBottom: "8px"
            }}
          >
            Trending Now Hit
          </span>

          <h1
            style={{
              fontSize: "44px",
              fontWeight: "900",
              margin: "0 0 4px 0",
              lineHeight: 1.1,
              tracking: "-1px"
            }}
          >
            {heroSong.title}
          </h1>

          <div
            style={{
              fontSize: "16px",
              fontWeight: "600",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "var(--text-hero-sub)"
            }}
          >
            <span>{heroSong.artist}</span>
            <span style={{ fontSize: "12px", opacity: 0.8 }}>67millions Plays</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <button
              onClick={() => playSong(heroSong, trendingSongs)}
              style={{
                backgroundColor: "var(--btn-hero)",
                color: "var(--btn-hero-text)",
                border: "none",
                padding: "12px 28px",
                borderRadius: "30px",
                fontWeight: "700",
                fontSize: "14px",
                cursor: "pointer",
                boxShadow: "0 6px 16px rgba(0,0,0,0.2)"
              }}
            >
              Listen Now
            </button>

            <button
              onClick={() => toggleLikeSong(heroSong)}
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.2)",
                border: "none",
                color: "white",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                backdropFilter: "blur(4px)"
              }}
            >
              ❤️
            </button>
          </div>
        </div>

        {/* Hero Artist Graphic Photo */}
        <div style={{ position: "relative", zIndex: 2, height: "220px", display: "flex", alignItems: "flex-end" }}>
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"
            alt="Hero Artist"
            style={{
              height: "240px",
              objectFit: "cover",
              filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.3))"
            }}
          />
        </div>
      </div>

      {/* 2. "TOP MUSIC" SECTION */}
      <div>
        <h2 style={{ fontSize: "18px", fontWeight: "800", marginBottom: "14px", color: "var(--text-main)" }}>
          Top Music
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
            gap: "18px"
          }}
        >
          {topMusicList.map((song) => (
            <SongCard key={song.id || song._id} song={song} queue={topMusicList} />
          ))}
        </div>
      </div>

      {/* 3. TWO-COLUMN ROW: "POPULAR" & "RECOMMENDED ALBUM" */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: "28px",
          alignItems: "start"
        }}
      >
        {/* LEFT COLUMN: POPULAR TRACKS */}
        <div>
          <h2 style={{ fontSize: "18px", fontWeight: "800", marginBottom: "14px", color: "var(--text-main)" }}>
            Popular
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {popularList.map((song) => {
              const isCurrent = currentSong && String(currentSong.id || currentSong._id) === String(song.id || song._id);
              const isLiked = likedSongs.some((s) => String(s.id || s._id) === String(song.id || song._id));

              return (
                <div
                  key={song.id || song._id}
                  onClick={() => playSong(song, popularList)}
                  style={{
                    backgroundColor: isCurrent ? "var(--bg-active-pill)" : "var(--bg-card)",
                    padding: "8px 16px",
                    borderRadius: "30px",
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    transition: "all 0.2s"
                  }}
                  className="popular-item"
                >
                  {/* Play/Pause round icon */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playSong(song, popularList);
                    }}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: isCurrent ? "var(--accent-cyan)" : "rgba(255,255,255,0.15)",
                      color: isCurrent ? "#000" : "var(--text-main)",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      cursor: "pointer"
                    }}
                  >
                    {isCurrent && isPlaying ? "⏸" : "▶"}
                  </button>

                  <img
                    src={song.cover}
                    alt={song.title}
                    style={{ width: "38px", height: "38px", borderRadius: "50%", objectFit: "cover" }}
                  />

                  <div style={{ flex: 1, overflow: "hidden" }}>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: "700",
                        color: isCurrent ? "var(--accent-cyan)" : "var(--text-main)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}
                    >
                      {song.title}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "var(--text-muted)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}
                    >
                      {song.artist}
                    </div>
                  </div>

                  <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: "600" }}>
                    3:25
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLikeSong(song);
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      color: isLiked ? "var(--accent-cyan)" : "var(--text-muted)",
                      cursor: "pointer",
                      fontSize: "14px"
                    }}
                  >
                    {isLiked ? "❤️" : "🤍"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: RECOMMENDED ALBUM */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "14px"
            }}
          >
            <h2 style={{ fontSize: "18px", fontWeight: "800", margin: 0, color: "var(--text-main)" }}>
              Recommended Album
            </h2>

            <div style={{ display: "flex", gap: "6px" }}>
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--text-muted)",
                  fontSize: "16px",
                  cursor: "pointer"
                }}
              >
                ←
              </button>
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--text-muted)",
                  fontSize: "16px",
                  cursor: "pointer"
                }}
              >
                →
              </button>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "12px"
            }}
          >
            {albums.map((album, idx) => (
              <div key={idx} style={{ cursor: "pointer", textAlign: "center" }}>
                <img
                  src={album.cover}
                  alt={album.title}
                  style={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    borderRadius: "10px",
                    objectFit: "cover",
                    marginBottom: "6px"
                  }}
                />
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    color: "var(--text-main)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}
                >
                  {album.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
