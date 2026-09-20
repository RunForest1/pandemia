import { useState } from 'react';
import { Modal, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useCart } from '../../../cart/useCart';
import { useAuth } from '../../../auth/useAuth';
import { useTranslation } from '../../../i18n/useTranslation';
import { getProductByKey } from '../../../data/products';
import { addOrder } from '../../../api/localOrders';
import { BalanceTopUp } from '../BalanceTopUp';

interface CartDrawerProps {
    open: boolean;
    onClose: () => void;
}

const currencyFormatter = new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

export const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
    const { items, totalPrice, setQuantity, removeItem, clear } = useCart();
    const { isAuthenticated, user, spendBalance } = useAuth();
    const { t } = useTranslation();

    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>(
        'idle',
    );
    const [error, setError] = useState<string | null>(null);
    const [isTopUpOpen, setIsTopUpOpen] = useState(false);

    const handleClose = () => {
        setStatus('idle');
        setError(null);
        onClose();
    };

    const handleCheckout = async () => {
        if (!isAuthenticated) {
            setError(t('cart.needLogin'));
            return;
        }
        if (!user || user.balance < totalPrice) {
            setError(t('cart.insufficientBalance'));
            return;
        }
        setError(null);
        setStatus('loading');
        try {
            await spendBalance(totalPrice);
            addOrder({
                id: crypto.randomUUID(),
                items: items.flatMap((item) => {
                    const product = getProductByKey(item.key);
                    return product
                        ? [
                              {
                                  key: product.key,
                                  name: product.name,
                                  price: product.price,
                                  quantity: item.quantity,
                              },
                          ]
                        : [];
                }),
                total: totalPrice,
                createdAt: new Date().toISOString(),
            });
            clear();
            setStatus('success');
        } catch {
            setError(t('cart.insufficientBalance'));
            setStatus('idle');
        }
    };

    return (
        <>
            <Modal open={open && !isTopUpOpen} onClose={handleClose}>
                <Box>
                    <div className="absolute top-1/2 left-1/2 w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-tl-4xl rounded-br-4xl rounded-tr-xl rounded-bl-xl border border-border bg-surface-2 p-6 sm:p-8 font-body max-h-[85vh] flex flex-col">
                        <h2 className="flex items-center gap-2 font-display uppercase text-2xl text-ink mb-5">
                            <ShoppingCartOutlinedIcon />
                            {t('cart.title')}
                        </h2>

                        {status === 'success' ? (
                            <div className="text-center py-8">
                                <p className="text-success font-semibold text-lg mb-4">
                                    {t('cart.checkoutSuccess')}
                                </p>
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="rounded-xl bg-brand px-6 py-3 font-body font-semibold text-brand-ink hover:bg-brand-strong duration-200"
                                >
                                    {t('balance.close')}
                                </button>
                            </div>
                        ) : items.length === 0 ? (
                            <div className="text-center py-8 text-ink-faint">
                                <p className="font-semibold text-ink mb-1">
                                    {t('cart.empty')}
                                </p>
                                <p className="text-sm">{t('cart.emptyHint')}</p>
                            </div>
                        ) : (
                            <>
                                <ul className="flex flex-col gap-3 overflow-y-auto pr-1 mb-5">
                                    {items.map((item) => {
                                        const product = getProductByKey(
                                            item.key,
                                        );
                                        if (!product) {
                                            return null;
                                        }
                                        return (
                                            <li
                                                key={item.key}
                                                className="flex items-center gap-3 rounded-xl border border-border bg-surface-3 p-3"
                                            >
                                                <div className="w-14 h-14 rounded-lg overflow-hidden bg-surface shrink-0">
                                                    {product.png}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-display uppercase text-ink truncate">
                                                        {product.name}
                                                    </p>
                                                    <p className="text-sm text-ink-muted">
                                                        {product.price}{' '}
                                                        {t('common.currency')}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setQuantity(
                                                                item.key,
                                                                item.quantity -
                                                                    1,
                                                            )
                                                        }
                                                        aria-label={t(
                                                            'shop.quantity',
                                                        )}
                                                        className="w-7 h-7 flex items-center justify-center rounded-lg border border-border-strong text-ink-muted hover:text-ink duration-200"
                                                    >
                                                        <RemoveIcon
                                                            sx={{
                                                                fontSize: 16,
                                                            }}
                                                        />
                                                    </button>
                                                    <span className="w-6 text-center text-ink">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setQuantity(
                                                                item.key,
                                                                item.quantity +
                                                                    1,
                                                            )
                                                        }
                                                        aria-label={t(
                                                            'shop.quantity',
                                                        )}
                                                        className="w-7 h-7 flex items-center justify-center rounded-lg border border-border-strong text-ink-muted hover:text-ink duration-200"
                                                    >
                                                        <AddIcon
                                                            sx={{
                                                                fontSize: 16,
                                                            }}
                                                        />
                                                    </button>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeItem(item.key)
                                                    }
                                                    aria-label={t(
                                                        'cart.remove',
                                                    )}
                                                    className="text-ink-faint hover:text-danger duration-200"
                                                >
                                                    <DeleteOutlineIcon />
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>

                                <div className="mt-auto pt-4 border-t border-border">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-ink-muted">
                                            {t('cart.total')}
                                        </span>
                                        <span className="font-display text-2xl text-ink">
                                            {currencyFormatter.format(
                                                totalPrice,
                                            )}{' '}
                                            {t('common.currency')}
                                        </span>
                                    </div>

                                    {error && (
                                        <div className="flex items-center justify-between gap-3 mb-3 text-sm text-danger">
                                            <span>{error}</span>
                                            {error ===
                                                t(
                                                    'cart.insufficientBalance',
                                                ) && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setIsTopUpOpen(true)
                                                    }
                                                    className="shrink-0 underline hover:no-underline"
                                                >
                                                    {t('cart.topUpAction')}
                                                </button>
                                            )}
                                        </div>
                                    )}

                                    <button
                                        type="button"
                                        onClick={handleCheckout}
                                        disabled={status === 'loading'}
                                        className="w-full rounded-xl bg-brand px-6 py-3 font-body font-semibold text-brand-ink hover:bg-brand-strong duration-200 disabled:opacity-50"
                                    >
                                        {status === 'loading'
                                            ? t('cart.checkingOut')
                                            : t('cart.checkout')}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </Box>
            </Modal>

            <BalanceTopUp
                open={isTopUpOpen}
                onClose={() => setIsTopUpOpen(false)}
            />
        </>
    );
};
