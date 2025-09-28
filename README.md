# MoMo Words — React Starter

A minimal React + Vite starter that follows standard conventions and includes:
- React Router
- A sample component (`HelloWorld`)
- Standard folder structure (`src/`, `components/`, `public/`)
- `README.md` with setup
- `package.json` scripts
- `.gitignore`

## Prerequisites
- Node.js 18+ and npm (or pnpm / yarn)

## Quick Start

```bash
# 1) Install dependencies
npm install

# 2) Start dev server
npm run dev
# Vite will open http://localhost:5173
```

## Build for Production

```bash
npm run build
npm run preview  # serve the production build locally
```

## Project Structure

```text
momo-words-react-starter/
├─ public/
│  └─ favicon.svg
├─ src/
│  ├─ components/
│  │  └─ HelloWorld.jsx
│  ├─ pages/
│  │  ├─ Home.jsx
│  │  └─ About.jsx
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ styles.css
├─ index.html
├─ package.json
├─ vite.config.js
├─ .gitignore
└─ README.md
```

## Git Init (optional)

```bash
git init
git add .
git commit -m "chore: initial commit (React + Vite starter)"
```

## Next Steps

- Add routes for **Review**, **Decks**, **Stats**.
- Create a word model (`id`, `term`, `definition`, `lang`, `ease`, `interval`, `dueAt`).
- Implement a spaced repetition scheduler (SM-2 or Leitner).
- Persist state in `localStorage` or a backend (Supabase/Firebase).
