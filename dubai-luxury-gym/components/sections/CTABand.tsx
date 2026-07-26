'use client';

import { useLang } from '@/lib/i18n';
import MagneticButton from '@/components/ui/MagneticButton';
import AmbientBlobs from '@/components/ui/AmbientBlobs';
import Reveal from '@/components/ui/Reveal';

/** High-conversion closing band, reused across pages. */
export default function CTABand() {
  const { t } = useLang();
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-luxe">
        <Reveal className="relative overflow-hidden rounded-[2.5rem] border border-gold/20 bg-gradient-to-br from-ink-800 to-ink-900 px-6 py-16 text-center md:px-16 md:py-24">
          <AmbientBlobs />
          <div className="relative mx-auto max-w-2xl">
            <span className="eyebrow mb-5 justify-center">
              <span className="h-px w-6 bg-gold/60" aria-hidden />
              Free Trial
            </span>
            <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight text-balance sm:text-5xl md:text-6xl">
              {t('cta.title')}
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-base text-bone-muted md:text-lg">
              {t('cta.sub')}
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <MagneticButton href="/contact">{t('hero.cta')}</MagneticButton>
              <MagneticButton href="/membership" variant="ghost">
                View Membership
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
