import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import HourglassEmptyRoundedIcon from '@mui/icons-material/HourglassEmptyRounded';
import { Ticket, addTicket, readTickets } from '../../../api/localTickets';
import { useTranslation } from '../../../i18n/useTranslation';

const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
});

interface SupportTicketsProps {
    /** Только заявки, ожидающие ответа, без формы создания новой */
    pendingOnly?: boolean;
}

const TicketCard = ({ ticket }: { ticket: Ticket }) => {
    const { t } = useTranslation();
    const isResolved = ticket.status === 'resolved';

    return (
        <div className="rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg border border-border bg-surface-2 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="font-display uppercase text-lg text-ink">
                    {ticket.subject}
                </span>
                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        isResolved
                            ? 'bg-success/15 text-success'
                            : 'bg-warning-soft text-warning'
                    }`}
                >
                    {isResolved
                        ? t('tickets.statusResolved')
                        : t('tickets.statusOpen')}
                </span>
            </div>
            <p className="text-sm text-ink-muted mb-2">{ticket.message}</p>
            <p className="text-xs text-ink-faint mb-3">
                {dateFormatter.format(new Date(ticket.createdAt))}
            </p>
            {ticket.reply && (
                <div className="rounded-xl border border-border bg-surface-3 p-3">
                    <p className="text-xs font-semibold text-ink-muted mb-1">
                        {t('tickets.reply')}
                    </p>
                    <p className="text-sm text-ink">{ticket.reply}</p>
                </div>
            )}
        </div>
    );
};

export const SupportTickets = ({
    pendingOnly = false,
}: SupportTicketsProps) => {
    const { t } = useTranslation();
    const [tickets, setTickets] = useState(() => readTickets());
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState<string | null>(null);

    const visibleTickets = pendingOnly
        ? tickets.filter((ticket) => ticket.status === 'open')
        : tickets;

    const handleSubmit = () => {
        if (!subject.trim()) {
            setError(t('tickets.subjectRequired'));
            return;
        }
        if (!message.trim()) {
            setError(t('tickets.messageRequired'));
            return;
        }
        setError(null);
        addTicket(subject.trim(), message.trim());
        setTickets(readTickets());
        setSubject('');
        setMessage('');
    };

    const emptyText = pendingOnly
        ? t('tickets.pendingEmpty')
        : t('tickets.empty');
    const EmptyIcon = pendingOnly
        ? HourglassEmptyRoundedIcon
        : SupportAgentOutlinedIcon;

    return (
        <div className="flex flex-col gap-6">
            {!pendingOnly && (
                <div className="rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg border border-border bg-surface-2 p-5">
                    <h3 className="font-display uppercase text-lg text-ink mb-3">
                        {t('tickets.newTicket')}
                    </h3>
                    <div className="flex flex-col gap-3">
                        <TextField
                            label={t('tickets.subject')}
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            size="small"
                        />
                        <TextField
                            label={t('tickets.message')}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            multiline
                            minRows={3}
                        />
                        {error && (
                            <p className="text-sm text-danger">{error}</p>
                        )}
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{ alignSelf: 'flex-start' }}
                        >
                            {t('tickets.submit')}
                        </Button>
                    </div>
                </div>
            )}

            {visibleTickets.length === 0 ? (
                <div className="flex flex-col items-center gap-2 rounded-tl-4xl rounded-br-4xl rounded-tr-xl rounded-bl-xl border border-dashed border-border p-10 text-center text-ink-faint">
                    <EmptyIcon sx={{ fontSize: 32 }} />
                    <p>{emptyText}</p>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {visibleTickets.map((ticket) => (
                        <TicketCard key={ticket.id} ticket={ticket} />
                    ))}
                </div>
            )}
        </div>
    );
};
