import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full fixed top-0 left-0 z-50 py-4">
      <nav className="flex items-center justify-between w-full bg-white/10 backdrop-blur-lg border border-white/10 shadow-lg px-6">
        
        {/* Logo - Left */}
        <Link to="/" className="flex items-center gap-2 py-2">
          <div className="text-purple-400 text-3xl">🎵</div>
          <span className="font-bold text-xl text-white">MusicPlayer</span>
        </Link>

        {/* Nav - Right */}
        <ul className="flex items-center gap-10 pr-6 text-white/80 text-sm">
          <li>
            <Link className="hover:text-white transition" to="/discover">
              Discover
            </Link>
          </li>
          <li>
            <Link className="hover:text-white transition" to="/faq">
              FAQ
            </Link>
          </li>
          <li>
            <Link className="hover:text-white transition" to="/coming">
              Coming Soon
            </Link>
          </li>
        </ul>

      </nav>
    </header>
  );
}
