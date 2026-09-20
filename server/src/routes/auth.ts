import { Router } from 'express';
import { env } from '../env.js';
import {
    buildSteamLoginUrl,
    fetchSteamProfile,
    verifySteamCallback,
} from '../auth/steam.js';
import { clearSession, issueSession, readSession } from '../auth/session.js';
import {
    getUserBySteamId,
    seedPlayedServersIfEmpty,
    upsertSteamUser,
} from '../db.js';
import { serializeUser } from '../serialize.js';

export const authRouter = Router();

const DEV_STEAM_ID = 'dev-000000000000001';

/**
 * ВРЕМЕННЫЙ обходной вход, пока реальная Steam OpenID-авторизация
 * отключена на фронтенде (см. src/auth/AuthProvider.tsx). Логика
 * /auth/steam и /auth/steam/callback ниже никуда не делась — как только
 * решите вернуть реальный вход, переключите фронтенд обратно на
 * STEAM_LOGIN_URL, и этот маршрут можно будет удалить.
 * Недоступен при NODE_ENV=production.
 */
authRouter.post('/auth/dev-login', (_req, res) => {
    if (env.isProduction) {
        res.status(404).end();
        return;
    }

    const user = upsertSteamUser({
        steamId: DEV_STEAM_ID,
        nickname: 'NickName_01',
        avatarUrl: null,
        steamProfileUrl: 'https://steamcommunity.com/id/nickname_01',
    });
    seedPlayedServersIfEmpty(DEV_STEAM_ID, [
        { key: 1, name: 'Chernarus PLUS 3PP', hours: 312 },
        { key: 2, name: 'Livonia PLUS 3PP', hours: 222 },
        { key: 3, name: 'Chernarus PLUS 3PP', hours: 111 },
        { key: 4, name: 'Chernarus PLUS 3PP', hours: 543 },
    ]);

    issueSession(res, DEV_STEAM_ID);
    res.json(serializeUser(getUserBySteamId(DEV_STEAM_ID) ?? user));
});

authRouter.get('/auth/steam', (_req, res) => {
    const returnTo = `${env.publicBaseUrl}/auth/steam/callback`;
    const realm = env.publicBaseUrl;
    res.redirect(buildSteamLoginUrl(returnTo, realm));
});

authRouter.get('/auth/steam/callback', async (req, res) => {
    try {
        const steamId = await verifySteamCallback(
            req.query as Record<string, string | undefined>,
        );
        if (!steamId) {
            res.redirect(`${env.frontendUrl}/main?steamAuth=failed`);
            return;
        }

        const profile = await fetchSteamProfile(steamId);
        upsertSteamUser({
            steamId,
            nickname: profile.nickname,
            avatarUrl: profile.avatarUrl,
            steamProfileUrl: profile.profileUrl,
        });

        issueSession(res, steamId);
        res.redirect(`${env.frontendUrl}/profile`);
    } catch (error) {
        console.error('[auth] Steam callback failed', error);
        res.redirect(`${env.frontendUrl}/main?steamAuth=error`);
    }
});

authRouter.get('/api/me', (req, res) => {
    const session = readSession(req);
    if (!session) {
        res.status(401).json({ error: 'not_authenticated' });
        return;
    }
    const user = getUserBySteamId(session.steamId);
    if (!user) {
        res.status(401).json({ error: 'not_authenticated' });
        return;
    }
    res.json(serializeUser(user));
});

authRouter.post('/api/logout', (_req, res) => {
    clearSession(res);
    res.status(204).end();
});
