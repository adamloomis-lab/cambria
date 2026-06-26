import type { ReactNode } from 'react'

// Shared shell for the Privacy / Terms / Accessibility pages: charcoal header +
// crema prose column with consistent typography.
export default function LegalLayout({
  title,
  updated,
  children,
}: {
  readonly title: string
  readonly updated: string
  readonly children: ReactNode
}) {
  return (
    <>
      <section className="relative overflow-hidden bg-charcoal">
        <div className="container-x relative z-10 pt-36 pb-14 text-center">
          <p className="eyebrow on-dark">Cambria's Bistro</p>
          <h1 className="mt-4 font-display text-display-lg-mobile text-cream md:text-[56px]">{title}</h1>
          <p className="mt-4 text-label-lg uppercase tracking-[0.18em] text-cream-faint">
            Last updated {updated}
          </p>
        </div>
      </section>

      <section className="bg-crema py-20 md:py-24">
        <div className="container-x max-w-3xl">
          <div className="legal-prose space-y-2 text-body-md text-ink-soft">{children}</div>
          <p className="mt-12 border border-line bg-paper p-5 text-[13px] text-ink-faint">
            This page is provided for general informational purposes and is not legal advice. Please
            review it with your own counsel to confirm it fits your needs.
          </p>
        </div>
      </section>
    </>
  )
}
