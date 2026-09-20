import { useEffect, useState } from 'react';
import { Modal, Box, Button, TextField } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useAuth } from '../../../auth/useAuth';
import { useTranslation } from '../../../i18n/useTranslation';
import { Transaction } from '../../../types/balance';

const PRESET_AMOUNTS = [100, 300, 500, 1000];

interface BalanceTopUpProps {
    open: boolean;
    onClose: () => void;
}

const currencyFormatter = new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

export const BalanceTopUp = ({ open, onClose }: BalanceTopUpProps) => {
    const { topUpBalance, balanceHistory } = useAuth();
    const { t } = useTranslation();

    const [amount, setAmount] = useState('300');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>(
        'idle',
    );
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!open) {
            return;
        }
        setStatus('idle');
        setError(null);
    }, [open]);

    const handleSubmit = async () => {
        const amountNum = Number(amount);
        if (!Number.isFinite(amountNum) || amountNum < 50) {
            setError(t('balance.minAmountError'));
            return;
        }
        setError(null);
        setStatus('loading');
        try {
            await topUpBalance(amountNum);
            setStatus('success');
        } catch {
            setError(t('balance.genericError'));
            setStatus('idle');
        }
    };

    const statusLabel: Record<Transaction['status'], string> = {
        paid: t('balance.statusPaid'),
        pending: t('balance.statusPending'),
        failed: t('balance.statusFailed'),
    };
    const statusColor: Record<Transaction['status'], string> = {
        paid: 'text-success',
        pending: 'text-warning',
        failed: 'text-danger',
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box>
                <div className="absolute top-1/2 left-1/2 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-tl-4xl rounded-br-4xl rounded-tr-xl rounded-bl-xl border border-border bg-surface-2 p-6 sm:p-8 font-body">
                    <h2 className="font-display uppercase text-2xl text-ink mb-1">
                        {t('balance.title')}
                    </h2>
                    <p className="flex items-start gap-2 text-sm text-warning bg-warning-soft rounded-xl px-3 py-2 mb-5">
                        <InfoOutlinedIcon sx={{ fontSize: 18, mt: '2px' }} />
                        {t('balance.subtitle')}
                    </p>

                    {status === 'success' ? (
                        <div className="text-center py-6">
                            <p className="text-success font-semibold text-lg mb-4">
                                {t('balance.statusPaid')} · +
                                {currencyFormatter.format(Number(amount))} ₽
                            </p>
                            <Button variant="contained" onClick={onClose}>
                                {t('balance.close')}
                            </Button>
                        </div>
                    ) : (
                        <>
                            <label className="text-sm text-ink-muted mb-2 block">
                                {t('balance.presetLabel')}
                            </label>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {PRESET_AMOUNTS.map((preset) => (
                                    <button
                                        key={preset}
                                        type="button"
                                        onClick={() =>
                                            setAmount(String(preset))
                                        }
                                        className={`rounded-xl border px-4 py-2 text-sm font-semibold duration-200 ${
                                            amount === String(preset)
                                                ? 'border-brand bg-brand text-brand-ink'
                                                : 'border-border text-ink-muted hover:border-border-strong'
                                        }`}
                                    >
                                        {preset} ₽
                                    </button>
                                ))}
                            </div>

                            <TextField
                                fullWidth
                                type="number"
                                label={t('balance.amountLabel')}
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                error={Boolean(error)}
                                helperText={error ?? ' '}
                                sx={{ mb: 1 }}
                            />

                            <Button
                                fullWidth
                                size="large"
                                variant="contained"
                                disabled={status === 'loading'}
                                onClick={handleSubmit}
                            >
                                {status === 'loading'
                                    ? t('balance.paying')
                                    : t('balance.pay')}
                            </Button>
                        </>
                    )}

                    {balanceHistory.length > 0 && (
                        <div className="mt-6 pt-5 border-t border-border">
                            <h3 className="text-sm font-semibold text-ink-muted mb-3">
                                {t('balance.history')}
                            </h3>
                            <ul className="flex flex-col gap-2 max-h-40 overflow-y-auto">
                                {balanceHistory.map((tx) => (
                                    <li
                                        key={tx.id}
                                        className="flex items-center justify-between text-sm"
                                    >
                                        <span className="text-ink">
                                            +
                                            {currencyFormatter.format(
                                                tx.amount,
                                            )}{' '}
                                            ₽
                                        </span>
                                        <span
                                            className={statusColor[tx.status]}
                                        >
                                            {statusLabel[tx.status]}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </Box>
        </Modal>
    );
};
