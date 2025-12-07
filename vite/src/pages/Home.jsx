import FeatureCards from "../components/FeatureCards";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen relative">

      {/* Background */}
      <img
        src="/Background.jpg"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/20 to-black/60" />

      {/* MAIN CONTENT */}
      <div className="relative z-10 w-full h-full flex flex-col items-center pt-28 px-4 gap-8">

        {/* TITLE SPACER */}
        <div className="h-20" />

        {/* TITLE */}
        <h1 className="text-6xl md:text-7xl font-extrabold text-white text-center drop-shadow-[0_0_20px_rgba(0,0,0,0.7)]">
          Music Player App
        </h1>

        {/* CTA SPACER */}
        <div className="h-15" />

        {/* ✅ CTA BUTTON – hard-centered */}
        <div className="w-full flex justify-center">
          <button
            onClick={() => navigate("/discover")}
            className="px-15 py-8 rounded-full bg-blue-400 text-black text-lg font-semibold shadow-xl hover:scale-[1.15] transition-transform duration-1000 hover:bg-linear-to-r hover:from-purple-600 hover:via-pink-500 hover:to-pink-600 hover:shadow-2xl hover:shadow-purple-500/50"
          >
            Start Listening
          </button>
        </div>

        {/* SPACER */}
        <div className="h-20"></div>

        {/* SUBTITLE */}
        <p className="text-lg text-center max-w-2xl text-white/90 leading-relaxed">
          <span className="text-red-400 font-semibold">Discover</span>,
          <span className="text-white"> search</span>, and
          <span className="text-green-400"> play</span> millions of tracks from{" "}
          <a
            href="https://www.deezer.com"
            className="text-blue-400 underline hover:text-blue-600 hover:scale-105"
            target="_blank"
            rel="noopener noreferrer"
          >
            Deezer
          </a>.
          Your soundtrack starts{" "}
          <span className="text-pink-400 font-semibold underline cursor-pointer">
            here
          </span>.
        </p>

        {/* SPACER */}
        <div className="h-1"></div>

        {/* FEATURE CARDS */}
        <div className="w-full max-w-4xl px-4 pb-12">
          <FeatureCards variant="homepage" />
        </div>

      </div>
    </div>
  );
}
