import { User } from '../types/user';
import { Transaction } from '../types/balance';

export class TopUpError extends Error {
    constructor(
        message: string,
        public code: string,
    ) {
        super(message);
    }
}

export const topUpBalance = async (
    amountRub: number,
): Promise<{ user: User; transaction: Transaction }> => {
    const response = await fetch('/api/balance/topup', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amountRub }),
    });

    if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new TopUpError(
            body.error ?? 'topup_failed',
            body.error ?? 'topup_failed',
        );
    }

    return (await response.json()) as { user: User; transaction: Transaction };
};

export const fetchBalanceHistory = async (): Promise<Transaction[]> => {
    const response = await fetch('/api/balance/history', {
        credentials: 'same-origin',
    });
    if (!response.ok) {
        throw new Error(`Не удалось получить историю (${response.status})`);
    }
    const data = (await response.json()) as { transactions: Transaction[] };
    return data.transactions;
};
