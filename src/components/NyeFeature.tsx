import { useEffect, useState } from 'react'
import { company, nyeDinner, easternToday, formatClosureDate } from '../data/site'
import Button from './Button'

// True until New Year's Eve has passed (Eastern time). Starts true so the
// prerendered HTML carries the feature; the check runs after mount so the date
// is the visitor's "now", not the build's.
export function useNyeLive(): boolean {
  const [live, setLive] = useState(true)
  useEffect(() => {
    setLive(easternToday() <= nyeDinner.date)
  }, [])
  return live
}

// New Year's Eve dinner feature: the owner's flyer beside the same details as
// real text (readable, searchable, and usable by screen readers).
export default function NyeFeature() {
  return (
    <section
      id="new-years-eve"
      aria-labelledby="nye-title"
      className="scroll-mt-20 border-t border-gold/30 bg-charcoal py-20 md:py-28"
    >
      <div className="container-x grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
        <div className="reveal order-2 lg:order-1">
          <div className="relative mx-auto w-full max-w-[420px]">
            <img
              src={nyeDinner.flyer}
              alt={nyeDinner.flyerAlt}
              width={1545}
              height={1999}
              loading="lazy"
              className="block h-auto w-full border border-gold/40 shadow-[0_24px_60px_-18px_rgba(0,0,0,0.8)]"
            />
            <span className="pointer-events-none absolute -bottom-3 -left-3 hidden h-24 w-24 border-b border-l border-gold md:block" />
          </div>
        </div>

        <div className="reveal order-1 lg:order-2">
          <p className="eyebrow on-dark">{formatClosureDate(nyeDinner.date)}</p>
          <h2 id="nye-title" className="mt-4 font-display text-headline-lg text-cream md:text-[44px]">
            {nyeDinner.title}
          </h2>
          <span className="gold-rule mt-6 block w-[64px]" />
          <p className="mt-7 max-w-xl text-body-lg text-cream-soft">{nyeDinner.intro}</p>

          <dl className="mt-8 max-w-xl border-t border-line-dark">
            {nyeDinner.details.map((d) => (
              <div
                key={d.label}
                className="grid gap-1 border-b border-line-dark py-4 sm:grid-cols-[9.5rem_1fr] sm:gap-6"
              >
                <dt className="pt-1 text-label-sm uppercase text-gold-soft">{d.label}</dt>
                <dd className="text-body-md text-cream">{d.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href={`/reservations?date=${nyeDinner.date}`} variant="cream">
              Reserve for New Year&rsquo;s Eve
            </Button>
            <Button href={company.eventsPhoneHref} variant="ghost">
              Catering: {company.eventsPhone}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
