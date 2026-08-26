import { useState } from "react";
import { useAudio } from "../context/AudioContext";
import { Play, Pause, Heart, MoreVertical, Music } from "lucide-react";

function SongCard({ song, queue = [] }) {
  const { playSong, currentSong, isPlaying, likedSongs, toggleLikeSong, playlists, addSongToPlaylist } = useAudio();
  const [showMenu, setShowMenu] = useState(false);

  if (!song) return null;

  const isCurrent = currentSong && String(currentSong.id || currentSong._id) === String(song.id || song._id);
  const isLiked = likedSongs.some((s) => String(s.id || s._id) === String(song.id || song._id));

  return (
    <div
      style={{
        backgroundColor: isCurrent ? "var(--bg-active-pill)" : "var(--bg-card)",
        padding: "14px",
        borderRadius: "12px",
        cursor: "pointer",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        border: "1px solid var(--border-color)"
      }}
      className="song-card"
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
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "var(--accent-cyan)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#000",
            boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
            transition: "all 0.2s"
          }}
        >
          {isCurrent && isPlaying ? <Pause size={18} fill="#000" /> : <Play size={18} fill="#000" style={{ marginLeft: "2px" }} />}
        </div>
      </div>

      {/* METADATA */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ overflow: "hidden", flex: 1 }} onClick={() => playSong(song, queue)}>
          <h3
            style={{
              fontSize: "13px",
              fontWeight: "700",
              margin: "0 0 3px 0",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: isCurrent ? "var(--accent-cyan)" : "var(--text-main)"
            }}
          >
            {song.title}
          </h3>
          <p
            style={{
              fontSize: "11px",
              color: "var(--text-muted)",
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
        <div style={{ display: "flex", gap: "2px" }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleLikeSong(song);
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "2px",
              color: isLiked ? "var(--accent-cyan)" : "var(--text-muted)"
            }}
          >
            <Heart size={15} fill={isLiked ? "var(--accent-cyan)" : "none"} />
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
              color: "var(--text-muted)",
              padding: "2px"
            }}
          >
            <MoreVertical size={15} />
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
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border-color)",
            borderRadius: "8px",
            padding: "8px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            zIndex: 100,
            width: "180px"
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "6px" }}>Add to playlist:</div>
          {playlists.length === 0 ? (
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>No playlists created</div>
          ) : (
            playlists.map((pl) => (
              <div
                key={pl._id}
                onClick={() => {
                  addSongToPlaylist(pl._id, song);
                  setShowMenu(false);
                }}
                style={{
                  fontSize: "12px",
                  color: "var(--text-main)",
                  padding: "6px 8px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "background 0.2s"
                }}
                className="playlist-item-hover"
              >
                <Music size={14} /> {pl.name}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default SongCard;
