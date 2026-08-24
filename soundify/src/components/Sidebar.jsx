import { useAudio } from "../context/AudioContext";

function Sidebar() {
  const {
    activeTab,
    setActiveTab,
    user,
    logout,
    createPlaylist,
    setIsUploadOpen,
    likedSongs
  } = useAudio();

  const navItems = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "search", label: "Search", icon: "🔍" },
    { id: "library", label: "Your Library", icon: "📚" },
    { id: "liked", label: `Liked Songs (${likedSongs.length})`, icon: "❤️" }
  ];

  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "#000000",
        color: "white",
        padding: "24px 18px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        boxSizing: "border-box",
        borderRight: "1px solid #181818",
        zIndex: 950
      }}
    >
      {/* BRAND LOGO */}
      <div
        onClick={() => setActiveTab("home")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          cursor: "pointer",
          userSelect: "none"
        }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "#1DB954",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px"
          }}
        >
          🎧
        </div>
        <h2 style={{ margin: 0, fontSize: "22px", fontWeight: "700", tracking: "-0.5px" }}>
          Soundify
        </h2>
      </div>

      {/* NAVIGATION TABS */}
      <nav style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "12px 16px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: isActive ? "700" : "500",
                fontSize: "14px",
                color: isActive ? "#ffffff" : "#b3b3b3",
                backgroundColor: isActive ? "#282828" : "transparent",
                transition: "all 0.2s"
              }}
            >
              <span style={{ fontSize: "16px" }}>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          );
        })}
      </nav>

      {/* QUICK ACTIONS */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "8px" }}>
        <button
          onClick={() => {
            const name = prompt("Enter playlist name:");
            if (name) createPlaylist(name);
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            width: "100%",
            padding: "10px 14px",
            borderRadius: "6px",
            border: "1px dashed #333",
            backgroundColor: "#121212",
            color: "#b3b3b3",
            fontSize: "13px",
            fontWeight: "600",
            cursor: "pointer",
            textAlign: "left"
          }}
        >
          <span>➕</span> Create Playlist
        </button>

        <button
          onClick={() => setIsUploadOpen(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            width: "100%",
            padding: "10px 14px",
            borderRadius: "6px",
            border: "1px solid #1DB954",
            backgroundColor: "rgba(29, 185, 84, 0.1)",
            color: "#1DB954",
            fontSize: "13px",
            fontWeight: "600",
            cursor: "pointer",
            textAlign: "left"
          }}
        >
          <span>📤</span> Upload MP3 File
        </button>
      </div>

      {/* USER PROFILE & LOGOUT FOOTER */}
      <div
        style={{
          marginTop: "auto",
          paddingTop: "16px",
          borderTop: "1px solid #181818",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
            alt="User avatar"
            style={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover" }}
          />
          <div style={{ overflow: "hidden", maxWidth: "110px" }}>
            <div
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "white",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}
            >
              {user?.username || "Guest User"}
            </div>
            <div style={{ fontSize: "11px", color: "#b3b3b3" }}>
              {user ? "Premium" : "Guest Mode"}
            </div>
          </div>
        </div>

        <button
          onClick={logout}
          title="Logout"
          style={{
            background: "none",
            border: "none",
            color: "#b3b3b3",
            fontSize: "16px",
            cursor: "pointer",
            padding: "6px"
          }}
        >
          🚪
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
