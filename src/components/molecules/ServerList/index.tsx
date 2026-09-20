import { Server } from '../../atoms/Servers';
import { SectionHeading } from '../../atoms/SectionHeading';
import { useTranslation } from '../../../i18n/useTranslation';

export const SERVERS = [
    { key: 1, name: 'Chernarus PLUS 3PP', online: 115, status: true },
    { key: 2, name: 'Livonia PLUS 3PP', online: 150, status: true },
    { key: 3, name: 'Chernarus PLUS 3PP', online: 0, status: false },
    { key: 4, name: 'Chernarus PLUS 3PP', online: 115, status: true },
];

export const ServerList = () => {
    const { t } = useTranslation();

    return (
        <section id="servers" className="container pt-14 sm:pt-20 scroll-mt-20">
            <SectionHeading>{t('servers.heading')}</SectionHeading>
            <div className="flex flex-col items-center sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {SERVERS.map(({ key, name, online, status }) => (
                    <Server
                        key={key}
                        name={name}
                        online={online}
                        status={status}
                    />
                ))}
            </div>
        </section>
    );
};
