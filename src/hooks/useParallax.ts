import { useEffect } from 'react'

// Subtle vertical parallax for elements with the `.parallax` class. Writes a CSS
// var --p (0..1 = progress as the element travels through the viewport); the
// `.parallax` rule maps it to a small translateY. rAF-throttled and a no-op under
// reduced motion. Resting value (--p unset → 0.5) means zero offset, so SSR/no-JS
// renders sit still with no jump.
export function useParallax(deps: string) {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    const els = Array.from(document.querySelectorAll<HTMLElement>('.parallax'))
    if (els.length === 0) return

    let ticking = false
    const update = () => {
      ticking = false
      const vh = window.innerHeight
      for (const el of els) {
        const r = el.getBoundingClientRect()
        const p = (vh - r.top) / (vh + r.height)
        el.style.setProperty('--p', String(Math.min(1, Math.max(0, p))))
      }
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [deps])
}
