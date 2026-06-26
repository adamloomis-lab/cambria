import { Link } from 'wouter'
import { Phone, MapPin, Facebook, Instagram, CalendarHeart, ShoppingBag } from 'lucide-react'
import Logo from './Logo'
import { company, hoursCompact } from '../data/site'

const explore = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'Our Story', href: '/about' },
  { label: 'Events & Catering', href: '/events' },
  { label: 'Reservations', href: '/reservations' },
  { label: 'Contact & Directions', href: '/contact' },
  { label: 'Employment', href: '/employment' },
]

const policies = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Accessibility', href: '/accessibility' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line-dark bg-charcoal text-cream-soft">
      <div className="container-x grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo onDark className="h-20" />
          <p className="mt-5 max-w-xs text-body-md text-cream-soft">{company.shortBlurb}</p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href={company.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center border border-line-dark text-cream transition-colors hover:border-gold hover:text-gold"
              aria-label="Cambria's Bistro on Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href={company.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center border border-line-dark text-cream transition-colors hover:border-gold hover:text-gold"
              aria-label="Cambria's Bistro on Instagram"
            >
              <Instagram size={18} />
            </a>
          </div>
          <a
            href={company.doordashUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 border border-gold/60 px-5 py-3 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:border-gold hover:bg-gold/12"
          >
            <ShoppingBag size={15} className="text-gold-soft" /> Order on DoorDash
          </a>
        </div>

        <div>
          <h3 className="font-display text-headline-sm text-cream">Visit</h3>
          <ul className="mt-5 space-y-4 text-body-md">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-gold" />
              <a href={company.mapsDir} target="_blank" rel="noopener noreferrer" className="hover:text-cream">
                {company.address.street}
                <br />
                {company.address.city}, {company.address.state} {company.address.zip}
              </a>
            </li>
            <li>
              <a href={company.phoneHref} className="flex items-start gap-3 hover:text-cream">
                <Phone size={18} className="mt-0.5 shrink-0 text-gold" />
                <span>
                  {company.phone}
                  <span className="block text-[12px] uppercase tracking-[0.14em] text-cream-faint">
                    Dining
                  </span>
                </span>
              </a>
            </li>
            <li>
              <a href={company.eventsPhoneHref} className="flex items-start gap-3 hover:text-cream">
                <CalendarHeart size={18} className="mt-0.5 shrink-0 text-gold" />
                <span>
                  {company.eventsPhone}
                  <span className="block text-[12px] uppercase tracking-[0.14em] text-cream-faint">
                    Reservations & Catering
                  </span>
                </span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-headline-sm text-cream">Hours</h3>
          <ul className="mt-5 space-y-3 text-body-md">
            {hoursCompact.map((h) => (
              <li key={h.day} className="flex items-baseline justify-between gap-3">
                <span className="text-cream-soft">{h.day}</span>
                <span className="whitespace-nowrap text-cream">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-headline-sm text-cream">Explore</h3>
          <ul className="mt-5 space-y-3 text-body-md">
            {explore.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-cream">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line-dark">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-label-sm uppercase tracking-[0.16em] text-cream-faint sm:flex-row">
          <span className="order-2 sm:order-1">
            © {year} {company.name}. All rights reserved.
          </span>
          <div className="order-1 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:order-2">
            {policies.map((p) => (
              <Link key={p.href} href={p.href} className="transition-colors hover:text-cream">
                {p.label}
              </Link>
            ))}
          </div>
          <span className="order-3">
            Website by{' '}
            <a
              href="https://adamloomis.online"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream-soft transition-colors hover:text-gold"
            >
              AdamLoomis.online
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
