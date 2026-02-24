# SwasthAI — Frontend

A modern React + Vite frontend for SwasthAI: an AI-assisted personal and city health intelligence dashboard.

This README covers prerequisites, installation, development, build and deployment tips, project structure, common troubleshooting steps, and contribution guidance.

---

## Table of contents

- Project overview
- Prerequisites
- Quick start (install & run)
- Available scripts
- Project structure
- Styling & theming
- Troubleshooting
- Contributing
- License

---

## Project overview

SwasthAI is a single-page frontend built with React, TypeScript and Vite. It provides a public landing site and an authenticated app area that includes features such as AI chat, symptom scanning, mental wellbeing tools, and city intelligence dashboards.

Core technologies

- Vite — fast dev server & build tooling
- React + React Router — UI and routing
- TypeScript — static types
- Tailwind CSS — utility-first styling
- Framer Motion — animations
- Radix UI primitives and custom components

---

## Prerequisites

Install the following on your machine before working with the project:

- Node.js (LTS recommended; Node 18/20 tested)
- npm (comes with Node) — or use `pnpm`/`yarn` if you prefer (commands below use `npm`)

Verify installation:

```bash
node -v
npm -v
```

---

## Quick start

1. Clone the repository:

```bash
git clone <repo-url>
cd swasthai
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server (Vite):

```bash
npm run dev
```

4. Open the app in your browser at the address printed by Vite (commonly `http://localhost:5173` or similar).

Notes

- If you use `pnpm` or `yarn`, replace `npm install` and `npm run` with the appropriate commands.
- If you run into dependency resolution issues, remove `node_modules` and lockfile then reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

---

## Available scripts

Scripts are defined in `package.json` and are used during development and release:

- `npm run dev` — start Vite dev server with HMR
- `npm run build` — build the app for production (the project runs `tsc -b && vite build`)
- `npm run preview` — locally preview the production build
- `npm run lint` — run ESLint across the codebase

Use the exact commands from `package.json` to avoid surprises.

---

## Project structure (important files)

- `index.html` — Vite entry file
- `src/main.tsx` — React entry and global providers
- `src/app/App.tsx` — root app wrapper and global layout
- `src/app/routes.tsx` — router and route definitions
- `src/app/pages/` — page-level components (Landing, Login, Signup, app/*)
- `src/app/components/` — shared components and primitives
- `src/styles/` — Tailwind, theme and global CSS
- `vite.config.ts` — Vite configuration
- `package.json` — scripts and dependency definitions

This project organizes UI primitives under `src/app/components/fig/ui/` and app-specific pages under `src/app/pages/app/`.

---

## Styling & theming

- Tailwind CSS is used with a custom theme file in `src/styles/theme.css`.
- Styles are imported via `src/styles/index.css` and mounted in `src/main.tsx`.
- If you change Tailwind config, restart the dev server to pick up PostCSS/Tailwind rebuilds.

---

## Troubleshooting

- Blank page on load:
  - Open the browser console (F12) and check for runtime errors (missing imports, undefined variables).
  - Confirm `#root` exists in `index.html` and `src/main.tsx` mounts React into it.
  - Ensure your CSS imports don't accidentally hide the app (e.g., `height` or `display` rules on the root element).

- Dev server fails to start / dependency errors:
  - Delete `node_modules` + lockfile and reinstall.
  - Ensure Node version is compatible.
  - Run `npm ci` if you want a clean reproducible install using lockfile.

- TypeScript / build errors during `npm run build`:
  - Run `tsc -b` to see TypeScript errors. Fix types or update `tsconfig` as needed.

- CSS/Tailwind not updated after changes:
  - Stop and restart `npm run dev` to ensure Vite picks up Tailwind config changes.

If you hit a problem not covered here, paste logs from the terminal and browser console and I can help debug.

---
