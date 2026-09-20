/**
 * История покупок — как и баланс/авторизация, живёт локально в браузере
 * (см. api/localAccount.ts). Заказ записывается сюда сразу после успешного
 * оформления корзины (CartDrawer).
 */

export interface OrderItem {
    key: number;
    name: string;
    price: number;
    quantity: number;
}

export interface Order {
    id: string;
    items: OrderItem[];
    total: number;
    createdAt: string;
}

const ORDERS_KEY = 'pandemia.orders';

export const readOrders = (): Order[] => {
    try {
        const raw = localStorage.getItem(ORDERS_KEY);
        return raw ? (JSON.parse(raw) as Order[]) : [];
    } catch {
        return [];
    }
};

export const addOrder = (order: Order) => {
    try {
        const orders = [order, ...readOrders()].slice(0, 50);
        localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    } catch {
        // localStorage недоступен — тихо игнорируем
    }
};
