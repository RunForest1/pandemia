import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { env } from '../env.js';

export const SESSION_COOKIE = 'pandemia_session';
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 дней

interface SessionPayload {
    steamId: string;
}

export const issueSession = (res: Response, steamId: string) => {
    const token = jwt.sign(
        { steamId } satisfies SessionPayload,
        env.sessionSecret,
        {
            expiresIn: SESSION_TTL_SECONDS,
        },
    );

    res.cookie(SESSION_COOKIE, token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: env.isProduction,
        maxAge: SESSION_TTL_SECONDS * 1000,
        path: '/',
    });
};

export const clearSession = (res: Response) => {
    res.clearCookie(SESSION_COOKIE, { path: '/' });
};

export const readSession = (req: Request): SessionPayload | null => {
    const token = req.cookies?.[SESSION_COOKIE];
    if (!token) {
        return null;
    }
    try {
        return jwt.verify(token, env.sessionSecret) as SessionPayload;
    } catch {
        return null;
    }
};
