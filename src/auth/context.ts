import { createContext } from 'react';
import { User } from '../types/user';
import { Transaction } from '../types/balance';

export interface AuthContextValue {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    balanceHistory: Transaction[];
    loginViaSteam: () => Promise<void>;
    logout: () => Promise<void>;
    topUpBalance: (amountRub: number) => Promise<void>;
    /** Списывает сумму с баланса (для оформления заказа из корзины). Бросает исключение, если средств не хватает. */
    spendBalance: (amountRub: number) => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
