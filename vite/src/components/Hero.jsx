import FeatureCards from './FeatureCards';

export default function Hero({ children }) {
  return (
    <div className="w-full h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <img
        src="/Background.jpg"
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* Content - Perfectly Centered */}
      <div className="relative z-10 text-center w-full px-4">
        <div className="max-w-2xl mx-auto">
          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight">
            Discover <span className="bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Music</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg lg:text-xl text-gray-300 mb-12">
            Search and play music previews from iTunes
          </p>

          {/* Search Bar */}
          <div className="mb-12">
            {children}
          </div>

          {/* Feature Cards */}
          <div className="mt-12">
            <FeatureCards />
          </div>
        </div>
      </div>
    </div>
  );
}
