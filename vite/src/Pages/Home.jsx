import FeatureCards from "../components/FeatureCards";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen relative">

      {/* Background */}
      <img
        src="/Background.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient Fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/40" />

      {/* Center content */}
      <div className="relative z-10 w-full flex flex-col items-center pt-32 px-4">

        {/* Big Title */}
        <h1 className="text-6xl md:text-7xl font-extrabold text-white text-center 
                       drop-shadow-[0_0_20px_rgba(0,0,0,0.7)] mb-8">
          Music Player App
        </h1>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/discover")}
          className="
            px-10 
            py-[10px] 
            rounded-full 
            bg-blue-400 
            text-black 
            font-semibold 
            shadow-xl 
            hover:scale-[1.05] 
            active:scale-95 
            transition
          "
        >
          Start Listening
        </button>

        {/* Subtitle */}
        <p className="mt-10 text-lg text-center max-w-2xl text-white/90 leading-relaxed">
          <span className="text-red-400 font-semibold">Discover</span>,
          <span className="text-white"> search</span>, and
          <span className="text-green-400"> play</span> millions of tracks from <a href="https://www.deezer.com" className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">Deezer</a>.
          Your soundtrack starts{" "}
          <span className="text-pink-400 font-semibold underline cursor-pointer">
            here
          </span>.
        </p>

        {/* Feature Cards */}
        <div className="mt-16 w-full max-w-5xl px-4">
          <FeatureCards variant="homepage" />
        </div>
      </div>
    </div>
  );
}
