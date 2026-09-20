import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { LocaleContext, TranslationKey } from './context';
import { Locale, translations } from './translations';

const STORAGE_KEY = 'pandemia.locale';

const getPreferredLocale = (): Locale => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'ru' || stored === 'en') {
            return stored;
        }
    } catch {
        // ignore
    }
    if (
        typeof navigator !== 'undefined' &&
        navigator.language?.toLowerCase().startsWith('en')
    ) {
        return 'en';
    }
    return 'ru';
};

const resolve = (key: TranslationKey, locale: Locale): string => {
    const path = key.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let node: any = translations[locale];
    for (const segment of path) {
        node = node?.[segment];
    }
    return typeof node === 'string' ? node : key;
};

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
    const [locale, setLocaleState] = useState<Locale>(() =>
        getPreferredLocale(),
    );

    useEffect(() => {
        document.documentElement.setAttribute('lang', locale);
        try {
            localStorage.setItem(STORAGE_KEY, locale);
        } catch {
            // ignore
        }
    }, [locale]);

    const setLocale = useCallback((next: Locale) => setLocaleState(next), []);
    const toggleLocale = useCallback(() => {
        setLocaleState((current) => (current === 'ru' ? 'en' : 'ru'));
    }, []);

    const t = useCallback(
        (key: TranslationKey) => resolve(key, locale),
        [locale],
    );

    const value = useMemo(
        () => ({ locale, setLocale, toggleLocale, t }),
        [locale, setLocale, toggleLocale, t],
    );

    return (
        <LocaleContext.Provider value={value}>
            {children}
        </LocaleContext.Provider>
    );
};
