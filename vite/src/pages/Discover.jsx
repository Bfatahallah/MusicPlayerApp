import { useEffect, useRef, useCallback, useState } from 'react';
import useMusicStore from '../store/useMusicStore';
import PlayerBar from '../components/PlayerBar';
import AlbumCard from '../components/AlbumCard';
import SortBar from '../components/SortBar';
import SkeletonLoader from '../components/SkeletonLoader';

export default function Discover() {
  const { searchQuery, setSearchQuery, searchDeezer, albums, isLoading, hasMore } = useMusicStore();
  const debounceTimerRef = useRef(null);
  const scrollEndRef = useRef(null);
  const [viewMode, setViewMode] = useState('list'); // 'grid' or 'list'

  // Debounced search effect
  useEffect(() => {
    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Only search if query has content
    if (!searchQuery || !searchQuery.trim()) {
      return;
    }

    // Set new debounce timer (1500ms - 1.5 seconds)
    debounceTimerRef.current = setTimeout(() => {
      searchDeezer(searchQuery, false); // false = new search, not pagination
    }, 1500);

    // Cleanup timer on unmount
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchQuery, searchDeezer]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading && searchQuery.trim()) {
          searchDeezer(searchQuery, true); // true = pagination
        }
      },
      { threshold: 0.1 }
    );

    if (scrollEndRef.current) {
      observer.observe(scrollEndRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading, searchQuery, searchDeezer]);

  return (
    <div className="w-full min-h-screen bg-linear-to-br from-gray-950 via-black to-gray-950 text-white relative overflow-hidden">
      {/* Background with overlay */}
      <img
        src="/Background.jpg"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-linear-to-br from-black/80 via-black/85 to-black/90" />

      {/* Main Container */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center pt-20 pb-32 px-4 sm:px-8 md:px-16">
        <div className="w-full max-w-4xl flex flex-col items-center gap-6 text-center">
          {/* Search Header Section */}
          <div className="w-full flex flex-col items-center gap-4">
            <h1 className="text-3xl md:text-5xl font-bold bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Discover Music
            </h1>

            {/* Search Bar */}
            <div className="w-full flex justify-center">
              <div className="w-full max-w-3xl">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full blur opacity-40 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300" />
                  <input
                    type="text"
                    placeholder="Search artists, songs, albums..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="relative w-full px-6 py-4 bg-gray-800/80 hover:bg-gray-800 text-white placeholder-gray-500 rounded-full outline-none focus:ring-2 focus:ring-purple-500 transition-all shadow-lg"
                  />
                </div>
              </div>
            </div>

            {/* Search Status */}
            {isLoading && albums.length === 0 && (
              <div className="flex items-center justify-center gap-2 text-gray-400">
                <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm">Searching...</span>
              </div>
            )}
          </div>

          {/* Sort/Filter Bar */}
          {searchQuery.trim() && albums.length > 0 && (
            <div className="w-full flex justify-between items-center mb-4">
              <SortBar />
              {/* Grid/List Toggle */}
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    viewMode === 'grid'
                      ? 'bg-purple-500/40 border border-purple-400/60 text-white'
                      : 'bg-gray-800/30 border border-gray-700/30 text-gray-400 hover:bg-gray-800/50'
                  }`}
                  title="Grid view"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    viewMode === 'list'
                      ? 'bg-purple-500/40 border border-purple-400/60 text-white'
                      : 'bg-gray-800/30 border border-gray-700/30 text-gray-400 hover:bg-gray-800/50'
                  }`}
                  title="List view"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM3 16a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Results Section */}
          <div className="w-full flex-1">
            {/* Empty State - No Search Yet */}
            {!searchQuery.trim() && albums.length === 0 && (
              <div className="h-96 flex flex-col items-center justify-center text-center">
                <div className="text-6xl mb-4 opacity-50 hover:opacity-70 transition-opacity duration-300">
                  🎵
                </div>
                <p className="text-xl text-gray-400 mb-2">Start your search</p>
                <p className="text-gray-500">Type an artist, song, or album name to begin exploring</p>
              </div>
            )}

            {/* Loading State */}
            {isLoading && albums.length === 0 && <SkeletonLoader />}

            {/* No Results Found */}
            {!isLoading && searchQuery.trim() && albums.length === 0 && (
              <div className="h-96 flex flex-col items-center justify-center text-center">
                <div className="text-6xl mb-4 opacity-50">😔</div>
                <p className="text-xl text-gray-400">No albums found</p>
                <p className="text-gray-500 mt-2">Try searching for something else</p>
              </div>
            )}

            {/* Albums Grid */}
            {albums.length > 0 && (
              <div className="animate-fade-in">
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    Found{' '}
                    <span className="bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {albums.length}
                    </span>{' '}
                    Albums
                  </h2>
                  <p className="text-gray-400 text-sm">Click an album to view tracks</p>
                </div>

                <div className="space-y-3 md:space-y-4">
                  {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {albums.map((album) => (
                        <div key={album.id} className="transform transition-transform hover:-translate-y-1">
                          <AlbumCard album={album} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {albums.map((album) => (
                        <AlbumCard key={album.id} album={album} />
                      ))}
                    </div>
                  )}
                </div>

                {/* Infinite Scroll Trigger */}
                {hasMore && (
                  <div
                    ref={scrollEndRef}
                    className="mt-8 flex justify-center"
                  >
                    {isLoading && (
                      <div className="flex items-center gap-2 text-gray-400">
                        <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm">Loading more...</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Player Bar Component */}
      <PlayerBar />
    </div>
  );
}


