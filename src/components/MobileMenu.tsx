import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'wouter'
import { X, Phone, MapPin, Clock, ArrowRight, Facebook, Instagram, CalendarCheck } from 'lucide-react'
import { company, hoursCompact } from '../data/site'

export interface MobileMenuProps {
  readonly open: boolean
  readonly onClose: () => void
}

// All primary nav targets, including Home, matching the desktop bar.
const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'Our Story', href: '/about' },
  { label: 'Reservations', href: '/reservations' },
  { label: 'Contact', href: '/contact' },
]

// Full-screen, high-trust mobile navigation. A backdrop-blurred charcoal/oxblood
// panel slides in from the right with a soft gold glow, staggered uppercase link
// entrance, and prominent reserve / call CTAs. Body scroll locks while open.
export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      // Double rAF: guarantees the browser paints the initial (closed) state
      // before flipping to shown, so the entrance transition actually runs
      // instead of latching at the start values.
      let inner = 0
      const outer = requestAnimationFrame(() => {
        inner = requestAnimationFrame(() => setShown(true))
      })
      return () => {
        cancelAnimationFrame(outer)
        cancelAnimationFrame(inner)
        document.body.style.overflow = ''
      }
    }
    setShown(false)
    document.body.style.overflow = ''
  }, [open])

  // Close on Escape for keyboard users.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null
  // SSR guard — document only exists in the browser.
  if (typeof document === 'undefined') return null

  // IMPORTANT: render at document.body via portal so the panel's `position:
  // fixed` escapes the header's containing block. The header uses
  // `backdrop-filter` (backdrop-blur-md) once `solid` is true, which makes
  // it a containing block for fixed descendants — that's why the menu
  // was clipping to the 80px header strip before this portal was added.
  return createPortal(
    <div className="lg:hidden fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Menu">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className={`absolute inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity duration-300 ${
          shown ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Panel */}
      <div
        className={`relative ml-auto h-full w-full max-w-sm overflow-y-auto bg-charcoal text-cream transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          shown ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ boxShadow: '0 0 60px rgba(74, 14, 14, 0.55), inset 0 0 120px rgba(74, 14, 14, 0.18)' }}
      >
        <div className="relative flex min-h-full flex-col px-7 pt-6 pb-10">
          <div className="flex items-center justify-between">
            <img src="/images/logo-white.webp" alt="Cambria's Bistro" className="h-10 w-auto" />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:bg-cream/10 hover:border-gold"
            >
              <X size={24} />
            </button>
          </div>

          {/* Brand trust badge with pulsing dot */}
          <span className="mt-7 inline-flex w-fit items-center gap-2 bg-oxblood px-3 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-on-oxblood">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" /> Downtown Wadsworth
          </span>

          <nav className="mt-6 flex flex-col">
            {navLinks.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={onClose}
                className={`group flex items-center justify-between border-b border-cream/10 py-4 font-display text-3xl text-cream/90 transition-transform duration-500 motion-reduce:transition-none hover:text-gold ${
                  shown ? 'translate-x-0' : 'translate-x-6'
                }`}
                style={{ transitionDelay: `${120 + i * 70}ms` }}
              >
                {l.label}
                <ArrowRight
                  size={20}
                  className="text-cream/30 transition-all group-hover:translate-x-1 group-hover:text-gold"
                />
              </Link>
            ))}
          </nav>

          <div
            className={`mt-8 flex flex-col gap-3 transition-transform duration-500 motion-reduce:transition-none ${
              shown ? 'translate-y-0' : 'translate-y-4'
            }`}
            style={{ transitionDelay: `${120 + navLinks.length * 70 + 60}ms` }}
          >
            <a
              href={company.phoneHref}
              className="flex items-center justify-center gap-2 bg-oxblood px-6 py-4 font-sans text-[12px] font-semibold uppercase tracking-[0.2em] text-on-oxblood transition-colors hover:bg-oxblood-2"
            >
              <Phone size={18} /> Call {company.phone}
            </a>
            <Link
              href="/reservations"
              onClick={onClose}
              className="flex items-center justify-center gap-2 border-2 border-gold px-6 py-4 font-sans text-[12px] font-semibold uppercase tracking-[0.2em] text-cream transition-colors hover:bg-gold hover:text-charcoal"
            >
              <CalendarCheck size={18} /> Reserve a Table
            </Link>
          </div>

          <div className="mt-auto space-y-3 pt-10 font-body text-cream/70">
            <a
              href={company.mapsDir}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-cream"
            >
              <MapPin size={18} className="shrink-0 text-gold" /> {company.addressOneLine}
            </a>
            <p className="flex items-start gap-3">
              <Clock size={18} className="mt-1 shrink-0 text-gold" />
              <span>
                {hoursCompact.map((h) => (
                  <span key={h.day} className="block">
                    {h.day}: {h.time}
                  </span>
                ))}
              </span>
            </p>
            <div className="flex items-center gap-5 pt-1">
              <a
                href={company.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Cambria's on Facebook"
                className="flex items-center gap-2 hover:text-cream"
              >
                <Facebook size={18} className="shrink-0 text-gold" /> Facebook
              </a>
              <a
                href={company.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Cambria's on Instagram"
                className="flex items-center gap-2 hover:text-cream"
              >
                <Instagram size={18} className="shrink-0 text-gold" /> Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
