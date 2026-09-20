import { ReactNode, useCallback, useState } from 'react';
import { User } from '../types/user';
import {
    localLogin,
    localLogout,
    localSpend,
    localTopUp,
    readBalanceHistory,
    readStoredUser,
} from '../api/localAccount';
import { AuthContext } from './context';

/**
 * ВРЕМЕННО: авторизация и баланс работают на статичных локальных данных
 * (localStorage), без похода на бэкенд — см. комментарий в api/localAccount.ts.
 * Реальный Steam OpenID-вход и Express-бэкенд (server/) никуда не делись,
 * просто сейчас не используются отсюда.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => readStoredUser());
    const [balanceHistory, setBalanceHistory] = useState(() =>
        readBalanceHistory(),
    );

    const loginViaSteam = useCallback(async () => {
        setUser(localLogin());
    }, []);

    const logout = useCallback(async () => {
        localLogout();
        setUser(null);
        setBalanceHistory([]);
    }, []);

    const topUpBalance = useCallback(
        async (amountRub: number) => {
            if (!user) {
                return;
            }
            const { user: updatedUser } = localTopUp(user, amountRub);
            setUser(updatedUser);
            setBalanceHistory(readBalanceHistory());
        },
        [user],
    );

    const spendBalance = useCallback(
        async (amountRub: number) => {
            if (!user) {
                return;
            }
            if (user.balance < amountRub) {
                throw new Error('insufficient_balance');
            }
            setUser(localSpend(user, amountRub));
        },
        [user],
    );

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: user !== null,
                isLoading: false,
                balanceHistory,
                loginViaSteam,
                logout,
                topUpBalance,
                spendBalance,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
