import { randomUUID } from 'node:crypto';
import { Router } from 'express';
import { requireAuth, AuthedRequest } from '../middleware/requireAuth.js';
import {
    addBalance,
    getUserBySteamId,
    insertTransaction,
    listTransactions,
} from '../db.js';
import { serializeTransaction, serializeUser } from '../serialize.js';

export const balanceRouter = Router();

const MIN_TOPUP_RUB = 50;
const MAX_TOPUP_RUB = 100_000;

/**
 * Пополнение баланса без реального платёжного провайдера: сумма сразу
 * помечается оплаченной ("тестовый режим"). Когда появится провайдер
 * (ЮKassa/CloudPayments/Robokassa), здесь нужно создавать транзакцию со
 * статусом pending и подтверждать её из вебхука провайдера, а не сразу.
 */
balanceRouter.post('/api/balance/topup', requireAuth, (req, res) => {
    const steamId = (req as AuthedRequest).steamId;
    const amountRub = Number(req.body?.amountRub);

    if (
        !Number.isFinite(amountRub) ||
        amountRub < MIN_TOPUP_RUB ||
        amountRub > MAX_TOPUP_RUB
    ) {
        res.status(400).json({
            error: 'invalid_amount',
            min: MIN_TOPUP_RUB,
            max: MAX_TOPUP_RUB,
        });
        return;
    }

    const amountKopecks = Math.round(amountRub * 100);
    const transaction = insertTransaction({
        id: randomUUID(),
        userSteamId: steamId,
        amountKopecks,
        status: 'paid',
        provider: 'stub',
    });
    const user = addBalance(steamId, amountKopecks);

    res.json({
        user: serializeUser(user),
        transaction: serializeTransaction(transaction),
    });
});

balanceRouter.get('/api/balance/history', requireAuth, (req, res) => {
    const steamId = (req as AuthedRequest).steamId;
    const transactions = listTransactions(steamId).map(serializeTransaction);
    res.json({ transactions });
});

balanceRouter.get('/api/balance/me', requireAuth, (req, res) => {
    const steamId = (req as AuthedRequest).steamId;
    const user = getUserBySteamId(steamId)!;
    res.json(serializeUser(user));
});
