import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { SocialLinks } from "../components/SocialLinks";
import { NowPlayingWidget } from "../components/NowPlayingWidget";
import { LastFilmWidget } from "../components/LastFilmWidget";

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
  const [showText, setShowText] = useState(
    hasPlayedIntro ? fullIntroText : ""
  );
  const [isTypingComplete, setTypingComplete] = useState(hasPlayedIntro);

  useEffect(() => {
    if (hasPlayedIntro) return;
    if (introStartTime === null) introStartTime = Date.now();

    let timeoutId;
    let revealed = 0;

    const tick = () => {
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
  }, []);

  return (
    <div className="bg-[#22303c] min-h-screen flex flex-col justify-between items-center text-white relative">
      <Navbar />

      <div className="flex flex-col items-center justify-center flex-grow px-4 sm:px-6 pt-28 sm:pt-0">
        <p className="font-mono text-2xl sm:text-4xl mb-2 text-center">
          Wildan Rifqi
        </p>
        <div className="font-mono text-sm sm:text-lg md:text-xl text-white relative w-full max-w-xl">
          <div className="whitespace-pre-wrap font-mono leading-relaxed">
            {showText}
            {!isTypingComplete && (
              <span className="inline-block w-px bg-transparent animate-[blink_1s_step-end_infinite]">
                |
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="relative py-4 px-4 w-full max-w-xl">
        <NowPlayingWidget visible={isTypingComplete} />
        <LastFilmWidget visible={isTypingComplete} />
      </div>

      <Footer />
    </div>
  );
}
