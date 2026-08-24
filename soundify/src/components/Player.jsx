import { useState } from "react";
import { useAudio } from "../context/AudioContext";

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
            bottom: "90px",
            right: "24px",
            width: "320px",
            maxHeight: "400px",
            backgroundColor: "#181818",
            border: "1px solid #282828",
            borderRadius: "12px",
            padding: "16px",
            boxShadow: "0 16px 32px rgba(0,0,0,0.8)",
            zIndex: 1000,
            overflowY: "auto",
            color: "white"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
              borderBottom: "1px solid #282828",
              paddingBottom: "8px"
            }}
          >
            <h3 style={{ margin: 0, fontSize: "15px" }}>Up Next ({playQueue.length})</h3>
            <button
              onClick={() => setShowQueue(false)}
              style={{ background: "none", border: "none", color: "#b3b3b3", cursor: "pointer" }}
            >
              ✕
            </button>
          </div>

          {playQueue.length === 0 ? (
            <p style={{ color: "#b3b3b3", fontSize: "13px" }}>Queue is empty</p>
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
                    backgroundColor: isCurrent ? "#282828" : "transparent",
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
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        color: isCurrent ? "#1DB954" : "white"
                      }}
                    >
                      {song.title}
                    </div>
                    <div style={{ fontSize: "11px", color: "#b3b3b3" }}>{song.artist}</div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* MAIN BOTTOM PLAYER BAR */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: "250px",
          right: 0,
          height: "85px",
          backgroundColor: "#181818",
          borderTop: "1px solid #282828",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 900,
          boxShadow: "0 -4px 20px rgba(0,0,0,0.5)"
        }}
      >
        {/* LEFT: Track Info */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", width: "240px" }}>
          <img
            src={currentSong.cover}
            alt={currentSong.title}
            style={{ width: "56px", height: "56px", borderRadius: "6px", objectFit: "cover" }}
          />
          <div style={{ overflow: "hidden", flex: 1 }}>
            <div
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "white",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}
            >
              {currentSong.title}
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "#b3b3b3",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}
            >
              {currentSong.artist}
            </div>
          </div>
          <button
            onClick={() => toggleLikeSong(currentSong)}
            title={isLiked ? "Unlike" : "Like"}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "18px",
              color: isLiked ? "#1DB954" : "#b3b3b3",
              padding: "4px"
            }}
          >
            {isLiked ? "❤️" : "🤍"}
          </button>
        </div>

        {/* CENTER: Playback Controls & Timeline Scrubber */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            maxWidth: "500px",
            flex: 1
          }}
        >
          {/* Action Buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <button
              onClick={() => setIsShuffle(!isShuffle)}
              title="Shuffle"
              style={{
                background: "none",
                border: "none",
                fontSize: "15px",
                cursor: "pointer",
                color: isShuffle ? "#1DB954" : "#b3b3b3"
              }}
            >
              🔀
            </button>

            <button
              onClick={prevSong}
              title="Previous Track"
              style={{
                background: "none",
                border: "none",
                fontSize: "18px",
                cursor: "pointer",
                color: "#b3b3b3"
              }}
            >
              ⏮️
            </button>

            <button
              onClick={togglePlay}
              title={isPlaying ? "Pause" : "Play"}
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                backgroundColor: "white",
                color: "black",
                border: "none",
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "transform 0.1s"
              }}
            >
              {isPlaying ? "⏸" : "▶"}
            </button>

            <button
              onClick={nextSong}
              title="Next Track"
              style={{
                background: "none",
                border: "none",
                fontSize: "18px",
                cursor: "pointer",
                color: "#b3b3b3"
              }}
            >
              ⏭️
            </button>

            <button
              onClick={() => setIsRepeat(!isRepeat)}
              title="Repeat"
              style={{
                background: "none",
                border: "none",
                fontSize: "15px",
                cursor: "pointer",
                color: isRepeat ? "#1DB954" : "#b3b3b3"
              }}
            >
              🔁
            </button>
          </div>

          {/* Timeline Bar */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", width: "100%" }}>
            <span style={{ fontSize: "11px", color: "#b3b3b3", width: "35px", textAlign: "right" }}>
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
                accentColor: "#1DB954",
                height: "4px",
                cursor: "pointer"
              }}
            />

            <span style={{ fontSize: "11px", color: "#b3b3b3", width: "35px" }}>
              {formatTime(duration || 30)}
            </span>
          </div>
        </div>

        {/* RIGHT: Volume Slider & Queue Toggle */}
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
            onClick={() => setShowQueue(!showQueue)}
            title="Up Next Queue"
            style={{
              background: "none",
              border: "none",
              color: showQueue ? "#1DB954" : "#b3b3b3",
              fontSize: "16px",
              cursor: "pointer"
            }}
          >
            📜
          </button>

          <button
            onClick={toggleMute}
            title={isMuted ? "Unmute" : "Mute"}
            style={{
              background: "none",
              border: "none",
              color: "#b3b3b3",
              fontSize: "16px",
              cursor: "pointer"
            }}
          >
            {isMuted || volume === 0 ? "🔇" : "🔊"}
          </button>

          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : volume}
            onChange={(e) => changeVolume(Number(e.target.value))}
            style={{
              width: "80px",
              accentColor: "#1DB954",
              height: "4px",
              cursor: "pointer"
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Player;
