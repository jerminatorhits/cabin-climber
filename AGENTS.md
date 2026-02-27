# AGENTS.md

## Cursor Cloud specific instructions

**Cabin Climber** is a client-side React SPA (Vite + React 18) for tracking credit card rewards points toward a Tokyo business class flight. There is no backend server.

### Running the app

- `npm run dev` starts the Vite dev server on `http://localhost:5173` (add `-- --host 0.0.0.0` to expose outside localhost).
- `npm run build` produces a production build in `dist/`.
- `npm run preview` serves the production build locally.

### Key notes

- **No lint or test scripts** are configured in `package.json`. There is no ESLint config or test framework.
- **Firebase is optional.** The app works fully without Firebase env vars — progress is stored in `localStorage`. To enable accounts, copy `.env.example` to `.env` and fill in Firebase credentials.
- **Node 18+** is required (see `.nvmrc`). The environment ships with Node 22 which satisfies this.
- Uses `npm` as the package manager (lockfile: `package-lock.json`).
