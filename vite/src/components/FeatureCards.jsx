import audioIcon from "../assets/audio.png";
import headphone from "../assets/Headphone.png";
import radio from "../assets/radio.png";
import { useState } from "react";

export default function FeatureCards() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cardHovered, setCardHovered] = useState(null);

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

  const handleMouseMove = (e, idx) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
    setCardHovered(idx);
  };

  const handleMouseLeave = () => {
    setCardHovered(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((it, idx) => (
        <div
          key={idx}
          onMouseMove={(e) => handleMouseMove(e, idx)}
          onMouseLeave={handleMouseLeave}
          className="
            rounded-2xl 
            p-8 
            bg-gradient-to-br from-white/10 to-white/5
            backdrop-blur-xl 
            border border-white/20
            hover:border-purple-400/50
            shadow-lg
            hover:shadow-2xl
            hover:shadow-purple-500/30
            flex flex-col items-center gap-4 text-center
            hover:scale-105
            transform
            transition 
            duration-300
            active:scale-95
            relative
            overflow-hidden
            group
          "
          style={
            cardHovered === idx
              ? {
                  backgroundPosition: `${mousePos.x}px ${mousePos.y}px`,
                }
              : {}
          }
        >
          {/* Animated gradient on hover */}
          {cardHovered === idx && (
            <div
              className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 pointer-events-none"
              style={{
                background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(168,85,247,0.15) 0%, transparent 50%)`,
              }}
            />
          )}

          <div className="p-3 bg-transparent rounded-xl backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/40 transition-shadow duration-300 relative z-10">
            <img src={it.icon} className="w-12 h-12 object-contain brightness-110 hover:brightness-125 transition-all duration-300 group-hover:scale-110" />
          </div>

          <h3 className="text-lg font-bold text-white hover:text-purple-300 transition-colors duration-300 relative z-10">
            {it.title}
          </h3>

          <p className="text-white/75 text-sm max-w-xs leading-relaxed hover:text-white transition-colors duration-300 relative z-10">
            {it.subtitle}
          </p>
        </div>
      ))}
    </div>
  );
}
