import AmbientBlobs from '@/components/ui/AmbientBlobs';
import Reveal from '@/components/ui/Reveal';

/** Compact cinematic header used on every inner page. */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-40 md:pb-24 md:pt-48">
      <AmbientBlobs />
      <div className="container-luxe relative">
        <Reveal>
          <span className="eyebrow mb-5">
            <span className="h-px w-6 bg-gold/60" aria-hidden />
            {eyebrow}
          </span>
          <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-6xl md:text-7xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-bone-muted">
              {subtitle}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
