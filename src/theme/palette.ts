/**
 * Зеркало CSS-токенов из src/App.css — держим значения в одном месте,
 * чтобы MUI-компоненты (Button, Select, Modal и т.д.) совпадали
 * с остальной палитрой на Tailwind-переменных.
 */
export const palette = {
    dark: {
        surface: '#0a0b0d',
        surface2: '#131519',
        surface3: '#1b1e23',
        border: '#262a30',
        ink: '#f4f6f5',
        inkMuted: '#9aa3a0',
        brand: '#b7ff3b',
        brandStrong: '#96e01a',
        brandInk: '#0a0b0d',
        danger: '#ff4b3e',
    },
    light: {
        surface: '#f4f6f2',
        surface2: '#ffffff',
        surface3: '#eaeee6',
        border: '#dde3d6',
        ink: '#14171a',
        inkMuted: '#4b5566',
        brand: '#4c8a1b',
        brandStrong: '#3c6e15',
        brandInk: '#ffffff',
        danger: '#d6362b',
    },
} as const;
