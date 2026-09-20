import { useEffect, useRef, useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { SectionHeading } from '../../atoms/SectionHeading';
import { NEWS_ITEMS, VK_GROUP_URL } from '../../../data/news';
import { useTranslation } from '../../../i18n/useTranslation';

const AUTOPLAY_MS = 6000;

export const NewsSlider = () => {
    const { t } = useTranslation();
    const [index, setIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const count = NEWS_ITEMS.length;
    const trackRef = useRef<HTMLDivElement>(null);

    const goTo = (next: number) => {
        setIndex(((next % count) + count) % count);
    };

    useEffect(() => {
        if (isPaused || count <= 1) {
            return;
        }
        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;
        if (prefersReducedMotion) {
            return;
        }
        const timer = window.setInterval(() => {
            setIndex((current) => (current + 1) % count);
        }, AUTOPLAY_MS);
        return () => window.clearInterval(timer);
    }, [isPaused, count]);

    if (count === 0) {
        return null;
    }

    return (
        <section
            id="news"
            className="container pt-16 sm:pt-24 scroll-mt-20"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="flex items-center justify-between mb-6">
                <SectionHeading>{t('news.heading')}</SectionHeading>
                <div className="hidden sm:flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => goTo(index - 1)}
                        aria-label="prev"
                        className="w-10 h-10 flex items-center justify-center rounded-full border border-border text-ink-muted hover:text-ink hover:border-accent duration-200"
                    >
                        <ArrowBackIosNewIcon sx={{ fontSize: 14 }} />
                    </button>
                    <button
                        type="button"
                        onClick={() => goTo(index + 1)}
                        aria-label="next"
                        className="w-10 h-10 flex items-center justify-center rounded-full border border-border text-ink-muted hover:text-ink hover:border-accent duration-200"
                    >
                        <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
                    </button>
                </div>
            </div>

            <div className="overflow-hidden rounded-tl-4xl rounded-br-4xl rounded-tr-xl rounded-bl-xl border border-border bg-surface-2">
                <div
                    ref={trackRef}
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${index * 100}%)` }}
                >
                    {NEWS_ITEMS.map((item) => (
                        <article
                            key={item.id}
                            className="w-full shrink-0 p-6 sm:p-10 flex flex-col gap-4"
                        >
                            <span className="text-xs font-body font-semibold uppercase tracking-[0.2em] text-accent">
                                {item.date}
                            </span>
                            <h3 className="font-display uppercase text-2xl sm:text-3xl text-ink max-w-2xl">
                                {item.title}
                            </h3>
                            <p className="text-ink-muted max-w-2xl">
                                {item.excerpt}
                            </p>
                            <a
                                href={VK_GROUP_URL}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="self-start mt-2 rounded-full border-2 border-accent px-5 py-2 text-sm font-body font-semibold text-ink hover:bg-accent hover:text-accent-ink duration-200"
                            >
                                {t('news.readMore')}
                            </a>
                        </article>
                    ))}
                </div>
            </div>

            {count > 1 && (
                <div className="flex items-center justify-center gap-2 mt-5">
                    {NEWS_ITEMS.map((item, i) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => goTo(i)}
                            aria-label={`slide ${i + 1}`}
                            className={`h-2 rounded-full duration-200 ${
                                i === index
                                    ? 'w-6 bg-accent'
                                    : 'w-2 bg-border-strong hover:bg-ink-faint'
                            }`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};
