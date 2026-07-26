'use client';

import Link from 'next/link';
import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'gold' | 'ghost';
  className?: string;
  ariaLabel?: string;
};

/**
 * Magnetic button — the cursor gently pulls the button toward it, with a
 * 0.97 press scale. Falls back to a normal button when JS/pointer is absent.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  variant = 'gold',
  className,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = e.clientX - (rect.left + rect.width / 2);
    const my = e.clientY - (rect.top + rect.height / 2);
    x.set(mx * 0.35);
    y.set(my * 0.35);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const styles = cn(
    'group relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold tracking-wide transition-colors duration-300 cursor-pointer select-none',
    variant === 'gold'
      ? 'bg-gradient-to-b from-gold-light to-gold text-ink-900 hover:from-gold hover:to-gold-deep'
      : 'glass text-bone hover:border-gold/50',
    className,
  );

  const inner = (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.97 }}
      className="inline-flex"
    >
      {href ? (
        <Link href={href} aria-label={ariaLabel} className={styles}>
          {children}
        </Link>
      ) : (
        <button onClick={onClick} aria-label={ariaLabel} className={styles}>
          {children}
        </button>
      )}
    </motion.div>
  );

  return inner;
}
