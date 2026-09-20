import express from 'express';
import cookieParser from 'cookie-parser';
import { env } from './env.js';
import { authRouter } from './routes/auth.js';
import { balanceRouter } from './routes/balance.js';
import './db.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use(authRouter);
app.use(balanceRouter);

app.listen(env.port, () => {
    console.log(
        `[server] Pandemia API listening on http://localhost:${env.port} (public: ${env.publicBaseUrl})`,
    );
});
