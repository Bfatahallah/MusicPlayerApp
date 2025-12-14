import { useState, useEffect } from 'react';
import useMusicStore from '../store/useMusicStore';

export default function PlayerBar() {
  const { currentTrack, isPlaying, togglePlayPause, stopTrack, audio, setSearchQuery } = useMusicStore();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

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

  useEffect(() => {
    if (audio) {
      audio.volume = volume;
    }
  }, [audio, volume]);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const handleSeek = (e) => {
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleArtistClick = (e) => {
    e.stopPropagation();
    if (currentTrack?.artist?.name) {
      setSearchQuery(currentTrack.artist.name);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAlbumClick = (e) => {
    e.stopPropagation();
    if (currentTrack?.album?.title) {
      setSearchQuery(currentTrack.album.title);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextTrack = () => {
    if (audio && duration) {
      audio.currentTime = Math.min(audio.currentTime + 10, duration);
    }
  };

  const handlePreviousTrack = () => {
    if (audio) {
      audio.currentTime = Math.max(audio.currentTime - 10, 0);
    }
  };

  if (!currentTrack) {
    return null;
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-2xl bg-linear-to-r from-gray-900/80 to-gray-950/80 border-t border-white/20 shadow-xl hover:shadow-purple-500/20 transition-shadow duration-300">
      <div className="max-w-full mx-auto px-4 sm:px-8 md:px-16 py-3">
        {/* Compact Main Row: Track Info + Controls + Volume */}
        <div className="flex items-center gap-3 sm:gap-4 mb-2">
          {/* Album Cover - Compact */}
          <div className="relative shrink-0 w-12 h-12 sm:w-14 sm:h-14 group">
            <div className="absolute -inset-0.5 bg-linear-to-br from-purple-600/40 to-pink-600/40 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img
              src={currentTrack.album?.cover_medium}
              alt={currentTrack.title}
              className="relative w-full h-full rounded-lg object-cover shadow-lg group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Track Info - Compact */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-white truncate hover:text-purple-300 transition-colors duration-300 cursor-pointer">
              {currentTrack.title}
            </h3>
            <p
              onClick={handleArtistClick}
              className="text-xs text-gray-400 truncate hover:text-purple-300 transition-colors duration-300 cursor-pointer"
            >
              {currentTrack.artist?.name || 'Unknown Artist'}
            </p>
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="shrink-0 w-10 h-10 sm:w-10 sm:h-10 bg-white/20 hover:bg-purple-500/40 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center text-white transition-all transform hover:scale-110 active:scale-95 shadow-lg hover:shadow-purple-500/50"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>

          {/* Previous Button */}
          <button
            onClick={handlePreviousTrack}
            className="shrink-0 w-10 h-10 sm:w-10 sm:h-10 bg-white/20 hover:bg-blue-500/40 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center text-white transition-all transform hover:scale-110 active:scale-95 shadow-lg hover:shadow-blue-500/50"
            title="Previous (-10s)"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h2v12H6zm3.5 6l8.5-6v12z" />
            </svg>
          </button>

          {/* Stop Button - Reduced Size */}
          <button
            onClick={stopTrack}
            className="shrink-0 w-10 h-10 sm:w-10 sm:h-10 bg-white/20 hover:bg-red-500/40 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center text-white transition-all transform hover:scale-110 active:scale-95 shadow-lg hover:shadow-red-500/50"
            title="Stop"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 6h12v12H6z"/>
            </svg>
          </button>

          {/* Next Button */}
          <button
            onClick={handleNextTrack}
            className="shrink-0 w-10 h-10 sm:w-10 sm:h-10 bg-white/20 hover:bg-green-500/40 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center text-white transition-all transform hover:scale-110 active:scale-95 shadow-lg hover:shadow-green-500/50"
            title="Next (+10s)"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 18h2V6h-2zm-11-7l8.5-6v12z" />
            </svg>
          </button>

          {/* Volume Control - Compact */}
          <div className="hidden md:flex items-center gap-2 shrink-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-3 py-1 hover:bg-white/20 hover:border-white/40 transition-all duration-300">
            <svg className="w-4 h-4 text-white shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 bg-white/30 rounded-full appearance-none cursor-pointer hover:bg-white/50 transition-colors [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-2.5 [&::-moz-range-thumb]:h-2.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-lg"
            />
            <span className="text-white text-xs font-semibold min-w-[2.5ch]">{Math.round(volume * 100)}</span>
          </div>
        </div>

        {/* Seekbar Row - Compact */}
        <div className="flex items-center gap-2 hover:opacity-100 opacity-90 transition-opacity duration-300">
          <span className="text-white/70 text-xs font-medium min-w-[2.5ch] shrink-0">
            {formatTime(currentTime)}
          </span>
          <div
            className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer group backdrop-blur-sm border border-white/10 hover:h-1.5 transition-all duration-300"
            onClick={handleSeek}
          >
            <div
              className="h-full bg-linear-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full transition-all relative group-hover:shadow-[0_0_8px_rgba(168,85,247,0.6)]"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <span className="text-white/70 text-xs font-medium min-w-[2.5ch] shrink-0">
            {formatTime(duration || 30)}
          </span>
        </div>
      </div>
    </div>
  );
}
