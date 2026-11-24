import { useEffect, useState } from 'react'
import { holidayHours, upcomingHolidayHours, type HolidayHour } from '../data/site'

// Holiday hours from data/site.ts. Lines drop off the day after their date
// (Eastern time) and the block hides once all have passed. The prerendered
// HTML carries the full list; the filter runs after mount so it uses the
// visitor's "today", not the build's.
export function useHolidayHours(): HolidayHour[] {
  const [list, setList] = useState<HolidayHour[]>(holidayHours)
  useEffect(() => {
    setList(upcomingHolidayHours())
  }, [])
  return list
}

export default function HolidayHours({
  tone = 'light',
  heading = true,
  className = '',
}: {
  readonly tone?: 'light' | 'dark'
  readonly heading?: boolean
  readonly className?: string
}) {
  const list = useHolidayHours()
  if (list.length === 0) return null
  const dark = tone === 'dark'
  return (
    <div className={className}>
      {heading && (
        <h3 className={`font-display text-headline-sm ${dark ? 'text-cream' : 'text-ink'}`}>Holiday hours</h3>
      )}
      <ul className={`${heading ? 'mt-4' : ''} text-[15px]`}>
        {list.map((h) => {
          const closed = h.time === 'Closed'
          return (
            <li
              key={h.date}
              className={`flex items-baseline justify-between gap-4 border-b py-2.5 last:border-b-0 ${dark ? 'border-line-dark' : 'border-line'}`}
            >
              <span className={dark ? 'text-cream-soft' : 'text-ink-soft'}>
                {h.label}
                {h.note && <span className={`block text-[13px] ${dark ? 'text-cream-faint' : 'text-ink-faint'}`}>{h.note}</span>}
              </span>
              <span
                className={`whitespace-nowrap font-semibold ${
                  closed ? (dark ? 'text-gold-soft' : 'text-oxblood') : dark ? 'text-cream' : 'text-ink'
                }`}
              >
                {h.time}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
