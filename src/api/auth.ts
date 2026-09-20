import { User } from '../types/user';

/**
 * Относительный путь для реального входа через Steam OpenID (бэкенд сам
 * редиректит на steamcommunity.com). Сейчас не используется —
 * см. devLogin() и комментарий в AuthProvider.tsx.
 */
export const STEAM_LOGIN_URL = '/auth/steam';

/**
 * ВРЕМЕННЫЙ вход в обход настоящего Steam OpenID — сразу создаёт сессию
 * тестового пользователя на бэкенде. См. server/src/routes/auth.ts
 * (/auth/dev-login) и комментарий в AuthProvider.tsx о том, как вернуть
 * реальный вход через Steam.
 */
export const devLogin = async (): Promise<User> => {
    const response = await fetch('/auth/dev-login', {
        method: 'POST',
        credentials: 'same-origin',
    });
    if (!response.ok) {
        throw new Error(`Не удалось войти (${response.status})`);
    }
    return (await response.json()) as User;
};

export const fetchCurrentUser = async (): Promise<User | null> => {
    const response = await fetch('/api/me', { credentials: 'same-origin' });
    if (response.status === 401) {
        return null;
    }
    if (!response.ok) {
        throw new Error(`Не удалось получить профиль (${response.status})`);
    }
    return (await response.json()) as User;
};

export const logout = async (): Promise<void> => {
    await fetch('/api/logout', {
        method: 'POST',
        credentials: 'same-origin',
    });
};
