# MusicPlayerApp (easy overview)

A simple music player that searches Deezer and plays 30‑second previews. Built with React (frontend) and a small Express server (backend) to avoid CORS issues.

## What you can do
- Search for songs and artists
- Play the preview for any track
- Use basic player controls (play/pause, stop, volume, seek)
- Browse on phone, tablet, or desktop

## What powers it
- Frontend: React, Vite, Tailwind CSS, React Router, Zustand
- Backend: Express on Node.js (acts as a proxy to Deezer)

## Project layout

```
MusicPlayerApp/
├─ server.js          # Small Express proxy on port 3001
├─ package.json       # Root deps (backend + shared scripts)
└─ vite/              # React app
   ├─ src/
   │  ├─ components/  # Header, player, feature cards, etc.
   │  ├─ pages/       # Home, Discover, FAQ, ComingSoon
   │  ├─ store/       # Zustand store
   │  ├─ App.jsx      # Routes
   │  └─ main.jsx     # Entry point
   └─ package.json    # Frontend deps and scripts
```

## Quick start (Windows PowerShell)

1) Install Node.js 16+ (includes npm).
2) Clone and install:
```powershell
git clone https://github.com/Bfatahallah/MusicPlayerApp.git
cd MusicPlayerApp
npm install            # backend deps
cd vite
npm install            # frontend deps
```
3) Run both servers (from `MusicPlayerApp/vite`):
```powershell
npm run dev:all
```
   - Frontend: http://localhost:5173
   - Backend:  http://localhost:3001

If you prefer two terminals:
```powershell
# Terminal A (root)
node server.js

# Terminal B (vite/)
npm run dev
```

Open http://localhost:5173 and start searching.

## How it works
- The browser asks the backend: `GET /api/search?q=your+query`
- The backend calls Deezer and returns JSON to the frontend.
- Zustand keeps track of search results and the current track.

## Handy scripts
- Root backend: `node server.js`
- Frontend (vite/): `npm run dev` | `npm run build` | `npm run preview` | `npm run lint`
- Both at once (vite/): `npm run dev:all`

## If something breaks
Open `vite/TROUBLESHOOTING.md` for quick fixes. For setup steps, see `vite/QUICK_START.md`.

## Want to contribute?
Pull requests are welcome. Keep changes small, explain what you did, and test locally before opening a PR.
