import { useState, useEffect } from "react";
import { useAudio } from "../context/AudioContext";
import SongCard from "./SongCard";
import { Play, Pause, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { API_BASE_URL } from "../config";

function Home() {
  const { playSong, currentSong, isPlaying, likedSongs, toggleLikeSong } = useAudio();
  const [trendingSongs, setTrendingSongs] = useState([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/search/trending`)
      .then((res) => res.json())
      .then((data) => {
        setTrendingSongs(data);

        // Official Hindi & Bollywood Albums
        setAlbums([
          {
            title: "Brahmastra",
            artist: "Pritam & Arijit Singh",
            cover: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/9f/13/ca/9f13ca3b-e533-03e0-f19a-f0aaa774581d/196589311191.jpg/600x600bb.jpg"
          },
          {
            title: "Jawan",
            artist: "Anirudh & Shilpa Rao",
            cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/bb/f4/f5/bbf4f511-3c12-c25e-a475-b6d06faa8c13/8902894362047_cover.jpg/600x600bb.jpg"
          },
          {
            title: "Shershaah",
            artist: "Jubin & Tanishk",
            cover: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/61/65/ae/6165aee9-8bb9-0bd4-02b0-5d0f1e6257a3/886449510238.jpg/600x600bb.jpg"
          },
          {
            title: "Animal",
            artist: "Arijit & Shreyas",
            cover: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/db/ad/5e/dbad5e8b-0bee-d962-92d4-021c90e375ac/8902894362092_cover.jpg/600x600bb.jpg"
          }
        ]);
      })
      .catch((err) => console.error("Home trending error:", err));
  }, []);

  const heroSong = trendingSongs[0] || {
    id: "hn-1",
    title: "Kesariya",
    artist: "Arijit Singh & Pritam",
    album: "Brahmastra",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/9f/13/ca/9f13ca3b-e533-03e0-f19a-f0aaa774581d/196589311191.jpg/600x600bb.jpg",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/38/4c/5c/384c5c8f-3ff8-e457-b2f7-3158ce108649/mzaf_12389299033886433185.plus.aac.p.m4a"
  };

  const topMusicList = trendingSongs.slice(0, 5);
  const popularList = trendingSongs.slice(1, 5);
  const isHeroLiked = likedSongs.some((s) => String(s.id || s._id) === String(heroSong.id || heroSong._id));

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

        <div style={{ maxWidth: "440px", zIndex: 2 }}>
          <span
            style={{
              fontSize: "13px",
              fontWeight: "700",
              color: "var(--text-hero-sub)",
              display: "block",
              marginBottom: "8px",
              letterSpacing: "0.5px"
            }}
          >
            Trending Hindi Chartbuster 🔥
          </span>

          <h1
            style={{
              fontSize: "44px",
              fontWeight: "900",
              margin: "0 0 4px 0",
              lineHeight: 1.1,
              letterSpacing: "-1px"
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
            <span style={{ fontSize: "12px", opacity: 0.8 }}>150 Million+ Streams</span>
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
                boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              <Play size={16} fill="var(--btn-hero-text)" /> Listen Now
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
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                backdropFilter: "blur(4px)"
              }}
            >
              <Heart size={18} fill={isHeroLiked ? "#fff" : "none"} />
            </button>
          </div>
        </div>

        {/* Hero Poster Graphic Photo */}
        <div style={{ position: "relative", zIndex: 2, height: "220px", display: "flex", alignItems: "center" }}>
          <img
            src={heroSong.cover}
            alt={heroSong.title}
            style={{
              height: "190px",
              width: "190px",
              borderRadius: "16px",
              objectFit: "cover",
              boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
              border: "2px solid rgba(255,255,255,0.2)"
            }}
          />
        </div>
      </div>

      {/* 2. "TOP HINDI MUSIC" SECTION */}
      <div>
        <h2 style={{ fontSize: "18px", fontWeight: "800", marginBottom: "14px", color: "var(--text-main)" }}>
          Famous Hindi Hits
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
        {/* LEFT COLUMN: POPULAR HINDI SONGS */}
        <div>
          <h2 style={{ fontSize: "18px", fontWeight: "800", marginBottom: "14px", color: "var(--text-main)" }}>
            Popular Hindi Songs
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
                      cursor: "pointer"
                    }}
                  >
                    {isCurrent && isPlaying ? <Pause size={14} fill="#000" /> : <Play size={14} fill="#000" style={{ marginLeft: "2px" }} />}
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
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <Heart size={16} fill={isLiked ? "var(--accent-cyan)" : "none"} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: RECOMMENDED BOLLYWOOD ALBUMS */}
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
              Recommended Albums
            </h2>

            <div style={{ display: "flex", gap: "6px" }}>
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--text-muted)",
                  cursor: "pointer"
                }}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--text-muted)",
                  cursor: "pointer"
                }}
              >
                <ChevronRight size={18} />
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
