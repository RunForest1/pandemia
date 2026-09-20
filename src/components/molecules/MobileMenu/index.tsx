import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { OpenMenu } from '../../atoms/Icons/OpenMenu';
import { LINKS } from '../Nav';
import { Link } from '../../atoms/Link';
import { Steam } from '../../atoms/Icons/Steam';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ThemeToggle } from '../../atoms/ThemeToggle';
import { LanguageToggle } from '../../atoms/LanguageToggle';
import { useAuth } from '../../../auth/useAuth';
import { useTranslation } from '../../../i18n/useTranslation';

export const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated, user, loginViaSteam, logout, isLoading } =
        useAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        document.body.classList.toggle('overflow-hidden');
    };

    const closeMenu = () => {
        setIsOpen(false);
        document.body.classList.remove('overflow-hidden');
    };

    const [isPending, setIsPending] = useState(false);

    const handleLogout = async () => {
        await logout();
        closeMenu();
        navigate('/main');
    };

    const handleSteamLogin = async () => {
        setIsPending(true);
        try {
            await loginViaSteam();
            closeMenu();
            navigate('/profile');
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="relative lg:hidden">
            <button
                className="relative z-40 flex items-center justify-center w-10 h-10 rounded-full text-ink hover:bg-surface-hover duration-200"
                onClick={toggleMenu}
                aria-label={isOpen ? t('nav.closeMenu') : t('nav.toggleMenu')}
            >
                {isOpen ? <CloseRoundedIcon /> : <OpenMenu />}
            </button>

            <div
                className={`fixed inset-0 h-dvh w-screen bg-black/50 z-20 transition-opacity duration-300 ${
                    isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onClick={closeMenu}
            ></div>

            <div
                className={`fixed top-0 right-0 h-dvh w-3/4 max-w-md bg-surface-2 border-l border-border z-30 transform transition-transform duration-300 ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <nav className="flex flex-col items-start p-8 pt-20 space-y-4 h-full overflow-y-auto">
                    <div className="flex items-center gap-1 pb-2">
                        <ThemeToggle />
                        <LanguageToggle />
                    </div>

                    <div className="flex flex-col space-y-1 w-full">
                        {LINKS.map(({ text, icon }) => (
                            <Link key={text} icon={icon} text={text} />
                        ))}
                    </div>

                    {isAuthenticated ? (
                        <div className="flex flex-col gap-2 w-full">
                            <RouterLink
                                to="/profile"
                                onClick={closeMenu}
                                className="flex items-center gap-2 rounded-xl border border-border bg-surface-3 py-2 px-4"
                            >
                                {user?.avatarUrl ? (
                                    <img
                                        src={user.avatarUrl}
                                        alt=""
                                        className="w-9 h-9 rounded-full"
                                    />
                                ) : (
                                    <AccountCircleIcon
                                        sx={{
                                            color: 'var(--ink-faint)',
                                            fontSize: 36,
                                        }}
                                    />
                                )}
                                <p className="font-body font-semibold text-ink">
                                    {user?.nickname}
                                </p>
                            </RouterLink>
                            <button
                                type="button"
                                onClick={handleLogout}
                                disabled={isLoading}
                                className="font-body text-sm text-ink-muted py-2 px-4 text-left hover:text-danger duration-200 disabled:opacity-50"
                            >
                                {t('nav.logout')}
                            </button>
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={handleSteamLogin}
                            disabled={isPending}
                            className="flex items-center gap-2 w-full rounded-xl bg-steam duration-300 py-2.5 px-4 disabled:opacity-50"
                        >
                            <Steam className="w-8 h-8" />
                            <p className="font-body font-semibold text-steam-ink">
                                {isPending
                                    ? t('nav.loggingIn')
                                    : t('nav.loginSteam')}
                            </p>
                        </button>
                    )}
                </nav>
            </div>
        </div>
    );
};
