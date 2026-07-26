'use client';

import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import { MoveHorizontal } from 'lucide-react';

/** Draggable before/after image comparison. Keyboard-accessible via the slider role. */
export default function BeforeAfterSlider({
  before,
  after,
  alt,
}: {
  before: string;
  after: string;
  alt: string;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  return (
    <div
      ref={ref}
      className="group relative aspect-[4/5] w-full select-none overflow-hidden rounded-3xl border border-white/10"
      onMouseMove={(e) => dragging.current && setFromClientX(e.clientX)}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchMove={(e) => setFromClientX(e.touches[0].clientX)}
    >
      {/* After (base) */}
      <Image src={after} alt={`${alt} — after`} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
      <span className="absolute right-3 top-3 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-ink-900">
        After
      </span>

      {/* Before (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <div className="relative h-full" style={{ width: ref.current?.clientWidth ?? '100%' }}>
          <Image src={before} alt={`${alt} — before`} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-bone backdrop-blur">
          Before
        </span>
      </div>

      {/* Handle */}
      <div
        className="absolute inset-y-0 z-10 w-px bg-gold"
        style={{ left: `${pos}%` }}
        aria-hidden
      >
        <button
          role="slider"
          aria-label={`${alt} comparison`}
          aria-valuenow={Math.round(pos)}
          aria-valuemin={0}
          aria-valuemax={100}
          onMouseDown={() => (dragging.current = true)}
          onTouchStart={() => (dragging.current = true)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 4));
            if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 4));
          }}
          className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full bg-gold text-ink-900 shadow-lg"
        >
          <MoveHorizontal className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
