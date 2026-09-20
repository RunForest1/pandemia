import { useMemo, useState } from 'react';
import { ShopBar } from '../../atoms/ShopBar';
import { Card } from '../../atoms/Card';
import { SectionHeading } from '../../atoms/SectionHeading';
import { PRODUCTS, ProductServer, ProductType } from '../../../data/products';
import { useTranslation } from '../../../i18n/useTranslation';

export const Shop = () => {
    const { t } = useTranslation();
    const [type, setType] = useState<ProductType | ''>('');
    const [server, setServer] = useState<ProductServer | ''>('');
    const [search, setSearch] = useState('');

    const filteredProducts = useMemo(() => {
        const query = search.trim().toLowerCase();
        return PRODUCTS.filter((product) => {
            if (type && product.type !== type) {
                return false;
            }
            if (server && product.server !== server) {
                return false;
            }
            if (query && !product.name.toLowerCase().includes(query)) {
                return false;
            }
            return true;
        }).sort((a, b) => a.name.localeCompare(b.name, 'ru'));
    }, [type, server, search]);

    const resetFilters = () => {
        setType('');
        setServer('');
        setSearch('');
    };

    return (
        <section id="shop" className="container pt-16 sm:pt-24 scroll-mt-20">
            <SectionHeading>{t('shop.heading')}</SectionHeading>
            <ShopBar
                type={type}
                onTypeChange={setType}
                server={server}
                onServerChange={setServer}
                search={search}
                onSearchChange={setSearch}
            />
            {filteredProducts.length === 0 ? (
                <div className="mt-8 flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border p-10 text-center text-ink-faint">
                    <p>{t('shop.noResults')}</p>
                    <button
                        type="button"
                        onClick={resetFilters}
                        className="rounded-full border-2 border-accent px-5 py-2 text-sm font-body font-semibold text-ink hover:bg-accent hover:text-accent-ink duration-200"
                    >
                        {t('shop.resetFilters')}
                    </button>
                </div>
            ) : (
                <div className="flex flex-col items-center sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                    {filteredProducts.map((product) => (
                        <Card key={product.key} product={product} />
                    ))}
                </div>
            )}
        </section>
    );
};
