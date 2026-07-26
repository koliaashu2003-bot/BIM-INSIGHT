import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { posts } from '@/lib/data';
import PageHero from '@/components/ui/PageHero';
import Reveal, { RevealItem } from '@/components/ui/Reveal';
import NewsletterForm from '@/components/forms/NewsletterForm';

export const metadata: Metadata = {
  title: 'Journal',
  description:
    'The AURUM Journal — performance, recovery, and nutrition insight from the coaching team behind Dubai’s elite performance club.',
};

export default function BlogPage() {
  const [featured, ...rest] = posts;
  return (
    <>
      <PageHero
        eyebrow="The Journal"
        title="Intelligence for high performers."
        subtitle="Training, recovery, and nutrition thinking from our coaching team — no fluff, no fads."
      />

      <section className="pb-8">
        <div className="container-luxe">
          {/* Featured */}
          <Reveal>
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid overflow-hidden rounded-[2rem] border border-white/10 glass-hover md:grid-cols-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width:768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-expo group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <span className="eyebrow mb-4">{featured.category}</span>
                <h2 className="font-display text-3xl font-semibold leading-tight md:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-4 text-bone-muted">{featured.excerpt}</p>
                <span className="mt-6 flex items-center gap-2 text-sm text-gold">
                  Read article
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          </Reveal>

          {/* Grid */}
          <Reveal stagger className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <RevealItem key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group block overflow-hidden rounded-3xl border border-white/10 glass-hover"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-expo group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-bone-dim">
                      <span className="text-gold">{p.category}</span>
                      <span>·</span>
                      <span>{p.readMins} min read</span>
                    </div>
                    <h3 className="mt-2 font-display text-xl font-semibold leading-snug">
                      {p.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-bone-muted">{p.excerpt}</p>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </Reveal>

          {/* Newsletter */}
          <div className="glass mt-16 flex flex-col items-center gap-6 rounded-4xl p-10 text-center md:p-14">
            <div>
              <h3 className="font-display text-3xl font-semibold">The inner circle</h3>
              <p className="mx-auto mt-2 max-w-md text-bone-muted">
                One considered email a week — training science, member stories, and early access
                to events.
              </p>
            </div>
            <div className="w-full max-w-md">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
