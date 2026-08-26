import { createContext, useContext, useState, useEffect, useRef } from "react";

const AudioContext = createContext(null);

// Global AudioContext: Orchestrates playback timeline, queue, liked songs, playlists and themes
export const AudioProvider = ({ children }) => {

  // Audio Ref
  const audioRef = useRef(new Audio());

  // Theme & Navigation State
  const [theme, setTheme] = useState(() => localStorage.getItem("soundify_theme") || "dark");
  const [topCategory, setTopCategory] = useState("MUSIC"); // MUSIC | PODCAST | LIVE | GENRES
  const [activeTab, setActiveTab] = useState("home"); // home | playlist | album | artist | radio | search | library | liked
  const [toastMessage, setToastMessage] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  // Player State
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  
  // Queue & Navigation State
  const [playQueue, setPlayQueue] = useState([]);
  const [queueIndex, setQueueIndex] = useState(-1);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  // User & Collections State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("soundify_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("soundify_token") || null);
  const [likedSongs, setLikedSongs] = useState(() => {
    const saved = localStorage.getItem("soundify_liked");
    return saved ? JSON.parse(saved) : [];
  });
  const [playlists, setPlaylists] = useState(() => {
    const saved = localStorage.getItem("soundify_playlists");
    return saved ? JSON.parse(saved) : [];
  });

  // Toggle Theme between dark and light
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("soundify_theme", newTheme);
  };

  // Display Toast Alert
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Sync Audio volume
  useEffect(() => {
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  // Audio Event Listeners
  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration || 30);
    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        handleNextSong();
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [queueIndex, playQueue, isShuffle, isRepeat]);

  // Sync localStorage
  useEffect(() => {
    localStorage.setItem("soundify_liked", JSON.stringify(likedSongs));
  }, [likedSongs]);

  useEffect(() => {
    localStorage.setItem("soundify_playlists", JSON.stringify(playlists));
  }, [playlists]);

  // Play a specific song and update queue
  const playSong = (song, queue = null) => {
    if (!song) return;

    if (queue && Array.isArray(queue)) {
      setPlayQueue(queue);
      const idx = queue.findIndex(s => String(s.id || s._id) === String(song.id || song._id));
      setQueueIndex(idx !== -1 ? idx : 0);
    } else if (currentSong && String(currentSong.id || currentSong._id) === String(song.id || song._id)) {
      togglePlay();
      return;
    } else {
      setPlayQueue(prev => {
        const exists = prev.some(s => String(s.id || s._id) === String(song.id || song._id));
        return exists ? prev : [song, ...prev];
      });
      setQueueIndex(0);
    }

    setCurrentSong(song);
    audioRef.current.src = song.preview;
    audioRef.current.play().then(() => {
      setIsPlaying(true);
    }).catch(err => console.log("Playback error:", err));

    // Update Recently Played
    setRecentlyPlayed(prev => {
      const filtered = prev.filter(s => String(s.id || s._id) !== String(song.id || song._id));
      return [song, ...filtered].slice(0, 10);
    });
  };

  const togglePlay = () => {
    if (!currentSong) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleNextSong = () => {
    if (playQueue.length === 0) return;
    let nextIdx;
    if (isShuffle) {
      nextIdx = Math.floor(Math.random() * playQueue.length);
    } else {
      nextIdx = (queueIndex + 1) % playQueue.length;
    }
    setQueueIndex(nextIdx);
    const nextTrack = playQueue[nextIdx];
    if (nextTrack) {
      setCurrentSong(nextTrack);
      audioRef.current.src = nextTrack.preview;
      audioRef.current.play().then(() => setIsPlaying(true));
    }
  };

  const handlePrevSong = () => {
    if (playQueue.length === 0) return;
    let prevIdx = queueIndex - 1;
    if (prevIdx < 0) prevIdx = playQueue.length - 1;
    setQueueIndex(prevIdx);
    const prevTrack = playQueue[prevIdx];
    if (prevTrack) {
      setCurrentSong(prevTrack);
      audioRef.current.src = prevTrack.preview;
      audioRef.current.play().then(() => setIsPlaying(true));
    }
  };

  const seekTo = (seconds) => {
    audioRef.current.currentTime = seconds;
    setCurrentTime(seconds);
  };

  const changeVolume = (val) => {
    setVolume(val);
    if (val === 0) setIsMuted(true);
    else setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleLikeSong = (song) => {
    const songId = String(song.id || song._id);
    const exists = likedSongs.some(s => String(s.id || s._id) === songId);

    let updated;
    if (exists) {
      updated = likedSongs.filter(s => String(s.id || s._id) !== songId);
      showToast(`Removed "${song.title}" from Liked Songs`);
    } else {
      updated = [song, ...likedSongs];
      showToast(`Added "${song.title}" to Liked Songs ❤️`);
    }
    setLikedSongs(updated);

    if (token) {
      fetch("http://localhost:5000/api/auth/toggle-like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ song })
      }).catch(err => console.error("Like sync error:", err));
    }
  };

  const createPlaylist = (name, description = "") => {
    const newPlaylist = {
      _id: "pl-" + Date.now(),
      name,
      description,
      cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80",
      songs: []
    };
    setPlaylists([newPlaylist, ...playlists]);
    showToast(`Created playlist "${name}" 🎶`);

    if (token) {
      fetch("http://localhost:5000/playlists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name, description })
      }).catch(err => console.error("Playlist creation error:", err));
    }
  };

  const addSongToPlaylist = (playlistId, song) => {
    setPlaylists(playlists.map(pl => {
      if (pl._id === playlistId) {
        const songId = String(song.id || song._id);
        const exists = pl.songs.some(s => String(s.id || s._id) === songId);
        if (!exists) {
          showToast(`Added to playlist "${pl.name}"`);
          return { ...pl, songs: [...pl.songs, song] };
        } else {
          showToast(`Song already in "${pl.name}"`);
        }
      }
      return pl;
    }));
  };

  const deletePlaylist = (playlistId) => {
    setPlaylists(playlists.filter(pl => pl._id !== playlistId));
    showToast("Playlist deleted");
  };

  const handleLogin = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    if (userData.likedSongs) setLikedSongs(userData.likedSongs);
    localStorage.setItem("soundify_user", JSON.stringify(userData));
    localStorage.setItem("soundify_token", userToken);
    showToast(`Welcome back, ${userData.username || "Music Lover"}! 👋`);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("soundify_user");
    localStorage.removeItem("soundify_token");
    audioRef.current.pause();
    setIsPlaying(false);
    showToast("Logged out successfully");
  };

  return (
    <AudioContext.Provider
      value={{
        theme,
        topCategory,
        activeTab,
        currentSong,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        playQueue,
        recentlyPlayed,
        isShuffle,
        isRepeat,
        toastMessage,
        isUploadOpen,
        user,
        token,
        likedSongs,
        playlists,
        toggleTheme,
        setTopCategory,
        setActiveTab,
        setIsUploadOpen,
        playSong,
        togglePlay,
        seekTo,
        changeVolume,
        toggleMute,
        nextSong: handleNextSong,
        prevSong: handlePrevSong,
        setIsShuffle,
        setIsRepeat,
        toggleLikeSong,
        createPlaylist,
        addSongToPlaylist,
        deletePlaylist,
        showToast,
        login: handleLogin,
        logout: handleLogout
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
