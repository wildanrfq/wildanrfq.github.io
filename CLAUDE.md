# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- Install dependencies: `npm install`
- Start development server: `npm run dev` (runs Vite at http://localhost:5173)
- Build for production: `npm run build` (outputs to `dist/` directory)
- Preview production build: `npm run preview` (serves `dist/` locally)
- Deploy to GitHub Pages: `npm run deploy` (requires `gh-pages` setup; see DEPLOY.md for details)
- Run a single test: There are no tests configured in this project.

## Environment Variables

Copy `.env.example` to `.env` and fill in the values before running locally.

- `VITE_LASTFM_API_KEY` / `VITE_LASTFM_USER`: powers the now playing widget on the home page.
- `VITE_CONTACT_FORM_ENDPOINT`: optional Formspree (or similar) endpoint for the contact page. Falls back to a mailto link when empty.
- `VITE_UMAMI_WEBSITE_ID` / `VITE_UMAMI_SCRIPT_URL`: optional, enables lightweight Umami analytics. Analytics is skipped entirely when the website id is empty.

`.env` is gitignored, never commit real keys.

## Code Architecture & Structure

### Overview
React, Vite, and Tailwind CSS single-page application with five routes: home, about, projects, a project detail page, and contact.

### Directory Structure
- `src/App.jsx` - Routing only.
- `src/main.jsx` - Entry point, also kicks off analytics.
- `src/config/site.js` - Site-wide constants: name, email, social links, Last.fm config. Nothing sensitive is hardcoded here, the API key is read from env.
- `src/data/` - Static content as plain data: `projects.js`, `experience.js`, `achievements.js`. Edit these files to update site content without touching components.
- `src/lib/` - Hooks and utilities: `useNowPlaying.js`, `useLastFilm.js`, `analytics.js`.
- `src/components/` - Shared UI: `Navbar`, `Footer`, `SocialLinks`, `NowPlayingWidget`, `LastFilmWidget`, `WidgetSkeleton`, `DownloadCvButton`.
- `src/pages/` - One file per route: `HomePage`, `AboutPage`, `ProjectsPage`, `ProjectDetailPage`, `ContactPage`.

### Routing
- Client-side routing using `react-router-dom`.
- Base URL configured in `vite.config.js` (set to `'/'` for root domain).
- Note for GitHub Pages deployment: See `DEPLOY.md` for 404 handling solution.
- Project detail pages live at `/projects/:slug`, slug comes from `src/data/projects.js`.

### Key Features
- Last.fm now playing widget with skeleton loading state, polls every 30s.
- Automated Letterboxd last watched film widget, populated by `scripts/fetch-last-film.js` via GitHub Actions.
- Typewriter intro animation on the home page.
- About page with experience timeline, skills, achievements, and a CV download button (points to `public/cv.pdf`, add your own file there).
- Contact page with a form (posts to `VITE_CONTACT_FORM_ENDPOINT` if set, otherwise falls back to mailto).
- Project detail pages with stack and feature lists.
- SEO: meta description, Open Graph and Twitter card tags in `index.html`, plus `public/robots.txt` and `public/sitemap.xml`.
- Optional Umami analytics, loaded conditionally from `src/lib/analytics.js`.

### Adding a CV
Drop a `cv.pdf` file into `public/`. The Download CV button on the About page links to `/cv.pdf`.

### Deployment
- Configured for GitHub Pages via `gh-pages` branch (see `DEPLOY.md`).
- Build output goes to `dist/` directory.
- Deployment script: `npm run deploy` (runs `predeploy` build then pushes `dist/` to `gh-pages` branch).

### Dependencies
- Core: react, react-dom, react-router-dom.
- Dev: vite, @vitejs/plugin-react, tailwindcss, autoprefixer, postcss, gh-pages.
