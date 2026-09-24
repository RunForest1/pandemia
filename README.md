# Pandemia

*[Читать на русском](./README.ru.md)*

A storefront for the "Pandemia" DayZ servers: a server list, an in-game item shop
with a cart, a player profile (balance, purchase history, support tickets) and a
news block with the community's latest posts. Dark/light theme, RU/EN language
switch.

I built it as a portfolio project to show that I can take a real storefront from
idea to a deployed site: full UX, a consistent UI, automated deployment, and a
codebase that's ready to grow a backend without rewriting the interface.

Live: <https://runforest1.github.io/pandemia/>

## Why I built it

I wanted a storefront with complete user flows — sign-in, balance, cart, server
list, support — not a throwaway mockup. Two constraints shaped the design:

1. **It has to work on free static hosting.** GitHub Pages can't run server code, so
   the live site makes no requests to any server.
2. **It must not be a dead end.** The UI is decoupled from the data source, so
   connecting a real backend later means swapping the data layer, not rewriting the
   interface.

## Tech stack

| Layer | Choice |
|---|---|
| Build | Vite |
| Language | TypeScript |
| UI | React 18, React Router, MUI |
| Styles | Tailwind CSS 4 |
| Backend (not deployed) | Express, SQLite (`node:sqlite`), JWT |
| Hosting | GitHub Pages via GitHub Actions |

## How the project is organized: frontend and backend

The repository has two independent parts:

```
src/       — frontend. The only part actually deployed to GitHub Pages.
server/    — backend (Express). Fully working in the repo, but not deployed
             and not used by the live site — a foundation for later.
```

### Frontend (`src/`) — what's in production

The site is **fully static**. Everything that would normally need a backend is
emulated on the client via `localStorage`:

- **Sign in with Steam** — instead of a real trip to steamcommunity.com, it logs in
  a demo user and opens the profile (`src/auth/AuthProvider.tsx`,
  `src/api/localAccount.ts`).
- **Balance and top-ups** — labeled as test mode in the UI; the amount is credited
  immediately and stored locally in the browser.
- **Cart, purchase history, support tickets, profile settings** — also local
  (`src/cart/`, `src/api/localOrders.ts`, `src/api/localTickets.ts`).
- **News** — the latest posts of the project's VK community, copied into
  `src/data/news.ts` by hand (there's no live feed).
- **Server list** — status and player counts are set by hand for now, not read from
  the servers.

There's no server on GitHub Pages to compute anything or keep it in a database, so
all the "business logic" is an honest client-side simulation, and anywhere it
matters the UI says it's test mode.

### Backend (`server/`) — a foundation for later

A separate, working Express server that takes no part in the GitHub Pages
deployment. I keep it in the repo for the day the project moves to a host that runs
Node.js:

- **Steam OpenID 2.0** (`server/src/auth/steam.ts`) — a real Steam login: redirect
  to `steamcommunity.com`, response signature verification, SteamID64, a session on
  an httpOnly JWT cookie. Nickname and avatar come from the Steam Web API (a free
  key from <https://steamcommunity.com/dev/apikey> as `STEAM_API_KEY`) or, without a
  key, from the public XML profile as a fallback.
- **Balance** (`server/src/routes/balance.ts`) — still a stub without a payment
  provider (the amount is marked paid immediately), but backed by a real server, a
  database and an API. To wire up a provider (YooKassa/CloudPayments/Robokassa),
  `POST /api/balance/topup` should create a `pending` payment and confirm it from
  the provider's webhook instead of marking it `paid` right away.

To make the frontend use this backend instead of `localStorage`, point
`AuthProvider` (`src/auth/AuthProvider.tsx`) back at
`fetchCurrentUser`/`devLogin`/`STEAM_LOGIN_URL` from `src/api/auth.ts` and
`topUpBalance`/`fetchBalanceHistory` from `src/api/balance.ts` — those files are
still there and still work against `server/`.

## Running locally

```bash
npm install
npm run dev
```

Open <http://localhost:5173> — the site is fully functional, the backend isn't
needed.

To run the backend as well (to work on or check the server side):

```bash
npm run server:install
cp server/.env.example server/.env
# generate a session secret:
openssl rand -hex 32
# and put it into server/.env as SESSION_SECRET

npm run dev:full   # frontend (5173) + backend (4000), with a proxy for /api and /auth
```

The backend needs Node.js ≥ 22.5 (it uses the built-in `node:sqlite`).

Other scripts:

```bash
npm run build          # production build, base "/"
npm run build:pages    # production build, base "/pandemia/" — for GitHub Pages
npm run preview        # preview the "/" build
npm run preview:pages  # preview the Pages build at http://localhost:4173/pandemia/
npm run lint           # eslint
```

## Project structure

```
src/
  components/             # atomic design: atoms / molecules / organisms / templates
  auth/                   # AuthProvider, RequireAuth, useAuth
  cart/                   # CartProvider, useCart
  api/                    # localStorage emulation + client for the real backend
  i18n/                   # RU/EN dictionary, LocaleProvider, useTranslation
  theme/                  # ThemeProvider, palette shared with MUI
  data/                   # news, products
  types/
server/                   # Express backend (not deployed)
public/                   # 404.html for the SPA fallback on GitHub Pages
```

## Design

- **Theme:** dark/light, toggled from the header, persisted to `localStorage`,
  respects `prefers-color-scheme` on the first visit.
- **Language:** RU/EN, toggled from the header (`src/i18n`).
- **Palette and typography:** tokens in `src/App.css`, mirrored for MUI components in
  `src/theme/palette.ts`.

## Deploying to GitHub Pages

Auto-deploy is configured in `.github/workflows/deploy-pages.yml`: every push to
`main` builds `src/` and publishes the result. The one manual step is switching the
Pages source once: **Settings → Pages → Build and deployment → Source → GitHub
Actions**. In the default "Deploy from a branch" mode GitHub serves the repo files
as-is with no build, and the browser tries to load the unbuilt `src/main.tsx` — that
is what produces the `text/html` MIME type error.

To confirm it deployed, open the **Actions** tab: a green run of
`Deploy static site to GitHub Pages` means the site is live. If there's no run yet
after switching the source, push a commit or start the workflow manually via
**Run workflow**.

How it works under the hood:

- `vite.config.ts` builds with `base: '/pandemia/'` (the repo name) only when the
  workflow sets `GITHUB_PAGES=true`; local development keeps working at the root.
- GitHub Pages can't serve `index.html` for arbitrary SPA routes
  (`/pandemia/profile` would get a real 404). `public/404.html` catches that request
  and redirects to `index.html` with the original path encoded in the query string;
  a script in `index.html` decodes it back before React Router reads `location`
  ([rafgraph/spa-github-pages](https://github.com/rafgraph/spa-github-pages)).

## What's next

Real-time server monitoring is the next step: the status and player counts in the
server list are set by hand right now, and it makes sense to wire them up once there
is a backend to hook them to. After that — a real payment provider on the
`server/` side and switching the frontend to it.
