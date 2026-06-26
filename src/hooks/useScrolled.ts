import { useEffect, useState } from 'react'

// True once the page has scrolled past `threshold` pixels. Used to reveal the
// sticky Request Service actions only after the user moves past the hero.
export function useScrolled(threshold = 520): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}
