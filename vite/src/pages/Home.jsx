import FeatureCards from "../components/FeatureCards";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen relative overflow-hidden bg-black">

      {/* Background with blur */}
      <img
        src="/Background.jpg"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />

      {/* Modern glass gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70 backdrop-blur-sm" />

      {/* MAIN CONTENT - Full-screen sections with explicit ratios */}
      <div className="relative z-10 w-full flex flex-col px-6 sm:px-10 md:px-16 pt-20 pb-12 gap-6 justify-between min-h-screen">
        <section className="w-full max-w-6xl mx-auto flex flex-col items-center text-center min-h-[35vh] justify-center">
          {/* TITLE */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
            Music Player App
          </h1>
        </section>

        <section className="w-full max-w-5xl mx-auto">
          {/* SUBTITLE */}
          <p className="text-base sm:text-lg text-white/80 leading-relaxed text-center">
            <span className="text-red-400 font-semibold">Discover</span>
            <span className="text-white">, search, and</span>
            <span className="text-green-400 font-semibold"> play</span>
            <span className="text-white"> millions of tracks from </span>
            <a href="https://www.deezer.com" className="text-blue-300 font-semibold hover:underline" target="_blank" rel="noopener noreferrer">Deezer</a>
            <span className="text-white">. Your soundtrack starts </span>
            <span className="text-pink-400 font-semibold">here</span>.
          </p>
        </section>

        <section className="w-full max-w-5xl mx-auto flex items-center justify-center">
          {/* CTA BUTTON */}
          <button
            onClick={() => navigate("/discover")}
            className="px-12 sm:px-16 md:px-20 py-3 sm:py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-base sm:text-lg font-bold shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 active:scale-95 backdrop-blur-md border border-white/30 hover:border-white/50"
          >
            Start Listening
          </button>
        </section>

        {/* Spacer to force features lower if needed */}
        <div className="h-8 sm:h-10 md:h-12" />

        <section className="w-full max-w-6xl mx-auto flex-1 flex items-start mt-16">
          {/* FEATURE CARDS */}
          <div className="w-full px-2 sm:px-0">
            <FeatureCards variant="homepage" />
          </div>
        </section>
      </div>
    </div>
  );
}
