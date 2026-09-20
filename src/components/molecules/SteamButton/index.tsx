import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Steam } from '../../atoms/Icons/Steam';
import { useAuth } from '../../../auth/useAuth';
import { useTranslation } from '../../../i18n/useTranslation';

export const SteamButton = () => {
    const { loginViaSteam } = useAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isPending, setIsPending] = useState(false);

    const handleClick = async () => {
        setIsPending(true);
        try {
            await loginViaSteam();
            navigate('/profile');
        } finally {
            setIsPending(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={isPending}
            className="flex items-center gap-2 rounded-xl bg-steam px-5 py-2.5 font-body font-semibold text-steam-ink hover:brightness-110 duration-200 disabled:opacity-50"
        >
            <Steam className="w-5 h-5" />
            <span>{isPending ? t('nav.loggingIn') : t('nav.loginSteam')}</span>
        </button>
    );
};
