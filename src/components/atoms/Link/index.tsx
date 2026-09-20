import { ReactNode } from 'react';

interface LinkProps {
    icon: ReactNode;
    text: string;
}

export const Link: React.FC<LinkProps> = ({ icon, text }) => {
    return (
        <a
            href="#"
            className="text-ink-muted font-body text-sm font-medium flex gap-3 py-2 px-4 hover:bg-surface-hover hover:text-ink duration-200 items-center justify-center rounded-xl"
        >
            {icon}
            {text}
        </a>
    );
};
