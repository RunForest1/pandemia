import { NextFunction, Request, Response } from 'express';
import { readSession } from '../auth/session.js';
import { getUserBySteamId } from '../db.js';

export interface AuthedRequest extends Request {
    steamId: string;
}

export const requireAuth = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
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
    (req as AuthedRequest).steamId = session.steamId;
    next();
};
