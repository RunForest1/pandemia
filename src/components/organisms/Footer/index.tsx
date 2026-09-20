import { Link } from 'react-router-dom';
import { Logo } from '../../atoms/Icons/Logo';
import { LINKS } from '../../molecules/Nav';
import { useTranslation } from '../../../i18n/useTranslation';

export const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="w-full border-t border-border bg-surface-2 py-12 md:py-16 px-6 sm:px-10 lg:px-16 mt-16">
            <div className="container flex flex-col items-center text-center gap-10 lg:flex-row lg:items-start lg:justify-between lg:text-start">
                <Logo />

                <div className="grid gap-3 justify-items-center lg:justify-items-start">
                    <span className="font-display uppercase text-lg text-ink">
                        {t('footer.pages')}
                    </span>
                    <div className="text-ink-muted flex flex-col text-sm gap-2 font-body">
                        <Link
                            to="/main"
                            className="hover:text-ink duration-200"
                        >
                            {t('nav.home')}
                        </Link>
                        <a href="#shop" className="hover:text-ink duration-200">
                            {t('nav.market')}
                        </a>
                        <Link
                            to="/profile"
                            className="hover:text-ink duration-200"
                        >
                            {t('nav.profile')}
                        </Link>
                        <a
                            href="#servers"
                            className="hover:text-ink duration-200"
                        >
                            {t('nav.servers')}
                        </a>
                        <a href="#news" className="hover:text-ink duration-200">
                            {t('news.heading')}
                        </a>
                    </div>
                </div>

                <div className="grid gap-3 justify-items-center lg:justify-items-start">
                    <span className="font-display uppercase text-lg text-ink">
                        {t('footer.socials')}
                    </span>
                    <div className="flex flex-col gap-2 font-body text-sm text-ink-muted">
                        {LINKS.map(({ text, icon }) => (
                            <a
                                key={text}
                                href="#"
                                className="flex items-center gap-2 hover:text-ink duration-200"
                            >
                                {icon}
                                {text}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            <div className="container mt-10 flex flex-col items-center gap-2 border-t border-border pt-6 text-center text-sm text-ink-faint font-body sm:flex-row sm:justify-between">
                <span>© Pandemia {new Date().getFullYear()}</span>
                <span>{t('footer.rights')}</span>
            </div>
        </footer>
    );
};
