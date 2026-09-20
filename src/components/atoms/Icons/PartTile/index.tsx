import { ReactNode } from 'react';

interface PartTileProps {
    icon: ReactNode;
}

/**
 * Плитка-заглушка для товаров без собственной иллюстрации (запчасти,
 * стройматериалы) — единая иконка на фирменном фоне вместо фото,
 * которого у нас нет.
 */
export const PartTile = ({ icon }: PartTileProps) => (
    <div className="aspect-square w-full flex items-center justify-center bg-surface-3 text-accent">
        {icon}
    </div>
);
