# Quick Start 

## 1) Install
```powershell
cd vite
npm install
```

## 2) Run everything
```powershell
npm run dev:all
```
- Frontend: http://localhost:5173
- Backend:  http://localhost:3001

## 3) Try it
Open http://localhost:5173, search an artist ("Taylor Swift"), click an album, then click a track to hear the preview.

## Common tweaks
- Debounce speed: change `DEBOUNCE_DELAY` in `src/store/useMusicStore.js`
- Result limit: change `limit` in `server.js` (and `api/search.js` for Vercel)
- Default sort: change `sortBy` in `src/store/useMusicStore.js`

## If it breaks
- Port busy? Close other `node` processes, then rerun `npm run dev:all`.
- Search fails? Make sure the backend is running and `http://localhost:3001/api/search?q=test` loads.
- Player hidden? Click any track first.

## Deploy (Vercel)
1) Push to GitHub
2) In Vercel set root to `vite/`
3) Build command: `npm run build`, output: `dist`

That’s it—happy listening!
