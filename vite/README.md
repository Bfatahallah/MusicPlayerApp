# MusicPlayerApp (React version)

This folder holds the React build of the music player. The app talks to a small Express backend (in the project root) that forwards requests to Deezer.

## What’s inside

```
src/
├─ assets/          images and icons
├─ components/      header, player, feature cards
├─ pages/           Home, Discover, FAQ, ComingSoon
├─ store/           Zustand state
├─ App.jsx          routes
├─ main.jsx         React entry
└─ index.css        Tailwind + globals
```

## Run it (PowerShell)

Install once:
```powershell
cd vite
npm install
```

Start everything together (frontend + backend):
```powershell
npm run dev:all
```
Frontend: http://localhost:5173
Backend:  http://localhost:3001

Prefer two terminals?
```powershell
# Terminal A (project root)
node server.js

# Terminal B (vite/)
npm run dev
```

## Why React + Vite (quickly)
- Fast reloads while you code
- Components keep UI organized
- Vite is quick to build and serve
- Zustand keeps state simple
- React Router gives multiple pages without reloads

## Helpful scripts (vite/)
- `npm run dev`      start frontend only
- `npm run dev:all`  start frontend + backend
- `npm run build`    production build
- `npm run preview`  serve the build locally
- `npm run lint`     check code style

## Features students can notice
- Search Deezer and play 30s previews
- Player controls (play/pause, stop, volume, seek)
- Responsive layout for phone and desktop
- Pages for Home, Discover, FAQ, Coming Soon

If you get stuck, open `TROUBLESHOOTING.md` or the root `README.md` for quick help.
