import { useState } from "react";
import SongCard from "./SongCard";
import { useAudio } from "../context/AudioContext";

function Library() {
  const { likedSongs, playlists, createPlaylist, deletePlaylist, playSong } = useAudio();
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* HEADER & CONTROLS */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div>
          <h1 style={{ fontSize: "32px", margin: "0 0 6px 0", fontWeight: "800" }}>Your Library</h1>
          <p style={{ color: "#b3b3b3", margin: 0 }}>Your personal playlists and favorite music</p>
        </div>

        <button
          onClick={() => {
            const name = prompt("Enter new playlist name:");
            if (name) createPlaylist(name);
          }}
          style={{
            backgroundColor: "#1DB954",
            color: "black",
            border: "none",
            padding: "12px 22px",
            borderRadius: "30px",
            fontWeight: "700",
            cursor: "pointer"
          }}
        >
          ➕ New Playlist
        </button>
      </div>

      {/* SELECTED PLAYLIST DETAILED VIEW */}
      {selectedPlaylist ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <button
            onClick={() => setSelectedPlaylist(null)}
            style={{
              background: "none",
              border: "none",
              color: "#1DB954",
              cursor: "pointer",
              fontSize: "14px",
              alignSelf: "flex-start"
            }}
          >
            ← Back to Library
          </button>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              backgroundColor: "#181818",
              padding: "24px",
              borderRadius: "12px"
            }}
          >
            <img
              src={selectedPlaylist.cover}
              alt={selectedPlaylist.name}
              style={{ width: "140px", height: "140px", borderRadius: "10px", objectFit: "cover" }}
            />
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: "12px", color: "#b3b3b3", textTransform: "uppercase" }}>
                PLAYLIST
              </span>
              <h2 style={{ fontSize: "36px", margin: "4px 0 8px 0", fontWeight: "800" }}>
                {selectedPlaylist.name}
              </h2>
              <p style={{ color: "#b3b3b3", margin: "0 0 16px 0" }}>
                {selectedPlaylist.description || `${selectedPlaylist.songs.length} tracks`}
              </p>

              <button
                onClick={() => {
                  if (selectedPlaylist.songs.length > 0)
                    playSong(selectedPlaylist.songs[0], selectedPlaylist.songs);
                }}
                style={{
                  backgroundColor: "#1DB954",
                  color: "black",
                  border: "none",
                  padding: "10px 24px",
                  borderRadius: "20px",
                  fontWeight: "700",
                  cursor: "pointer"
                }}
              >
                ▶ Play Playlist
              </button>
            </div>
          </div>

          {selectedPlaylist.songs.length === 0 ? (
            <p style={{ color: "#b3b3b3", marginTop: "20px" }}>
              This playlist has no songs yet. Search for tracks and click '⋮' to add them!
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                gap: "20px"
              }}
            >
              {selectedPlaylist.songs.map((song, idx) => (
                <SongCard key={idx} song={song} queue={selectedPlaylist.songs} />
              ))}
            </div>
          )}
        </div>
      ) : (
        /* PLAYLISTS & LIKED SONGS GRID */
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {/* LIKED SONGS CARD */}
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "16px" }}>Favorites</h2>
            <div
              onClick={() => {
                if (likedSongs.length > 0) {
                  setSelectedPlaylist({
                    name: "Liked Songs",
                    cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&auto=format&fit=crop&q=80",
                    description: "Your saved favorite tracks",
                    songs: likedSongs
                  });
                }
              }}
              style={{
                background: "linear-gradient(135deg, #450af5, #8e8ee5)",
                padding: "24px",
                borderRadius: "12px",
                maxWidth: "320px",
                cursor: "pointer",
                boxShadow: "0 8px 24px rgba(69, 10, 245, 0.3)",
                transition: "transform 0.2s"
              }}
            >
              <h3 style={{ fontSize: "28px", margin: "0 0 12px 0", color: "white" }}>❤️ Liked Songs</h3>
              <p style={{ margin: 0, color: "rgba(255,255,255,0.8)", fontSize: "14px", fontWeight: "600" }}>
                {likedSongs.length} Liked Tracks
              </p>
            </div>
          </div>

          {/* USER PLAYLISTS */}
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "16px" }}>Your Playlists</h2>
            {playlists.length === 0 ? (
              <p style={{ color: "#b3b3b3" }}>No custom playlists created yet.</p>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                  gap: "20px"
                }}
              >
                {playlists.map((pl) => (
                  <div
                    key={pl._id}
                    onClick={() => setSelectedPlaylist(pl)}
                    style={{
                      backgroundColor: "#181818",
                      padding: "16px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      transition: "background 0.2s",
                      position: "relative"
                    }}
                  >
                    <img
                      src={pl.cover}
                      alt={pl.name}
                      style={{
                        width: "100%",
                        aspectRatio: "1 / 1",
                        borderRadius: "8px",
                        objectFit: "cover",
                        marginBottom: "12px"
                      }}
                    />
                    <h3 style={{ fontSize: "16px", margin: "0 0 4px 0", fontWeight: "700" }}>{pl.name}</h3>
                    <p style={{ fontSize: "12px", color: "#b3b3b3", margin: "0 0 12px 0" }}>
                      {pl.songs?.length || 0} Songs
                    </p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Delete playlist "${pl.name}"?`)) deletePlaylist(pl._id);
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#ff4d4d",
                        fontSize: "12px",
                        cursor: "pointer",
                        padding: 0
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Library;
