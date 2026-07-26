'use client';

import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { site } from '@/lib/site';

/** Floating WhatsApp CTA — appears after the first scroll, above the mobile bar. */
export default function WhatsAppFloat() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const msg = encodeURIComponent(
    "Hi AURUM — I'd like to book a complimentary trial session.",
  );

  return (
    <a
      href={`https://wa.me/${site.whatsapp}?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={`fixed bottom-24 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_40px_-8px_rgba(37,211,102,0.6)] transition-all duration-500 ease-expo hover:scale-105 md:bottom-8 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20" />
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
