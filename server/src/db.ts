import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { env } from './env.js';

fs.mkdirSync(path.dirname(env.dbPath), { recursive: true });

export const db = new DatabaseSync(env.dbPath);
db.exec('PRAGMA journal_mode = WAL;');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    steam_id TEXT PRIMARY KEY,
    nickname TEXT NOT NULL,
    avatar_url TEXT,
    steam_profile_url TEXT NOT NULL,
    balance_kopecks INTEGER NOT NULL DEFAULT 0,
    played_servers TEXT NOT NULL DEFAULT '[]',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS transactions (
    id TEXT PRIMARY KEY,
    user_steam_id TEXT NOT NULL REFERENCES users(steam_id),
    amount_kopecks INTEGER NOT NULL,
    status TEXT NOT NULL,
    provider TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

export interface UserRow {
    steam_id: string;
    nickname: string;
    avatar_url: string | null;
    steam_profile_url: string;
    balance_kopecks: number;
    played_servers: string;
    created_at: string;
    updated_at: string;
}

export interface TransactionRow {
    id: string;
    user_steam_id: string;
    amount_kopecks: number;
    status: string;
    provider: string;
    created_at: string;
}

const getUserStmt = db.prepare('SELECT * FROM users WHERE steam_id = ?');
const insertUserStmt = db.prepare(
    `INSERT INTO users (steam_id, nickname, avatar_url, steam_profile_url, balance_kopecks, played_servers)
     VALUES (?, ?, ?, ?, 0, '[]')`,
);
const updateUserStmt = db.prepare(
    `UPDATE users SET nickname = ?, avatar_url = ?, steam_profile_url = ?, updated_at = datetime('now')
     WHERE steam_id = ?`,
);
const addBalanceStmt = db.prepare(
    `UPDATE users SET balance_kopecks = balance_kopecks + ?, updated_at = datetime('now') WHERE steam_id = ?`,
);
const insertTransactionStmt = db.prepare(
    `INSERT INTO transactions (id, user_steam_id, amount_kopecks, status, provider) VALUES (?, ?, ?, ?, ?)`,
);
const getTransactionStmt = db.prepare(
    'SELECT * FROM transactions WHERE id = ?',
);
const listTransactionsStmt = db.prepare(
    `SELECT * FROM transactions WHERE user_steam_id = ? ORDER BY created_at DESC LIMIT ?`,
);

export const getUserBySteamId = (steamId: string): UserRow | undefined =>
    getUserStmt.get(steamId) as UserRow | undefined;

export const upsertSteamUser = (input: {
    steamId: string;
    nickname: string;
    avatarUrl: string | null;
    steamProfileUrl: string;
}): UserRow => {
    const existing = getUserBySteamId(input.steamId);

    if (existing) {
        updateUserStmt.run(
            input.nickname,
            input.avatarUrl,
            input.steamProfileUrl,
            input.steamId,
        );
    } else {
        insertUserStmt.run(
            input.steamId,
            input.nickname,
            input.avatarUrl,
            input.steamProfileUrl,
        );
    }

    return getUserBySteamId(input.steamId)!;
};

const setPlayedServersStmt = db.prepare(
    `UPDATE users SET played_servers = ?, updated_at = datetime('now') WHERE steam_id = ? AND played_servers = '[]'`,
);

/** Заполняет демо-данные «сыгранных серверов» только для только что созданного пользователя. */
export const seedPlayedServersIfEmpty = (
    steamId: string,
    servers: Array<{ key: number; name: string; hours: number }>,
) => {
    setPlayedServersStmt.run(JSON.stringify(servers), steamId);
};

export const addBalance = (steamId: string, amountKopecks: number): UserRow => {
    addBalanceStmt.run(amountKopecks, steamId);
    return getUserBySteamId(steamId)!;
};

export const insertTransaction = (input: {
    id: string;
    userSteamId: string;
    amountKopecks: number;
    status: string;
    provider: string;
}): TransactionRow => {
    insertTransactionStmt.run(
        input.id,
        input.userSteamId,
        input.amountKopecks,
        input.status,
        input.provider,
    );
    return getTransactionStmt.get(input.id) as TransactionRow;
};

export const listTransactions = (
    steamId: string,
    limit = 50,
): TransactionRow[] =>
    listTransactionsStmt.all(steamId, limit) as TransactionRow[];
