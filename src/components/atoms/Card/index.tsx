import { Box, Modal } from '@mui/material';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CheckIcon from '@mui/icons-material/Check';
import { useTranslation } from '../../../i18n/useTranslation';
import { useCart } from '../../../cart/useCart';
import { Product } from '../../../data/products';

interface CardProps {
    product: Product;
}

export const Card: React.FC<CardProps> = ({ product }) => {
    const { name, price, png, key } = product;
    const { t } = useTranslation();
    const { addItem } = useCart();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [quantity, setQuantity] = useState(1);
    const [justAdded, setJustAdded] = useState(false);

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = () => {
        addItem(key, quantity);
        setJustAdded(true);
        setTimeout(() => setJustAdded(false), 1500);
    };

    const handleKeyOpen = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleOpen();
        }
    };

    return (
        <>
            {/*
                Modal рендерится ЗДЕСЬ как сосед кликабельной карточки, а не
                внутри неё: даже хотя MUI порталит DOM-узел модалки в
                document.body, React всё равно распространяет синтетические
                события вверх по ДЕРЕВУ КОМПОНЕНТОВ (а не DOM). Если бы Modal
                был вложен в div с onClick=handleOpen, клик по фону модалки
                сначала закрывал бы её (обработчик MUI), а затем тот же клик
                всплывал бы до onClick карточки и мгновенно открывал её снова
                — визуально модалка «не закрывалась» бы по клику на фон.
            */}
            <div
                role="button"
                tabIndex={0}
                onClick={handleOpen}
                onKeyDown={handleKeyOpen}
                className="group w-full flex flex-col font-body bg-surface-2 border border-border rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg p-6 sm:p-8 gap-6 cursor-pointer hover:border-accent/60 hover:-translate-y-0.5 duration-200 focus-visible:outline-2 focus-visible:outline-accent"
            >
                <div className="overflow-hidden rounded-xl bg-surface-3">
                    {png}
                </div>
                <div className="flex flex-col gap-2">
                    <span className="font-display uppercase text-2xl sm:text-3xl text-ink">
                        {name}
                    </span>
                    <p className="text-sm text-ink-muted">
                        {t('shop.description')}
                    </p>
                </div>
                <span className="self-start rounded-full bg-brand px-5 py-2 font-body font-semibold text-brand-ink group-hover:bg-brand-strong duration-200">
                    {price} {t('common.currency')}
                </span>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box>
                    <section className="border-border-strong bg-surface-2 flex flex-col items-center text-center lg:items-stretch lg:text-start lg:flex-row lg:justify-between border p-6 sm:p-8 gap-6 sm:gap-8 rounded-tl-4xl rounded-br-4xl rounded-tr-xl rounded-bl-xl absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[90vw] max-w-md lg:w-1/2 lg:max-w-none xl:w-4/10">
                        <div className="flex flex-col lg:justify-between flex-none w-1/2 gap-4 order-last lg:order-first">
                            <span className="font-display uppercase text-4xl xl:text-6xl text-ink">
                                {name}
                            </span>
                            <p className="text-xl xl:text-2xl text-ink-muted break-words">
                                {t('shop.description')}
                            </p>
                            <div className="flex items-center space-x-2 m-auto lg:m-0">
                                <button
                                    onClick={decrementQuantity}
                                    aria-label={t('shop.quantity')}
                                    className="border border-border-strong w-8 h-8 xl:w-10 xl:h-10 flex items-center justify-center text-ink-muted hover:text-ink duration-200 rounded-xl"
                                >
                                    <RemoveIcon />
                                </button>
                                <span className="border border-border-strong w-8 h-8 xl:w-10 xl:h-10 flex items-center justify-center text-ink rounded-xl text-xl">
                                    {quantity}
                                </span>
                                <button
                                    onClick={incrementQuantity}
                                    aria-label={t('shop.quantity')}
                                    className="border border-border-strong w-8 h-8 xl:w-10 xl:h-10 flex items-center justify-center text-ink-muted hover:text-ink duration-200 rounded-xl"
                                >
                                    <AddIcon />
                                </button>
                            </div>
                            <button
                                type="button"
                                onClick={handleAddToCart}
                                className={`flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-body font-semibold text-lg duration-200 ${
                                    justAdded
                                        ? 'bg-success text-brand-ink'
                                        : 'bg-brand text-brand-ink hover:bg-brand-strong'
                                }`}
                            >
                                {justAdded ? (
                                    <>
                                        <CheckIcon fontSize="small" />
                                        {t('cart.added')}
                                    </>
                                ) : (
                                    <>
                                        <ShoppingCartOutlinedIcon fontSize="small" />
                                        {price * quantity}{' '}
                                        {t('common.currency')}
                                    </>
                                )}
                            </button>
                        </div>
                        <div className="w-1/2 rounded-2xl overflow-hidden bg-surface-3 shrink-0">
                            {png}
                        </div>
                    </section>
                </Box>
            </Modal>
        </>
    );
};
