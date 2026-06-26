import { Phone, MapPin, UtensilsCrossed } from 'lucide-react'
import { company } from '../data/site'

// Sticky mobile action bar — primary actions one thumb-tap away on every page.
// Mobile only (hidden on lg+). Accent falls back to white if the token is absent.
const ACCENT = 'var(--color-oxblood)'
const c = company as Record<string, any>
const directions =
  c.mapsDir ||
  'https://www.google.com/maps/dir/?api=1&destination=' +
    encodeURIComponent(c.addressOneLine || (c.address ? c.address.street + ', ' + c.address.city : c.name || ''))
const phone = c.phoneHref || 'tel:' + String(c.phone || '').replace(/[^\d+]/g, '')
const items = [
  { href: phone, label: 'Call', Icon: Phone, ext: false },
  { href: directions, label: 'Directions', Icon: MapPin, ext: true },
  { href: '/menu', label: 'Menu', Icon: UtensilsCrossed, ext: false },
]

export default function MobileActionBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-white/10 bg-black/92 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {items.map(({ href, label, Icon, ext }) => (
        <a
          key={label}
          href={href}
          {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="flex flex-col items-center justify-center gap-1 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-opacity active:opacity-70"
        >
          <Icon size={20} style={{ color: ACCENT }} aria-hidden="true" />
          {label}
        </a>
      ))}
    </nav>
  )
}
