import type { ReactNode } from 'react'

// Section heading. `tone="dark"` is for charcoal/oxblood sections (cream type);
// default light tone is for crema sections (ink type).
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'center',
  tone = 'light',
  className = '',
}: {
  readonly eyebrow?: string
  readonly title: ReactNode
  readonly intro?: ReactNode
  readonly align?: 'center' | 'left'
  readonly tone?: 'light' | 'dark'
  readonly className?: string
}) {
  const centered = align === 'center'
  const titleColor = tone === 'dark' ? 'text-cream' : 'text-ink'
  const introColor = tone === 'dark' ? 'text-cream-soft' : 'text-ink-soft'
  return (
    <div className={`${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}>
      {eyebrow && <p className={`eyebrow ${tone === 'dark' ? 'on-dark' : ''}`}>{eyebrow}</p>}
      <h2 className={`mt-4 font-display text-headline-lg md:text-[44px] ${titleColor}`}>{title}</h2>
      <span className={`gold-rule mt-6 ${centered ? 'centered mx-auto block w-[64px]' : ''}`} />
      {intro && <p className={`mt-6 text-body-lg ${introColor}`}>{intro}</p>}
    </div>
  )
}
