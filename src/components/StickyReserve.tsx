import { Link, useLocation } from 'wouter'
import { CalendarHeart, ArrowRight } from 'lucide-react'
import { useScrolled } from '../hooks/useScrolled'

// Desktop-only floating "Reserve a Table" pill, revealed once the visitor
// scrolls past the hero. A glowing, sheened oxblood capsule with a gold ring
// that reads as premium. Hidden on the reservations page (the form is already
// there). Mobile uses the floating action bar instead.
export default function StickyReserve() {
  const [location] = useLocation()
  const scrolled = useScrolled(560)
  const hidden = location === '/reservations'
  const shown = scrolled && !hidden

  return (
    <Link
      href="/reservations"
      aria-hidden={!shown ? true : undefined}
      tabIndex={!shown ? -1 : undefined}
      className={`group fixed bottom-8 right-8 z-40 hidden items-center gap-2.5 overflow-hidden bg-gradient-to-br from-oxblood to-oxblood-2 px-7 py-4 font-sans text-[12px] font-bold uppercase tracking-[0.16em] text-on-oxblood shadow-[0_16px_44px_-8px_rgba(74,14,14,0.6)] ring-1 ring-gold/30 transition-all duration-300 hover:scale-[1.04] lg:flex ${
        shown
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-5 opacity-0'
      }`}
    >
      <span
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/30 blur-md group-hover:[animation:sheen_1s_ease]"
        aria-hidden="true"
      />
      <CalendarHeart size={18} className="text-gold-soft" aria-hidden="true" /> Reserve a Table
      <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  )
}
