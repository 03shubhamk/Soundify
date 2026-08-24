import { useState } from "react";
import { AudioProvider, useAudio } from "./context/AudioContext";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import Player from "./components/Player";
import UploadModal from "./components/UploadModal";
import ToastNotification from "./components/ToastNotification";

function AppContent() {
  const { user } = useAudio();
  const [isGuest, setIsGuest] = useState(false);

  // Show Login page if neither logged in via JWT nor guest session active
  if (!user && !isGuest) {
    return <Login onGuestLogin={() => setIsGuest(true)} />;
  }

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#121212",
        minHeight: "100vh",
        position: "relative"
      }}
    >
      <ToastNotification />
      <Sidebar />
      <Main />
      <Player />
      <UploadModal />
    </div>
  );
}

function App() {
  return (
    <AudioProvider>
      <AppContent />
    </AudioProvider>
  );
}

export default App;
