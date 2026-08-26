import { useAudio } from "../context/AudioContext";
import { Search, Sun, Moon, Bell, Settings } from "lucide-react";

function Navbar({ searchTerm, setSearchTerm }) {
  const {
    topCategory,
    setTopCategory,
    theme,
    toggleTheme,
    user,
    setActiveTab
  } = useAudio();

  const categories = ["MUSIC", "PODCAST", "LIVE", "GENRES"];

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 32px",
        backgroundColor: "var(--bg-header)",
        borderBottom: "1px solid var(--border-color)",
        position: "sticky",
        top: 0,
        zIndex: 900,
        backdropFilter: "blur(12px)",
        transition: "background-color 0.3s, border-color 0.3s"
      }}
    >
      {/* LEFT: Category Navigation Tabs */}
      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        {categories.map((cat) => {
          const isActive = topCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                setTopCategory(cat);
                if (cat === "MUSIC") setActiveTab("home");
              }}
              style={{
                background: "none",
                border: "none",
                fontSize: "13px",
                fontWeight: isActive ? "800" : "600",
                letterSpacing: "1px",
                color: isActive ? "var(--accent-cyan)" : "var(--text-muted)",
                cursor: "pointer",
                padding: "6px 0",
                borderBottom: isActive ? "2px solid var(--accent-cyan)" : "2px solid transparent",
                transition: "all 0.2s"
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* CENTER: Pill Search Input */}
      <div style={{ position: "relative", width: "320px" }}>
        <input
          type="text"
          placeholder="Type Here To Search"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (e.target.value.trim()) setActiveTab("search");
          }}
          style={{
            width: "100%",
            padding: "10px 16px 10px 38px",
            borderRadius: "20px",
            border: "1px solid var(--border-color)",
            backgroundColor: "var(--bg-input)",
            color: "var(--text-main)",
            fontSize: "13px",
            outline: "none",
            boxSizing: "border-box",
            transition: "all 0.2s"
          }}
        />
        <Search
          size={16}
          style={{
            position: "absolute",
            left: "14px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--text-muted)"
          }}
        />
      </div>

      {/* RIGHT: Notifications, Settings, Theme Toggle, Profile */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* Theme Switcher Button */}
        <button
          onClick={toggleTheme}
          title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
          style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border-color)",
            color: "var(--text-main)",
            padding: "6px 14px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "600",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.2s"
          }}
        >
          {theme === "dark" ? <Sun size={14} color="#ffd700" /> : <Moon size={14} />}
          <span>{theme === "dark" ? "Light" : "Dark"}</span>
        </button>

        {/* Bell Notification */}
        <button
          title="Notifications"
          style={{
            background: "none",
            border: "none",
            color: "var(--text-muted)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center"
          }}
        >
          <Bell size={18} />
        </button>

        {/* Settings Gear */}
        <button
          title="Settings"
          style={{
            background: "none",
            border: "none",
            color: "var(--text-muted)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center"
          }}
        >
          <Settings size={18} />
        </button>

        {/* User Profile Avatar */}
        <img
          src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
          alt="User Profile"
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid var(--accent-cyan)",
            cursor: "pointer"
          }}
        />
      </div>
    </header>
  );
}

export default Navbar;
