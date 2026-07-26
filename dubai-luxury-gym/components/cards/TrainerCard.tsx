import Image from 'next/image';
import { Instagram } from 'lucide-react';
import type { Trainer } from '@/lib/data';

export default function TrainerCard({ t }: { t: Trainer }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/10 glass-hover">
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={t.image}
          alt={t.name}
          fill
          sizes="(max-width:768px) 100vw, 25vw"
          className="object-cover grayscale transition-all duration-700 ease-expo group-hover:scale-105 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent" />
        <a
          href={t.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t.name} on Instagram`}
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full glass text-bone opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:text-gold"
        >
          <Instagram className="h-4 w-4" />
        </a>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="text-xs uppercase tracking-luxe text-gold">{t.role}</p>
        <h3 className="mt-1 font-display text-2xl font-semibold text-bone">{t.name}</h3>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {t.specialties.slice(0, 3).map((s) => (
            <span
              key={s}
              className="rounded-full border border-white/10 px-2.5 py-1 text-[0.65rem] text-bone-muted"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
