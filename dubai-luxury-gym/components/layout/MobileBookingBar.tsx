'use client';

import Link from 'next/link';
import { Phone } from 'lucide-react';
import { site } from '@/lib/site';

/** Sticky bottom booking bar — mobile only, high-conversion. */
export default function MobileBookingBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 p-3 md:hidden">
      <div className="glass flex items-center gap-2 rounded-2xl p-2">
        <a
          href={`tel:${site.phone}`}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 text-bone"
          aria-label="Call the club"
        >
          <Phone className="h-5 w-5" />
        </a>
        <Link
          href="/contact"
          className="flex h-12 flex-1 items-center justify-center rounded-xl bg-gradient-to-b from-gold-light to-gold text-sm font-semibold text-ink-900"
        >
          Book Free Trial
        </Link>
      </div>
    </div>
  );
}
