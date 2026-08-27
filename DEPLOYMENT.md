# Soundify Production Deployment Guide

This guide details how to deploy **Soundify** with the **Frontend on Vercel** and the **Backend on Render**.

---

## 🚀 1. Backend Deployment (Render)

1. Log into [Render Dashboard](https://dashboard.render.com/) and click **New Web Service**.
2. Connect your GitHub repository.
3. Set the configuration options:
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
4. Configure **Environment Variables**:
   - `MONGO_URI`: `mongodb+srv://...`
   - `JWT_SECRET`: `<random_secret_string>`
   - `RAPID_API_KEY`: `<your_rapid_api_key>`
   - `CLIENT_ORIGIN`: `https://<your-app>.vercel.app`
5. Click **Create Web Service** and save your Backend API URL (e.g. `https://soundify-backend.onrender.com`).

---

## ⚡ 2. Frontend Deployment (Vercel)

1. Log into [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New Project**.
2. Import your GitHub repository.
3. Set the configuration options:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `soundify`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add **Environment Variable**:
   - `VITE_API_BASE_URL`: `https://soundify-backend.onrender.com`
5. Click **Deploy**.

---

## 🔐 3. CORS & Security Check

Once your Vercel deployment finishes:
1. Copy your Vercel URL (`https://<your-app>.vercel.app`).
2. Update the `CLIENT_ORIGIN` environment variable in your Render backend settings with this Vercel URL.
