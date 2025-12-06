import FeatureCards from "../components/FeatureCards";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen relative overflow-hidden">

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

        {/* TITLE */}
        <h1 className="text-6xl md:text-7xl font-extrabold text-white text-center drop-shadow-[0_0_20px_rgba(0,0,0,0.7)]">
          Music Player App
        </h1>

        {/* CTA BUTTON */}
        <button
          onClick={() => navigate("/discover")}
          className="px-10 py-7 rounded-full bg-blue-400 text-black font-semibold shadow-xl hover:scale-[1.15] active:scale-95 transition"
        >
          Start Listening
        </button>

        {/* SUBTITLE */}
        <p className="text-lg text-center max-w-2xl text-white/90 leading-relaxed">
          <span className="text-red-400 font-semibold">Discover</span>,
          <span className="text-white"> search</span>, and
          <span className="text-green-400"> play</span> millions of tracks from{" "}
          <a
            href="https://www.deezer.com"
            className="text-blue-400 underline"
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
        <div className="flex-1"></div>

        {/* FEATURE CARDS */}
        <div className="w-full max-w-5xl px-4 pb-8">
          <FeatureCards variant="homepage" />
        </div>

      </div>
    </div>
  );
}
