'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { nav, site } from '@/lib/site';
import { useLang } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import MagneticButton from '@/components/ui/MagneticButton';

export default function Navbar() {
  const pathname = usePathname();
  const { t, toggle, lang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-expo',
        scrolled ? 'py-3' : 'py-5',
      )}
    >
      <div className="container-luxe">
        <nav
          className={cn(
            'flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 ease-expo md:px-5',
            scrolled ? 'glass' : 'bg-transparent',
          )}
        >
          <Link
            href="/"
            className="flex items-center gap-2 pl-2 font-display text-lg font-bold tracking-[0.3em] text-bone"
            aria-label={`${site.name} home`}
          >
            {site.name}
            <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'rounded-full px-3.5 py-2 text-sm transition-colors duration-300',
                      active ? 'text-gold' : 'text-bone-muted hover:text-bone',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              className="hidden rounded-full border border-white/10 px-3 py-2 text-xs font-medium text-bone-muted transition-colors hover:text-gold md:block"
              aria-label="Switch language"
            >
              {t('lang.toggle')}
            </button>
            <div className="hidden md:block">
              <MagneticButton href="/contact" className="px-6 py-3 text-xs">
                {t('nav.book')}
              </MagneticButton>
            </div>
            <button
              onClick={() => setOpen((o) => !o)}
              className="grid h-11 w-11 place-items-center rounded-full glass lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          'container-luxe overflow-hidden transition-all duration-500 ease-expo lg:hidden',
          open ? 'max-h-[70vh] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <ul className="glass mt-3 flex flex-col gap-1 rounded-3xl p-3">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'block rounded-2xl px-4 py-3 text-base',
                  pathname === item.href ? 'bg-white/5 text-gold' : 'text-bone-muted',
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="mt-1 flex items-center justify-between px-2">
            <button onClick={toggle} className="text-sm text-gold" aria-label="Switch language">
              {t('lang.toggle')} · {lang.toUpperCase()}
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
