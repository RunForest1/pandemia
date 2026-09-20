import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { ProfileManage } from '../../molecules/ProfileManage';
import { PurchasesTab } from '../../molecules/PurchasesTab';
import { SupportTickets } from '../../molecules/SupportTickets';
import { SettingsTab } from '../../molecules/SettingsTab';
import { SectionHeading } from '../../atoms/SectionHeading';
import { useTranslation } from '../../../i18n/useTranslation';

const TAB_ICON_CLASS =
    'p-2.5 rounded-xl text-ink-faint hover:text-ink hover:bg-surface-hover duration-200 cursor-pointer';

export const RightSide = () => {
    const { t } = useTranslation();

    return (
        <aside className="container py-8 md:py-12">
            <Tabs className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-6">
                <TabList className="flex flex-row lg:flex-col items-center px-2 py-2 lg:px-3 lg:py-6 gap-2 lg:gap-4 rounded-2xl border border-border bg-surface-2 shrink-0">
                    <Tab
                        className={TAB_ICON_CLASS}
                        selectedClassName="!text-brand-ink bg-brand hover:!text-brand-ink"
                    >
                        <ManageAccountsOutlinedIcon sx={{ fontSize: 24 }} />
                    </Tab>
                    <Tab
                        className={TAB_ICON_CLASS}
                        selectedClassName="!text-brand-ink bg-brand hover:!text-brand-ink"
                    >
                        <ShoppingCartOutlinedIcon sx={{ fontSize: 24 }} />
                    </Tab>
                    <Tab
                        className={TAB_ICON_CLASS}
                        selectedClassName="!text-brand-ink bg-brand hover:!text-brand-ink"
                    >
                        <AssignmentOutlinedIcon sx={{ fontSize: 24 }} />
                    </Tab>
                    <Tab
                        className={TAB_ICON_CLASS}
                        selectedClassName="!text-brand-ink bg-brand hover:!text-brand-ink"
                    >
                        <PendingActionsOutlinedIcon sx={{ fontSize: 24 }} />
                    </Tab>
                    <Tab
                        className={TAB_ICON_CLASS}
                        selectedClassName="!text-brand-ink bg-brand hover:!text-brand-ink"
                    >
                        <SettingsOutlinedIcon sx={{ fontSize: 24 }} />
                    </Tab>
                </TabList>

                <TabPanel selectedClassName="react-tabs__tab-panel--selected w-full min-w-0">
                    <ProfileManage />
                </TabPanel>
                <TabPanel selectedClassName="react-tabs__tab-panel--selected w-full min-w-0">
                    <SectionHeading>{t('orders.heading')}</SectionHeading>
                    <PurchasesTab />
                </TabPanel>
                <TabPanel selectedClassName="react-tabs__tab-panel--selected w-full min-w-0">
                    <SectionHeading>{t('tickets.heading')}</SectionHeading>
                    <SupportTickets />
                </TabPanel>
                <TabPanel selectedClassName="react-tabs__tab-panel--selected w-full min-w-0">
                    <SectionHeading>
                        {t('tickets.pendingHeading')}
                    </SectionHeading>
                    <SupportTickets pendingOnly />
                </TabPanel>
                <TabPanel selectedClassName="react-tabs__tab-panel--selected w-full min-w-0">
                    <SectionHeading>{t('settings.heading')}</SectionHeading>
                    <SettingsTab />
                </TabPanel>
            </Tabs>
        </aside>
    );
};
