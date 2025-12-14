# Troubleshooting Guide

Student-first fixes with explicit checks and outcomes.

## Environment & Tools
- Install Node.js LTS: https://nodejs.org/
- Use PowerShell on Windows; reopen terminal after install.

## Startup Issues
- npm not recognized: reinstall Node.js, then reopen PowerShell.
- Port 3001/5173 busy: stop other Node processes or reboot. Then:
	```powershell
	npm run dev:all
	```

## Backend / API
- “Cannot GET /api/search”: backend is off. Start from `vite/`:
	```powershell
	npm run dev:all
	```
- Test directly in browser: open http://localhost:3001/api/search?q=test
	- If it loads JSON: backend OK
	- If it fails: backend not running or blocked by firewall

## Frontend / Tailwind
- Styles don’t apply: ensure valid Tailwind classes. Use `bg-gradient-to-r` (not `bg-linear-to-r`). Save to trigger HMR.
- Layout won’t move: parents with fixed `min-h-*` or `overflow` can lock children. Use a single `min-h-screen` wrapper and adjust section `mt-*`/`gap-*`.

## Audio Playback
- No audio: try multiple tracks; some Deezer previews are missing.
- Volume/mute: confirm not muted and volume > 0.
- Console errors: open DevTools (F12) → Console; copy errors into an issue.

## Search Behavior
- “No tracks found” always: test http://localhost:3001/api/search?q=test. If it fails, backend/internet issue.
- Debounce too slow/fast: update `DEBOUNCE_DELAY` in [src/store/useMusicStore.js](src/store/useMusicStore.js).

## Live Reload / HMR
- Changes not showing: confirm `npm run dev:all` is running; save file; hard refresh (Ctrl+Shift+R).
- Still stuck: stop servers, restart `npm run dev:all`.

## Build & Deploy
- Build fails “cannot find module”: delete `node_modules` and `package-lock.json`, reinstall, then build.
	```powershell
	rm -r node_modules
	rm package-lock.json
	npm install
	npm run build
	```
- Vercel: ensure `vite/api/search.js` & `deezer.js` exist, set root to `vite/`, Output dir `dist`.

## When All Else Fails
- Read terminal output and browser console—copy error text into an issue. Include:
	- What you ran
	- What you expected
	- What happened (screenshots help)
