import { Link } from 'wouter'
import type { ReactNode } from 'react'

type Variant = 'oxblood' | 'charcoal' | 'gold-outline' | 'ghost' | 'cream'

const base =
  'inline-flex items-center justify-center gap-2 font-sans font-semibold uppercase tracking-[0.16em] text-[12px] px-8 py-4 transition-all active:scale-[0.98]'

const variants: Record<Variant, string> = {
  // Primary CTA, oxblood on crema
  oxblood: 'bg-oxblood text-on-oxblood hover:bg-oxblood-2',
  // Charcoal solid (per Stitch: primary buttons are charcoal w/ crema text)
  charcoal: 'bg-charcoal text-cream hover:bg-charcoal-2',
  // Secondary, 1px gold outline, no fill (Stitch spec)
  'gold-outline': 'border border-gold text-ink hover:bg-gold/10',
  // Gold outline on dark surfaces
  ghost: 'border border-gold/60 text-cream hover:border-gold hover:bg-gold/12',
  // Solid cream on dark surfaces
  cream: 'bg-cream text-charcoal hover:bg-cream-soft',
}

interface Props {
  readonly href: string
  readonly variant?: Variant
  readonly children: ReactNode
  readonly className?: string
  readonly external?: boolean
}

export default function Button({ href, variant = 'oxblood', children, className = '', external }: Props) {
  const cls = `${base} ${variants[variant]} ${className}`
  if (href.startsWith('/') && !external) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}
    </a>
  )
}
