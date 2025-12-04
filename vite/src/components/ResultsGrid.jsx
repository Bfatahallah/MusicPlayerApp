import useMusicStore from '../store/useMusicStore';
import TrackCard from './TrackCard';

export default function ResultsGrid() {
  const { results } = useMusicStore();

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-2">
        Found <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">{results.length}</span>
      </h2>
      <p className="text-gray-400 text-xs md:text-sm mb-6">Click any track to preview</p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
        {results.map((track, index) => (
          <TrackCard key={track.id} track={track} index={index + 1} />
        ))}
      </div>
    </div>
  );
}
