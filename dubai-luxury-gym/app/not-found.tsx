import Link from 'next/link';
import AmbientBlobs from '@/components/ui/AmbientBlobs';

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden text-center">
      <AmbientBlobs />
      <div className="container-luxe relative">
        <p className="font-display text-8xl font-semibold text-gilded md:text-9xl">404</p>
        <h1 className="mt-4 font-display text-3xl font-semibold">This page took a rest day.</h1>
        <p className="mx-auto mt-3 max-w-md text-bone-muted">
          The page you’re looking for doesn’t exist — but your transformation still can.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-gradient-to-b from-gold-light to-gold px-8 py-4 text-sm font-semibold text-ink-900"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
