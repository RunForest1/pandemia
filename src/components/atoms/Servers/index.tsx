import { Online } from '../Icons/Online';
import { useTranslation } from '../../../i18n/useTranslation';

export interface ServerProps {
    name: string;
    online: number;
    status: boolean;
}

export const Server: React.FC<ServerProps> = ({ name, online, status }) => {
    const { t } = useTranslation();

    const stateLabel =
        online < 150
            ? status
                ? t('servers.active')
                : t('servers.offline')
            : t('servers.full');
    const stateColor =
        online < 150
            ? status
                ? 'text-success'
                : 'text-ink-faint'
            : 'text-danger';
    const onlineColor = online < 150 ? 'text-ink-muted' : 'text-danger';

    return (
        <div className="group w-full flex flex-col gap-2 rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg border border-border bg-surface-2 p-6 hover:border-accent/60 hover:-translate-y-0.5 duration-200">
            <span className="font-display uppercase text-lg md:text-xl lg:text-2xl text-ink truncate">
                {name}
            </span>
            <span className="font-body flex flex-wrap items-center gap-1.5 text-sm text-ink-muted">
                {t('servers.state')}:
                <span className={`font-medium ${stateColor}`}>
                    • {stateLabel}
                </span>
            </span>
            <span className="font-body flex items-center gap-2 text-sm text-ink-muted">
                <Online />
                {t('servers.online')}:
                <span className={`font-medium ${onlineColor}`}>
                    {online} / 150
                </span>
            </span>
        </div>
    );
};
