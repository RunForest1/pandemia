import { useEffect, useRef } from 'react';

/**
 * Возвращает ref для элемента фона hero-секции и сдвигает его
 * с меньшей скоростью, чем прокрутка страницы, пока элемент виден.
 * Уважает prefers-reduced-motion и не работает вне viewport.
 */
export const useParallax = <T extends HTMLElement>(speed = 0.35) => {
    const ref = useRef<T | null>(null);

    useEffect(() => {
        const node = ref.current;
        if (!node) {
            return;
        }

        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;
        if (prefersReducedMotion) {
            return;
        }

        let ticking = false;
        let visible = true;

        const update = () => {
            ticking = false;
            if (!visible) {
                return;
            }
            const rect = node.getBoundingClientRect();
            const offset = rect.top * speed;
            node.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
        };

        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                window.requestAnimationFrame(update);
            }
        };

        const observer = new IntersectionObserver((entries) => {
            visible = entries[0]?.isIntersecting ?? true;
        });
        observer.observe(node);

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            observer.disconnect();
        };
    }, [speed]);

    return ref;
};
