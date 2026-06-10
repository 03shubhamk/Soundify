# 🎧 Soundify

Soundify is a modern, high-performance, dark-themed music streaming and search application modeled after modern web streaming players. Built using a decoupled client-server architecture, it features a React + Vite frontend and a Node.js + Express backend integrated with MongoDB and the external Deezer API.

---

## 🏗️ Architecture Overview

Soundify is structured as a monorepo containing two decoupled systems:
1. **Frontend (`/soundify`)**: A React application powered by Vite, offering an interface styled with premium dark mode aesthetics, dynamic hover transitions, custom media player elements, and state-driven authentication simulation.
2. **Backend (`/backend`)**: A lightweight REST API server built on Express, utilizing Mongoose to read/write custom tracks in MongoDB, and proxying client search requests directly to Deezer API endpoints via RapidAPI.

```mermaid
graph TD
    Client[React Frontend] -->|HTTP Requests| Server[Express Backend]
    Server -->|Mongoose ODM| DB[(MongoDB)]
    Server -->|RapidAPI Proxy| Deezer[Deezer API]
```

---
## ✨ Key Features

- **Dynamic Music Search**: Real-time searching across millions of tracks using the external Deezer API proxy, returning track meta, cover art, and 30-second preview audio.
- **Embedded Audio Player**: A custom-styled fixed media player utilizing HTML5 Audio APIs, supporting automatic playback on song selection and real-time controls.
- **Mock Authentication Flow**: An interactive login portal providing credentials verification and secure Guest Session bypass to mimic production OAuth behavior.
- **MongoDB Track Curations**: Database routes ready to manage, add, and fetch locally curated music collections.
- **Premium UX Design System**: Responsive grid structures, sleek glassmorphism panels, customized input fields, and smooth micro-animations.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 19 (Functional Components & Hooks)
- **Bundler**: Vite
- **Styling**: Vanilla CSS with modern dynamic inline styles
- **Icons**: Emoji & custom design shapes for high-performance rendering

### Backend
- **Platform**: Node.js & Express
- **Database**: MongoDB (via Mongoose)
- **Integrations**: RapidAPI (Deezer API Client)
- **Security & Config**: CORS, Dotenv

---
