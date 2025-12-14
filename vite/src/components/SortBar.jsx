import { useState } from 'react';
import useMusicStore from '../store/useMusicStore';

export default function SortBar() {
  const { sortBy, filterBy, setSortBy, setFilterBy } = useMusicStore();
  const [showFilterInput, setShowFilterInput] = useState(false);

  return (
    <div className="sticky top-32 z-30 bg-linear-to-b from-gray-950/95 via-gray-950/85 to-transparent backdrop-blur-md px-4 sm:px-8 py-4 border-b border-gray-800/50 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Sort Section */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center w-full sm:w-auto">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Sort by:</span>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'date-new', label: '📅 Newest' },
                { value: 'name-asc', label: '🔤 Album A-Z' },
                { value: 'artist-asc', label: '🎤 Artist A-Z' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 whitespace-nowrap ${
                    sortBy === option.value
                      ? 'bg-purple-600/80 text-white border border-purple-500/50 shadow-lg shadow-purple-500/30'
                      : 'bg-gray-800/40 text-gray-300 border border-gray-700/30 hover:bg-gray-800/60 hover:border-gray-600/50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filter Section */}
          <div className="flex gap-2 items-center w-full sm:w-auto">
            <button
              onClick={() => setShowFilterInput(!showFilterInput)}
              className="px-3 py-1.5 text-xs font-medium rounded-full bg-gray-800/40 text-gray-300 border border-gray-700/30 hover:bg-gray-800/60 hover:border-gray-600/50 transition-all duration-300 whitespace-nowrap shrink-0"
            >
              {showFilterInput ? '✕ Close' : '🔍 Filter'}
            </button>

            {showFilterInput && (
              <input
                type="text"
                placeholder="Filter by artist or album..."
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                autoFocus
                className="flex-1 px-3 py-1.5 text-xs bg-gray-800/60 border border-gray-700/50 rounded-full text-white placeholder-gray-500 outline-none focus:ring-1 focus:ring-purple-500/50 focus:border-purple-500/30 transition-all duration-300"
              />
            )}

            {filterBy && (
              <button
                onClick={() => setFilterBy('')}
                className="px-2 py-1 text-xs text-gray-400 hover:text-red-400 transition-colors duration-300"
                title="Clear filter"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
