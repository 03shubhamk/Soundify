import { useState } from "react";
import SongCard from "./SongCard";
import { useAudio } from "../context/AudioContext";
import { Plus, Heart, Play, ArrowLeft, Trash2, ListMusic } from "lucide-react";

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
          <p style={{ color: "var(--text-muted)", margin: 0 }}>Your personal playlists and favorite music</p>
        </div>

        <button
          onClick={() => {
            const name = prompt("Enter new playlist name:");
            if (name) createPlaylist(name);
          }}
          style={{
            backgroundColor: "var(--accent-cyan)",
            color: "#000",
            border: "none",
            padding: "12px 22px",
            borderRadius: "30px",
            fontWeight: "700",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 4px 12px rgba(0, 210, 255, 0.3)"
          }}
        >
          <Plus size={18} /> New Playlist
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
              color: "var(--accent-cyan)",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              alignSelf: "flex-start"
            }}
          >
            <ArrowLeft size={16} /> Back to Library
          </button>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              backgroundColor: "var(--bg-card)",
              padding: "24px",
              borderRadius: "16px",
              border: "1px solid var(--border-color)"
            }}
          >
            <img
              src={selectedPlaylist.cover}
              alt={selectedPlaylist.name}
              style={{ width: "140px", height: "140px", borderRadius: "10px", objectFit: "cover" }}
            />
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase" }}>
                PLAYLIST
              </span>
              <h2 style={{ fontSize: "36px", margin: "4px 0 8px 0", fontWeight: "800" }}>
                {selectedPlaylist.name}
              </h2>
              <p style={{ color: "var(--text-muted)", margin: "0 0 16px 0" }}>
                {selectedPlaylist.description || `${selectedPlaylist.songs.length} tracks`}
              </p>

              <button
                onClick={() => {
                  if (selectedPlaylist.songs.length > 0)
                    playSong(selectedPlaylist.songs[0], selectedPlaylist.songs);
                }}
                style={{
                  backgroundColor: "var(--accent-cyan)",
                  color: "#000",
                  border: "none",
                  padding: "10px 24px",
                  borderRadius: "20px",
                  fontWeight: "700",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                <Play size={16} fill="#000" /> Play Playlist
              </button>
            </div>
          </div>

          {selectedPlaylist.songs.length === 0 ? (
            <p style={{ color: "var(--text-muted)", marginTop: "20px" }}>
              This playlist has no songs yet. Search for tracks and click options to add them!
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
                gap: "18px"
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
                background: "var(--hero-gradient)",
                padding: "24px",
                borderRadius: "16px",
                maxWidth: "320px",
                cursor: "pointer",
                boxShadow: "0 8px 24px rgba(0, 210, 255, 0.15)",
                border: "1px solid var(--border-color)",
                transition: "transform 0.2s"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <Heart size={28} color="var(--accent-cyan)" fill="var(--accent-cyan)" />
                <h3 style={{ fontSize: "24px", margin: 0, color: "var(--text-main)", fontWeight: "800" }}>
                  Liked Songs
                </h3>
              </div>
              <p style={{ margin: 0, color: "var(--text-hero-sub)", fontSize: "14px", fontWeight: "600" }}>
                {likedSongs.length} Liked Tracks
              </p>
            </div>
          </div>

          {/* USER PLAYLISTS */}
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "16px" }}>Your Playlists</h2>
            {playlists.length === 0 ? (
              <p style={{ color: "var(--text-muted)" }}>No custom playlists created yet.</p>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                  gap: "18px"
                }}
              >
                {playlists.map((pl) => (
                  <div
                    key={pl._id}
                    onClick={() => setSelectedPlaylist(pl)}
                    style={{
                      backgroundColor: "var(--bg-card)",
                      border: "1px solid var(--border-color)",
                      padding: "16px",
                      borderRadius: "12px",
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
                    <h3 style={{ fontSize: "15px", margin: "0 0 4px 0", fontWeight: "700" }}>{pl.name}</h3>
                    <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: "0 0 12px 0" }}>
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
                        padding: 0,
                        display: "flex",
                        alignItems: "center",
                        gap: "4px"
                      }}
                    >
                      <Trash2 size={14} /> Delete
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
