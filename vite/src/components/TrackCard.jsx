import useMusicStore from '../store/useMusicStore';

export default function TrackCard({ track, index }) {
  const { selectTrack } = useMusicStore();

  return (
    <div className="group relative bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 p-0.5 md:p-1 rounded-lg md:rounded-2xl hover:shadow-lg md:hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:-translate-y-1 md:hover:-translate-y-2">
      {/* Inner Container */}
      <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-md md:rounded-xl overflow-hidden h-full">
        {/* Album Cover */}
        <div className="relative h-24 md:h-40 lg:h-48 overflow-hidden bg-gray-700">
          <img
            src={track.album?.cover_medium || track.album?.cover}
            alt={track.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Index Badge */}
          <div className="absolute top-1 right-1 md:top-3 md:right-3 w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-pink-500 to-purple-600 rounded flex items-center justify-center text-white font-bold text-xs md:text-sm">
            {index}
          </div>
        </div>

        {/* Content */}
        <div className="p-2 md:p-4">
          <h3 className="text-xs md:text-sm font-bold text-white truncate group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
            {track.title}
          </h3>
          <p className="text-xs text-gray-400 truncate mt-0.5 md:mt-1">{track.artist?.name}</p>

          {/* Preview Button */}
          {track.preview && (
            <button
              onClick={() => selectTrack(track)}
              className="mt-2 md:mt-4 w-full py-1.5 md:py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded text-xs md:text-sm rounded-lg font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              ▶ Play
            </button>
          )}

          {!track.preview && (
            <button
              disabled
              className="mt-2 md:mt-4 w-full py-1.5 md:py-2.5 bg-gray-700 text-gray-500 rounded text-xs md:text-sm rounded-lg font-semibold cursor-not-allowed opacity-50"
            >
              No Preview
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
