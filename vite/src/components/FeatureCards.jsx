export default function FeatureCards() {
  const features = [
    {
      title: 'Millions',
      description: 'Over 50M songs',
      icon: '📋',
      color: 'from-orange-500/20 to-orange-600/20',
      border: 'border-orange-500/30',
      gradient: 'from-orange-500 to-orange-600',
    },
    {
      title: 'Quality',
      description: '30s Previews',
      icon: '🎧',
      color: 'from-white/10 to-white/5',
      border: 'border-white/20',
      gradient: 'from-white/50 to-white/30',
    },
    {
      title: 'Search',
      description: 'Instant Results',
      icon: '📻',
      color: 'from-pink-500/20 to-pink-600/20',
      border: 'border-pink-500/30',
      gradient: 'from-pink-500 to-pink-600',
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-3 md:gap-4 lg:gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`group relative rounded-2xl overflow-hidden border ${feature.border} backdrop-blur-xl hover:border-opacity-100 transition-all duration-300 hover:shadow-lg`}
          >
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.color}`} />

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Content */}
            <div className="relative p-4 md:p-6 flex items-center gap-4 h-full">
              <div className={`text-3xl md:text-4xl flex-shrink-0 p-2 md:p-3 rounded-xl bg-gradient-to-br ${feature.gradient} bg-opacity-20`}>
                {feature.icon}
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold text-white">{feature.title}</h3>
                <p className="text-xs md:text-sm text-gray-300">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
