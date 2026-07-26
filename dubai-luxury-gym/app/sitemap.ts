import type { MetadataRoute } from 'next';
import { nav, site } from '@/lib/site';
import { posts } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = nav.map((n) => ({
    url: `${site.url}${n.href === '/' ? '' : n.href}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: n.href === '/' ? 1 : 0.8,
  }));

  const articles = posts.map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...routes, ...articles];
}
