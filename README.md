# Pandemia

A storefront site for the "Pandemia" DayZ servers: a server list, an
in-game item shop with a cart, a player profile (balance, purchase
history, support tickets), and a news feed pulled from VK. Dark/light
theme, RU/EN language switch.

**Stack:** React 18 + TypeScript + Vite, Tailwind CSS 4, MUI.

The site is live on GitHub Pages: **https://runforest1.github.io/pandemia/**

## How the project is organized: frontend and backend

This repository contains two independent parts:

```
src/       — frontend. The only part actually deployed to GitHub Pages.
server/    — backend (Express). Present and fully working in the repo, but
             not deployed anywhere and not used by the live site — a
             foundation for later.
```

### Frontend (`src/`) — what's currently in production

The site is built as a **fully static** app: it makes no requests to any
server. Everything that would normally need a backend is emulated on the
client via `localStorage`:

- **Sign in with Steam** — instead of a real trip to steamcommunity.com, it
  instantly logs in a demo user and takes you to the profile
  (`src/auth/AuthProvider.tsx`, `src/api/localAccount.ts`).
- **Balance and top-ups** — honestly labeled in the UI as test mode; the
  amount is "credited" immediately and stored locally in the browser.
- **Cart, purchase history, support tickets, profile settings** — also
  local (`src/cart/`, `src/api/localOrders.ts`, `src/api/localTickets.ts`).

This is what makes it possible to host the site on GitHub Pages — there's
no server there to compute anything or persist it to a database, so all the
"business logic" is an honest client-side simulation that never misleads
the user (anywhere it matters, the UI explicitly says "test mode").

### Backend (`server/`) — a foundation for later

A separate, fully working Express server that **does not take part** in the
current GitHub Pages deployment (GitHub Pages can't run server code at all
— it only serves static files). It stays in the repo in case the project
ever moves to a host that supports Node.js:

- **Steam OpenID 2.0** (`server/src/auth/steam.ts`) — a real Steam login:
  redirect to `steamcommunity.com`, response signature verification,
  SteamID64, a session on an httpOnly JWT cookie. Nickname and avatar come
  from the Steam Web API (needs a free key from
  https://steamcommunity.com/dev/apikey as `STEAM_API_KEY`) or, as a
  fallback without a key, from the public XML profile.
- **Balance** (`server/src/routes/balance.ts`) — also still a stub without a
  real payment provider (the amount is marked paid immediately), but backed
  by a real server, database (`node:sqlite`), and API. To wire up an actual
  provider (YooKassa/CloudPayments/Robokassa), replace
  `POST /api/balance/topup` so it creates a `pending` payment and confirms
  it from the provider's webhook instead of marking it `paid` right away.

To make the frontend use this backend again instead of localStorage, point
`AuthProvider` (`src/auth/AuthProvider.tsx`) back at
`fetchCurrentUser`/`devLogin`/`STEAM_LOGIN_URL` from `src/api/auth.ts` and
`topUpBalance`/`fetchBalanceHistory` from `src/api/balance.ts` — those files
are still there and still work against `server/`.

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:5173 — the site is fully functional; no need to run
the backend.

If you also want to run the backend (to develop or check the server side):

```bash
npm run server:install
cp server/.env.example server/.env
# generate a session secret:
openssl rand -hex 32
# and put it into server/.env as SESSION_SECRET

npm run dev:full   # frontend (5173) + backend (4000) together, with a proxy for /api and /auth
```

## Deploying to GitHub Pages

### One-time setup

Auto-deploy is already configured via `.github/workflows/deploy-pages.yml`
— it builds `src/` and publishes the result on every push to `main`. For it
to actually take effect, you need to switch the repo's Pages source to
Actions once on GitHub:

1. Open the repository on github.com → the **Settings** tab.
2. In the left sidebar, choose **Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**
   (by default it's set to **Deploy from a branch** — that's exactly what
   caused the `text/html` MIME type error: in that mode GitHub serves the
   repository's files as-is, with no build step, so the browser tries to
   load `src/main.tsx` — an unbuilt TypeScript file — directly as a JS
   module).
4. Nothing else to save — the choice in that dropdown takes effect
   immediately.

### How to confirm it deployed

1. The **Actions** tab in the repo → there should be a yellow/green run of
   `Deploy static site to GitHub Pages` (yellow — still building, green —
   done, red — failed, in which case open the log to see what broke).
2. If there hasn't been a run yet after switching the source to Actions —
   push a new commit, or go to **Actions → Deploy static site to GitHub
   Pages → Run workflow** to trigger it manually.
3. Once it's green, the site is live at
   **https://runforest1.github.io/pandemia/**.

### How it works under the hood

- `vite.config.ts` builds the site with `base: '/pandemia/'` (matching this
  repo's name), but only when the workflow sets `GITHUB_PAGES=true`. Local
  development (`npm run dev`) doesn't see that and keeps working at the
  root.
- GitHub Pages can't serve `index.html` for arbitrary single-page-app
  routes (`/pandemia/profile` and similar would get a genuine 404).
  `public/404.html` catches that request and redirects to `index.html`
  with the original path encoded into the query string; a script in
  `index.html` decodes it back before React Router gets to read
  `location` ([rafgraph/spa-github-pages](https://github.com/rafgraph/spa-github-pages)).

To check the final build locally without waiting on a deploy:

```bash
npm run build:pages     # build with base=/pandemia/
npm run preview:pages   # http://localhost:4173/pandemia/
```

## Design

- Theme: dark/light, toggled from a button in the header, persisted to
  `localStorage`, respects `prefers-color-scheme` on first visit.
- Language: RU/EN, toggled from a button in the header (`src/i18n`).
- Palette and typography — `src/App.css` (tokens) and
  `src/theme/palette.ts` (mirrored for MUI components).
