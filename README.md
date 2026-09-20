# Pandemia

Магазин DayZ-серверов «Pandemia»: React + TypeScript + Vite (Tailwind CSS,
MUI). Сейчас сайт — **полностью статическое приложение**: авторизация,
баланс, корзина, заявки в поддержку и т.д. работают на `localStorage` в
браузере, без обращений к серверу.

## Структура

```
src/            — фронтенд (Vite + React + TS) — то, что деплоится
server/         — бэкенд (Express + node:sqlite) — задел на будущее.
```

## Быстрый старт

```bash
npm install
npm run dev
```
**Settings → Pages → Source → GitHub Actions.**

После этого сайт будет доступен на `https://<аккаунт>.github.io/pandemia/`.

Base-путь `/pandemia/` захардкожен в `vite.config.ts` (под текущее имя
репозитория) и включается только при сборке с `GITHUB_PAGES=true` — сам
workflow выставляет эту переменную, локальная разработка (`npm run dev`) её
не видит и продолжает работать в корне.

Проверить итоговую GitHub Pages сборку локально:

```bash
npm run build:pages     # сборка с base=/pandemia/
npm run preview:pages   # http://localhost:4173/pandemia/
```

## Бэкенд на будущее (`server/`)

Если понадобится реальная Steam-авторизация и настоящий баланс на сервере:

```bash
npm run server:install
cp server/.env.example server/.env
# SESSION_SECRET: openssl rand -hex 32
npm run dev:full   # фронтенд (5173) + бэкенд (4000) вместе, с прокси /api и /auth
```

Что уже реализовано в `server/`:

- **Steam OpenID 2.0** (`server/src/auth/steam.ts`) — редирект на
  `steamcommunity.com`, проверка подписи, SteamID64, сессия на httpOnly
  JWT-cookie. Никнейм/аватар — через Steam Web API (нужен бесплатный ключ с
  https://steamcommunity.com/dev/apikey в `STEAM_API_KEY`) либо через
  публичный XML-профиль как резервный путь без ключа.
- **Баланс** (`server/src/routes/balance.ts`) — честная заглушка без
  реального платёжного провайдера (сумма сразу помечается оплаченной,
  интерфейс явно подписывает это как тестовый режим). Чтобы подключить
  настоящий провайдер (ЮKassa/CloudPayments/Robokassa), нужно заменить
  `POST /api/balance/topup` на создание платежа со статусом `pending` и
  подтверждение из вебхука.

## Дизайн

- Тема: светлая/тёмная, переключается кнопкой в шапке, хранится в
  `localStorage`, уважает `prefers-color-scheme` при первом визите.
- Язык: RU/EN, переключается кнопкой в шапке (`src/i18n`).
- Палитра и типографика — `src/App.css` (токены) и `src/theme/palette.ts`
  (зеркало для MUI-компонентов).
