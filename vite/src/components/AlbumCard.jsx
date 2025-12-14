import { useState } from 'react';
import useMusicStore from '../store/useMusicStore';
import TrackRow from './TrackRow';

export default function AlbumCard({ album }) {
  const { expandedAlbumId, setExpandedAlbumId, currentTrack } = useMusicStore();
  const isExpanded = expandedAlbumId === album.id;

  const handleToggle = () => {
    setExpandedAlbumId(isExpanded ? null : album.id);
  };

  // Format release date
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="group">
      {/* Album Card Header */}
      <button
        onClick={handleToggle}
        className="w-full text-left bg-linear-to-br from-gray-800/40 to-gray-900/40 hover:from-gray-700/50 hover:to-gray-800/50 backdrop-blur-sm border border-gray-700/30 hover:border-purple-500/30 rounded-xl p-4 transition-all duration-300 overflow-hidden"
      >
        <div className="flex gap-4">
          {/* Album Cover */}
          <div className="relative shrink-0 w-24 h-24 md:w-32 md:h-32">
            <div className="absolute -inset-0.5 bg-linear-to-br from-purple-600/30 to-pink-600/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img
              src={album.cover || '/placeholder-album.png'}
              alt={album.title}
              className="relative w-full h-full rounded-lg object-cover shadow-lg group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Album Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h3 className="text-lg md:text-xl font-bold text-white truncate group-hover:text-purple-300 transition-colors duration-300">
                  {album.title}
                </h3>
                <p className="text-sm text-gray-400 truncate group-hover:text-gray-300 transition-colors duration-300">
                  {album.artist.name}
                </p>
                <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-500">
                  {album.releaseDate && (
                    <span className="px-2 py-1 bg-white/5 rounded">
                      📅 {formatDate(album.releaseDate)}
                    </span>
                  )}
                  <span className="px-2 py-1 bg-white/5 rounded">
                    🎵 {album.tracks.length} {album.tracks.length === 1 ? 'track' : 'tracks'}
                  </span>
                </div>
              </div>

              {/* Expand/Collapse Indicator */}
              <div
                className={`text-xl text-gray-400 group-hover:text-purple-400 transition-all duration-300 transform ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              >
                ▼
              </div>
            </div>
          </div>
        </div>
      </button>

      {/* Expandable Track List */}
      {isExpanded && (
        <div className="mt-2 ml-0 md:ml-4 space-y-1 animate-fade-in">
          {album.tracks.map((track, idx) => (
            <TrackRow
              key={track.id}
              track={track}
              trackNumber={idx + 1}
              isCurrentTrack={currentTrack?.id === track.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
