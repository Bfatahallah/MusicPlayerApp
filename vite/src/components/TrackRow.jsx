import useMusicStore from '../store/useMusicStore';

export default function TrackRow({ track, trackNumber, isCurrentTrack }) {
  const { selectTrack, isPlaying } = useMusicStore();

  const formatDuration = (seconds) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlay = (e) => {
    e.stopPropagation();
    selectTrack(track);
  };

  return (
    <button
      onClick={handlePlay}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 group ${
        isCurrentTrack
          ? 'bg-purple-500/20 border border-purple-500/30'
          : 'bg-gray-800/20 hover:bg-gray-800/40 border border-transparent hover:border-gray-700/50'
      }`}
    >
      {/* Track Number */}
      <div className="shrink-0 w-8 text-center">
        <span
          className={`text-sm font-medium transition-all duration-300 ${
            isCurrentTrack
              ? 'text-purple-400'
              : 'text-gray-500 group-hover:text-gray-400'
          }`}
        >
          {trackNumber}
        </span>
      </div>

      {/* Track Info */}
      <div className="flex-1 min-w-0">
        <h4
          className={`text-sm font-medium truncate transition-colors duration-300 ${
            isCurrentTrack
              ? 'text-purple-300'
              : 'text-white group-hover:text-purple-300'
          }`}
        >
          {track.title}
        </h4>
        <p className="text-xs text-gray-500 truncate group-hover:text-gray-400 transition-colors duration-300">
          {track.artist?.name || 'Unknown'}
        </p>
      </div>

      {/* Duration */}
      <div className="shrink-0 text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
        {formatDuration(track.duration)}
      </div>

      {/* Play Button */}
      {track.preview && (
        <div className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-700/30 group-hover:bg-purple-500/40 transition-all duration-300 transform group-hover:scale-110 group-active:scale-95">
          {isCurrentTrack && isPlaying ? (
            <span className="text-xs text-white">⏸</span>
          ) : (
            <span className="text-xs text-white">▶</span>
          )}
        </div>
      )}

      {!track.preview && (
        <div className="shrink-0 w-8 h-8 flex items-center justify-center text-xs text-gray-600">
          🔇
        </div>
      )}
    </button>
  );
}
