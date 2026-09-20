/**
 * Заявки в техподдержку — локальное хранилище, как и всё остальное в этой
 * сессии (см. api/localAccount.ts). При первом обращении подставляются
 * два демонстрационных примера, дальше список пополняется реальными
 * обращениями пользователя из формы на вкладке «Заявки».
 */

export type TicketStatus = 'open' | 'resolved';

export interface Ticket {
    id: string;
    subject: string;
    message: string;
    status: TicketStatus;
    reply?: string;
    createdAt: string;
}

const TICKETS_KEY = 'pandemia.tickets';

const SEED_TICKETS: Ticket[] = [
    {
        id: 'seed-1',
        subject: 'Пропал предмет после рестарта сервера',
        message:
            'После планового рестарта Chernarus PLUS 3PP пропал рюкзак с лутом рядом с Северным аэродромом.',
        status: 'resolved',
        reply: 'Нашли ваш предмет в бэкапе перед рестартом, вернули на баланс инвентаря. Приносим извинения за неудобства.',
        createdAt: '2026-09-10T12:00:00.000Z',
    },
    {
        id: 'seed-2',
        subject: 'Вопрос по донат-привилегиям',
        message:
            'Подскажите, привилегии из магазина действуют на всех серверах или только на том, где куплены?',
        status: 'open',
        createdAt: '2026-09-16T09:30:00.000Z',
    },
];

export const readTickets = (): Ticket[] => {
    try {
        const raw = localStorage.getItem(TICKETS_KEY);
        if (raw) {
            return JSON.parse(raw) as Ticket[];
        }
        localStorage.setItem(TICKETS_KEY, JSON.stringify(SEED_TICKETS));
        return SEED_TICKETS;
    } catch {
        return SEED_TICKETS;
    }
};

export const addTicket = (subject: string, message: string): Ticket => {
    const ticket: Ticket = {
        id: crypto.randomUUID(),
        subject,
        message,
        status: 'open',
        createdAt: new Date().toISOString(),
    };
    try {
        const tickets = [ticket, ...readTickets()];
        localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
    } catch {
        // ignore
    }
    return ticket;
};
