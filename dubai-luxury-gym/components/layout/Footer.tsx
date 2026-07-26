import Link from 'next/link';
import { Instagram, Youtube, Linkedin, MapPin, Mail, Phone } from 'lucide-react';
import { nav, site } from '@/lib/site';
import NewsletterForm from '@/components/forms/NewsletterForm';

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/5 pb-28 pt-20 md:pb-16">
      <div className="container-luxe">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr] lg:gap-16">
          <div>
            <Link
              href="/"
              className="font-display text-2xl font-bold tracking-[0.3em] text-bone"
            >
              {site.name}
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-bone-muted">
              {site.tagline}. {site.description}
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: Instagram, href: site.social.instagram, label: 'Instagram' },
                { Icon: Youtube, href: site.social.youtube, label: 'YouTube' },
                { Icon: Linkedin, href: site.social.linkedin, label: 'LinkedIn' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-bone-muted transition-colors hover:border-gold/50 hover:text-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="eyebrow mb-5">Explore</h3>
            <ul className="space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-bone-muted transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow mb-5">Visit</h3>
            <ul className="space-y-4 text-sm text-bone-muted">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.country}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                <a href={`tel:${site.phone}`} className="hover:text-gold">
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="h-4 w-4 shrink-0 text-gold" />
                <a href={`mailto:${site.email}`} className="hover:text-gold">
                  {site.email}
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <NewsletterForm compact />
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-bone-dim md:flex-row">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p className="flex items-center gap-4">
            <Link href="/contact" className="hover:text-gold">
              Privacy
            </Link>
            <Link href="/contact" className="hover:text-gold">
              Terms
            </Link>
            <span>{site.hours}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
