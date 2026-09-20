import 'dotenv/config';
import crypto from 'node:crypto';

const isProduction = process.env.NODE_ENV === 'production';

let sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
    if (isProduction) {
        throw new Error(
            'SESSION_SECRET обязателен в production — задайте его в .env',
        );
    }
    sessionSecret = crypto.randomBytes(32).toString('hex');
    console.warn(
        '[env] SESSION_SECRET не задан — сгенерирован временный секрет для dev-режима. ' +
            'Сессии не переживут перезапуск сервера. Задайте SESSION_SECRET в .env для стабильных сессий.',
    );
}

export const env = {
    isProduction,
    port: Number(process.env.PORT ?? 4000),
    publicBaseUrl: process.env.PUBLIC_BASE_URL ?? 'http://localhost:4000',
    frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:5173',
    sessionSecret,
    steamApiKey: process.env.STEAM_API_KEY ?? '',
    dbPath:
        process.env.DB_PATH ??
        new URL('../data/pandemia.db', import.meta.url).pathname,
};

if (!env.steamApiKey) {
    console.warn(
        '[env] STEAM_API_KEY не задан — вход через Steam сработает, но никнейм/аватар ' +
            'будут получены из публичного XML-профиля (менее надёжно). Получите ключ на ' +
            'https://steamcommunity.com/dev/apikey и добавьте его в .env, чтобы использовать официальный Steam Web API.',
    );
}
