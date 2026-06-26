import { Link, useLocation } from 'wouter'
import { CalendarHeart, Phone } from 'lucide-react'
import { company } from '../data/site'
import { useScrolled } from '../hooks/useScrolled'

// Floating "Reserve" action that fades in once the visitor scrolls past the
// hero. Sharp-cornered to match the brand. Shown on every page except the
// reservations page itself. Works on desktop (bottom-right) and mobile.
export default function StickyReserve() {
  const [location] = useLocation()
  const scrolled = useScrolled(560)
  const hidden = location === '/reservations'
  const shown = scrolled && !hidden

  return (
    <div
      className={`fixed bottom-4 right-4 z-40 flex items-center gap-2 transition-all duration-500 sm:bottom-6 sm:right-6 ${
        shown ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
      inert={!shown ? true : undefined}
    >
      <a
        href={company.eventsPhoneHref}
        aria-label={`Call to reserve, ${company.eventsPhone}`}
        className="inline-flex h-12 w-12 items-center justify-center bg-charcoal text-cream shadow-lg shadow-black/20 transition-colors hover:bg-charcoal-2"
      >
        <Phone size={18} className="text-gold-soft" />
      </a>
      <Link
        href="/reservations"
        className="inline-flex items-center gap-2 bg-oxblood px-5 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-on-oxblood shadow-xl shadow-black/25 transition-colors hover:bg-oxblood-2"
      >
        <CalendarHeart size={16} className="text-gold-soft" />
        Reserve a Table
      </Link>
    </div>
  )
}
