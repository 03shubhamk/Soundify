function Login({ onLogin }) {
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
          width: "380px",
          backgroundColor: "#181818",
          borderRadius: "12px",
          padding: "40px 32px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
          textAlign: "center"
        }}
      >
        {/* Logo / Title */}
        <h1 style={{ marginBottom: "8px" }}>🎧 Soundify</h1>
        <p style={{ color: "#b3b3b3", marginBottom: "32px" }}>
          Music for everyone
        </p>

        {/* Email */}
        <input
          type="email"
          placeholder="Email address"
          style={{
            width: "100%",
            padding: "12px 14px",
            marginBottom: "16px",
            borderRadius: "6px",
            border: "1px solid #333",
            backgroundColor: "#121212",
            color: "white",
            outline: "none"
          }}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          style={{
            width: "100%",
            padding: "12px 14px",
            marginBottom: "24px",
            borderRadius: "6px",
            border: "1px solid #333",
            backgroundColor: "#121212",
            color: "white",
            outline: "none"
          }}
        />

        {/* Login Button */}
        <button
          onClick={onLogin}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "999px",
            border: "none",
            backgroundColor: "#1db954",
            color: "black",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: "20px"
          }}
        >
          Log In
        </button>

        {/* Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "20px",
            color: "#777",
            fontSize: "12px"
          }}
        >
          <div style={{ flex: 1, height: "1px", background: "#333" }} />
          OR
          <div style={{ flex: 1, height: "1px", background: "#333" }} />
        </div>

        {/* Guest Login */}
        <button
          onClick={onLogin}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "999px",
            border: "1px solid #555",
            backgroundColor: "transparent",
            color: "white",
            cursor: "pointer"
          }}
        >
          Continue as Guest
        </button>

        {/* Footer */}
        <p
          style={{
            marginTop: "24px",
            fontSize: "12px",
            color: "#777"
          }}
        >
          This is a demo project (no real authentication)
        </p>
      </div>
    </div>
  );
}

export default Login;
