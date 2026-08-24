import { useState } from "react";
import { useAudio } from "../context/AudioContext";

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
      const res = await fetch(`http://localhost:5000${endpoint}`, {
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
        height: "100vh",
        background: "linear-gradient(180deg, #1db954 0%, #121212 40%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white"
      }}
    >
      <div
        style={{
          width: "400px",
          backgroundColor: "#181818",
          borderRadius: "16px",
          padding: "40px 36px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.7)",
          textAlign: "center"
        }}
      >
        {/* LOGO */}
        <div style={{ fontSize: "36px", marginBottom: "8px" }}>🎧</div>
        <h1 style={{ margin: "0 0 8px 0", fontSize: "28px", fontWeight: "800" }}>
          Soundify
        </h1>
        <p style={{ color: "#b3b3b3", marginBottom: "28px", fontSize: "14px" }}>
          {isRegister ? "Create your account" : "Log in to continue listening"}
        </p>

        {/* ERROR MSG */}
        {error && (
          <div
            style={{
              backgroundColor: "rgba(255, 77, 77, 0.15)",
              border: "1px solid #ff4d4d",
              color: "#ff4d4d",
              padding: "10px",
              borderRadius: "8px",
              fontSize: "13px",
              marginBottom: "20px"
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {isRegister && (
            <input
              type="text"
              required
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "8px",
                border: "1px solid #333",
                backgroundColor: "#121212",
                color: "white",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box"
              }}
            />
          )}

          <input
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "8px",
              border: "1px solid #333",
              backgroundColor: "#121212",
              color: "white",
              fontSize: "14px",
              outline: "none",
              boxSizing: "border-box"
            }}
          />

          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "8px",
              border: "1px solid #333",
              backgroundColor: "#121212",
              color: "white",
              fontSize: "14px",
              outline: "none",
              boxSizing: "border-box"
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "30px",
              border: "none",
              backgroundColor: "#1db954",
              color: "black",
              fontSize: "16px",
              fontWeight: "700",
              cursor: loading ? "wait" : "pointer",
              marginTop: "8px"
            }}
          >
            {loading ? "Please wait..." : isRegister ? "Sign Up" : "Log In"}
          </button>
        </form>

        {/* TOGGLE REGISTRATION */}
        <p style={{ marginTop: "18px", fontSize: "13px", color: "#b3b3b3" }}>
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={() => {
              setIsRegister(!isRegister);
              setError("");
            }}
            style={{ color: "#1db954", fontWeight: "600", cursor: "pointer" }}
          >
            {isRegister ? "Log In" : "Sign Up"}
          </span>
        </p>

        {/* DIVIDER */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            margin: "20px 0",
            color: "#777",
            fontSize: "12px"
          }}
        >
          <div style={{ flex: 1, height: "1px", background: "#333" }} />
          OR
          <div style={{ flex: 1, height: "1px", background: "#333" }} />
        </div>

        {/* GUEST MODE */}
        <button
          onClick={onGuestLogin}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "30px",
            border: "1px solid #555",
            backgroundColor: "transparent",
            color: "white",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          Continue as Guest
        </button>
      </div>
    </div>
  );
}

export default Login;
