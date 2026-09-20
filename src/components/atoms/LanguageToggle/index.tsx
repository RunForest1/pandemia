import { useTranslation } from '../../../i18n/useTranslation';

export const LanguageToggle = () => {
    const { locale, toggleLocale, t } = useTranslation();

    return (
        <button
            type="button"
            onClick={toggleLocale}
            aria-label={t('nav.switchLanguage')}
            className="flex items-center justify-center w-10 h-10 rounded-full text-xs font-bold font-body tracking-wide text-ink-muted hover:text-ink hover:bg-surface-hover duration-200 uppercase"
        >
            {locale === 'ru' ? 'EN' : 'RU'}
        </button>
    );
};
