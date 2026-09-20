import { useTranslation } from '../../../i18n/useTranslation';
import { useParallax } from '../../../hooks/useParallax';
import bg from '../../../assets/images/bg.png';

export const Hero = () => {
    const { t } = useTranslation();
    const parallaxRef = useParallax<HTMLDivElement>(0.25);

    return (
        <section className="relative h-[82vh] min-h-[560px] max-h-[900px] overflow-hidden flex items-end">
            <div
                ref={parallaxRef}
                className="absolute inset-x-0 -top-[15%] h-[130%] bg-cover bg-top bg-no-repeat will-change-transform"
                style={{ backgroundImage: `url(${bg})` }}
                aria-hidden="true"
            />
            <div
                className="absolute inset-0"
                style={{
                    background:
                        'linear-gradient(180deg, var(--hero-overlay-from) 0%, var(--hero-overlay-to) 94%)',
                }}
                aria-hidden="true"
            />
            {/* фирменный диагональный срез вместо ровной границы секции */}
            <div
                className="absolute inset-x-0 bottom-0 h-10 sm:h-16 bg-surface"
                style={{
                    clipPath: 'polygon(0 100%, 100% 40%, 100% 100%)',
                }}
                aria-hidden="true"
            />

            <div className="relative container flex flex-col items-start gap-5 pb-16 sm:pb-24">
                <span className="inline-flex items-center gap-2 border-l-4 border-accent bg-surface-2/70 pl-3 pr-4 py-1.5 text-xs font-body font-semibold uppercase tracking-[0.25em] text-accent [text-shadow:0_1px_12px_rgba(0,0,0,0.4)]">
                    DayZ · Community Servers
                </span>
                <h1 className="font-display uppercase text-5xl sm:text-7xl lg:text-8xl leading-[0.9] text-ink max-w-4xl -ml-0.5 [text-shadow:0_4px_30px_rgba(0,0,0,0.45)]">
                    {t('hero.title')}
                </h1>
                <p className="font-body text-base sm:text-xl lg:text-2xl text-ink-muted max-w-lg [text-shadow:0_2px_16px_rgba(0,0,0,0.4)]">
                    {t('hero.subtitle')}
                </p>
                <div className="flex flex-wrap gap-3 mt-3">
                    <a
                        href="#servers"
                        className="rounded-full bg-brand px-7 py-3 font-body font-semibold text-brand-ink hover:bg-brand-strong duration-200"
                    >
                        {t('hero.ctaServers')}
                    </a>
                    <a
                        href="#shop"
                        className="rounded-full border-2 border-accent px-7 py-3 font-body font-semibold text-ink hover:bg-accent hover:text-accent-ink duration-200"
                    >
                        {t('hero.ctaShop')}
                    </a>
                </div>
            </div>
        </section>
    );
};
