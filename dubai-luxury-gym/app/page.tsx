import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Dumbbell, HeartPulse, Sparkles, Trophy } from 'lucide-react';
import { classes, plans, trainers } from '@/lib/data';
import Hero from '@/components/sections/Hero';
import Marquee from '@/components/sections/Marquee';
import Reviews from '@/components/sections/Reviews';
import CTABand from '@/components/sections/CTABand';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal, { RevealItem } from '@/components/ui/Reveal';
import ClassCard from '@/components/cards/ClassCard';
import TrainerCard from '@/components/cards/TrainerCard';
import PlanCard from '@/components/cards/PlanCard';
import MagneticButton from '@/components/ui/MagneticButton';

const pillars = [
  {
    Icon: Dumbbell,
    title: 'Elite Coaching',
    body: 'Every coach is a specialist — strength, conditioning, physique, mobility. Programming built for people who refuse average.',
  },
  {
    Icon: HeartPulse,
    title: 'Recovery Science',
    body: 'Contrast pools, infrared sauna, physio, and diagnostics. We treat recovery as the real performance multiplier.',
  },
  {
    Icon: Sparkles,
    title: 'Cinematic Space',
    body: 'A members-only floor engineered like a flagship — programmable light, curated sound, spotless every hour.',
  },
  {
    Icon: Trophy,
    title: 'Measured Results',
    body: 'Monthly InBody scans, bloodwork, and performance testing. Progress you can see on a chart, not just in a mirror.',
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />

      {/* Philosophy / scroll storytelling */}
      <section className="relative py-24 md:py-32">
        <div className="container-luxe">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <Reveal className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1000&q=80"
                  alt="Member training on the AURUM floor"
                  fill
                  sizes="(max-width:1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent" />
              </div>
              <div className="glass absolute -bottom-6 -right-4 max-w-[220px] rounded-2xl p-5 md:-right-8">
                <p className="font-display text-3xl font-semibold text-gilded">Top 1%</p>
                <p className="mt-1 text-xs text-bone-muted">
                  of Dubai fitness facilities by member retention
                </p>
              </div>
            </Reveal>

            <div>
              <SectionHeading
                eyebrow="The AURUM Standard"
                title={<>Not a gym. A <span className="text-gilded">performance club.</span></>}
                subtitle="We built AURUM for people who lead — founders, surgeons, athletes, executives. Every detail is engineered to make world-class training the easiest part of your day."
              />
              <Reveal stagger className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
                {pillars.map((p) => (
                  <RevealItem key={p.title}>
                    <div className="flex gap-4">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-gold/20 bg-gold/[0.06] text-gold">
                        <p.Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="font-semibold text-bone">{p.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-bone-muted">{p.body}</p>
                      </div>
                    </div>
                  </RevealItem>
                ))}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Classes preview */}
      <section className="relative py-24 md:py-28">
        <div className="container-luxe">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Signature Classes"
              title={<>Train in an <span className="text-gilded">arena</span>, not a room.</>}
            />
            <Link
              href="/classes"
              className="group flex items-center gap-2 text-sm text-bone-muted transition-colors hover:text-gold"
            >
              All classes
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
          <Reveal stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {classes.slice(0, 3).map((c) => (
              <RevealItem key={c.id}>
                <ClassCard c={c} />
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Trainers preview */}
      <section className="relative py-24 md:py-28">
        <div className="container-luxe">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="The Coaches"
              title={<>Coached by the <span className="text-gilded">best in the region.</span></>}
            />
            <Link
              href="/trainers"
              className="group flex items-center gap-2 text-sm text-bone-muted transition-colors hover:text-gold"
            >
              Meet the team
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
          <Reveal stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trainers.map((t) => (
              <RevealItem key={t.id}>
                <TrainerCard t={t} />
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Membership preview */}
      <section className="relative py-24 md:py-28">
        <div className="container-luxe">
          <SectionHeading
            align="center"
            eyebrow="Membership"
            title={<>Choose your <span className="text-gilded">tier.</span></>}
            subtitle="Every membership includes a complimentary trial, a movement assessment, and access to the recovery suite."
            className="mb-14"
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map((p) => (
              <PlanCard key={p.id} plan={p} annual={false} />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <MagneticButton href="/membership" variant="ghost">
              Compare all features
            </MagneticButton>
          </div>
        </div>
      </section>

      <Reviews />
      <CTABand />
    </>
  );
}
