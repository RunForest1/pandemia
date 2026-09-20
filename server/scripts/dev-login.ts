/**
 * Dev-утилита: создаёт тестового пользователя и печатает готовый
 * Cookie-заголовок сессии — полезно для проверки /api/me и
 * /api/balance/* без реального похода на steamcommunity.com (например,
 * в песочнице без доступа в интернет). Никогда не использовать так в
 * production — реальная сессия выдаётся только через /auth/steam/callback.
 *
 * Запуск: npx tsx scripts/dev-login.ts
 * Использование: curl -b "$(npx tsx scripts/dev-login.ts | tail -1)" http://localhost:4000/api/me
 */
import jwt from 'jsonwebtoken';
import { env } from '../src/env.js';
import { upsertSteamUser } from '../src/db.js';
import { SESSION_COOKIE } from '../src/auth/session.js';

const steamId = '76561198000000042';
upsertSteamUser({
    steamId,
    nickname: 'TestPlayer',
    avatarUrl: null,
    steamProfileUrl: `https://steamcommunity.com/profiles/${steamId}`,
});

const token = jwt.sign({ steamId }, env.sessionSecret, { expiresIn: '1h' });
console.log(`${SESSION_COOKIE}=${token}`);
