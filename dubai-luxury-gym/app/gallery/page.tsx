import type { Metadata } from 'next';
import Image from 'next/image';
import { Play, Maximize } from 'lucide-react';
import { gallery } from '@/lib/data';
import PageHero from '@/components/ui/PageHero';
import Reveal, { RevealItem } from '@/components/ui/Reveal';
import CTABand from '@/components/sections/CTABand';

export const metadata: Metadata = {
  title: 'Gallery & Virtual Tour',
  description:
    'Step inside AURUM Dubai. Explore the members floor, recovery suite, and studios — or take the immersive virtual tour.',
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Step inside the club."
        subtitle="A members-only floor engineered like a flagship. Explore the space — then experience it in person."
      />

      {/* Virtual tour */}
      <section className="pb-16">
        <div className="container-luxe">
          <Reveal className="group relative aspect-[21/9] overflow-hidden rounded-[2rem] border border-white/10">
            <Image
              src="https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=1920&q=80"
              alt="AURUM members floor"
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-700 ease-expo group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/20 to-ink-900/30" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <button
                aria-label="Play virtual tour"
                className="grid h-20 w-20 place-items-center rounded-full bg-gold/90 text-ink-900 shadow-[0_0_60px_-8px_rgba(212,175,55,0.7)] transition-transform hover:scale-105"
              >
                <Play className="h-8 w-8 translate-x-0.5 fill-ink-900" />
              </button>
              <p className="mt-5 font-display text-2xl font-semibold md:text-3xl">
                360° Virtual Tour
              </p>
              <p className="mt-1 text-sm text-bone-muted">
                Embed a Matterport / YouTube 360 walkthrough here
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Masonry-style grid */}
      <section className="pb-8">
        <div className="container-luxe">
          <Reveal
            stagger
            className="grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-4"
          >
            {gallery.map((g, i) => (
              <RevealItem key={i} className={g.span}>
                <div className="group relative h-full w-full overflow-hidden rounded-2xl border border-white/10">
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    sizes="(max-width:768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-expo group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink-900/70 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex items-center gap-2 text-sm text-bone">
                      <Maximize className="h-4 w-4 text-gold" /> {g.alt}
                    </span>
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
