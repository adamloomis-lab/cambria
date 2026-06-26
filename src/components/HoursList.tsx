import { useEffect, useState } from 'react'
import { hours } from '../data/site'

// Hours list that highlights the current day. "Today" is resolved client-side
// after mount, so the prerendered HTML carries no highlight (no hydration
// mismatch) and always reflects the visitor's real day.
//
// `tone="dark"` for charcoal/oxblood sections (footer), default light for crema.
export default function HoursList({
  short = false,
  tone = 'light',
  className = '',
}: {
  readonly short?: boolean
  readonly tone?: 'light' | 'dark'
  readonly className?: string
}) {
  const [todayDow, setTodayDow] = useState<number | null>(null)

  useEffect(() => {
    setTodayDow(new Date().getDay())
  }, [])

  const dark = tone === 'dark'
  const dayColor = dark ? 'text-cream-soft' : 'text-ink-soft'

  return (
    <ul className={`text-[15px] ${className}`}>
      {hours.map((h) => {
        const isToday = h.dow === todayDow
        const closed = h.time === 'Closed'
        const timeColor = closed
          ? dark
            ? 'text-cream-faint'
            : 'text-ink-faint'
          : isToday
            ? dark
              ? 'text-cream'
              : 'text-ink'
            : dark
              ? 'text-cream/80'
              : 'text-ink-soft'
        return (
          <li
            key={h.day}
            aria-current={isToday ? 'date' : undefined}
            className={`flex items-center justify-between gap-3 px-3 py-2 transition-colors ${
              isToday ? 'bg-gold/12 ring-1 ring-inset ring-gold/40' : ''
            }`}
          >
            <span
              className={`flex min-w-0 items-center gap-2 ${
                isToday ? 'font-semibold text-gold-deep' : dayColor
              } ${isToday && dark ? 'text-gold-soft' : ''}`}
            >
              {isToday && <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" aria-hidden="true" />}
              {short ? h.short : h.day}
              {isToday && !short && (
                <span className="bg-gold/18 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold-deep">
                  Today
                </span>
              )}
            </span>
            <span className={`shrink-0 whitespace-nowrap tabular-nums ${timeColor}`}>{h.time}</span>
          </li>
        )
      })}
    </ul>
  )
}
