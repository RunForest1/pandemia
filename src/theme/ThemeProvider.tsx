import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Theme, ThemeContext } from './context';

const STORAGE_KEY = 'pandemia.theme';

const getPreferredTheme = (): Theme => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'dark' || stored === 'light') {
            return stored;
        }
    } catch {
        // localStorage unavailable, fall through to media query
    }
    if (
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-color-scheme: light)').matches
    ) {
        return 'light';
    }
    return 'dark';
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setThemeState] = useState<Theme>(() => getPreferredTheme());

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch {
            // ignore persistence failures (private mode, etc.)
        }
    }, [theme]);

    const setTheme = useCallback((next: Theme) => setThemeState(next), []);

    const toggleTheme = useCallback(() => {
        setThemeState((current) => (current === 'dark' ? 'light' : 'dark'));
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
