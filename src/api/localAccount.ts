import { User } from '../types/user';
import { Transaction } from '../types/balance';

/**
 * ВРЕМЕННО: статический локальный «бэкенд» на localStorage — используется,
 * пока реальный Express-сервер (server/) не запущен постоянно. Данные
 * авторизации и баланса живут только в браузере пользователя и не
 * переживают смену устройства/очистку хранилища.
 *
 * Как вернуться на настоящий бэкенд: в auth/AuthProvider.tsx замените
 * вызовы функций отсюда на fetchCurrentUser/devLogin/logout из api/auth.ts
 * и topUpBalance/fetchBalanceHistory из api/balance.ts (эти файлы никуда
 * не делись и по-прежнему рабочие против server/).
 */

const USER_KEY = 'pandemia.user';
const HISTORY_KEY = 'pandemia.balanceHistory';

const MOCK_USER: User = {
    id: 'demo-000000000000001',
    nickname: 'NickName_01',
    avatarUrl: null,
    balance: 0,
    steamProfileUrl: 'https://steamcommunity.com/id/nickname_01',
    playedServers: [
        { key: 1, name: 'Chernarus PLUS 3PP', hours: 312 },
        { key: 2, name: 'Livonia PLUS 3PP', hours: 222 },
        { key: 3, name: 'Chernarus PLUS 3PP', hours: 111 },
        { key: 4, name: 'Chernarus PLUS 3PP', hours: 543 },
    ],
};

const readJson = <T>(key: string): T | null => {
    try {
        const raw = localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as T) : null;
    } catch {
        return null;
    }
};

const writeJson = (key: string, value: unknown) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        // localStorage недоступен (приватный режим и т.п.) — тихо игнорируем
    }
};

export const readStoredUser = (): User | null => readJson<User>(USER_KEY);

export const localLogin = (): User => {
    const user = { ...MOCK_USER };
    writeJson(USER_KEY, user);
    return user;
};

export const localLogout = () => {
    try {
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(HISTORY_KEY);
    } catch {
        // ignore
    }
};

export const readBalanceHistory = (): Transaction[] =>
    readJson<Transaction[]>(HISTORY_KEY) ?? [];

const MIN_TOPUP_RUB = 50;
const MAX_TOPUP_RUB = 100_000;

export class TopUpError extends Error {
    constructor(
        message: string,
        public code: string,
    ) {
        super(message);
    }
}

export const localTopUp = (
    currentUser: User,
    amountRub: number,
): { user: User; transaction: Transaction } => {
    if (
        !Number.isFinite(amountRub) ||
        amountRub < MIN_TOPUP_RUB ||
        amountRub > MAX_TOPUP_RUB
    ) {
        throw new TopUpError('invalid_amount', 'invalid_amount');
    }

    const transaction: Transaction = {
        id: crypto.randomUUID(),
        amount: amountRub,
        status: 'paid',
        provider: 'stub',
        createdAt: new Date().toISOString(),
    };

    const user: User = {
        ...currentUser,
        balance: Math.round((currentUser.balance + amountRub) * 100) / 100,
    };

    writeJson(USER_KEY, user);
    writeJson(HISTORY_KEY, [transaction, ...readBalanceHistory()].slice(0, 50));

    return { user, transaction };
};

/** Списывает сумму с баланса (используется корзиной при оформлении заказа). */
export const localSpend = (currentUser: User, amountRub: number): User => {
    const user: User = {
        ...currentUser,
        balance: Math.round((currentUser.balance - amountRub) * 100) / 100,
    };
    writeJson(USER_KEY, user);
    return user;
};
