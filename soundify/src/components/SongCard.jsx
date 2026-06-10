function SongCard({ title, artist, cover }) {
  return (
    <div
      style={{
        backgroundColor: "#181818",
        padding: "16px",
        borderRadius: "12px",
        cursor: "pointer",
        transition: "background 0.3s"
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = "#282828"}
      onMouseLeave={(e) => e.currentTarget.style.background = "#181818"}
    >
      <img
        src={cover}
        alt={title}
        style={{
          width: "100%",
          aspectRatio: "1 / 1",
          objectFit: "cover",
          borderRadius: "8px",
          marginBottom: "12px"
        }}
      />
      <h3 style={{ fontSize: "14px", marginBottom: "4px" }}>{title}</h3>
      <p style={{ fontSize: "12px", color: "#b3b3b3" }}>{artist}</p>
    </div>
  );
}

export default SongCard;
