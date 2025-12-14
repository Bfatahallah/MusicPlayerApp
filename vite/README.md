# MusicPlayerApp (Vite + React)

Student-friendly guide with clear setup, scripts, architecture, and debugging tips.

## Overview
- Frontend: Vite + React + Tailwind
- Backend: Express proxy to Deezer API
- State: Zustand store
- Routing: React Router

## Project Structure
```
vite/
├─ src/
│  ├─ assets/                images and icons
│  ├─ components/            UI parts: Header, PlayerBar, FeatureCards, etc.
│  ├─ pages/                 views: Home, Discover, FAQ, ComingSoon
│  ├─ store/                 app state via Zustand
│  ├─ App.jsx                routes + page transitions
│  ├─ main.jsx               React bootstrapping
│  └─ index.css              Tailwind + global CSS
├─ api/                      serverless endpoints (Vercel-compatible)
├─ server.js                 local Express backend
├─ package.json              scripts and dependencies
└─ tailwind.config.js        Tailwind scanning config
```

## Quick Start (PowerShell on Windows)
```powershell
cd example : ("c:\Users\bfata\Desktop\ALX\MusicPlayerApp\vite")
npm install
npm run dev:all
```
- Frontend: http://localhost:5173
- Backend:  http://localhost:3001

Prefer two terminals?
```powershell
# Terminal A (project root)
node server.js

# Terminal B (vite/)
npm run dev
```

## Scripts (vite/)
- `dev`: start frontend only
- `dev:all`: start frontend + backend
- `build`: production build
- `preview`: serve built app locally
- `lint`: run ESLint

## How It Works (High Level)
- `Header` is sticky and provides navigation.
- `Home` shows hero content and `FeatureCards`.
- `Discover` searches tracks via backend `/api/search` that calls Deezer.
- `PlayerBar` controls audio preview playback.
- `useMusicStore` centralizes search text, results, sorting, and player state.

## Student Debugging Cheatsheet
- If styles don’t change: verify Tailwind class names are valid (e.g., use `bg-gradient-to-r`, not `bg-linear-to-r`). Save and watch Vite HMR update.
- If layout spacing won’t move: check for parent containers with fixed `min-h-*` or `overflow` rules; simplify to `min-h-screen` on the wrapper and use `gap`/`mt-*` on sections.
- If search fails: open http://localhost:3001/api/search?q=test in the browser; if it 404s, your backend isn’t running.
- If audio won’t play: some Deezer previews are missing; try another track, unmute, and watch the browser console.
- If ports are busy: stop other Node processes or reboot, then run `npm run dev:all`.

## Common Edits
- Debounce speed: change `DEBOUNCE_DELAY` in [src/store/useMusicStore.js](src/store/useMusicStore.js)
- Result limit: update Deezer `limit` in [server.js](server.js) and in [api/search.js](api/search.js)
- Default sort: adjust `sortBy` in [src/store/useMusicStore.js](src/store/useMusicStore.js)

## Deployment (Vercel)
1. Push repo to GitHub.
2. In Vercel, set project root to `vite/`.
3. Build: `npm run build`, Output: `dist`.
4. Ensure `api/` contains `search.js` and `deezer.js`.

## Learning Notes and Tips
- Component boundaries: keep reusable UI in `components/`, page-specific layout in `pages/`.
- State shape: keep it small and serializable; store only what you need (ids, URLs), not huge objects.
- API calls: run them in the backend for CORS and security; the frontend just hits `/api/search`.
- Tailwind usage: prefer utility classes over custom CSS; when stuck, inspect the element and check which rule wins.

## Need Help?
See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for step-by-step fixes. If you’re still blocked, copy terminal and browser console output into an issue.
