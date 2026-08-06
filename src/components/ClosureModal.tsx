import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { CalendarX, X } from 'lucide-react'
import { activeClosure, formatClosureDate, reopenDate, type Closure } from '../data/site'

// One-time popup that surfaces an upcoming/in-progress closure the first time
// a visitor lands on the site. Dismissed state is stored in localStorage keyed
// by the closure's start date, so:
//   – once a visitor dismisses THIS closure, they don't see it again;
//   – but any *new* closure (different start date) starts a fresh nag.
//
// Portal-rendered to document.body so it escapes any containing block (learned
// from the MobileMenu bug — see reference_backdrop_filter_fixed_modal_gotcha).
// A short delay lets the hero render before the modal appears (less jarring).
// ESC / backdrop click / X button all close. Client-only.
export default function ClosureModal() {
  const [closure, setClosure] = useState<Closure | null>(null)
  const [shown, setShown] = useState(false) // controls fade/slide state
  const [mounted, setMounted] = useState(false)

  // Determine the active closure once on mount.
  useEffect(() => {
    const c = activeClosure()
    if (!c) return
    const key = `cambria-closure-seen-${c.start}`
    try {
      if (localStorage.getItem(key) === '1') return
    } catch {
      /* localStorage may be disabled; still show */
    }
    setClosure(c)
    const t = window.setTimeout(() => {
      setMounted(true)
      // Second RAF so the initial (hidden) state paints before the visible one.
      requestAnimationFrame(() => setShown(true))
    }, 1400)
    return () => window.clearTimeout(t)
  }, [])

  // ESC to close.
  useEffect(() => {
    if (!mounted) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mounted])

  // Lock body scroll while the modal is open.
  useEffect(() => {
    if (!mounted) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [mounted])

  function close() {
    if (!closure) return
    try {
      localStorage.setItem(`cambria-closure-seen-${closure.start}`, '1')
    } catch {
      /* ignore */
    }
    setShown(false)
    // Wait for the fade-out to finish before unmounting so the transition plays.
    window.setTimeout(() => setMounted(false), 320)
  }

  if (!mounted || !closure || typeof document === 'undefined') return null

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="closure-modal-title"
      aria-describedby="closure-modal-body"
      className={`fixed inset-0 z-[80] flex items-center justify-center px-5 py-8 transition-opacity duration-300 ${
        shown ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close notice"
        onClick={close}
        className="absolute inset-0 bg-charcoal/70 backdrop-blur-sm"
      />

      {/* Card */}
      <div
        className={`relative w-full max-w-md border border-gold/40 bg-crema shadow-[0_28px_80px_-12px_rgba(24,22,21,0.55)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          shown ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
        }`}
      >
        {/* Top gold hairline */}
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center border border-line text-ink-soft transition-colors hover:border-gold hover:text-oxblood"
        >
          <X size={16} aria-hidden="true" />
        </button>

        <div className="flex flex-col items-center px-8 pb-8 pt-10 text-center">
          <span className="flex h-14 w-14 items-center justify-center border border-oxblood/40 bg-oxblood/8 text-oxblood">
            <CalendarX size={26} aria-hidden="true" />
          </span>
          <p className="mt-6 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-deep">
            A Note From Cambria&rsquo;s
          </p>
          <h2
            id="closure-modal-title"
            className="mt-3 font-display text-headline-md text-ink"
          >
            We&rsquo;ll be closed for {closure.reason}
          </h2>
          <span aria-hidden="true" className="mt-4 block h-px w-12 bg-gold" />
          <p
            id="closure-modal-body"
            className="mt-5 text-body-md text-ink-soft"
          >
            The restaurant will be closed{' '}
            <span className="font-semibold text-ink">
              {formatClosureDate(closure.start)} – {formatClosureDate(closure.end)}
            </span>
            . We reopen{' '}
            <span className="font-semibold text-ink">{reopenDate(closure)}</span>.
            If you were planning a visit that week, we&rsquo;d love to see you before or after.
          </p>
          <button
            type="button"
            onClick={close}
            className="mt-8 inline-flex w-full items-center justify-center bg-oxblood px-8 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-on-oxblood transition-colors hover:bg-oxblood-2"
          >
            Got it, thanks
          </button>
          <p className="mt-4 text-[12px] text-ink-faint">
            We appreciate your understanding.
          </p>
        </div>
      </div>
    </div>,
    document.body,
  )
}
