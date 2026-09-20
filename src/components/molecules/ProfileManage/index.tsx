import { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import { Button } from '@mui/material';
import { useAuth } from '../../../auth/useAuth';
import { useTranslation } from '../../../i18n/useTranslation';
import { BalanceTopUp } from '../BalanceTopUp';

const currencyFormatter = new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

export const ProfileManage = () => {
    const { user, logout, isLoading } = useAuth();
    const { t } = useTranslation();
    const [isTopUpOpen, setIsTopUpOpen] = useState(false);

    if (!user) {
        return null;
    }

    return (
        <section className="grid grid-cols-1 lg:grid-cols-2 font-body gap-5">
            <div className="bg-surface-2 border border-border p-6 sm:p-10 flex flex-col gap-8 sm:gap-10 rounded-tl-4xl rounded-br-4xl rounded-tr-xl rounded-bl-xl">
                <div className="flex flex-col text-center sm:text-start sm:flex-row items-center gap-4 sm:gap-0">
                    {user.avatarUrl ? (
                        <img
                            src={user.avatarUrl}
                            alt=""
                            className="w-20 h-20 sm:w-25 rounded-full"
                        />
                    ) : (
                        <AccountCircleIcon
                            sx={{ color: 'var(--ink-faint)', fontSize: 100 }}
                        />
                    )}
                    <div className="flex flex-col gap-2 sm:pl-4">
                        <span className="font-display uppercase text-2xl lg:text-3xl text-ink">
                            {user.nickname}
                        </span>
                        <p className="text-ink-faint text-sm">
                            {t('profile.statusPlaceholder')}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-4 items-center sm:items-start">
                    <span className="text-ink-muted text-sm sm:text-base lg:text-xl font-semibold flex items-center gap-1">
                        <MonetizationOnRoundedIcon
                            sx={{ color: 'var(--brand)', fontSize: 32 }}
                        />
                        {t('profile.balance')}
                    </span>
                    <p className="text-ink text-2xl md:text-3xl lg:text-5xl font-bold">
                        {currencyFormatter.format(user.balance)}{' '}
                        {t('common.currency')}
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                        sx={{ fontSize: 18 }}
                        variant="contained"
                        onClick={() => setIsTopUpOpen(true)}
                    >
                        {t('profile.topUp')}
                    </Button>
                    <Button
                        sx={{ fontSize: 18 }}
                        variant="outlined"
                        color="error"
                        disabled={isLoading}
                        onClick={() => logout()}
                    >
                        {t('nav.logout')}
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
                {user.playedServers.length === 0 ? (
                    <div className="sm:col-span-2 flex items-center justify-center rounded-3xl border border-dashed border-border p-8 text-ink-faint text-sm text-center">
                        {t('profile.playedHours')}: —
                    </div>
                ) : (
                    user.playedServers.map(({ key, name, hours }) => (
                        <div
                            key={key}
                            className="bg-surface-2 border border-border p-4 rounded-tl-2xl rounded-br-2xl rounded-tr-md rounded-bl-md flex flex-col gap-4"
                        >
                            <span className="text-ink text-sm sm:text-base lg:text-2xl font-bold">
                                {name}
                            </span>
                            <p className="text-ink-muted text-xs lg:text-base font-medium flex items-center gap-1">
                                {t('profile.playedHours')}:
                                <AccessTimeRoundedIcon
                                    sx={{
                                        color: 'var(--ink-faint)',
                                        fontSize: 20,
                                    }}
                                />
                                {hours} {t('profile.hoursShort')}
                            </p>
                        </div>
                    ))
                )}
            </div>

            <BalanceTopUp
                open={isTopUpOpen}
                onClose={() => setIsTopUpOpen(false)}
            />
        </section>
    );
};
