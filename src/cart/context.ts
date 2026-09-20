import { createContext } from 'react';

export interface CartItem {
    key: number;
    quantity: number;
}

export interface CartContextValue {
    items: CartItem[];
    totalCount: number;
    totalPrice: number;
    addItem: (productKey: number, quantity?: number) => void;
    removeItem: (productKey: number) => void;
    setQuantity: (productKey: number, quantity: number) => void;
    clear: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);
