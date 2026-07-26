import type { Metadata } from 'next';
import { transformations } from '@/lib/data';
import PageHero from '@/components/ui/PageHero';
import BeforeAfterSlider from '@/components/transformations/BeforeAfterSlider';
import Reveal, { RevealItem } from '@/components/ui/Reveal';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import CTABand from '@/components/sections/CTABand';

export const metadata: Metadata = {
  title: 'Transformations',
  description:
    'Real member transformations at AURUM Dubai. Drag the slider to see before and after. Elite coaching, measurable results.',
};

const outcomes = [
  { to: 2400, suffix: '+', label: 'Transformations' },
  { to: 96, suffix: '%', label: 'Hit their goal' },
  { to: 12, suffix: 'wk', label: 'Avg. first result' },
  { to: 4.9, decimals: 1, label: 'Coaching rating' },
];

export default function TransformationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Transformations"
        title="Proof, not promises."
        subtitle="Drag each slider to see what focused coaching does in a matter of weeks. These are real AURUM members."
      />

      {/* Outcome counters */}
      <section className="pb-16">
        <div className="container-luxe">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 md:grid-cols-4">
            {outcomes.map((o) => (
              <div key={o.label} className="bg-white/[0.02] px-6 py-8 text-center">
                <dd className="font-display text-4xl font-semibold text-gilded">
                  <AnimatedCounter to={o.to} suffix={o.suffix} decimals={o.decimals} />
                </dd>
                <dt className="mt-1 text-xs uppercase tracking-luxe text-bone-dim">{o.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="pb-8">
        <div className="container-luxe">
          <Reveal stagger className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {transformations.map((t) => (
              <RevealItem key={t.id}>
                <div>
                  <BeforeAfterSlider before={t.before} after={t.after} alt={t.name} />
                  <div className="mt-4">
                    <p className="text-xs uppercase tracking-luxe text-gold">
                      {t.weeks} weeks · {t.stat}
                    </p>
                    <h3 className="mt-1 font-display text-xl font-semibold">{t.headline}</h3>
                    <p className="text-sm text-bone-muted">{t.name}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
