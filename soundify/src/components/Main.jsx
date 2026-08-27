import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import Library from "./Library";
import SongCard from "./SongCard";
import { useAudio } from "../context/AudioContext";
import { API_BASE_URL } from "../config";

function Main() {
  const { activeTab, likedSongs } = useAudio();
  // Main View Container orchestrating Tab Navigation
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Live debounced search
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const handler = setTimeout(() => {
      fetch(`${API_BASE_URL}/search/${encodeURIComponent(searchTerm)}`)
        .then((res) => res.json())
        .then((data) => {
          setSearchResults(data);
          setIsSearching(false);
        })
        .catch((err) => {
          console.error("Search error:", err);
          setIsSearching(false);
        });
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  return (
    <div
      style={{
        marginLeft: "240px",
        minHeight: "100vh",
        backgroundColor: "var(--bg-main)",
        color: "var(--text-main)",
        display: "flex",
        flexDirection: "column",
        transition: "background-color 0.3s, color 0.3s"
      }}
    >
      {/* TOP HEADER NAVBAR */}
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* CONTENT CANVAS */}
      <main
        style={{
          padding: "28px 32px 140px 32px",
          boxSizing: "border-box",
          flex: 1
        }}
      >
        {/* 1. HOME TAB */}
        {activeTab === "home" && <Home />}

        {/* 2. SEARCH TAB */}
        {activeTab === "search" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div>
              <h1 style={{ fontSize: "32px", margin: "0 0 6px 0", fontWeight: "800" }}>Search</h1>
              <p style={{ color: "var(--text-muted)", margin: 0 }}>Discover songs, artists, or genres</p>
            </div>

            {/* SEARCH RESULTS */}
            <div>
              {isSearching ? (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
                    gap: "18px",
                    marginTop: "20px"
                  }}
                >
                  {[1, 2, 3, 4].map((n) => (
                    <div
                      key={n}
                      style={{
                        height: "220px",
                        backgroundColor: "var(--bg-card)",
                        borderRadius: "10px",
                        animation: "pulse 1.5s infinite"
                      }}
                    />
                  ))}
                </div>
              ) : searchResults.length > 0 ? (
                <div>
                  <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "16px" }}>
                    Search Results ({searchResults.length})
                  </h2>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
                      gap: "18px"
                    }}
                  >
                    {searchResults.map((song) => (
                      <SongCard key={song.id || song._id} song={song} queue={searchResults} />
                    ))}
                  </div>
                </div>
              ) : searchTerm.trim() ? (
                <p style={{ color: "var(--text-muted)", marginTop: "20px" }}>
                  No songs found matching "{searchTerm}".
                </p>
              ) : (
                <p style={{ color: "var(--text-muted)", marginTop: "20px" }}>
                  Start typing in the top header search bar to search millions of tracks!
                </p>
              )}
            </div>
          </div>
        )}

        {/* 3. LIBRARY TAB */}
        {activeTab === "library" && <Library />}

        {/* 4. LIKED SONGS TAB */}
        {activeTab === "liked" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div
              style={{
                background: "var(--hero-gradient)",
                borderRadius: "16px",
                padding: "32px",
                display: "flex",
                alignItems: "center",
                gap: "24px"
              }}
            >
              <div
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "42px"
                }}
              >
                ❤️
              </div>
              <div>
                <span style={{ fontSize: "12px", textTransform: "uppercase", opacity: 0.8 }}>
                  PLAYLIST
                </span>
                <h1 style={{ fontSize: "36px", margin: "4px 0", fontWeight: "800" }}>Liked Songs</h1>
                <p style={{ opacity: 0.8, margin: 0 }}>{likedSongs.length} favorite tracks</p>
              </div>
            </div>

            {likedSongs.length === 0 ? (
              <p style={{ color: "var(--text-muted)", marginTop: "20px" }}>
                You haven't liked any songs yet. Click the heart icon on any song to add it here!
              </p>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
                  gap: "18px"
                }}
              >
                {likedSongs.map((song, idx) => (
                  <SongCard key={idx} song={song} queue={likedSongs} />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default Main;
