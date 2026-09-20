# Pandemia

Магазин DayZ-серверов «Pandemia»: React + TypeScript + Vite (Tailwind CSS,
MUI). Сейчас сайт — **полностью статическое приложение**: авторизация,
баланс, корзина, заявки в поддержку и т.д. работают на `localStorage` в
браузере, без обращений к серверу. Это сделано намеренно, чтобы сайт можно
было развернуть на GitHub Pages (чистый статический хостинг без бэкенда).

В репозитории также лежит рабочий Express-бэкенд (`server/`) с настоящей
Steam OpenID-авторизацией и системой баланса — он не удалён и не сломан,
просто пока не подключён к фронтенду. Подробности и как переключиться
обратно на него — в конце файла.

## Структура

```
src/            — фронтенд (Vite + React + TS) — то, что деплоится
server/         — бэкенд (Express + node:sqlite) — задел на будущее, отдельно не деплоится
```

## Быстрый старт

```bash
npm install
npm run dev
```

Откройте http://localhost:5173 — сайт полностью рабочий: вход (мгновенный,
без реального Steam), баланс, магазин, корзина, профиль. Бэкенд запускать
не нужно.

## Деплой на GitHub Pages

Репозиторий уже настроен на автодеплой: `.github/workflows/deploy-pages.yml`
собирает `src/` и публикует `dist/` при каждом пуше в `main`. Единственное,
что нужно сделать один раз в настройках репозитория на GitHub:

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

Поскольку GitHub Pages не умеет отдавать `index.html` на произвольные
маршруты SPA (`/pandemia/profile` и т.п. вернули бы честный 404), в
`public/404.html` лежит редирект-трюк
([rafgraph/spa-github-pages](https://github.com/rafgraph/spa-github-pages)):
404-страница кодирует путь в query-строку и отправляет на `index.html`, а
скрипт в `index.html` декодирует его обратно до того, как React Router
прочитает `location`. Проверено вручную эмуляцией поведения GitHub Pages —
прямые ссылки на `/profile`, `/main` и корень работают.

## Бэкенд на будущее (`server/`)

Если понадобится реальная Steam-авторизация и настоящий баланс на сервере
(например, при переезде с GitHub Pages на хостинг с поддержкой Node.js):

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

Чтобы фронтенд снова начал использовать этот бэкенд вместо localStorage,
нужно вернуть `AuthProvider` (`src/auth/AuthProvider.tsx`) на вызовы
`fetchCurrentUser`/`devLogin` или `STEAM_LOGIN_URL` из `src/api/auth.ts` и
`topUpBalance`/`fetchBalanceHistory` из `src/api/balance.ts` — эти файлы
никуда не делись и по-прежнему рабочие против `server/`.

## Дизайн

- Тема: светлая/тёмная, переключается кнопкой в шапке, хранится в
  `localStorage`, уважает `prefers-color-scheme` при первом визите.
- Язык: RU/EN, переключается кнопкой в шапке (`src/i18n`).
- Палитра и типографика — `src/App.css` (токены) и `src/theme/palette.ts`
  (зеркало для MUI-компонентов).
