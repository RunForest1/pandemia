import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { useTranslation } from '../i18n/useTranslation';

export const RequireAuth = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated, isLoading } = useAuth();
    const { t } = useTranslation();

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-surface text-ink-muted font-body">
                {t('auth.loadingSession')}
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/main" replace />;
    }

    return children;
};
