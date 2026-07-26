/** Slow-drifting ambient light blobs — the atmospheric backdrop for dark sections. */
export default function AmbientBlobs() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="animate-ambient-drift absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-gold/10 blur-[120px]" />
      <div
        className="animate-ambient-drift absolute -right-24 bottom-0 h-[380px] w-[380px] rounded-full bg-gold/[0.06] blur-[120px]"
        style={{ animationDelay: '-6s' }}
      />
    </div>
  );
}
