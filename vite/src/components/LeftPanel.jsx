import Hero from "./Hero";
import FeatureCards from "./FeatureCards";

export default function LeftPanel() {
  return (
    <div className="relative w-[420px] h-full overflow-y-auto">

      {/* HERO BACKGROUND */}
      <Hero />

      {/* FOREGROUND CONTENT */}
      <div className="relative z-10 p-8">

        {/* HERO TEXT */}
        <div className="mt-48">
          <h1 className="text-5xl font-extrabold leading-tight">
            Discover{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Music
            </span>
          </h1>

          <p className="mt-3 text-white/80">
            Search and play music previews from iTunes
          </p>
        </div>

        {/* FEATURE CARDS */}
        <div className="mt-8">
          <FeatureCards />
        </div>

        {/* CTA BUTTON */}
        <div className="mt-8 flex justify-center">
          <button className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-400 shadow-lg">
            Start Listening
          </button>
        </div>

      </div>
    </div>
  );
}
