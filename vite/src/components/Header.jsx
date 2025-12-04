export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="text-2xl">🎵</div>
          <span className="text-lg font-bold text-white hidden sm:inline">MusicPlayer</span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-6 md:gap-8">
          <a href="#discover" className="text-sm text-white/70 hover:text-white transition-colors">
            Discover
          </a>
          <a href="#faq" className="text-sm text-white/70 hover:text-white transition-colors">
            FAQ
          </a>
          <a href="#coming" className="text-sm text-white/70 hover:text-white transition-colors">
            Coming Soon
          </a>
        </nav>
      </div>
    </header>
  );
}
