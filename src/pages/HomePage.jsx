import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SocialLinks } from "../components/SocialLinks";
import { NowPlayingWidget } from "../components/NowPlayingWidget";
import { LastFilmWidget } from "../components/LastFilmWidget";
import { FastForwardIcon } from "../components/icons";

const textLines = [
  'Informatics student at UPN "Veteran" Yogyakarta.',
  "I build things for mobile and web, teach programming practicum",
  "to ~100+ students, and occasionally compete in",
  "competitive programming (achieved 2nd place, not bad).",
  "Currently working on Spader, an iOS schedule management app",
  "for college students, built with Swift.",
  "Proficient in Python, JavaScript, and Ruby.",
  "Getting comfortable with Rust and C++.",
];

const fullIntroText = textLines.join("\n");

function buildRevealSchedule(lines) {
  const offsets = [];
  let t = 0;
  lines.forEach((line, li) => {
    for (let i = 0; i < line.length; i++) {
      t += 50;
      offsets.push(t);
    }
    if (li < lines.length - 1) {
      t += 500;
      offsets.push(t);
    }
  });
  return { offsets, duration: t };
}

const introSchedule = buildRevealSchedule(textLines);
let hasPlayedIntro = false;
let introStartTime = null;

export function HomePage() {
  const [showText, setShowText] = useState(hasPlayedIntro ? fullIntroText : "");
  const [isTypingComplete, setTypingComplete] = useState(hasPlayedIntro);

  useEffect(() => {
    if (isTypingComplete) return;
    if (introStartTime === null) introStartTime = Date.now();

    let timeoutId;
    let revealed = 0;

    const tick = () => {
      if (hasPlayedIntro) return;

      const elapsed = Date.now() - introStartTime;
      while (
        revealed < introSchedule.offsets.length &&
        introSchedule.offsets[revealed] <= elapsed
      ) {
        revealed++;
      }
      setShowText(fullIntroText.slice(0, revealed));

      if (elapsed >= introSchedule.duration) {
        hasPlayedIntro = true;
        setTypingComplete(true);
        return;
      }
      timeoutId = setTimeout(tick, 50);
    };

    tick();
    return () => clearTimeout(timeoutId);
  }, [isTypingComplete]);

  const skipIntro = () => {
    hasPlayedIntro = true;
    setTypingComplete(true);
    setShowText(fullIntroText);
  };

  return (
    <div className="bg-[#22303c] min-h-screen flex flex-col text-white relative">
      <Navbar />

      <div className="flex-grow flex flex-col items-center justify-center w-full px-4 sm:px-6 pt-28 sm:pt-16 -translate-y-10">
        <p className="font-mono text-2xl sm:text-4xl mb-6 sm:mb-8 text-center">
          Wildan Rifqi
        </p>
        <div className="font-mono text-sm sm:text-lg md:text-xl text-white relative w-full max-w-xl md:max-w-2xl lg:max-w-3xl">
          <div
            className="whitespace-pre-wrap font-mono leading-relaxed invisible"
            aria-hidden="true"
          >
            {fullIntroText}
          </div>
          <div className="absolute inset-0 whitespace-pre-wrap font-mono leading-relaxed">
            {showText}
            {!isTypingComplete && (
              <span className="inline-block w-px bg-transparent animate-[blink_1s_step-end_infinite]">
                |
              </span>
            )}
          </div>

          <button
            onClick={skipIntro}
            className={`absolute -bottom-14 right-0 flex items-center justify-center p-2 rounded-full bg-[#2d3748]/80 hover:bg-[#4a5568]/95 border border-gray-600/30 text-[#a0aec0] hover:text-white shadow-lg group focus:outline-none transition-all duration-500 ${
              isTypingComplete
                ? "opacity-0 scale-95 pointer-events-none"
                : "opacity-100 scale-100"
            }`}
            aria-label="Skip typing animation"
          >
            <FastForwardIcon className="w-5 h-5" />
            <span className="absolute bottom-full mb-2 right-1/2 translate-x-1/2 px-2.5 py-1.5 rounded-lg bg-[#1a202c] text-xs font-mono text-white whitespace-nowrap shadow-xl border border-gray-700/50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Skip Animation
            </span>
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center w-full px-4 pb-2">
        <div className="inline-flex flex-col items-stretch gap-2">
          <NowPlayingWidget visible={isTypingComplete} />
          <LastFilmWidget visible={isTypingComplete} />
        </div>
        <div className="mt-4 flex justify-center">
          <SocialLinks />
        </div>
      </div>

      <Footer />
    </div>
  );
}
