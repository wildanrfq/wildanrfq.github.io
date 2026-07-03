export const projects = [
  {
    id: 1,
    slug: "wildanrfq-github-io",
    name: "wildanrfq.github.io",
    description:
      "The website you're seeing right now. My personal portfolio website built with React, Vite, and Tailwind CSS. Features a typing animation, live Last.fm now playing widget, and a projects page.",
    repo: "https://github.com/wildanrfq/wildanrfq.github.io",
    lang: "React",
    stack: ["React", "Vite", "Tailwind CSS"],
    features: [
      "Terminal style typing intro",
      "Live Last.fm now playing widget",
      "Automated Letterboxd last watched film widget",
      "Client side routing with GitHub Pages 404 redirect",
    ],
  },
  {
    id: 2,
    slug: "spader",
    name: "spader",
    description:
      'An iOS app for managing lecture schedules, assignments, and academic notes, built with SwiftUI for UPN "Veteran" Yogyakarta students. Features auto-import from SIAKAD format, task management with deadline reminders, a GPA tracker with semester charts, a home screen WidgetKit widget, and bilingual (Indonesian/English) support.',
    repo: "https://github.com/wildanrfq/spader",
    lang: "Swift",
    stack: ["Swift", "SwiftUI", "WidgetKit"],
    features: [
      "Auto-import schedule from SIAKAD format",
      "Task management with deadline reminders",
      "GPA tracker with semester charts",
      "Home screen WidgetKit widget",
      "Bilingual Indonesian and English support",
    ],
  },
  {
    id: 3,
    slug: "filmbro",
    name: "filmbro",
    description:
      "A Discord bot about films and movies, written in Rust. Integrates with the TMDB API and supports Letterboxd-related features, letting users look up film info and interact with movie data directly from a Discord server.",
    repo: "https://github.com/wildanrfq/filmbro",
    lang: "Rust",
    stack: ["Rust", "TMDB API", "Letterboxd"],
    features: [
      "Film lookup directly from Discord",
      "TMDB API integration",
      "Letterboxd related commands",
    ],
  },
  {
    id: 4,
    slug: "spada-reminder",
    name: "spada-reminder",
    description:
      'A Telegram bot that sends automated attendance reminders for UPN "Veteran" Yogyakarta\'s e-learning platform (SPADA). The bot runs on a weekly schedule, firing daily notifications before each class session with a direct inline button linking to the SPADA attendance page.',
    repo: "https://github.com/wildanrfq/spada-reminder",
    lang: "Python",
    stack: ["Python", "python-telegram-bot", "APScheduler", "SQLite"],
    features: [
      "Weekly scheduled attendance reminders",
      "Inline button linking to SPADA attendance page",
      "Heads up for the next upcoming class",
      "Local SQLite persistence",
    ],
  },
  {
    id: 5,
    slug: "jogja-historia",
    name: "jogja-historia",
    description:
      "A web-based heritage tourism platform for exploring historical sites in Yogyakarta. Features an interactive map, event calendar, trip planner, photo galleries, and an admin panel for managing places and events.",
    repo: "https://github.com/wildanrfq/jogja-historia",
    lang: "PHP",
    stack: ["PHP", "MySQL"],
    features: [
      "Interactive map of historical sites",
      "Event calendar",
      "Trip planner",
      "Photo galleries",
      "Admin panel for places and events",
    ],
  },
];

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}
