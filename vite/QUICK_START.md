# Quick Start

Fast path to run and test the app.

## Install
```powershell
cd "c:\Users\bfata\Desktop\ALX\MusicPlayerApp\vite"
npm install
```

## Run (frontend + backend)
```powershell
npm run dev:all
```
- Frontend: http://localhost:5173
- Backend:  http://localhost:3001

## First Test
1. Open http://localhost:5173
2. Search for an artist (e.g., “Taylor Swift”)
3. Click an album, then click a track to hear the 30s preview

## Common Tweaks
- Debounce speed: change `DEBOUNCE_DELAY` in [src/store/useMusicStore.js](src/store/useMusicStore.js)
- Result limit: change `limit` in [server.js](server.js) and [api/search.js](api/search.js)
- Default sort: change `sortBy` in [src/store/useMusicStore.js](src/store/useMusicStore.js)

## Quick Fixes
- Port busy: close other Node processes or reboot; rerun `npm run dev:all`
- Search fails: verify http://localhost:3001/api/search?q=test opens in the browser
- Player hidden: click any track first to reveal the player

## Deploy (Vercel)
1. Push to GitHub
2. In Vercel, set project root to `vite/`
3. Build: `npm run build`, Output: `dist`

Happy listening!
