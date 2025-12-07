import useMusicStore from '../store/useMusicStore';
import PlayerBar from '../components/PlayerBar';

export default function Discover() {
  const { searchQuery, setSearchQuery, searchDeezer, results } = useMusicStore();

  const handleSearch = async (e) => {
    e.preventDefault();
    await searchDeezer(searchQuery);
  };

  return (
    <div className="w-full min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Search Section */}
      <div className="bg-linear-to-b from-gray-900 to-gray-950 p-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-6">Discover Music</h1>
        
        {/* Search Form */}
        <form onSubmit={handleSearch} className="max-w-2xl w-full">
          <div className="flex gap-3 flex-col sm:flex-row">
            <div className="flex-1 relative group">
              <div className="absolute -inset-0.5 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300" />
              <input
                type="text"
                placeholder="Search artists, songs, albums..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="relative w-full px-6 py-4 bg-gray-900 text-white placeholder-gray-500 rounded-full outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-8 py-4 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-full hover:shadow-2xl hover:shadow-purple-500/50 transition-all transform hover:scale-105 active:scale-95 shrink-0"
            >
              🔍 Search
            </button>
          </div>
        </form>
      </div>

      {/* Results Section */}
      <div className="flex-1 overflow-y-auto p-8">
        {results.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/70 text-lg">Search for music to get started...</p>
          </div>
        ) : (
          <div>
            <h2 className="text-3xl font-black mb-2">
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

      {/* Player Bar Component */}
      <PlayerBar />
    </div>
  );
}
