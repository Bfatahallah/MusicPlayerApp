import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full py-4 px-8 bg-transparent backdrop-blur-md shadow-md">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        
        <Link to="/" className="flex items-center gap-2">
          <div className="text-purple-400 text-3xl">🎵</div>
          <span className="font-bold text-xl">MusicPlayer</span>
        </Link>

        <ul className="flex items-center gap-10 text-white/80 text-sm">
          <li><Link className="hover:text-white" to="/discover">Discover</Link></li>
          <li><Link className="hover:text-white" to="/faq">FAQ</Link></li>
          <li><Link className="hover:text-white" to="/coming">Coming Soon</Link></li>
        </ul>

      </nav>
    </header>
  );
}
