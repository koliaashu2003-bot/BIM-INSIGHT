import type { Variants } from 'framer-motion';

/** Signature cinematic easing (expo.out) from the design system. */
export const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Scroll-reveal: fade + rise. Used site-wide via <Reveal />. */
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE_EXPO },
  },
};

/** Stagger container for grids / lists. */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.2, ease: EASE_EXPO } },
};

/** Word-by-word headline reveal. */
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: '110%' },
  show: (i: number = 0) => ({
    opacity: 1,
    y: '0%',
    transition: { duration: 1, ease: EASE_EXPO, delay: 0.15 + i * 0.09 },
  }),
};
