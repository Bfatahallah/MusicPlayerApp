# 🎵 MusicPlayerApp

A modern music player web application that lets you search and play millions of tracks from Deezer. Built with React and featuring a beautiful glassmorphic design.

**How it works:** The app uses an Express.js proxy server to bypass CORS restrictions when connecting to the Deezer API, allowing you to search and play music seamlessly.

![React](https://img.shields.io/badge/React-19.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-7.2.6-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-cyan)
![License](https://img.shields.io/badge/License-ALX-green)

## ✨ Features

- 🔍 **Instant Search** - Search millions of tracks from Deezer's vast music library
- 🎧 **30-Second Previews** - Listen to high-quality track previews
- 🎨 **Glassmorphic UI** - Modern, transparent design with backdrop blur effects
- 🎚️ **Full Player Controls** - Play, pause, stop, volume control, and seekbar
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development and production builds

## 🚀 Tech Stack

### Frontend
- **React 19.2.0** - UI library with latest features
- **Vite 7.2.6** - Next-generation frontend tooling
- **Tailwind CSS v4** - Utility-first CSS framework
- **Zustand 5.0.9** - Lightweight state management
- **React Router** - Client-side routing

### Backend
- **Express.js** - Lightweight API proxy server
- **Node.js** - JavaScript runtime

### APIs
- **Deezer API** - Music data and 30-second track previews

## 📂 Project Structure

```
MusicPlayerApp/
├── vite/                      # Frontend application
│   ├── src/
│   │   ├── assets/           # Images and SVG icons
│   │   ├── components/       # React components
│   │   │   ├── Header.jsx
│   │   │   ├── PlayerBar.jsx
│   │   │   └── FeatureCards.jsx
│   │   ├── pages/            # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Discover.jsx
│   │   │   ├── FAQ.jsx
│   │   │   └── ComingSoon.jsx
│   │   ├── store/            # Zustand state management
│   │   │   └── useMusicStore.js
│   │   ├── App.jsx           # Main app component
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Global styles
│   └── package.json
├── server.js                 # Express backend proxy
├── package.json
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Clone the Repository
```bash
git clone https://github.com/Bfatahallah/MusicPlayerApp.git
cd MusicPlayerApp
```

### Install Dependencies

**Backend:**
```bash
npm install
```

**Frontend:**
```bash
cd vite
npm install
```

## 🎮 Running the Application

You need to run both the backend server and frontend dev server:

### 1. Start Backend Server (Terminal 1)
```bash
# From project root
node server.js
```
Server runs on `http://localhost:3001`

### 2. Start Frontend Dev Server (Terminal 2)
```bash
# From project root
cd vite
npm run dev
```
Frontend runs on `http://localhost:5173`

### 3. Open in Browser
Navigate to `http://localhost:5173` to use the app.

## 🎯 Usage

1. **Home Page** - View the landing page with feature cards
2. **Discover** - Use the search bar to find tracks by artist, song name, or album
3. **Play Music** - Click on any track card to start playing the 30-second preview
4. **Player Controls:**
   - ▶️ Play/Pause button
   - ⏹️ Stop button
   - 🔊 Volume slider with percentage display
   - ⏱️ Seekbar with click-to-seek functionality
   - ⏲️ Current time / Total duration display

## 🏗️ Architecture

### State Management
Uses Zustand for centralized state management:
- `searchQuery` - Current search input
- `results` - Array of track results
- `currentTrack` - Currently selected track
- `isPlaying` - Playback state
- `audio` - HTML5 Audio element
- `volume` - Volume level (0-1)

### API Flow
```
Frontend (React) → Express Server (Port 3001) → Deezer API
                 ← JSON Response              ← Music Data
```

The Express backend acts as a proxy to bypass CORS restrictions when calling the Deezer API.

### Key Endpoints

**Backend:**
- `GET /api/search?q={query}` - Search for tracks

**Deezer API:**
- `https://api.deezer.com/search?q={query}&limit=50`

## 🎨 Design Features

- **Glassmorphism** - Transparent backgrounds with backdrop blur
- **Gradient Accents** - Purple, pink, and blue color scheme
- **Smooth Animations** - Hover effects and transitions
- **Responsive Grid** - 2-6 column layout adapts to screen size
- **Custom Seekbar** - Interactive progress bar with gradient fill

## 📝 Scripts

**Frontend (vite/):**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

**Backend (root):**
```bash
node server.js   # Start Express proxy server
```

## 🐛 Known Issues & Solutions

See [CHALLENGES.md](./CHALLENGES.md) for detailed documentation of challenges faced and solutions implemented.

## 🔮 Future Enhancements

- [ ] User authentication
- [ ] Favorites/bookmarks feature
- [ ] Playlist creation
- [ ] Search history
- [ ] Dark/light theme toggle
- [ ] Lyrics integration
- [ ] Social sharing
- [ ] Offline mode with service workers

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under ALX.

## 👤 Author

**Badr Fatahallah**
- GitHub: [@Bfatahallah](https://github.com/Bfatahallah)

## 🙏 Acknowledgments

- [Deezer API](https://developers.deezer.com/) for providing music data
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [Vite](https://vitejs.dev/) for the blazing-fast build tool
- [Zustand](https://github.com/pmndrs/zustand) for simple state management

---

⭐ If you found this project useful, please consider giving it a star!
