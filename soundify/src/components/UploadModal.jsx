import { useState } from "react";
import { useAudio } from "../context/AudioContext";
import { API_BASE_URL } from "../config";

// MP3 File Upload Modal Component
function UploadModal({ onClose }) {
  const { isUploadOpen, setIsUploadOpen, showToast, token } = useAudio();

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("Pop");
  const [album, setAlbum] = useState("Single");
  const [audioFile, setAudioFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  if (!isUploadOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!audioFile) {
      alert("Please select an MP3 audio file");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("genre", genre);
    formData.append("album", album);
    formData.append("audio", audioFile);
    if (coverFile) formData.append("cover", coverFile);

    try {
      const headers = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(`${API_BASE_URL}/songs/upload`, {
        method: "POST",
        headers,
        body: formData
      });

      const data = await res.json();
      if (res.ok) {
        showToast(`Successfully uploaded "${data.title || "your track"}"! 🎶`);
        setIsUploadOpen(false);
        // Reset form
        setTitle("");
        setArtist("");
        setAudioFile(null);
        setCoverFile(null);
      } else {
        alert(data.error || "Upload failed");
      }
    } catch (err) {
      console.error("Upload Error:", err);
      alert("Network error: Could not connect to upload server");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000
      }}
    >
      <div
        style={{
          backgroundColor: "#181818",
          border: "1px solid #282828",
          borderRadius: "16px",
          width: "440px",
          padding: "32px",
          color: "white",
          boxShadow: "0 20px 50px rgba(0,0,0,0.8)"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <h2 style={{ margin: 0, fontSize: "20px" }}>Upload MP3 Track</h2>
          <button
            onClick={() => setIsUploadOpen(false)}
            style={{ background: "none", border: "none", color: "#b3b3b3", cursor: "pointer", fontSize: "16px" }}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <label style={{ fontSize: "12px", color: "#b3b3b3", display: "block", marginBottom: "4px" }}>
              Song Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Summer Breeze"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "6px",
                border: "1px solid #333",
                backgroundColor: "#121212",
                color: "white",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: "12px", color: "#b3b3b3", display: "block", marginBottom: "4px" }}>
              Artist Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Alex River"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "6px",
                border: "1px solid #333",
                backgroundColor: "#121212",
                color: "white",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: "12px", color: "#b3b3b3", display: "block", marginBottom: "4px" }}>
                Genre
              </label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "6px",
                  border: "1px solid #333",
                  backgroundColor: "#121212",
                  color: "white",
                  boxSizing: "border-box"
                }}
              >
                <option value="Pop">Pop</option>
                <option value="Electronic">Electronic</option>
                <option value="Hip-Hop">Hip-Hop</option>
                <option value="Rock">Rock</option>
                <option value="Chill">Chill</option>
              </select>
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ fontSize: "12px", color: "#b3b3b3", display: "block", marginBottom: "4px" }}>
                Album
              </label>
              <input
                type="text"
                placeholder="e.g. Single"
                value={album}
                onChange={(e) => setAlbum(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "6px",
                  border: "1px solid #333",
                  backgroundColor: "#121212",
                  color: "white",
                  boxSizing: "border-box"
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: "12px", color: "#b3b3b3", display: "block", marginBottom: "4px" }}>
              Audio File (.mp3) *
            </label>
            <input
              type="file"
              accept="audio/mp3,audio/wav"
              required
              onChange={(e) => setAudioFile(e.target.files[0])}
              style={{
                width: "100%",
                padding: "8px",
                backgroundColor: "#121212",
                borderRadius: "6px",
                border: "1px solid #333",
                color: "#b3b3b3",
                fontSize: "12px",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: "12px", color: "#b3b3b3", display: "block", marginBottom: "4px" }}>
              Cover Image (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverFile(e.target.files[0])}
              style={{
                width: "100%",
                padding: "8px",
                backgroundColor: "#121212",
                borderRadius: "6px",
                border: "1px solid #333",
                color: "#b3b3b3",
                fontSize: "12px",
                boxSizing: "border-box"
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isUploading}
            style={{
              marginTop: "12px",
              padding: "12px",
              borderRadius: "30px",
              border: "none",
              backgroundColor: "#1DB954",
              color: "black",
              fontWeight: "700",
              fontSize: "15px",
              cursor: isUploading ? "wait" : "pointer"
            }}
          >
            {isUploading ? "Uploading Track..." : "Upload Song"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadModal;
