function Player({ song }) {
  if (!song) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: "300px",
        right: 0,
        backgroundColor: "#181818",
        borderTop: "1px solid #282828",
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        zIndex: 100
      }}
    >
      <img
        src={song.cover}
        alt={song.title}
        style={{ width: "56px", height: "56px", borderRadius: "6px" }}
      />

      <div style={{ flex: 1 }}>
        <div style={{ fontSize: "14px" }}>{song.title}</div>
        <div style={{ fontSize: "12px", color: "#b3b3b3" }}>
          {song.artist}
        </div>
      </div>

      <audio src={song.preview} controls autoPlay />
    </div>
  );
}

export default Player;
