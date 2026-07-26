import Image from 'next/image';
import Link from 'next/link';
import { Clock, Flame } from 'lucide-react';
import type { GymClass } from '@/lib/data';

export default function ClassCard({ c }: { c: GymClass }) {
  return (
    <Link
      href="/schedule"
      className="group relative block overflow-hidden rounded-3xl border border-white/10 glass-hover"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={c.image}
          alt={c.name}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-expo group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-gold backdrop-blur">
          {c.category}
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="font-display text-2xl font-semibold text-bone">{c.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-bone-muted">{c.blurb}</p>
        <div className="mt-3 flex items-center gap-4 text-xs text-bone-dim">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" /> {c.duration} min
          </span>
          <span className="flex items-center gap-1.5">
            <Flame className="h-3.5 w-3.5 text-gold" />
            {['Recover', 'Build', 'Max'][c.intensity - 1]}
          </span>
        </div>
      </div>
    </Link>
  );
}
