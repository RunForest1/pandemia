import { useContext } from 'react';
import { LocaleContext } from './context';

export const useTranslation = () => {
    const context = useContext(LocaleContext);
    if (!context) {
        throw new Error(
            'useTranslation должен использоваться внутри LocaleProvider',
        );
    }
    return context;
};
