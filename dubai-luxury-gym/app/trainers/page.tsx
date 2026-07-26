import type { Metadata } from 'next';
import Image from 'next/image';
import { Instagram } from 'lucide-react';
import { trainers } from '@/lib/data';
import PageHero from '@/components/ui/PageHero';
import Reveal, { RevealItem } from '@/components/ui/Reveal';
import CTABand from '@/components/sections/CTABand';

export const metadata: Metadata = {
  title: 'Trainers',
  description:
    'Meet the AURUM coaching team — specialists in strength, conditioning, physique, nutrition, and recovery. The best coaches in Dubai.',
};

export default function TrainersPage() {
  return (
    <>
      <PageHero
        eyebrow="The Coaches"
        title="Specialists, not generalists."
        subtitle="Every AURUM coach owns a discipline. Together they form the most decorated performance team in the region."
      />

      <section className="pb-8">
        <div className="container-luxe space-y-8">
          {trainers.map((t, i) => (
            <Reveal key={t.id}>
              <article
                className={`grid items-center gap-8 rounded-[2rem] border border-white/10 glass p-6 md:grid-cols-2 md:p-8 ${
                  i % 2 === 1 ? 'md:[&>div:first-child]:order-2' : ''
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl md:aspect-[3/4]">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    sizes="(max-width:768px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="eyebrow mb-3">{t.role}</p>
                  <h2 className="font-display text-3xl font-semibold md:text-4xl">{t.name}</h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {t.specialties.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-gold/20 bg-gold/[0.06] px-3 py-1 text-xs text-gold"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <p className="mt-5 leading-relaxed text-bone-muted">{t.bio}</p>
                  <div className="mt-6 flex items-center gap-8">
                    {t.stats.map((s) => (
                      <div key={s.label}>
                        <p className="font-display text-3xl font-semibold text-gilded">{s.value}</p>
                        <p className="text-xs uppercase tracking-luxe text-bone-dim">{s.label}</p>
                      </div>
                    ))}
                    <a
                      href={t.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${t.name} on Instagram`}
                      className="ml-auto grid h-11 w-11 place-items-center rounded-full border border-white/10 text-bone-muted transition-colors hover:border-gold/50 hover:text-gold"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABand />
    </>
  );
}
