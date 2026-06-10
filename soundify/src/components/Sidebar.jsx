function Sidebar({ onLogout }) {
  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "#000",
        color: "white",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        boxShadow: "2px 0 6px rgba(0,0,0,0.4)"
      }}
    >
      <h2>🎧 Soundify</h2>

      <div style={{ color: "#1DB954", fontWeight: "bold" }}>🏠 Home</div>
      <div style={{ color: "#b3b3b3" }}>🔍 Search</div>
      <div style={{ color: "#b3b3b3" }}>📚 Your Library</div>

      <button
        onClick={onLogout} 
        style={{
                  marginTop: "auto",
            marginBottom : "50px",
          background: "transparent",
          border: "1px solid #333",
          color: "#b3b3b3",
          padding: "10px",
          borderRadius: "20px",
          cursor: "pointer"
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
