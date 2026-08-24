import { useState } from "react";
import { useAudio } from "../context/AudioContext";

function SongCard({ song, queue = [] }) {
  const { playSong, currentSong, isPlaying, likedSongs, toggleLikeSong, playlists, addSongToPlaylist } = useAudio();
  const [showMenu, setShowMenu] = useState(false);

  if (!song) return null;

  const isCurrent = currentSong && String(currentSong.id || currentSong._id) === String(song.id || song._id);
  const isLiked = likedSongs.some((s) => String(s.id || s._id) === String(song.id || song._id));

  return (
    <div
      style={{
        backgroundColor: isCurrent ? "#242424" : "#181818",
        padding: "16px",
        borderRadius: "10px",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
      }}
      className="song-card"
      onMouseEnter={(e) => {
        if (!isCurrent) e.currentTarget.style.background = "#282828";
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        if (!isCurrent) e.currentTarget.style.background = "#181818";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* COVER IMAGE CONTAINER */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "1 / 1",
          borderRadius: "8px",
          overflow: "hidden"
        }}
        onClick={() => playSong(song, queue)}
      >
        <img
          src={song.cover || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80"}
          alt={song.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
        />

        {/* HOVER PLAY BUTTON */}
        <div
          className="play-overlay"
          style={{
            position: "absolute",
            bottom: "8px",
            right: "8px",
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            backgroundColor: "#1DB954",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "black",
            fontSize: "18px",
            boxShadow: "0 8px 16px rgba(0,0,0,0.4)",
            transition: "all 0.2s"
          }}
        >
          {isCurrent && isPlaying ? "⏸" : "▶"}
        </div>
      </div>

      {/* METADATA */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ overflow: "hidden", flex: 1 }} onClick={() => playSong(song, queue)}>
          <h3
            style={{
              fontSize: "14px",
              fontWeight: "700",
              margin: "0 0 4px 0",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: isCurrent ? "#1DB954" : "white"
            }}
          >
            {song.title}
          </h3>
          <p
            style={{
              fontSize: "12px",
              color: "#b3b3b3",
              margin: 0,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            {song.artist}
          </p>
        </div>

        {/* LIKE & OPTIONS BUTTONS */}
        <div style={{ display: "flex", gap: "4px" }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleLikeSong(song);
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              padding: "4px",
              color: isLiked ? "#1DB954" : "#777"
            }}
          >
            {isLiked ? "❤️" : "🤍"}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
              color: "#777",
              padding: "4px"
            }}
          >
            ⋮
          </button>
        </div>
      </div>

      {/* PLAYLIST ADD MENU POPOVER */}
      {showMenu && (
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "12px",
            backgroundColor: "#242424",
            border: "1px solid #333",
            borderRadius: "8px",
            padding: "8px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
            zIndex: 100,
            width: "180px"
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ fontSize: "11px", color: "#b3b3b3", marginBottom: "6px" }}>Add to playlist:</div>
          {playlists.length === 0 ? (
            <div style={{ fontSize: "12px", color: "#777" }}>No playlists created</div>
          ) : (
            playlists.map((pl) => (
              <div
                key={pl._id}
                onClick={() => {
                  addSongToPlaylist(pl._id, song);
                  setShowMenu(false);
                }}
                style={{
                  fontSize: "13px",
                  color: "white",
                  padding: "6px 8px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  transition: "background 0.2s"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                🎵 {pl.name}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default SongCard;
