import { useState, useEffect } from "react";
import { useAudio } from "../context/AudioContext";

function Sidebar() {
  const {
    activeTab,
    setActiveTab,
    user,
    logout,
    playSong,
    likedSongs
  } = useAudio();

  const [topCharts, setTopCharts] = useState([]);

  // Mock / API Top Charts for sidebar
  useEffect(() => {
    fetch("http://localhost:5000/search/trending")
      .then((res) => res.json())
      .then((data) => setTopCharts(data.slice(0, 6)))
      .catch((err) => console.error("Sidebar top charts error:", err));
  }, []);

  const browseItems = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "library", label: "Playlist", icon: "📑" },
    { id: "search", label: "Album", icon: "💿" },
    { id: "liked", label: `Artist (${likedSongs.length})`, icon: "👤" },
    { id: "radio", label: "Radio", icon: "📻" }
  ];

  return (
    <aside
      style={{
        width: "240px",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "var(--bg-sidebar)",
        color: "var(--text-main)",
        padding: "24px 18px 120px 18px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        boxSizing: "border-box",
        borderRight: "1px solid var(--border-color)",
        zIndex: 950,
        overflowY: "auto",
        transition: "background-color 0.3s, border-color 0.3s"
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
        <h2
          style={{
            margin: 0,
            fontSize: "26px",
            fontWeight: "800",
            fontFamily: "'Avenir', 'Outfit', sans-serif",
            color: "var(--accent-cyan)",
            letterSpacing: "-0.5px"
          }}
        >
          Muzik<span style={{ color: "var(--text-main)" }}>Link</span>
        </h2>
      </div>

      {/* BROWSE SECTION */}
      <div>
        <div
          style={{
            fontSize: "12px",
            fontWeight: "700",
            color: "var(--text-muted)",
            marginBottom: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.5px"
          }}
        >
          Browse
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {browseItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <div
                key={item.id}
                onClick={() => {
                  if (item.id === "radio") setActiveTab("home");
                  else setActiveTab(item.id);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: isActive ? "700" : "500",
                  fontSize: "14px",
                  color: isActive ? "var(--text-main)" : "var(--text-muted)",
                  backgroundColor: isActive ? "var(--bg-active-pill)" : "transparent",
                  transition: "all 0.2s"
                }}
              >
                <span style={{ fontSize: "16px" }}>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            );
          })}
        </nav>
      </div>

      {/* TOP CHARTS SECTION (01 - 07 RANKING LIST) */}
      <div style={{ marginTop: "10px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px"
          }}
        >
          <span
            style={{
              fontSize: "13px",
              fontWeight: "700",
              color: "var(--text-main)"
            }}
          >
            Top Charts
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {topCharts.map((song, index) => {
            const rankStr = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;
            return (
              <div
                key={song.id || index}
                onClick={() => playSong(song, topCharts)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "4px 6px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "background 0.2s"
                }}
                className="top-chart-item"
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "800",
                    color: "var(--text-muted)",
                    width: "18px"
                  }}
                >
                  {rankStr}
                </span>

                <img
                  src={song.cover}
                  alt={song.title}
                  style={{ width: "38px", height: "38px", borderRadius: "6px", objectFit: "cover" }}
                />

                <div style={{ flex: 1, overflow: "hidden" }}>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "700",
                      color: "var(--text-main)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }}
                  >
                    {song.title}
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
                    {song.artist}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => setActiveTab("search")}
          style={{
            background: "none",
            border: "none",
            color: "var(--text-muted)",
            fontSize: "11px",
            fontWeight: "600",
            cursor: "pointer",
            marginTop: "12px",
            padding: 0
          }}
        >
          See All
        </button>
      </div>

      {/* FOOTER USER PROFILE */}
      <div
        style={{
          marginTop: "auto",
          paddingTop: "12px",
          borderTop: "1px solid var(--border-color)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <img
            src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
            alt="User avatar"
            style={{ width: "28px", height: "28px", borderRadius: "50%", objectFit: "cover" }}
          />
          <div style={{ overflow: "hidden", maxWidth: "100px" }}>
            <div
              style={{
                fontSize: "12px",
                fontWeight: "700",
                color: "var(--text-main)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
              }}
            >
              {user?.username || "Guest User"}
            </div>
          </div>
        </div>

        <button
          onClick={logout}
          title="Logout"
          style={{
            background: "none",
            border: "none",
            color: "var(--text-muted)",
            fontSize: "14px",
            cursor: "pointer"
          }}
        >
          🚪
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
