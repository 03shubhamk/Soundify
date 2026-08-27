import { useState } from "react";
import { useAudio } from "../context/AudioContext";
import { Headphones } from "lucide-react";
import { API_BASE_URL } from "../config";

function Login({ onGuestLogin }) {
  const { login } = useAudio();
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = isRegister ? "/api/auth/register" : "/api/auth/login";
    const body = isRegister ? { username, email, password } : { email, password };

    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const data = await res.json();
      if (res.ok) {
        login(data.user, data.token);
      } else {
        setError(data.error || "Authentication failed");
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError("Unable to connect to authentication server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #050b12 0%, #08101a 50%, #0d2033 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        position: "relative",
        overflow: "hidden",
        padding: "20px"
      }}
    >
      {/* Background circular graphic shapes matching Home hero */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          border: "1px solid rgba(0, 210, 255, 0.15)",
          pointerEvents: "none"
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-150px",
          left: "-150px",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          border: "1px solid rgba(0, 210, 255, 0.1)",
          pointerEvents: "none"
        }}
      />

      {/* LOGIN CARD */}
      <div
        style={{
          width: "420px",
          backgroundColor: "rgba(15, 29, 46, 0.85)",
          backdropFilter: "blur(16px)",
          border: "1px solid #142436",
          borderRadius: "24px",
          padding: "44px 36px",
          boxShadow: "0 24px 60px rgba(0, 210, 255, 0.12)",
          textAlign: "center",
          zIndex: 10
        }}
      >
        {/* BRAND LOGO */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "12px" }}>
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              backgroundColor: "#00d2ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#000",
              boxShadow: "0 6px 18px rgba(0, 210, 255, 0.4)"
            }}
          >
            <Headphones size={24} />
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: "30px",
              fontWeight: "900",
              fontFamily: "'Avenir', 'Outfit', sans-serif",
              color: "#ffffff",
              letterSpacing: "-0.5px"
            }}
          >
            Sound<span style={{ color: "#00d2ff" }}>ify</span>
          </h1>
        </div>

        <p style={{ color: "#7a8e9e", marginBottom: "16px", fontSize: "14px" }}>
          {isRegister ? "Create your Soundify account" : "Log in to stream unlimited music"}
        </p>

        {/* DEMO CREDENTIALS HINT */}
        {!isRegister && (
          <div
            onClick={() => {
              setEmail("demo@soundify.com");
              setPassword("password123");
            }}
            title="Click to auto-fill demo credentials"
            style={{
              backgroundColor: "rgba(0, 210, 255, 0.08)",
              border: "1px dashed rgba(0, 210, 255, 0.4)",
              borderRadius: "12px",
              padding: "10px 14px",
              marginBottom: "20px",
              fontSize: "12px",
              color: "#7a8e9e",
              textAlign: "left",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            <div style={{ fontWeight: "700", color: "#00d2ff", marginBottom: "4px", display: "flex", justifyContent: "space-between" }}>
              <span>💡 Quick Demo Login:</span>
              <span style={{ fontSize: "11px", opacity: 0.8 }}>(Click to auto-fill)</span>
            </div>
            <div><strong>Email:</strong> demo@soundify.com</div>
            <div><strong>Password:</strong> password123</div>
          </div>
        )}



        {/* TAB SWITCHER PILLS */}
        <div
          style={{
            display: "flex",
            backgroundColor: "#08101a",
            borderRadius: "30px",
            padding: "4px",
            marginBottom: "24px",
            border: "1px solid #142436"
          }}
        >
          <button
            type="button"
            onClick={() => {
              setIsRegister(false);
              setError("");
            }}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "26px",
              border: "none",
              backgroundColor: !isRegister ? "#00d2ff" : "transparent",
              color: !isRegister ? "#000000" : "#7a8e9e",
              fontWeight: "700",
              fontSize: "13px",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => {
              setIsRegister(true);
              setError("");
            }}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "26px",
              border: "none",
              backgroundColor: isRegister ? "#00d2ff" : "transparent",
              color: isRegister ? "#000000" : "#7a8e9e",
              fontWeight: "700",
              fontSize: "13px",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            Sign Up
          </button>
        </div>

        {/* ERROR ALERT */}
        {error && (
          <div
            style={{
              backgroundColor: "rgba(255, 77, 77, 0.15)",
              border: "1px solid #ff4d4d",
              color: "#ff4d4d",
              padding: "10px 14px",
              borderRadius: "10px",
              fontSize: "13px",
              marginBottom: "20px"
            }}
          >
            {error}
          </div>
        )}

        {/* AUTH FORM */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {isRegister && (
            <div>
              <input
                type="text"
                required
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px 18px",
                  borderRadius: "12px",
                  border: "1px solid #142436",
                  backgroundColor: "#08101a",
                  color: "#ffffff",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s"
                }}
              />
            </div>
          )}

          <div>
            <input
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 18px",
                borderRadius: "12px",
                border: "1px solid #142436",
                backgroundColor: "#08101a",
                color: "#ffffff",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.2s"
              }}
            />
          </div>

          <div>
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 18px",
                borderRadius: "12px",
                border: "1px solid #142436",
                backgroundColor: "#08101a",
                color: "#ffffff",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.2s"
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "30px",
              border: "none",
              backgroundColor: "#00d2ff",
              color: "#000000",
              fontSize: "15px",
              fontWeight: "800",
              cursor: loading ? "wait" : "pointer",
              marginTop: "8px",
              boxShadow: "0 6px 18px rgba(0, 210, 255, 0.35)",
              transition: "transform 0.1s"
            }}
          >
            {loading ? "Connecting..." : isRegister ? "Create Account" : "Log In to Soundify"}
          </button>
        </form>

        {/* DIVIDER */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            margin: "24px 0",
            color: "#7a8e9e",
            fontSize: "12px"
          }}
        >
          <div style={{ flex: 1, height: "1px", background: "#142436" }} />
          OR
          <div style={{ flex: 1, height: "1px", background: "#142436" }} />
        </div>

        {/* GUEST MODE BUTTON */}
        <button
          type="button"
          onClick={onGuestLogin}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "30px",
            border: "1px solid #142436",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "background 0.2s"
          }}
        >
          Continue as Guest
        </button>
      </div>
    </div>
  );
}

export default Login;
