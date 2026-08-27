import { useState, useEffect } from "react";
import { useAudio } from "../context/AudioContext";
import { API_BASE_URL } from "../config";
import {
  Headphones,
  Home,
  ListMusic,
  Disc,
  User,
  Radio,
  Plus,
  Upload,
  LogOut,
  Sparkles
} from "lucide-react";

function Sidebar() {
  const {
    activeTab,
    setActiveTab,
    user,
    logout,
    playSong,
    likedSongs,
    createPlaylist,
    setIsUploadOpen
  } = useAudio();

  const [topCharts, setTopCharts] = useState([]);

  // Mock / API Top Charts for sidebar
  useEffect(() => {
    fetch(`${API_BASE_URL}/search/trending`)
      .then((res) => res.json())
      .then((data) => setTopCharts(data.slice(0, 6)))
      .catch((err) => console.error("Sidebar top charts error:", err));
  }, []);

  const browseItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "library", label: "Playlist", icon: ListMusic },
    { id: "search", label: "Album", icon: Disc },
    { id: "liked", label: `Artist (${likedSongs.length})`, icon: User },
    { id: "radio", label: "Radio", icon: Radio }
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
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "var(--accent-cyan)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#000",
            boxShadow: "0 4px 14px rgba(0, 210, 255, 0.4)"
          }}
        >
          <Headphones size={20} />
        </div>
        <h2
          style={{
            margin: 0,
            fontSize: "24px",
            fontWeight: "800",
            fontFamily: "'Avenir', 'Outfit', sans-serif",
            color: "var(--text-main)",
            letterSpacing: "-0.5px"
          }}
        >
          Sound<span style={{ color: "var(--accent-cyan)" }}>ify</span>
        </h2>
      </div>

      {/* BROWSE SECTION */}
      <div>
        <div
          style={{
            fontSize: "11px",
            fontWeight: "700",
            color: "var(--text-muted)",
            marginBottom: "10px",
            textTransform: "uppercase",
            letterSpacing: "0.8px"
          }}
        >
          Browse
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {browseItems.map((item) => {
            const isActive = activeTab === item.id;
            const IconComponent = item.icon;
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
                  color: isActive ? "var(--accent-cyan)" : "var(--text-muted)",
                  backgroundColor: isActive ? "var(--bg-active-pill)" : "transparent",
                  transition: "all 0.2s"
                }}
              >
                <IconComponent size={18} />
                <span>{item.label}</span>
              </div>
            );
          })}
        </nav>
      </div>

      {/* QUICK CREATION & UPLOAD ACTIONS */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
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
            padding: "9px 12px",
            borderRadius: "8px",
            border: "1px dashed var(--border-color)",
            backgroundColor: "transparent",
            color: "var(--text-muted)",
            fontSize: "13px",
            fontWeight: "600",
            cursor: "pointer",
            textAlign: "left",
            transition: "all 0.2s"
          }}
        >
          <Plus size={16} /> Create Playlist
        </button>

        <button
          onClick={() => setIsUploadOpen(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            width: "100%",
            padding: "9px 12px",
            borderRadius: "8px",
            border: "1px solid var(--accent-cyan)",
            backgroundColor: "rgba(0, 210, 255, 0.08)",
            color: "var(--accent-cyan)",
            fontSize: "13px",
            fontWeight: "600",
            cursor: "pointer",
            textAlign: "left",
            transition: "all 0.2s"
          }}
        >
          <Upload size={16} /> Upload MP3
        </button>
      </div>

      {/* TOP CHARTS SECTION (01 - 07 RANKING LIST) */}
      <div style={{ marginTop: "6px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px"
          }}
        >
          <span
            style={{
              fontSize: "12px",
              fontWeight: "700",
              color: "var(--text-main)",
              textTransform: "uppercase",
              letterSpacing: "0.8px"
            }}
          >
            Top Charts
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
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
                  style={{ width: "36px", height: "36px", borderRadius: "6px", objectFit: "cover" }}
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
            marginTop: "10px",
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
            cursor: "pointer",
            padding: "4px"
          }}
        >
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
