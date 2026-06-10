import { useEffect, useState } from "react";
import SongCard from "./SongCard";
import Player from "./Player";

function Main() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSongs([]);
      return;
    }

    fetch(`http://localhost:5000/search/${searchTerm}`)
      .then(res => res.json())
      .then(data => setSongs(data))
      .catch(err => console.error(err));
  }, [searchTerm]);

  return (
   <div
  style={{
    marginLeft: "50px",           // sidebar width
    background: "linear-gradient(#1e1e1e, #121212)",
    color: "white",
    minHeight: "100vh",
    paddingBottom: "140px"
  }}
>


      <div
  style={{
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "32px"
  }}
>

        <h1>Search Music</h1>

        <input
          placeholder="Search songs or artists"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            margin: "20px 0",
            borderRadius: "20px",
            border: "none",
            outline: "none"
          }}
        />

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px"
        }}>
          {songs.map(song => (
            <div key={song.id} onClick={() => setCurrentSong(song)}>
              <SongCard
                title={song.title}
                artist={song.artist}
                cover={song.cover}
              />
            </div>
          ))}
        </div>
      </div>

      <Player song={currentSong} />
    </div>
  );
}

export default Main;
