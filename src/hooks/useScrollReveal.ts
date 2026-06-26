import { useEffect } from 'react'

// Observes every `.reveal` / `.reveal-group` / `.gold-rule` element on the page
// and adds `is-visible` as they scroll into view. Re-runs on route change so a
// freshly rendered page's elements get wired up. Resting CSS is fully visible,
// so this is purely additive, if the observer never runs, nothing is hidden.
export function useScrollReveal(deps: string) {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>('.reveal, .reveal-group, .gold-rule'),
    )
    if (els.length === 0) return

    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    // If the page loaded already scrolled (reload mid-page, restored position),
    // anything scrolled past the top is shown immediately; the rest animate in.
    els.forEach((el) => {
      if (el.getBoundingClientRect().bottom < 0) {
        el.classList.add('is-visible')
      } else {
        io.observe(el)
      }
    })
    return () => io.disconnect()
  }, [deps])
}
