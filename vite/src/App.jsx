import { useState, useEffect } from 'react';
import useMusicStore from './store/useMusicStore';
import './App.css';

function App() {
  const { searchQuery, setSearchQuery, searchDeezer, results, currentTrack, isPlaying, togglePlayPause, stopTrack, audio } = useMusicStore();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showSearchBar, setShowSearchBar] = useState(false);

  useEffect(() => {
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [audio]);

  const handleSearch = async (e) => {
    e.preventDefault();
    await searchDeezer(searchQuery);
  };

  return (
    <div className="w-full h-screen bg-gray-950 text-white flex flex-col overflow-hidden">
      {/* Search Bar Modal - Show when searching */}
      {showSearchBar && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm p-4">
          <div className="max-w-2xl mx-auto mt-20">
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSearch(e);
              setShowSearchBar(false);
            }} className="flex gap-3 flex-col sm:flex-row">
              <div className="flex-1 relative group">
                <div className="absolute -inset-0.5 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300" />
                <input
                  type="text"
                  placeholder="Search artists, songs, albums..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="relative w-full px-6 py-4 bg-gray-900 text-white placeholder-gray-500 rounded-full outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-4 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-full hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105 active:scale-95 flex-shrink-0"
              >
                🔍
              </button>
              <button
                type="button"
                onClick={() => setShowSearchBar(false)}
                className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-full transition-all"
              >
                ✕
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {results.length === 0 ? (
          // Hero Section
          <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black flex items-center justify-center px-4 py-20">
            <div className="max-w-3xl w-full text-center">
              {/* Background Image as decoration */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <img src="/Background.jpg" alt="bg" className="w-full h-full object-cover" />
              </div>

              <div className="relative z-10">
                {/* Title */}
                <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                  Discover <span className="bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Music</span>
                </h1>

                {/* Subtitle */}
                <p className="text-xl text-gray-300 mb-12">
                  <span className="text-red-400">Discover</span>, <span className="text-blue-400">search</span>, and <span className="text-green-400">play</span> millions of tracks from iTunes.
                  <br />
                  Your soundtrack starts here.
                </p>

                {/* Search Button */}
                <button
                  onClick={() => setShowSearchBar(true)}
                  className="px-8 py-3 mb-24 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition-all transform hover:scale-105 active:scale-95"
                >
                  Start Searching
                </button>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  {[
                    { img: '/assets/audio.png', title: 'Millions of Tracks', desc: 'Access a vast library of music from iTunes' },
                    { img: '/assets/headphone.png', title: 'High Quality Previews', desc: 'Listen to 30-second previews of any track' },
                    { img: '/assets/search note.png', title: 'Instant Search', desc: 'Find your favorite artists and songs instantly' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition">
                      <img src={item.img} alt={item.title} className="w-16 h-16 mb-4 mx-auto object-contain" />
                      <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-gray-300 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Results Grid
          <div className="max-w-7xl mx-auto w-full p-6 md:p-8">
            <h2 className="text-4xl font-black mb-2">
              Found <span className="bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{results.length}</span> Tracks
            </h2>
            <p className="text-gray-400 mb-8">Click any track to preview</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {results.map((track, idx) => (
                <div
                  key={track.id}
                  onClick={() => useMusicStore.getState().selectTrack(track)}
                  className="group cursor-pointer bg-linear-to-br from-pink-400 via-purple-400 to-blue-400 p-0.5 rounded-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:-translate-y-2"
                >
                  <div className="bg-gray-800 rounded-md overflow-hidden h-full flex flex-col">
                    <div className="relative h-32 overflow-hidden bg-gray-700">
                      <img
                        src={track.album?.cover_medium}
                        alt={track.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-1 right-1 w-6 h-6 bg-linear-to-br from-pink-500 to-purple-600 rounded flex items-center justify-center text-white font-bold text-xs">
                        {idx + 1}
                      </div>
                    </div>
                    <div className="p-3 flex flex-col flex-1">
                      <h3 className="font-bold text-white text-xs truncate">{track.title}</h3>
                      <p className="text-gray-400 text-xs truncate">{track.artist?.name}</p>
                      {track.preview && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            useMusicStore.getState().selectTrack(track);
                          }}
                          className="mt-3 w-full py-1.5 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded text-xs font-bold hover:shadow-lg transition-all transform hover:scale-105 active:scale-95"
                        >
                          ▶ Play
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Player Bar */}
      {currentTrack && (
        <div className="bg-linear-to-r from-orange-400 via-pink-400 to-yellow-300 shadow-2xl">
          <div className="max-w-full mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-3 md:gap-4">
            {/* Track Info */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <img
                src={currentTrack.album?.cover_small}
                alt={currentTrack.title}
                className="w-12 h-12 md:w-14 md:h-14 rounded-lg object-cover flex-shrink-0 shadow-lg border-2 border-white/30"
              />
              <div className="min-w-0 flex-1">
                <h3 className="text-white font-bold text-xs md:text-sm truncate">{currentTrack.title}</h3>
                <p className="text-white/70 text-xs truncate">{currentTrack.artist?.name}</p>
              </div>
            </div>

            {/* Timeline - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-2 flex-1 max-w-xs">
              <span className="text-white text-xs font-semibold">{Math.floor(currentTime)}s</span>
              <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full" style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }} />
              </div>
              <span className="text-white text-xs font-semibold">30s</span>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={togglePlayPause}
                className="w-10 h-10 bg-white/40 hover:bg-white/60 rounded-full flex items-center justify-center text-white font-bold text-lg transition-all transform hover:scale-110 active:scale-95"
              >
                {isPlaying ? '⏸' : '▶'}
              </button>
              <button
                onClick={stopTrack}
                className="w-10 h-10 bg-white/40 hover:bg-white/60 rounded-full flex items-center justify-center text-white font-bold text-lg transition-all transform hover:scale-110 active:scale-95"
              >
                ⏹
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
