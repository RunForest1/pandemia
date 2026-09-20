import { ReactNode } from 'react';

interface SectionHeadingProps {
    children: ReactNode;
}

export const SectionHeading = ({ children }: SectionHeadingProps) => (
    <h2 className="flex items-center gap-3 font-display uppercase text-3xl sm:text-4xl text-ink mb-6">
        <span className="h-7 w-2 shrink-0 bg-accent" aria-hidden="true" />
        {children}
    </h2>
);
