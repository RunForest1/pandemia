import { useState } from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useCart } from '../../../cart/useCart';
import { useTranslation } from '../../../i18n/useTranslation';
import { CartDrawer } from '../../molecules/CartDrawer';

export const CartButton = () => {
    const { totalCount } = useCart();
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label={t('cart.title')}
                className="relative flex items-center justify-center w-10 h-10 rounded-full text-ink-muted hover:text-ink hover:bg-surface-hover duration-200"
            >
                <ShoppingCartOutlinedIcon sx={{ fontSize: 20 }} />
                {totalCount > 0 && (
                    <span className="absolute top-0.5 right-0.5 flex items-center justify-center min-w-4 h-4 px-1 rounded-full bg-accent text-accent-ink text-[10px] font-bold leading-none">
                        {totalCount}
                    </span>
                )}
            </button>
            <CartDrawer open={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
};
