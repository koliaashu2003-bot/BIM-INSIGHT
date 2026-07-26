import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import MembershipPlans from '@/components/sections/MembershipPlans';
import CTABand from '@/components/sections/CTABand';

export const metadata: Metadata = {
  title: 'Membership Plans',
  description:
    'Signature, Elite, and Private Reserve memberships at AURUM Dubai. Compare features and choose your tier. Complimentary trial included.',
};

export default function MembershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Membership"
        title="Access engineered around ambition."
        subtitle="Three tiers, one standard: world-class. Every membership starts with a complimentary trial and a movement assessment."
      />
      <section className="pb-12">
        <MembershipPlans />
      </section>
      <CTABand />
    </>
  );
}
