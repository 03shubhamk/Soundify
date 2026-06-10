import { useState } from "react";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔴 SHOW LOGIN PAGE
  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  // 🟢 SHOW APP AFTER LOGIN
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#121212",
        minHeight: "100vh"
      }}
    >
      <Sidebar onLogout={() => setIsLoggedIn(false)} />

      <div
        style={{
          marginLeft: "250px",
          width: "calc(100% - 250px)"
        }}
      >
        <Main />
      </div>
    </div>
  );
}

export default App;
