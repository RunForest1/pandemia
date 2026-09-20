import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { CartContext, CartItem } from './context';
import { getProductByKey } from '../data/products';

const STORAGE_KEY = 'pandemia.cart';

const readStoredItems = (): CartItem[] => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
        return [];
    }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>(() => readStoredItems());

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } catch {
            // ignore persistence failures
        }
    }, [items]);

    const addItem = useCallback((productKey: number, quantity = 1) => {
        setItems((current) => {
            const existing = current.find((item) => item.key === productKey);
            if (existing) {
                return current.map((item) =>
                    item.key === productKey
                        ? { ...item, quantity: item.quantity + quantity }
                        : item,
                );
            }
            return [...current, { key: productKey, quantity }];
        });
    }, []);

    const removeItem = useCallback((productKey: number) => {
        setItems((current) =>
            current.filter((item) => item.key !== productKey),
        );
    }, []);

    const setQuantity = useCallback((productKey: number, quantity: number) => {
        setItems((current) => {
            if (quantity <= 0) {
                return current.filter((item) => item.key !== productKey);
            }
            return current.map((item) =>
                item.key === productKey ? { ...item, quantity } : item,
            );
        });
    }, []);

    const clear = useCallback(() => setItems([]), []);

    const { totalCount, totalPrice } = useMemo(() => {
        return items.reduce(
            (acc, item) => {
                const product = getProductByKey(item.key);
                if (!product) {
                    return acc;
                }
                return {
                    totalCount: acc.totalCount + item.quantity,
                    totalPrice: acc.totalPrice + product.price * item.quantity,
                };
            },
            { totalCount: 0, totalPrice: 0 },
        );
    }, [items]);

    return (
        <CartContext.Provider
            value={{
                items,
                totalCount,
                totalPrice,
                addItem,
                removeItem,
                setQuantity,
                clear,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
