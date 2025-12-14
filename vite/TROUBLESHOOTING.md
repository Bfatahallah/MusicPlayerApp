# Troubleshooting (plain language)

### npm not recognized
Install Node.js from https://nodejs.org/ and reopen PowerShell.

### Port 3001 or 5173 busy
Close other Node processes or restart your machine, then run `npm run dev:all` again.

### Search says “Cannot GET /api/search”
Backend is off. From `vite/`, run `npm run dev:all` (or in root run `node server.js`).

### Search works locally but not on Vercel
Confirm `vite/api/search.js` is in Git, redeploy, and read the Vercel build log.

### Getting CORS errors
Ensure `app.use(cors())` is in `server.js`, then restart `npm run dev:all`.

### Debounce feels wrong
Edit `DEBOUNCE_DELAY` in `src/store/useMusicStore.js` (value is milliseconds). Save and the app reloads.

### No audio
Try another track; some previews are missing. Check volume isn’t muted and look at the browser console for errors.

### Always “No tracks found”
Visit `http://localhost:3001/api/search?q=test`. If that fails, the backend or internet connection is down.

### Changes not showing
Make sure `npm run dev:all` is running, save the file, then hard refresh (Ctrl+Shift+R). If still stuck, restart the servers.

### Build fails: cannot find module
Delete `node_modules` and `package-lock.json`, run `npm install`, then `npm run build`.

If none of these help, read the terminal output and the browser console—they usually explain what broke.
