import { useEffect, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

// Full-bleed hero that slowly cross-fades through a set of food images, each
// with a Ken Burns drift. SSR-safe: the first image renders statically, then
// JS advances the index. Under reduced-motion it holds on the first image.
export default function HeroSlideshow({
  images,
  interval = 5500,
}: {
  readonly images: { src: string; position?: string }[]
  readonly interval?: number
}) {
  const [active, setActive] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || images.length < 2) return
    const id = setInterval(() => setActive((p) => (p + 1) % images.length), interval)
    return () => clearInterval(id)
  }, [reduced, images.length, interval])

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {images.map((img, idx) => (
        <img
          key={img.src}
          src={img.src}
          alt=""
          loading={idx === 0 ? 'eager' : 'lazy'}
          style={{ objectPosition: img.position ?? 'center' }}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] ease-in-out ${
            idx === active ? 'opacity-100' : 'opacity-0'
          } ${idx === active && !reduced ? 'kenburns' : ''}`}
        />
      ))}
      <div className="hero-scrim absolute inset-0" />
    </div>
  )
}
