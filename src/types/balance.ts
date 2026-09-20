export type TransactionStatus = 'paid' | 'pending' | 'failed';

export interface Transaction {
    id: string;
    amount: number;
    status: TransactionStatus;
    provider: string;
    createdAt: string;
}
