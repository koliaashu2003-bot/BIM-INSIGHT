'use client';

import { Star } from 'lucide-react';
import { reviews } from '@/lib/data';
import { site } from '@/lib/site';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal, { RevealItem } from '@/components/ui/Reveal';

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < n ? 'fill-gold text-gold' : 'text-white/15'}`}
        />
      ))}
    </div>
  );
}

/**
 * Google Reviews. Wired to static data now; to go live, fetch the Places
 * Details API (place_id + reviews) from a server route and pass results in.
 */
export default function Reviews() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-luxe">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Members Talk"
            title={<>Rated <span className="text-gilded">{site.rating.value}</span> on Google</>}
          />
          <div className="glass flex items-center gap-4 rounded-2xl px-5 py-4">
            <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
              <path fill="#EA4335" d="M12 5c1.6 0 3 .55 4.1 1.6l3-3A9.9 9.9 0 0 0 12 2 10 10 0 0 0 3 7.3l3.5 2.7A6 6 0 0 1 12 5Z" />
              <path fill="#4285F4" d="M22 12.2c0-.7-.06-1.4-.17-2H12v4h5.6a4.8 4.8 0 0 1-2.1 3.1l3.4 2.6A10 10 0 0 0 22 12.2Z" />
              <path fill="#FBBC05" d="M6.5 14 3 16.7A10 10 0 0 0 12 22c2.7 0 4.96-.9 6.6-2.4l-3.4-2.6c-.9.6-2.1 1-3.2 1a6 6 0 0 1-5.5-4Z" />
              <path fill="#34A853" d="M3 7.3A10 10 0 0 0 3 16.7L6.5 14a6 6 0 0 1 0-3.8L3 7.3Z" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-bone">{site.rating.value} / 5.0</p>
              <p className="text-xs text-bone-dim">{site.rating.count} Google reviews</p>
            </div>
          </div>
        </div>

        <Reveal stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r) => (
            <RevealItem key={r.author}>
              <figure className="glass glass-hover h-full rounded-3xl p-6">
                <Stars n={r.rating} />
                <blockquote className="mt-4 text-sm leading-relaxed text-bone">
                  “{r.text}”
                </blockquote>
                <figcaption className="mt-5 border-t border-white/5 pt-4">
                  <p className="text-sm font-semibold text-bone">{r.author}</p>
                  <p className="text-xs text-bone-dim">{r.role}</p>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
