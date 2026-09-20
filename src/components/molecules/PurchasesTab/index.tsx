import { useState } from 'react';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import { readOrders } from '../../../api/localOrders';
import { useTranslation } from '../../../i18n/useTranslation';

const currencyFormatter = new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
});

export const PurchasesTab = () => {
    const { t } = useTranslation();
    const [orders] = useState(() => readOrders());

    if (orders.length === 0) {
        return (
            <div className="flex flex-col items-center gap-2 rounded-tl-4xl rounded-br-4xl rounded-tr-xl rounded-bl-xl border border-dashed border-border p-10 text-center text-ink-faint">
                <ReceiptLongOutlinedIcon sx={{ fontSize: 32 }} />
                <p className="font-semibold text-ink">{t('orders.empty')}</p>
                <p className="text-sm">{t('orders.emptyHint')}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {orders.map((order) => (
                <div
                    key={order.id}
                    className="rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg border border-border bg-surface-2 p-5"
                >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="text-sm text-ink-faint">
                            {dateFormatter.format(new Date(order.createdAt))}
                        </span>
                        <span className="font-display text-xl text-ink">
                            {t('orders.total')}:{' '}
                            {currencyFormatter.format(order.total)} ₽
                        </span>
                    </div>
                    <ul className="flex flex-col gap-1 text-sm text-ink-muted">
                        {order.items.map((item) => (
                            <li
                                key={item.key}
                                className="flex items-center justify-between"
                            >
                                <span>
                                    {item.name} × {item.quantity}
                                </span>
                                <span>
                                    {currencyFormatter.format(
                                        item.price * item.quantity,
                                    )}{' '}
                                    ₽
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};
