import audioIcon from "../assets/audio.png";
import headphone from "../assets/Headphone.png";
import radio from "../assets/radio.png";

export default function FeatureCards() {
  const items = [
    {
      icon: audioIcon,
      title: "Millions of Tracks",
      subtitle: "Access a vast library of music from Deezer",
    },
    {
      icon: headphone,
      title: "High Quality Previews",
      subtitle: "Listen to 30-second previews of any track",
    },
    {
      icon: radio,
      title: "Instant Search",
      subtitle: "Find your favorite artists and songs instantly",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {items.map((it, idx) => (
      <div
  key={idx}
  className="
    rounded-2xl 
    p-8 
    bg-white/10 
    backdrop-blur-xl 
    border border-white/30 
    shadow-[0_8px_32px_rgba(0,0,0,0.3)]
    flex flex-col items-center gap-4 text-center
    hover:scale-105 
   animate-fadeInUp 
   transition 
   duration-500    delay-[calc(0.1s*var(--idx))] cubic-bezier(0.4, 0, 0.2, 1)
  "
>

          <img src={it.icon} className="w-16 h-16 object-contain" />

          <h3 className="text-xl font-semibold text-white">
            {it.title}
          </h3>

          <p className="text-white/80 text-sm max-w-[200px]">
            {it.subtitle}
          </p>
        </div>
      ))}
    </div>
  );
}
