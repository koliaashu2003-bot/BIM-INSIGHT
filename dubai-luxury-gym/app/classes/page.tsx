import type { Metadata } from 'next';
import { classes } from '@/lib/data';
import PageHero from '@/components/ui/PageHero';
import ClassCard from '@/components/cards/ClassCard';
import Reveal, { RevealItem } from '@/components/ui/Reveal';
import CTABand from '@/components/sections/CTABand';

export const metadata: Metadata = {
  title: 'Classes',
  description:
    'Signature classes at AURUM Dubai — strength, HIIT, cycle, combat, Hyrox and recovery. Small groups, elite coaching, cinematic studios.',
};

const categories = ['Strength', 'Conditioning', 'Studio', 'Mind & Recovery'];

export default function ClassesPage() {
  return (
    <>
      <PageHero
        eyebrow="Signature Classes"
        title="Every session is a production."
        subtitle="Small groups. Elite coaching. Programmable light and curated sound. Choose your discipline — or master all of them."
      />

      <section className="pb-8">
        <div className="container-luxe">
          {/* Category chips (visual filter cue) */}
          <div className="mb-12 flex flex-wrap gap-2">
            <span className="rounded-full bg-gold px-4 py-2 text-sm font-medium text-ink-900">
              All
            </span>
            {categories.map((c) => (
              <span
                key={c}
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-bone-muted"
              >
                {c}
              </span>
            ))}
          </div>

          <Reveal stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {classes.map((c) => (
              <RevealItem key={c.id}>
                <ClassCard c={c} />
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
