import { useState } from "react";
import { useAudio } from "../context/AudioContext";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Heart,
  Volume2,
  VolumeX,
  List,
  Activity
} from "lucide-react";

function Player() {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    playQueue,
    isShuffle,
    isRepeat,
    likedSongs,
    togglePlay,
    seekTo,
    changeVolume,
    toggleMute,
    nextSong,
    prevSong,
    setIsShuffle,
    setIsRepeat,
    toggleLikeSong,
    playSong
  } = useAudio();

  const [showQueue, setShowQueue] = useState(false);

  if (!currentSong) return null;

  const isLiked = likedSongs.some(
    (s) => String(s.id || s._id) === String(currentSong.id || currentSong._id)
  );

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds === 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <>
      {/* QUEUE POPOVER MODAL */}
      {showQueue && (
        <div
          style={{
            position: "fixed",
            bottom: "85px",
            right: "24px",
            width: "320px",
            maxHeight: "400px",
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border-color)",
            borderRadius: "12px",
            padding: "16px",
            boxShadow: "0 16px 32px rgba(0,0,0,0.4)",
            zIndex: 1000,
            overflowY: "auto",
            color: "var(--text-main)"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
              borderBottom: "1px solid var(--border-color)",
              paddingBottom: "8px"
            }}
          >
            <h3 style={{ margin: 0, fontSize: "15px", fontWeight: "700" }}>Up Next ({playQueue.length})</h3>
            <button
              onClick={() => setShowQueue(false)}
              style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
            >
              ✕
            </button>
          </div>

          {playQueue.length === 0 ? (
            <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>Queue is empty</p>
          ) : (
            playQueue.map((song, index) => {
              const isCurrent =
                String(song.id || song._id) === String(currentSong.id || currentSong._id);
              return (
                <div
                  key={index}
                  onClick={() => playSong(song)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "8px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    backgroundColor: isCurrent ? "var(--bg-active-pill)" : "transparent",
                    transition: "background 0.2s"
                  }}
                >
                  <img
                    src={song.cover}
                    alt={song.title}
                    style={{ width: "36px", height: "36px", borderRadius: "4px" }}
                  />
                  <div style={{ flex: 1, overflow: "hidden" }}>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: "700",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        color: isCurrent ? "var(--accent-cyan)" : "var(--text-main)"
                      }}
                    >
                      {song.title}
                    </div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{song.artist}</div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* MAIN STICKY BOTTOM PLAYER BAR */}
      <footer
        style={{
          position: "fixed",
          bottom: 0,
          left: "240px",
          right: 0,
          height: "80px",
          backgroundColor: "var(--bg-player)",
          borderTop: "1px solid var(--border-color)",
          padding: "0 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 900,
          boxShadow: "0 -4px 20px rgba(0,0,0,0.2)",
          transition: "background-color 0.3s, border-color 0.3s"
        }}
      >
        {/* LEFT: Sound Wave Indicator & Track Info */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", width: "240px" }}>
          <Activity size={18} color="var(--accent-cyan)" />

          <img
            src={currentSong.cover}
            alt={currentSong.title}
            style={{ width: "46px", height: "46px", borderRadius: "8px", objectFit: "cover" }}
          />

          <div style={{ overflow: "hidden", flex: 1 }}>
            <div
              style={{
                fontSize: "13px",
                fontWeight: "700",
                color: "var(--text-main)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}
            >
              {currentSong.title}
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
              {currentSong.artist}
            </div>
          </div>
        </div>

        {/* CENTER: Playback Controls & Timeline Scrubber */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            maxWidth: "540px",
            flex: 1
          }}
        >
          {/* Action Buttons */}
          <button
            onClick={prevSong}
            title="Previous Track"
            aria-label="Previous Track"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
              display: "flex",
              alignItems: "center"
            }}
          >
            <SkipBack size={18} />
          </button>

          <button
            onClick={togglePlay}
            title={isPlaying ? "Pause" : "Play"}
            aria-label={isPlaying ? "Pause" : "Play"}
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              backgroundColor: "var(--accent-cyan)",
              color: "#000",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0, 210, 255, 0.4)",
              transition: "transform 0.1s"
            }}
          >
            {isPlaying ? <Pause size={20} fill="#000" /> : <Play size={20} fill="#000" style={{ marginLeft: "2px" }} />}
          </button>

          <button
            onClick={nextSong}
            title="Next Track"
            aria-label="Next Track"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
              display: "flex",
              alignItems: "center"
            }}
          >
            <SkipForward size={18} />
          </button>

          {/* Timeline Bar */}
          <span style={{ fontSize: "11px", color: "var(--text-muted)", width: "35px", textAlign: "right" }}>
            {formatTime(currentTime)}
          </span>

          <input
            type="range"
            min={0}
            max={duration || 30}
            value={currentTime}
            onChange={(e) => seekTo(Number(e.target.value))}
            style={{
              flex: 1,
              accentColor: "var(--accent-cyan)",
              height: "4px",
              cursor: "pointer"
            }}
          />

          <span style={{ fontSize: "11px", color: "var(--text-muted)", width: "35px" }}>
            {formatTime(duration || 30)}
          </span>
        </div>

        {/* RIGHT: Volume & Extras Controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            width: "200px",
            justifyContent: "flex-end"
          }}
        >
          <button
            onClick={() => toggleLikeSong(currentSong)}
            title={isLiked ? "Unlike" : "Like"}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: isLiked ? "var(--accent-cyan)" : "var(--text-muted)",
              display: "flex",
              alignItems: "center"
            }}
          >
            <Heart size={18} fill={isLiked ? "var(--accent-cyan)" : "none"} />
          </button>

          <button
            onClick={() => setIsShuffle(!isShuffle)}
            title="Shuffle"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: isShuffle ? "var(--accent-cyan)" : "var(--text-muted)",
              display: "flex",
              alignItems: "center"
            }}
          >
            <Shuffle size={18} />
          </button>

          <button
            onClick={toggleMute}
            title={isMuted ? "Unmute" : "Mute"}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-muted)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center"
            }}
          >
            {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : volume}
            onChange={(e) => changeVolume(Number(e.target.value))}
            style={{
              width: "70px",
              accentColor: "var(--accent-cyan)",
              height: "4px",
              cursor: "pointer"
            }}
          />

          <button
            onClick={() => setShowQueue(!showQueue)}
            title="Up Next Queue"
            style={{
              background: "none",
              border: "none",
              color: showQueue ? "var(--accent-cyan)" : "var(--text-muted)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center"
            }}
          >
            <List size={18} />
          </button>
        </div>
      </footer>
    </>
  );
}

export default Player;
