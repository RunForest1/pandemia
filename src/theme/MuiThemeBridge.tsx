import { ReactNode, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';
import { useTheme } from './useTheme';
import { palette } from './palette';

export const MuiThemeBridge = ({ children }: { children: ReactNode }) => {
    const { theme } = useTheme();
    const tokens = palette[theme];

    const muiTheme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: theme,
                    primary: {
                        main: tokens.brand,
                        contrastText: tokens.brandInk,
                    },
                    error: { main: tokens.danger },
                    background: {
                        default: tokens.surface,
                        paper: tokens.surface2,
                    },
                    text: {
                        primary: tokens.ink,
                        secondary: tokens.inkMuted,
                    },
                },
                shape: { borderRadius: 12 },
                typography: {
                    fontFamily: 'Inter, sans-serif',
                    button: { textTransform: 'none', fontWeight: 600 },
                },
                components: {
                    MuiButton: {
                        styleOverrides: {
                            containedPrimary: {
                                '&:hover': {
                                    backgroundColor: tokens.brandStrong,
                                },
                            },
                        },
                    },
                },
            }),
        [theme, tokens],
    );

    return <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>;
};
