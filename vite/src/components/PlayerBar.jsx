import useMusicStore from '../store/useMusicStore';
import { useState, useEffect } from 'react';

export default function PlayerBar() {
  const { currentTrack, isPlaying, togglePlayPause, stopTrack } = useMusicStore();
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (!currentTrack) return;

    const audio = new Audio(currentTrack.preview);
    
    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [currentTrack]);

  if (!currentTrack) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-orange-400 via-pink-400 to-yellow-300 shadow-2xl lg:flex-col">
      <div className="max-w-full mx-auto px-3 md:px-4 lg:px-6 py-2 md:py-3 lg:py-4 flex flex-col lg:flex-row items-center justify-between gap-2 md:gap-4 lg:gap-6">
        {/* Track Info */}
        <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1 w-full lg:w-auto">
          <img
            src={currentTrack.album?.cover_small || currentTrack.album?.cover}
            alt={currentTrack.title}
            className="w-12 h-12 md:w-16 md:h-16 rounded-md md:rounded-lg object-cover shadow-lg flex-shrink-0 border-2 border-white/30"
          />
          <div className="min-w-0 flex-1">
            <h3 className="text-white font-bold text-xs md:text-base truncate">
              {currentTrack.title}
            </h3>
            <p className="text-white/70 text-xs truncate">
              {currentTrack.artist?.name}
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="hidden lg:flex items-center gap-3 flex-1 max-w-xs w-full">
          <span className="text-white font-semibold text-xs">{Math.floor(currentTime)}s</span>
          <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>
          <span className="text-white font-semibold text-xs">30s</span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="w-10 h-10 md:w-12 md:h-12 bg-white/40 hover:bg-white/60 backdrop-blur-md rounded-full flex items-center justify-center text-white font-bold text-lg md:text-lg transition-all duration-200 transform hover:scale-110 active:scale-95 border border-white/40"
          >
            {isPlaying ? '⏸' : '▶'}
          </button>

          {/* Stop Button */}
          <button
            onClick={stopTrack}
            className="w-10 h-10 md:w-12 md:h-12 bg-white/40 hover:bg-white/60 backdrop-blur-md rounded-full flex items-center justify-center text-white font-bold text-lg md:text-lg transition-all duration-200 transform hover:scale-110 active:scale-95 border border-white/40"
          >
            ⏹
          </button>

          {/* Volume Icon */}
          <div className="text-white text-xl md:text-2xl hidden md:block">🔊</div>
        </div>
      </div>
    </div>
  );
}
