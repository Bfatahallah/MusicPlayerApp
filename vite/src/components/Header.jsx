import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full sticky top-0 z-50 flex items-center justify-center py-3 px-4 bg-black/40 backdrop-blur-xl">
      <nav className="max-w-7xl w-full flex items-center justify-between bg-black/60 backdrop-blur-xl border border-white/10 shadow-lg rounded-xl px-8 py-3">
        
        {/* Logo - Left */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-100 opacity-90 transition-all duration-300 transform hover:scale-105 shrink-0">
          <svg className="w-8 h-8 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
          </svg>
          <span className="font-bold text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-purple-300 hover:to-pink-300 transition-all duration-300 whitespace-nowrap">MusicPlayer</span>
        </Link>

        {/* Nav - Right */}
        <ul className="flex items-center gap-8 text-white/80 text-sm font-medium ml-auto">
          <li>
            <Link className="hover:text-purple-300 transition duration-300 relative group" to="/discover">
              Discover
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300" />
            </Link>
          </li>
          <li>
            <Link className="hover:text-purple-300 transition duration-300 relative group" to="/faq">
              FAQ
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300" />
            </Link>
          </li>
          <li>
            <Link className="hover:text-purple-300 transition duration-300 relative group" to="/coming">
              Coming Soon
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300" />
            </Link>
          </li>
        </ul>

      </nav>
    </header>
  );
}
