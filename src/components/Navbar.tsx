import { useState } from 'react'
import { Link, useLocation } from 'wouter'
import { Menu, Phone } from 'lucide-react'
import Logo from './Logo'
import MobileMenu from './MobileMenu'
import { company } from '../data/site'
import { useScrolled } from '../hooks/useScrolled'

const links = [
  { label: 'Menu', href: '/menu' },
  { label: 'Our Story', href: '/about' },
  { label: 'Reservations', href: '/reservations' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [location] = useLocation()
  const scrolled = useScrolled(40)

  // Solid crema bar once scrolled (or menu open); translucent over the hero.
  const solid = scrolled || open

  const linkBase = 'font-sans text-[12px] font-semibold uppercase tracking-[0.18em] transition-colors'

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        solid
          ? 'border-b border-line bg-crema/95 backdrop-blur-md'
          : 'border-b border-transparent bg-gradient-to-b from-black/45 to-transparent'
      }`}
    >
      <nav className="container-x flex h-20 items-center justify-between">
        <Logo onDark={!solid} className="h-11 sm:h-12" />

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => {
            const active = l.href === location
            const color = solid
              ? active
                ? 'text-oxblood'
                : 'text-ink-soft hover:text-oxblood'
              : 'text-cream/90 hover:text-white'
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`${linkBase} ${color} relative after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-gold after:transition-all after:duration-300 ${
                  active ? 'after:w-full' : 'after:w-0 hover:after:w-full'
                }`}
              >
                {l.label}
              </Link>
            )
          })}
          <a
            href={company.phoneHref}
            className={`inline-flex items-center gap-2 ${linkBase} ${
              solid ? 'text-ink hover:text-oxblood' : 'text-cream/90 hover:text-white'
            }`}
          >
            <Phone size={14} className="text-gold" /> {company.phone}
          </a>
          <Link
            href="/reservations"
            className="inline-flex items-center bg-oxblood px-6 py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-on-oxblood transition-colors hover:bg-oxblood-2"
          >
            Reserve
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className={solid ? 'text-ink lg:hidden' : 'text-cream lg:hidden'}
          aria-label="Open menu"
          aria-expanded={open}
        >
          <Menu size={28} />
        </button>
      </nav>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  )
}
