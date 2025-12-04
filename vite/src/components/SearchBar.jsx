import { useRef } from 'react';

export default function SearchBar({ value, onChange, onSearch, onKeyPress, placeholder }) {
  const inputRef = useRef(null);

  return (
    <div className="w-full">
      <div className="flex gap-2 md:gap-3 lg:gap-4 items-center flex-col sm:flex-row">
        {/* Search Input */}
        <div className="flex-1 w-full relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl md:rounded-3xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative bg-gray-800/80 backdrop-blur-xl rounded-2xl md:rounded-3xl px-4 md:px-6 py-3 md:py-4 border border-gray-700/50 hover:border-gray-600/50 transition-colors duration-300">
            <input
              ref={inputRef}
              type="text"
              placeholder={placeholder || "Search artists, songs..."}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyPress={onKeyPress}
              className="w-full bg-transparent text-white placeholder-gray-500 outline-none text-sm md:text-lg"
            />
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={onSearch}
          className="px-4 md:px-6 py-3 md:py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-full md:rounded-2xl font-bold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95 flex-shrink-0 w-full sm:w-auto"
        >
          <span className="text-xl md:text-2xl">🔍</span>
        </button>
      </div>
    </div>
  );
}
