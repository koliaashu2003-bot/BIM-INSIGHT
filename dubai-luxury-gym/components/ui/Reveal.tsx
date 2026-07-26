'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { revealUp, staggerContainer } from '@/lib/motion';
import { cn } from '@/lib/utils';

/** Scroll-triggered fade+rise. Set `stagger` to animate children in sequence. */
export default function Reveal({
  children,
  className,
  stagger = false,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
  as?: 'div' | 'section' | 'ul' | 'li';
}) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={cn(className)}
      variants={stagger ? staggerContainer : revealUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-100px' }}
    >
      {children}
    </MotionTag>
  );
}

/** Child item to use inside a `stagger` Reveal. */
export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={revealUp} className={className}>
      {children}
    </motion.div>
  );
}
