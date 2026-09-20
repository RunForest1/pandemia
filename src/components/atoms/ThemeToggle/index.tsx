import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { useTheme } from '../../../theme/useTheme';
import { useTranslation } from '../../../i18n/useTranslation';

export const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const { t } = useTranslation();

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={t('nav.switchTheme')}
            className="flex items-center justify-center w-10 h-10 rounded-full text-ink-muted hover:text-ink hover:bg-surface-hover duration-200"
        >
            {theme === 'dark' ? (
                <LightModeOutlinedIcon sx={{ fontSize: 20 }} />
            ) : (
                <DarkModeOutlinedIcon sx={{ fontSize: 20 }} />
            )}
        </button>
    );
};
