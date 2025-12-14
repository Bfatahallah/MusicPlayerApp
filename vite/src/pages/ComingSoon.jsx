export default function ComingSoon() {
  const features = [
    { icon: "🎵", title: "Playlist Management", desc: "Create and organize your custom playlists" },
    { icon: "⭐", title: "Favorites", desc: "Star your favorite tracks and artists" },
    { icon: "🎧", title: "Equalizer", desc: "Fine-tune your audio with 10-band equalizer" },
    { icon: "📱", title: "Offline Mode", desc: "Cache your favorite tracks for offline listening" },
    { icon: "👥", title: "Social Sharing", desc: "Share playlists and recommendations with friends" },
    { icon: "🎚️", title: "Audio Enhancements", desc: "Adjust speed, reverb, and sound effects" },
  ];

  return (
    <div className="w-full min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background */}
      <img
        src="/Background.jpg"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/50 to-black/70 backdrop-blur-sm" />
      
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-start pt-20 pb-40 px-4 sm:px-8 md:px-16">
        <div className="w-full max-w-4xl flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-linear-to-r from-purple-400 via-pink-400 to-purple-400">
            🚀 Coming Soon
          </h1>
          <p className="text-xl text-white/70 mb-16">Exciting features on the horizon</p>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-purple-400/50 p-6 hover:shadow-lg hover:shadow-purple-500/20 transition-all hover:-translate-y-2 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-lg font-bold text-white/90 mb-2 group-hover:text-purple-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="w-full rounded-2xl bg-linear-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-purple-400/30 p-8 md:p-12 text-center">
            <p className="text-white/90 text-lg mb-4">
              We're working hard to bring you these amazing features! 
            </p>
            <p className="text-white/60 text-sm">
              Check back soon or follow us for updates. In the meantime, enjoy discovering music! 🎵
            </p>
            
            <div className="mt-8 flex items-center justify-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse" />
              <p className="text-white/70 text-sm">Development in progress...</p>
              <div className="w-3 h-3 rounded-full bg-pink-400 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

