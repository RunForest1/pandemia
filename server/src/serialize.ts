import { TransactionRow, UserRow } from './db.js';

export const serializeUser = (row: UserRow) => ({
    id: row.steam_id,
    nickname: row.nickname,
    avatarUrl: row.avatar_url,
    steamProfileUrl: row.steam_profile_url,
    balance: row.balance_kopecks / 100,
    playedServers: JSON.parse(row.played_servers) as Array<{
        key: number;
        name: string;
        hours: number;
    }>,
});

export const serializeTransaction = (row: TransactionRow) => ({
    id: row.id,
    amount: row.amount_kopecks / 100,
    status: row.status,
    provider: row.provider,
    createdAt: row.created_at,
});
