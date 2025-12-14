export default function SkeletonLoader() {
  return (
    <div className="space-y-4 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-linear-to-r from-gray-800/20 to-gray-900/20 backdrop-blur-sm border border-gray-700/20 rounded-xl p-4 flex gap-4"
        >
          {/* Cover Skeleton */}
          <div className="shrink-0 w-24 h-24 md:w-32 md:h-32 bg-gray-800/40 rounded-lg" />

          {/* Content Skeleton */}
          <div className="flex-1 space-y-3">
            <div className="h-5 bg-gray-800/40 rounded-lg w-3/4" />
            <div className="h-4 bg-gray-800/40 rounded-lg w-1/2" />
            <div className="flex gap-2 mt-3">
              <div className="h-6 bg-gray-800/40 rounded-full w-20" />
              <div className="h-6 bg-gray-800/40 rounded-full w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
