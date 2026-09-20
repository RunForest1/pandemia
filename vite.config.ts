import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const API_TARGET = process.env.API_PROXY_TARGET ?? 'http://localhost:4000';

// Имя репозитория на GitHub — итоговый сайт живёт на
// https://<user>.github.io/pandemia/, поэтому статические ассеты должны
// собираться с этим префиксом. Локально (dev-сервер и `vite preview`)
// база остаётся корневой. GITHUB_PAGES=true выставляется только в
// .github/workflows/deploy-pages.yml перед сборкой.
const GITHUB_PAGES_BASE = '/pandemia/';

// https://vite.dev/config/
export default defineConfig({
    base: process.env.GITHUB_PAGES === 'true' ? GITHUB_PAGES_BASE : '/',
    plugins: [react(), tailwindcss()],
    server: {
        proxy: {
            '/api': API_TARGET,
            '/auth': API_TARGET,
        },
    },
});
