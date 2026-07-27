// Lightweight decorative "wireframe skyline" — pure inline SVG + CSS.
// Replaces the old three.js/@react-three/fiber scene (~880 KB) which was a
// heavy dependency for a background flourish, especially on mobile.
export function HeroArt() {
  const bars = [
    { x: 20, w: 26, h: 90 },
    { x: 54, w: 30, h: 140 },
    { x: 92, w: 24, h: 110 },
    { x: 124, w: 34, h: 180 },
    { x: 166, w: 26, h: 120 },
    { x: 200, w: 30, h: 160 },
    { x: 238, w: 24, h: 96 },
    { x: 270, w: 32, h: 150 },
  ]
  const baseY = 250

  return (
    <svg className="hero-svg" viewBox="0 0 320 260" role="img" aria-label="Wireframe skyline">
      {/* ground grid */}
      <g stroke="var(--accent)" strokeOpacity="0.16" strokeWidth="1">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="260" />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 40} x2="320" y2={i * 40} />
        ))}
      </g>

      {/* buildings */}
      <g stroke="var(--accent)" fill="var(--accent)" fillOpacity="0.05" strokeWidth="1.5">
        {bars.map((b, i) => {
          const y = baseY - b.h
          const floors = Math.max(2, Math.round(b.h / 22))
          return (
            <g key={i} className="hero-bldg" style={{ animationDelay: `${i * 0.08}s` }}>
              <rect x={b.x} y={y} width={b.w} height={b.h} />
              {Array.from({ length: floors - 1 }).map((_, f) => (
                <line
                  key={f}
                  x1={b.x}
                  y1={y + ((f + 1) * b.h) / floors}
                  x2={b.x + b.w}
                  y2={y + ((f + 1) * b.h) / floors}
                  strokeOpacity="0.4"
                />
              ))}
            </g>
          )
        })}
      </g>
    </svg>
  )
}
