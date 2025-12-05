# MusicPlayerApp - React Version

This is the React + Vite version of MusicPlayerApp. We converted it from basic vanilla HTML/CSS/JavaScript into a proper React application because, let's be honest, managing state in vanilla JS got messy real quick.

## What's in Here?

This folder has the React application. It used to be just index.html, styles.css, and script.js but that got complicated when we tried adding features. So we rebuilt it with React, components, routing, and all that modern stuff.

## Why'd We Switch to React + Vite?

- **HMR is 🔥** - Changes show up instantly without refreshing the page
- **Actually Fast** - Vite builds way faster than webpack (which we didn't use anyway)
- **Components > Spaghetti Code** - Breaking things into pieces actually makes sense
- **State Management** - Zustand handles our data so we're not passing props 50 levels deep
- **Routing** - Multiple pages without reloading the entire app
- **It Just Works** - Seriously, the DX is great

## What We're Using

- **React 19.2.0** - The UI thing
- **Vite 7.2.6** - Super fast build tool
- **Tailwind CSS v4** - Classes everywhere instead of writing CSS (great for rapid dev, debatable for maintenance)
- **Zustand 5.0.9** - Tiny state library, way better than Redux IMO
- **React Router** - For jumping between pages

## The Folder Layout

```
src/
├── assets/           # PNG files and SVG icons for the UI
├── components/       # React components we reuse
│   ├── Header.jsx       (navigation bar)
│   ├── PlayerBar.jsx    (the music controls - took forever to get this right)
│   └── FeatureCards.jsx (those cards on the home page)
├── pages/            # The actual pages
│   ├── Home.jsx      (landing page, looks pretty)
│   ├── Discover.jsx  (main search page where it all happens)
│   ├── FAQ.jsx       (barely implemented lol)
│   └── ComingSoon.jsx
├── store/            
│   └── useMusicStore.js  (all the state logic for music, search, etc)
├── App.jsx           (main router)
├── main.jsx          (entry point)
└── index.css         (global styles - mostly Tailwind classes)
```

## Getting Started

### Install Stuff
```bash
npm install
```

### Run It
```bash
npm run dev
```
Opens at `http://localhost:5173` (or whatever port isn't taken)

### Build for Real
```bash
npm run build
npm run preview
```

## The Vanilla to React Journey

**How it used to be (Vanilla):**
- One HTML file with everything
- Just select elements and change innerHTML
- Variables floating around everywhere
- Event listeners attached to buttons with onclick handlers
- Debugging was... fun

**How it is now (React):**
- Components that actually know what they're doing
- State updates automatically re-render
- Props pass data down, callbacks go up
- React Router handles navigation
- Still debugging, but at least there's a pattern

## Actually Running This

You need both servers running:

```bash
# Terminal 1 - Backend proxy (from root folder)
node server.js
```

```bash
# Terminal 2 - Frontend dev server (from vite/ folder)
npm run dev
```

Backend: `http://localhost:3001`
Frontend: `http://localhost:5173`

The backend is needed because Deezer API doesn't like direct browser requests (CORS). So we have a proxy that does the API calls for us.

## What Actually Works ✅

- ✅ Search for songs (actually works pretty well)
- ✅ Click to play a 30-second preview
- ✅ Volume slider does volume
- ✅ Seekbar lets you skip around
- ✅ Responsive - looks decent on mobile and desktop
- ✅ Navigation between pages
- ✅ The UI looks modern (glassmorphism ftw)

## The State Thing (Zustand)

File: `src/store/useMusicStore.js`

Stores everything:
- What you searched for
- The search results
- Which track is playing
- Whether it's actually playing or paused
- Volume level
- The audio player itself

Pretty straightforward - way simpler than Redux.

## Code Quality Stuff

We have ESLint for when you want to be told your code sucks:

```bash
npm run lint
```

Mostly just style things though.

## What's Next (If We Get Time)

- [ ] Actually implement the FAQ page
- [ ] Save favorite tracks (localStorage)
- [ ] Search history
- [ ] Login system? (probably overkill)
- [ ] Dark mode toggle
- [ ] Playlists maybe
- [ ] Performance improvements
- [ ] Better error messages
- [ ] Mobile app? Nah, probably not

---

**P.S.** The original vanilla files are in the parent folder if you really wanna see the mess we started with.
