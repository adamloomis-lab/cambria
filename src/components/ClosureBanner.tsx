import { useEffect, useState } from 'react'
import { activeClosure, formatClosureDate, type Closure } from '../data/site'

// Site-wide announcement bar surfaced whenever an upcoming or in-progress
// closure is active (see data/site.ts `closures`). Fixed to the top with a
// higher z-index than the navbar; while shown, `html.has-banner` is set so
// index.css can push the navbar down by the banner's height. Purposefully
// NOT dismissible — the owner's point is that people ignore Facebook posts,
// so this needs to be visible on every visit.
//
// Client-only: computed after mount so today's date is always accurate
// (SSR-built HTML would otherwise freeze the state at build time).
export default function ClosureBanner() {
  const [closure, setClosure] = useState<Closure | null>(null)

  useEffect(() => {
    const c = activeClosure()
    setClosure(c)
    if (!c) return
    document.documentElement.classList.add('has-banner')
    return () => {
      document.documentElement.classList.remove('has-banner')
    }
  }, [])

  if (!closure) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-x-0 top-0 z-[70] h-9 bg-oxblood text-on-oxblood"
    >
      <div className="container-x flex h-full items-center justify-center gap-2.5 py-1 text-center font-sans text-[11px] font-semibold uppercase leading-tight tracking-[0.14em] sm:text-[12px] sm:tracking-[0.16em]">
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-soft animate-pulse"
        />
        <span>
          Closed {formatClosureDate(closure.start)}
          <span className="mx-1 opacity-70">–</span>
          {formatClosureDate(closure.end)} for {closure.reason}
        </span>
      </div>
    </div>
  )
}
