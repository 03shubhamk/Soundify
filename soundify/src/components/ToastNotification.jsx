import { useAudio } from "../context/AudioContext";

function ToastNotification() {
  const { toastMessage } = useAudio();

  if (!toastMessage) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#1DB954",
        color: "#000",
        padding: "12px 24px",
        borderRadius: "30px",
        fontWeight: "600",
        fontSize: "14px",
        boxShadow: "0 8px 24px rgba(29, 185, 84, 0.4)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: "10px",
        animation: "fadeInDown 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
      }}
    >
      <span>✨</span>
      <span>{toastMessage}</span>
    </div>
  );
}

export default ToastNotification;
