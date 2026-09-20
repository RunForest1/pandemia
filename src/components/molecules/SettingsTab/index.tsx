import { useRef, useState } from 'react';
import { Switch } from '@mui/material';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { useAuth } from '../../../auth/useAuth';
import { useTheme } from '../../../theme/useTheme';
import { useTranslation } from '../../../i18n/useTranslation';

const SETTINGS_KEY = 'pandemia.settings';

interface LocalSettings {
    emailNotifications: boolean;
    soundNotifications: boolean;
}

const DEFAULT_SETTINGS: LocalSettings = {
    emailNotifications: true,
    soundNotifications: false,
};

const readSettings = (): LocalSettings => {
    try {
        const raw = localStorage.getItem(SETTINGS_KEY);
        return raw
            ? { ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as LocalSettings) }
            : DEFAULT_SETTINGS;
    } catch {
        return DEFAULT_SETTINGS;
    }
};

export const SettingsTab = () => {
    const { user } = useAuth();
    const { theme, setTheme } = useTheme();
    const { locale, setLocale, t } = useTranslation();
    const [settings, setSettings] = useState(() => readSettings());
    const [saved, setSaved] = useState(false);
    const savedTimerRef = useRef<number | undefined>(undefined);

    /**
     * Флаг "Сохранено" выставляется только из реального обработчика клика
     * пользователя, а не в useEffect от изменения settings — React 18
     * StrictMode в dev-режиме дважды вызывает эффекты при монтировании,
     * из-за чего "Сохранено" мелькало бы сразу при открытии вкладки.
     */
    const toggle = (key: keyof LocalSettings) => {
        setSettings((current) => {
            const next = { ...current, [key]: !current[key] };
            try {
                localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
            } catch {
                // ignore
            }
            return next;
        });
        setSaved(true);
        window.clearTimeout(savedTimerRef.current);
        savedTimerRef.current = window.setTimeout(() => setSaved(false), 1200);
    };

    return (
        <div className="flex flex-col gap-5">
            <div className="rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg border border-border bg-surface-2 p-5">
                <h3 className="font-display uppercase text-lg text-ink mb-4">
                    {t('settings.account')}
                </h3>
                <div className="flex items-center justify-between">
                    <span className="text-ink-muted">
                        {t('settings.nickname')}
                    </span>
                    <span className="font-semibold text-ink">
                        {user?.nickname}
                    </span>
                </div>
            </div>

            <div className="rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg border border-border bg-surface-2 p-5">
                <h3 className="font-display uppercase text-lg text-ink mb-4">
                    {t('settings.appearance')}
                </h3>
                <div className="flex items-center justify-between mb-4">
                    <span className="text-ink-muted">
                        {t('settings.theme')}
                    </span>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => setTheme('dark')}
                            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm duration-200 ${
                                theme === 'dark'
                                    ? 'border-accent bg-accent text-accent-ink'
                                    : 'border-border text-ink-muted hover:border-border-strong'
                            }`}
                        >
                            <DarkModeOutlinedIcon sx={{ fontSize: 16 }} />
                            {t('settings.themeDark')}
                        </button>
                        <button
                            type="button"
                            onClick={() => setTheme('light')}
                            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm duration-200 ${
                                theme === 'light'
                                    ? 'border-accent bg-accent text-accent-ink'
                                    : 'border-border text-ink-muted hover:border-border-strong'
                            }`}
                        >
                            <LightModeOutlinedIcon sx={{ fontSize: 16 }} />
                            {t('settings.themeLight')}
                        </button>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-ink-muted">
                        {t('settings.language')}
                    </span>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => setLocale('ru')}
                            className={`rounded-full border px-3 py-1.5 text-sm duration-200 ${
                                locale === 'ru'
                                    ? 'border-accent bg-accent text-accent-ink'
                                    : 'border-border text-ink-muted hover:border-border-strong'
                            }`}
                        >
                            RU
                        </button>
                        <button
                            type="button"
                            onClick={() => setLocale('en')}
                            className={`rounded-full border px-3 py-1.5 text-sm duration-200 ${
                                locale === 'en'
                                    ? 'border-accent bg-accent text-accent-ink'
                                    : 'border-border text-ink-muted hover:border-border-strong'
                            }`}
                        >
                            EN
                        </button>
                    </div>
                </div>
            </div>

            <div className="rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg border border-border bg-surface-2 p-5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display uppercase text-lg text-ink">
                        {t('settings.notifications')}
                    </h3>
                    {saved && (
                        <span className="text-xs text-success">
                            {t('settings.saved')}
                        </span>
                    )}
                </div>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-ink-muted text-sm">
                        {t('settings.emailNotifications')}
                    </span>
                    <Switch
                        checked={settings.emailNotifications}
                        onChange={() => toggle('emailNotifications')}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-ink-muted text-sm">
                        {t('settings.soundNotifications')}
                    </span>
                    <Switch
                        checked={settings.soundNotifications}
                        onChange={() => toggle('soundNotifications')}
                    />
                </div>
            </div>
        </div>
    );
};
