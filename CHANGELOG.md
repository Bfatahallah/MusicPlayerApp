# Changelog

## 2025-12-10
- Cleaned docs to essentials (README, QUICK_START, TROUBLESHOOTING); removed redundant guides.
- Fixed Tailwind class names and import casing issues; deleted duplicate "Clean" components.
- Restored grid/list toggle on `Discover.jsx` and improved FAQ wording.

## 2025-12-05
- Refactored Discover experience: album grouping, sorting, filtering, debounce, infinite scroll, skeleton loaders.
- Redesigned player bar (compact controls, seek/volume), spacing updates across pages, responsive polish.
- Added new components: `AlbumCard`, `TrackRow`, `SortBar`, `SkeletonLoader`; updated `useMusicStore` and backend search limit.

## 2024-11-15 (initial React/Vite version)
- Bootstrapped React + Vite frontend with Tailwind, Zustand, React Router.
- Added Express proxy backend (`server.js`) to hit Deezer without CORS issues.
- Initial pages: Home, Discover, FAQ, Coming Soon; basic search and 30s preview playback.
