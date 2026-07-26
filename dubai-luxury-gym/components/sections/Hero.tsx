'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ChevronDown, Play } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { wordReveal, fadeIn } from '@/lib/motion';
import MagneticButton from '@/components/ui/MagneticButton';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import AmbientBlobs from '@/components/ui/AmbientBlobs';

// 3D scene is client-only and heavy — load it lazily so it never blocks paint.
const HeroScene = dynamic(() => import('@/components/three/HeroScene'), {
  ssr: false,
  loading: () => null,
});

const stats = [
  { to: 4.9, decimals: 1, label: 'Google rating' },
  { to: 60, suffix: '+', label: 'Weekly classes' },
  { to: 24, suffix: '/7', label: 'Recovery suite' },
  { to: 812, suffix: '+', label: 'Elite members' },
];

export default function Hero() {
  const { t } = useLang();
  const title1 = t('hero.title1').split(' ');
  const title2 = t('hero.title2').split(' ');

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28">
      {/* Cinematic background: video (drop hero.mp4 in /public/videos) over gradient */}
      <div className="absolute inset-0 z-0">
        <video
          className="h-full w-full object-cover opacity-30"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=80"
        >
          {/* Add a licensed cinematic loop here for the full effect */}
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/60 via-ink-900/80 to-ink-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,11,0.85)_75%)]" />
      </div>

      {/* 3D layer */}
      <div className="absolute inset-0 z-0 opacity-90">
        <HeroScene />
      </div>

      <AmbientBlobs />

      <div className="container-luxe relative z-10">
        <motion.span
          variants={fadeIn}
          initial="hidden"
          animate="show"
          className="eyebrow mb-6"
        >
          <span className="h-px w-8 bg-gold/60" aria-hidden />
          {t('hero.eyebrow')}
        </motion.span>

        <h1 className="max-w-4xl font-display text-[3.25rem] font-semibold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
          <span className="block overflow-hidden">
            {title1.map((w, i) => (
              <motion.span
                key={i}
                className="mr-[0.25em] inline-block"
                custom={i}
                variants={wordReveal}
                initial="hidden"
                animate="show"
              >
                {w}
              </motion.span>
            ))}
          </span>
          <span className="block overflow-hidden">
            {title2.map((w, i) => (
              <motion.span
                key={i}
                className="mr-[0.25em] inline-block text-gilded"
                custom={i + title1.length}
                variants={wordReveal}
                initial="hidden"
                animate="show"
              >
                {w}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.6 }}
          className="mt-7 max-w-xl text-base leading-relaxed text-bone-muted md:text-lg"
        >
          {t('hero.sub')}
        </motion.p>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.8 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <MagneticButton href="/contact">{t('hero.cta')}</MagneticButton>
          <MagneticButton href="/gallery" variant="ghost">
            <Play className="h-4 w-4" /> {t('hero.secondary')}
          </MagneticButton>
        </motion.div>

        {/* Animated stat band */}
        <motion.dl
          variants={fadeIn}
          initial="hidden"
          animate="show"
          transition={{ delay: 1 }}
          className="mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 md:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-white/[0.02] px-6 py-6 text-center backdrop-blur">
              <dd className="font-display text-3xl font-semibold text-gilded md:text-4xl">
                <AnimatedCounter to={s.to} suffix={s.suffix} decimals={s.decimals} />
              </dd>
              <dt className="mt-1 text-xs uppercase tracking-luxe text-bone-dim">{s.label}</dt>
            </div>
          ))}
        </motion.dl>
      </div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-2 text-bone-dim"
      >
        <span className="text-[0.65rem] uppercase tracking-luxe">Scroll</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </motion.div>
    </section>
  );
}
