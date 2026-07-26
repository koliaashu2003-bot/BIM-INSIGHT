const items = [
  'Strength',
  'Conditioning',
  'Recovery Science',
  'Personal Coaching',
  'Hyrox',
  'Combat',
  'Mobility',
  'Nutrition',
  'Diagnostics',
];

/** Infinite gold marquee — a signature luxe divider. */
export default function Marquee() {
  return (
    <div className="relative flex overflow-hidden border-y border-white/5 py-6">
      <div className="animate-marquee flex shrink-0 items-center gap-10 whitespace-nowrap pr-10">
        {[...items, ...items].map((it, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-2xl font-medium text-bone/40 md:text-3xl">
              {it}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
          </span>
        ))}
      </div>
      <div className="animate-marquee flex shrink-0 items-center gap-10 whitespace-nowrap pr-10" aria-hidden>
        {[...items, ...items].map((it, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-2xl font-medium text-bone/40 md:text-3xl">
              {it}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}
