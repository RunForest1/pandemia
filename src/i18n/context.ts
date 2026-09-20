import { createContext } from 'react';
import { Locale, TranslationTree } from './translations';

type Primitive = string | number | boolean;

type DotPaths<T, Prefix extends string = ''> = {
    [K in keyof T & string]: T[K] extends Primitive
        ? `${Prefix}${K}`
        : DotPaths<T[K], `${Prefix}${K}.`>;
}[keyof T & string];

export type TranslationKey = DotPaths<TranslationTree>;

export interface LocaleContextValue {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    toggleLocale: () => void;
    t: (key: TranslationKey) => string;
}

export const LocaleContext = createContext<LocaleContextValue | null>(null);
