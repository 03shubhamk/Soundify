import { useState, useEffect } from "react";
import Home from "./Home";
import Library from "./Library";
import SongCard from "./SongCard";
import { useAudio } from "../context/AudioContext";

function Main() {
  const { activeTab, likedSongs } = useAudio();
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
      fetch(`http://localhost:5000/search/${encodeURIComponent(searchTerm)}`)
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
        marginLeft: "250px",
        minHeight: "100vh",
        backgroundColor: "#121212",
        color: "white",
        padding: "32px 40px 140px 40px",
        boxSizing: "border-box"
      }}
    >
      {/* 1. HOME TAB */}
      {activeTab === "home" && <Home />}

      {/* 2. SEARCH TAB */}
      {activeTab === "search" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div>
            <h1 style={{ fontSize: "32px", margin: "0 0 6px 0", fontWeight: "800" }}>Search</h1>
            <p style={{ color: "#b3b3b3", margin: 0 }}>Discover songs, artists, or genres</p>
          </div>

          {/* SEARCH INPUT BAR */}
          <div style={{ position: "relative", maxWidth: "600px" }}>
            <input
              type="text"
              placeholder="What do you want to listen to?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "16px 20px 16px 48px",
                borderRadius: "30px",
                border: "none",
                backgroundColor: "#242424",
                color: "white",
                fontSize: "15px",
                outline: "none",
                boxShadow: "0 4px 16px rgba(0,0,0,0.4)"
              }}
            />
            <span
              style={{
                position: "absolute",
                left: "18px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "18px",
                color: "#b3b3b3"
              }}
            >
              🔍
            </span>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                style={{
                  position: "absolute",
                  right: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "#b3b3b3",
                  cursor: "pointer",
                  fontSize: "16px"
                }}
              >
                ✕
              </button>
            )}
          </div>

          {/* SEARCH RESULTS */}
          <div>
            {isSearching ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                  gap: "20px",
                  marginTop: "20px"
                }}
              >
                {[1, 2, 3, 4].map((n) => (
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
            ) : searchResults.length > 0 ? (
              <div>
                <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "16px" }}>
                  Search Results ({searchResults.length})
                </h2>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                    gap: "20px"
                  }}
                >
                  {searchResults.map((song) => (
                    <SongCard key={song.id || song._id} song={song} queue={searchResults} />
                  ))}
                </div>
              </div>
            ) : searchTerm.trim() ? (
              <p style={{ color: "#b3b3b3", marginTop: "20px" }}>No songs found matching "{searchTerm}".</p>
            ) : (
              <p style={{ color: "#b3b3b3", marginTop: "20px" }}>Start typing above to search millions of tracks!</p>
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
              background: "linear-gradient(135deg, #450af5, #121212)",
              borderRadius: "16px",
              padding: "32px",
              display: "flex",
              alignItems: "center",
              gap: "24px"
            }}
          >
            <div
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "12px",
                backgroundColor: "rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "48px"
              }}
            >
              ❤️
            </div>
            <div>
              <span style={{ fontSize: "12px", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>
                PLAYLIST
              </span>
              <h1 style={{ fontSize: "36px", margin: "4px 0", fontWeight: "800" }}>Liked Songs</h1>
              <p style={{ color: "#b3b3b3", margin: 0 }}>{likedSongs.length} favorite tracks</p>
            </div>
          </div>

          {likedSongs.length === 0 ? (
            <p style={{ color: "#b3b3b3", marginTop: "20px" }}>
              You haven't liked any songs yet. Click the heart icon on any song to add it here!
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                gap: "20px"
              }}
            >
              {likedSongs.map((song, idx) => (
                <SongCard key={idx} song={song} queue={likedSongs} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Main;
