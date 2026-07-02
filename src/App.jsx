import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import github from "./assets/github.png";
import discord from "./assets/discord.png";
import instagram from "./assets/instagram.png";

const LASTFM_API_KEY = "99a80abf6635555e676c54c5b44dcf7a";
const LASTFM_USER = "wildanrfq";
const POLL_INTERVAL = 30000;

function useNowPlaying() {
  const [track, setTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchTrack = async () => {
    try {
      const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USER}&api_key=${LASTFM_API_KEY}&format=json&limit=1`;
      const res = await fetch(url);
      const data = await res.json();
      const latest = data.recenttracks?.track?.[0];
      if (!latest) return;

      const nowPlaying = latest["@attr"]?.nowplaying === "true";
      setIsPlaying(nowPlaying);
      setTrack({
        name: latest.name,
        artist: latest.artist["#text"],
        album: latest.album["#text"],
        url: latest.url,
        image:
          latest.image?.find((img) => img.size === "large")?.["#text"] || null,
      });
    } catch {
      // silently fail, keep showing last known state
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrack();
    const interval = setInterval(fetchTrack, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return { track, isPlaying, loading };
}

function NowPlayingWidget({ visible }) {
  const { track, isPlaying, loading } = useNowPlaying();

  if (!visible) return null;

  if (loading) {
    return (
      <div className="flex items-center gap-3 font-mono text-sm text-[#a0aec0] animate-pulse">
        <span>fetching last.fm...</span>
      </div>
    );
  }

  if (!track) return null;

  return (
    <div className="flex items-center gap-3 mb-3">
      {track.image && (
        <a
          href={track.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0"
        >
          <img
            src={track.image}
            alt={track.album}
            className="w-10 h-10 rounded object-cover"
          />
        </a>
      )}
      <div className="flex flex-col">
        <a
          href="https://last.fm/user/wildanrfq"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-[#a0aec0] hover:text-[#63b3ed] uppercase tracking-wider no-underline transition-colors duration-200"
        >
          {isPlaying ? (
            <span className="flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[green] animate-pulse" />
              currently listening to:
            </span>
          ) : (
            "last listened to:"
          )}
        </a>

        <span className="font-mono text-sm text-white leading-tight">
          <a
            href={track.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#63b3ed] no-underline transition-colors duration-200"
          >
            {track.name}
          </a>{" "}
          <span className="text-[#a0aec0] cursor-default">by</span>{" "}
          <span className="text-[#90cdf4] cursor-default">{track.artist}</span>
        </span>
      </div>
    </div>
  );
}

function useLastFilm() {
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}last-film.json`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.title) setFilm(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { film, loading };
}

function LastFilmWidget({ visible }) {
  const { film, loading } = useLastFilm();

  if (!visible) return null;

  if (loading) {
    return (
      <div className="flex items-center gap-3 font-mono text-sm text-[#a0aec0] animate-pulse">
        <span>fetching letterboxd...</span>
      </div>
    );
  }

  if (!film) return null;

  return (
    <div className="flex items-center gap-3">
      {film.poster && (
        <a
          href={film.url ?? "https://letterboxd.com/wildanrfq"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0"
        >
          <img
            src={film.poster}
            alt={film.title}
            className="w-10 h-10 rounded object-cover"
          />
        </a>
      )}
      <div className="flex flex-col">
        <a
          href="https://letterboxd.com/wildanrfq"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-[#a0aec0] hover:text-[#63b3ed] uppercase tracking-wider no-underline transition-colors duration-200"
        >
          last watched:
        </a>


        <div className="font-mono text-sm leading-tight text-white flex items-center">
          <a
            href={film.url ?? "https://letterboxd.com/wildanrfq"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#63b3ed] transition-colors duration-200 no-underline"
          >
            {film.title}
          </a>

          {film.rating && (
            <span className="text-[#a0aec0] cursor-default ml-1">
              - {film.rating}/5 ⭐️
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

const projects = [
  {
    id: 1,
    name: "wildanrfq.github.io",
    description:
      "The website you're seeing right now. My personal portfolio website built with React, Vite, and Tailwind CSS. Features a typing animation, live Last.fm now playing widget, and a projects page.",
    repo: "https://github.com/wildanrfq/wildanrfq.github.io",
    lang: "React",
  },
  {
    id: 2,
    name: "spader",
    description:
      'An iOS app for managing lecture schedules, assignments, and academic notes, built with SwiftUI for UPN "Veteran" Yogyakarta students. Features auto-import from SIAKAD format, task management with deadline reminders, a GPA tracker with semester charts, a home screen WidgetKit widget, and bilingual (Indonesian/English) support.',
    repo: "https://github.com/wildanrfq/spader",
    lang: "Swift",
  },
  {
    id: 3,
    name: "filmbro",
    description:
      "A Discord bot about films and movies, written in Rust. Integrates with the TMDB API and supports Letterboxd-related features, letting users look up film info and interact with movie data directly from a Discord server.",
    repo: "https://github.com/wildanrfq/filmbro",
    lang: "Rust",
  },
  {
    id: 4,
    name: "spada-reminder",
    description:
      'A Telegram bot that sends automated attendance reminders for UPN "Veteran" Yogyakarta\'s e-learning platform (SPADA). The bot runs on a weekly schedule, firing daily notifications before each class session with a direct inline button linking to the SPADA attendance page. Each reminder includes the current course name, attendance window, and a heads-up for the next upcoming class. Built with python-telegram-bot and APScheduler, with data persisted in a local SQLite database.',
    repo: "https://github.com/wildanrfq/spada-reminder",
    lang: "Python",
  },
  {
    id: 5,
    name: "jogja-historia",
    description:
      "A web-based heritage tourism platform for exploring historical sites in Yogyakarta. Features an interactive map, event calendar, trip planner, photo galleries, and an admin panel for managing places and events.",
    repo: "https://github.com/wildanrfq/jogja-historia",
    lang: "PHP",
  },
];

function Navbar() {
  const location = useLocation();
  const isProjects = location.pathname === "/projects";

  return (
    <div className="absolute top-0 left-0 right-0 flex justify-between items-start px-5 pt-5 z-10">
      <div className="font-mono text-white text-base">@wildanrfq</div>
      <Link
        to={isProjects ? "/" : "/projects"}
        className="font-mono text-white text-base bg-[#4a5568] hover:bg-[#2d3748] px-5 py-2 rounded transition-colors duration-300 no-underline"
      >
        {isProjects ? "Home" : "Projects"}
      </Link>
    </div>
  );
}

const textLines = [
  'Informatics student at UPN "Veteran" Yogyakarta.',
  "I build things for mobile and web, teach programming practicum",
  "to ~100+ students, and occasionally compete in",
  "competitive programming (achieved 2nd place, not bad 😁).",
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

function HomePage() {
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

      <div className="flex flex-col items-center justify-center flex-grow">
        <p className="font-mono text-4xl mt-48 mb-2">Wildan Rifqi</p>
        <div className="font-mono text-xl text-white relative flex-grow">
          <div className="whitespace-pre-wrap font-mono">
            {showText}
            {!isTypingComplete && (
              <span className="inline-block w-px bg-transparent animate-[blink_1s_step-end_infinite]">
                |
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="relative py-4">
        <NowPlayingWidget visible={isTypingComplete} />
        <LastFilmWidget visible={isTypingComplete} />
      </div>

      <div className="flex">
        <a
          href="https://github.com/wildanrfq"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={github} alt="GitHub" className="w-[50px] m-[10px] invert" />
        </a>
        <a
          href="https://discord.com/users/211756205721255947"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={discord}
            alt="Discord"
            className="w-[50px] m-[10px] invert"
          />
        </a>
        <a
          href="https://instagram.com/wildanrfq"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={instagram}
            alt="Instagram"
            className="w-[50px] m-[10px] invert"
          />
        </a>
      </div>

      <footer className="font-mono text-[15px]">
        <a
          href="https://wildanrfq.github.io"
          className="text-white visited:text-white"
        >
          © 2026 @wildanrfq |{" "}
          <a href="mailto:wildanrfqi@gmail.com">wildanrfqi@gmail.com</a>
        </a>
      </footer>
    </div>
  );
}

function ProjectsPage() {
  return (
    <div className="bg-[#22303c] min-h-screen text-white relative">
      <Navbar />

      <div className="pt-24 pb-10 px-5 flex flex-col items-center">
        <h1 className="font-mono text-4xl mb-10 text-white">Projects</h1>

        <div className="flex flex-col items-center w-full max-w-2xl gap-5">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-[#2d3748] rounded-xl p-6 w-full shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <h2 className="font-mono text-[#63b3ed] text-2xl mt-0 mb-0">
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#63b3ed] hover:text-[#90cdf4] no-underline hover:underline transition-colors duration-200"
                  >
                    {project.name}
                  </a>
                </h2>
                <span className="font-mono text-xs text-[#a0aec0] bg-[#1a202c] px-2 py-1 rounded flex-shrink-0 ml-3 mt-1">
                  {project.lang}
                </span>
              </div>
              <p className="text-[#a0aec0] leading-relaxed m-0">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
