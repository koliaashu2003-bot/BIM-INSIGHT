import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import ScheduleGrid from '@/components/sections/ScheduleGrid';
import CTABand from '@/components/sections/CTABand';

export const metadata: Metadata = {
  title: 'Schedule',
  description:
    'Live weekly class schedule at AURUM Dubai. Reserve your spot in strength, HIIT, cycle, combat, Hyrox and recovery sessions.',
};

export default function SchedulePage() {
  return (
    <>
      <PageHero
        eyebrow="Weekly Schedule"
        title="Reserve your spot."
        subtitle="Tap any session to hold your place. Elite members get a 7-day priority booking window."
      />
      <section className="pb-8">
        <ScheduleGrid />
      </section>
      <CTABand />
    </>
  );
}
