import { useState, useEffect } from 'react';
import useMusicStore from '../store/useMusicStore';
import playIcon from '../assets/play.svg';
import pauseIcon from '../assets/pause.svg';
import stopIcon from '../assets/stop.svg';

export default function PlayerBar() {
  const { currentTrack, isPlaying, togglePlayPause, stopTrack, audio } = useMusicStore();
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

  if (!currentTrack) {
    return null;
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-2xl bg-white/10 border-t border-white/20 shadow-[0_-4px_30px_rgba(0,0,0,0.3)]">
      <div className="max-w-full mx-auto px-6 py-4">
        
        {/* Main Row: Track Info + Controls + Volume */}
        <div className="flex items-center gap-6 mb-3">
          
          {/* Track Info */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="relative group">
              <div className="absolute -inset-1 bg-linear-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition"></div>
              <img
                src={currentTrack.album?.cover_medium}
                alt={currentTrack.title}
                className="relative w-20 h-20 rounded-lg object-cover shadow-xl"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-white font-bold text-sm truncate drop-shadow-lg">
                {currentTrack.title}
              </h3>
              <p className="text-white/70 text-xs truncate">
                {currentTrack.artist?.name}
              </p>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={togglePlayPause}
              className="w-14 h-14 bg-white/20 hover:bg-white/30 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center text-white transition-all transform hover:scale-110 active:scale-95 shadow-lg"
            >
              <img 
                src={isPlaying ? pauseIcon : playIcon} 
                alt={isPlaying ? 'Pause' : 'Play'} 
                className="w-14 h-14 brightness-0 scale-250 invert "
              />
            </button>
            <button
              onClick={stopTrack}
              className="w-14 h-14 bg-white/20 hover:bg-white/30 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center text-white transition-all transform hover:scale-110 active:scale-95 shadow-lg"
            >
              <img 
                src={stopIcon} 
                alt="Stop" 
                className="w-14 h-14 brightness-0 scale-250 invert" 
              />
            </button>
          </div>

          {/* Volume Control */}
          <div className="hidden md:flex items-center gap-3 shrink-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-4 py-2">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 h-1 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-lg"
            />
            <span className="text-white text-xs font-semibold min-w-[3ch]">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>

        {/* Seekbar Row */}
        <div className="flex items-center gap-3">
          <span className="text-white/80 text-xs font-medium min-w-[3ch]">
            {formatTime(currentTime)}
          </span>
          <div 
            className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden cursor-pointer group backdrop-blur-sm border border-white/10"
            onClick={handleSeek}
          >
            <div 
              className="h-full bg-linear-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full transition-all relative group-hover:shadow-[0_0_10px_rgba(168,85,247,0.5)]"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
          <span className="text-white/80 text-xs font-medium min-w-[3ch]">
            {formatTime(duration || 30)}
          </span>
        </div>

      </div>
    </div>
  );
}
