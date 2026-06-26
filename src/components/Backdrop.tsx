import type { CSSProperties } from 'react'

// Full-bleed hero image with a slow Ken Burns zoom and a gentle scroll parallax
// drift, behind a legibility scrim. Decorative (the heading text carries the
// meaning). The parallax wrapper is oversized (-inset-y) so the drift never
// exposes an edge; the inner image owns the Ken Burns scale (separate element
// so the two transforms don't collide).
export default function Backdrop({
  src,
  kenburns = true,
  parallax = true,
  scrim = true,
  position = 'center',
}: {
  readonly src: string
  readonly kenburns?: boolean
  readonly parallax?: boolean
  readonly scrim?: boolean
  readonly position?: string
}) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className={parallax ? 'parallax absolute -inset-y-[7%] inset-x-0' : 'absolute inset-0'}
        style={parallax ? ({ ['--p-amt']: '38px' } as CSSProperties) : undefined}
      >
        <img
          src={src}
          alt=""
          loading="eager"
          style={{ objectPosition: position }}
          className={`h-full w-full object-cover ${kenburns ? 'kenburns' : ''}`}
        />
      </div>
      {scrim && <div className="hero-scrim absolute inset-0" />}
    </div>
  )
}
