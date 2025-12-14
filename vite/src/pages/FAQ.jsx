import { useState } from "react";

export default function FAQ() {
  const [expanded, setExpanded] = useState(null);

  const faqs = [
    {
      q: "What audio quality should I expect?",
      a: "You're listening to 30-second previews from Deezer—not a full studio recording. Think of it as a sneak peek, not a concert. Your speakers matter too, but we won't judge."
    },
    {
      q: "Can I skip around in the track?",
      a: "Absolutely. The seek bar works great—but remember, with 30-second clips, you've got limited runway. Make it count."
    },
    {
      q: "Is my data private?",
      a: "Yes. We focus on making the app work, not tracking you. Your searches and preferences stay local."
    },
    {
      q: "Will this make me a better musician?",
      a: "Listening to great music is step one. Actually making music is steps two through infinity. We handle step one."
    },
    {
      q: "Why can't I save songs offline?",
      a: "Licensing agreements prevent offline downloads. Deezer's rules, not ours. Think of this as streaming only."
    },
    {
      q: "Is there an equalizer?",
      a: "Not in this version. Your device's audio settings work, though. We kept the app simple and focused on discovery."
    },
    {
      q: "Can I create playlists?",
      a: "Not yet. Right now, use your device's bookmarks or browser history. Playlists are on the roadmap."
    },
    {
      q: "What if I find a bug?",
      a: "Great catch! Check the browser console (F12) for error details, then restart the app. Still broken? Let us know what happened."
    },
    {
      q: "Why this name?",
      a: "It's a React school project from ALX Africa, so we kept the name straightforward and shipped it."
    },
    {
      q: "Will this improve my music taste?",
      a: "Only if you branch out. Great discovery tools help, but the rest is up to you."
    }
  ];

  return (
    <div className="w-full min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background */}
      <img
        src="/Background.jpg"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/50 to-black/70 backdrop-blur-sm" />
      
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-start pt-20 pb-40 px-4 sm:px-8 md:px-16">
        <div className="w-full max-w-3xl flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-pink-400">
          Frequently Asked Questions
        </h1>
        <p className="text-center text-white/70 mb-12 text-lg">Have a stupid question? We probably have a stupid answer.</p>

        <div className="w-full space-y-4 md:space-y-6">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-purple-400/50 overflow-hidden hover:shadow-lg hover:shadow-purple-500/20 transition-all transform hover:-translate-y-1"
            >
              <button
                onClick={() => setExpanded(expanded === idx ? null : idx)}
                className="w-full px-6 md:px-8 py-5 md:py-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <span className="font-semibold text-white/90 hover:text-purple-300 transition-colors text-base md:text-lg">
                  {faq.q}
                </span>
                <span className={`text-2xl transform transition-transform duration-300 shrink-0 ml-4 ${expanded === idx ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {expanded === idx && (
                <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-white/10 text-white/75 leading-relaxed text-base md:text-lg">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}

