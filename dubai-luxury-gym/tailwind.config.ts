import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Never pure #000 (OLED smear) — near-black base per design-system guidance.
        ink: {
          DEFAULT: '#0A0A0B',
          900: '#0A0A0B',
          800: '#111113',
          700: '#17171A',
          600: '#1E1E22',
          500: '#26262B',
        },
        bone: {
          DEFAULT: '#F5F5F4',
          muted: '#A8A8A5',
          dim: '#6E6E6B',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E8C87E',
          deep: '#B8912B',
          glow: 'rgba(212,175,55,0.35)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-inter)', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'var(--font-inter)', 'sans-serif'],
      },
      letterSpacing: {
        luxe: '0.24em',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionTimingFunction: {
        // expo.out — the signature cinematic easing from the design system.
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'ambient-drift': {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(4%, -6%, 0) scale(1.08)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'ambient-drift': 'ambient-drift 18s ease-in-out infinite',
        'marquee': 'marquee 32s linear infinite',
        'shimmer': 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
