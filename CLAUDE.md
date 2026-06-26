# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- Install dependencies: `npm install`
- Start development server: `npm run dev` (runs Vite at http://localhost:5173)
- Build for production: `npm run build` (outputs to `dist/` directory)
- Preview production build: `npm run preview` (serves `dist/` locally)
- Deploy to GitHub Pages: `npm run deploy` (requires `gh-pages` setup; see DEPLOY.md for details)
- Run a single test: There are no tests configured in this project.

## Code Architecture & Structure

### Overview
This is a single-page application (SPA) built with React, Vite, and TailwindCSS. It serves as a personal portfolio with two main views: Home and Projects.

### Directory Structure
- `src/` - Contains all source code
  - `assets/` - Static images (GitHub, Discord, Instagram icons, hero image, etc.)
  - `index.css` - Global CSS (Tailwind base styles)
  - `main.jsx` - Entry point; renders `<App />` into DOM
  - `App.jsx` - Main application component containing:
    - Routing (via `react-router-dom`) with two routes:
      - `/` → `HomePage`
      - `/projects` → `ProjectsPage`
    - `Navbar` component for navigation between pages
    - `NowPlayingWidget` that fetches recently played track from Last.fm API
    - Hardcoded `projects` array displayed in `ProjectsPage`
  - `HomePage.jsx` (within App.jsx) - Features typewriter animation for bio text, social media links, and Last.fm widget
  - `ProjectsPage.jsx` (within App.jsx) - Lists projects with descriptions, technologies, and links to repositories

### Styling
- Tailwind CSS configured via `tailwind.config.js` and `postcss.config.js`
- Utility-first styling; no custom CSS files beyond base Tailwind
- Responsive design using Tailwind's responsive prefixes (sm, md, lg, etc.)

### Routing
- Client-side routing using `react-router-dom`
- Base URL configured in `vite.config.js` (set to `'/'` for root domain)
- Note for GitHub Pages deployment: See `DEPLOY.md` for 404 handling solution

### Key Features
- **Last.fm Integration**: Uses `useNowPlaying` hook in `App.jsx` to fetch user's currently/scrobbling track from Last.fm API (polling every 30 seconds)
- **Typewriter Effect**: Animated text reveal in `HomePage` using `useEffect` and state updates
- **Project Showcase**: Static array of project objects in `App.jsx` mapped to cards in `ProjectsPage`
- **Social Media Links**: Icons linking to GitHub, Discord, Instagram profiles

### Environment Variables
- None currently; Last.fm API key and username are hardcoded in `App.jsx` (lines 13-15). For security, consider moving to environment variables in future.

### Deployment
- Configured for GitHub Pages via `gh-pages` branch (see `DEPLOY.md`)
- Build output goes to `dist/` directory
- Deployment script: `npm run deploy` (runs `predeploy` build then pushes `dist/` to `gh-pages` branch)
- For manual deployment, see DEPLOY.md instructions

### Dependencies
- Core: react, react-dom, react-router-dom
- Dev: vite, @vitejs/plugin-react, tailwindcss, autoprefixer, postcss, gh-pages (for deployment)

### Getting Started
1. Clone repository
2. Run `npm install`
3. Run `npm run dev` to start development server
4. Make changes to source files in `src/`
5. Use `npm run build` for production build
6. Deploy with `npm run deploy` (after setting up gh-pages)