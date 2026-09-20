import { Link as RouterLink } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../../../auth/useAuth';

export const ProfileButton = () => {
    const { user } = useAuth();

    return (
        <RouterLink
            to="/profile"
            className="flex items-center gap-2 rounded-xl border border-border py-2 pl-2 pr-4 hover:bg-surface-hover duration-200"
        >
            {user?.avatarUrl ? (
                <img
                    src={user.avatarUrl}
                    alt=""
                    className="w-8 h-8 rounded-full"
                />
            ) : (
                <AccountCircleIcon
                    sx={{ color: 'var(--ink-faint)', fontSize: 32 }}
                />
            )}
            <p className="font-body font-semibold text-sm text-ink">
                {user?.nickname}
            </p>
        </RouterLink>
    );
};
