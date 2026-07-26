import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { posts } from '@/lib/data';
import { site } from '@/lib/site';
import CTABand from '@/components/sections/CTABand';
import Reveal from '@/components/ui/Reveal';

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return { title: 'Article' };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: [post.image] },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    author: { '@type': 'Organization', name: site.name },
    publisher: { '@type': 'Organization', name: site.legalName },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="pt-32">
        <div className="container-luxe max-w-3xl">
          <Reveal>
            <Link
              href="/blog"
              className="mb-8 inline-flex items-center gap-2 text-sm text-bone-muted transition-colors hover:text-gold"
            >
              <ArrowLeft className="h-4 w-4" /> All articles
            </Link>
            <div className="flex items-center gap-3 text-xs text-bone-dim">
              <span className="text-gold">{post.category}</span>
              <span>·</span>
              <span>{post.readMins} min read</span>
              <span>·</span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
            </div>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              {post.title}
            </h1>
          </Reveal>

          <Reveal className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl border border-white/10">
            <Image src={post.image} alt={post.title} fill sizes="(max-width:768px) 100vw, 768px" className="object-cover" priority />
          </Reveal>

          <div className="prose-luxe mt-10 space-y-6 text-lg leading-relaxed text-bone-muted">
            <p className="text-xl text-bone">{post.excerpt}</p>
            <p>
              At AURUM, we believe elite results come from a small number of things done
              relentlessly well. This piece breaks down how our coaching team approaches the
              topic with members who train around demanding careers.
            </p>
            <h2 className="font-display text-2xl font-semibold text-bone">The principle</h2>
            <p>
              Consistency beats intensity over any meaningful horizon. We design programs that
              survive a bad week — because everyone has bad weeks, and the plan that bends is the
              plan that compounds.
            </p>
            <h2 className="font-display text-2xl font-semibold text-bone">Putting it to work</h2>
            <p>
              Your coach translates these ideas into a weekly structure built around your
              calendar, travel, and recovery capacity — reviewed and adjusted every month against
              real data from your InBody scans and performance testing.
            </p>
            <p className="text-sm text-bone-dim">
              This is placeholder body copy. Wire the Journal to your CMS (Sanity, Contentful, or
              MDX) to publish full articles.
            </p>
          </div>
        </div>
      </article>
      <CTABand />
    </>
  );
}
