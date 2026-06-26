import { useState, useRef } from 'react'
import type { FormEvent } from 'react'
import { Check, ChevronDown, Phone, Clock, Users } from 'lucide-react'
import { company } from '../data/site'
import Backdrop from '../components/Backdrop'
import HoursList from '../components/HoursList'

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    .join('&')

const field =
  'w-full border border-line bg-paper px-4 py-3.5 text-body-md text-ink placeholder:text-ink-faint focus:border-oxblood focus:outline-none focus:ring-1 focus:ring-oxblood/30'
const labelCls = 'mb-2 block text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-faint'

export default function Reservations() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)
  const [firstName, setFirstName] = useState('')
  const formCardRef = useRef<HTMLDivElement>(null)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(false)
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form) as never) as Record<string, string>
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'reservation', ...data }),
      })
      if (!res.ok) throw new Error()
      setFirstName((data.name || '').trim().split(/\s+/)[0] || '')
      setSent(true)
      form.reset()
      requestAnimationFrame(() =>
        formCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
      )
    } catch {
      setError(true)
    }
  }

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative flex min-h-[52vh] items-end overflow-hidden">
        <Backdrop src="/images/interior-engaged.webp" position="center 60%" />
        <div className="container-x relative z-10 pb-14 pt-36 text-center">
          <p className="eyebrow on-dark mx-auto">Reserve Your Table</p>
          <h1 className="mt-4 font-display text-display-lg-mobile text-cream md:text-display-lg">
            Join us at Cambria&rsquo;s
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-body-lg text-cream-soft">
            Send a reservation request and we&rsquo;ll confirm your table by phone or email. For same-day
            tables or parties of eight or more, please call us directly.
          </p>
        </div>
      </section>

      {/* ---------- FORM + ASIDE ---------- */}
      <section className="bg-crema py-20 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          {/* Form */}
          <div className="reveal">
            <div ref={formCardRef} className="scroll-mt-28 border border-line bg-paper p-8 md:p-10">
              <p className="eyebrow">Reservation Request</p>
              <h2 className="mt-4 font-display text-headline-md text-ink">Tell us the details</h2>

              {sent ? (
                <div className="mt-8 flex flex-col items-center gap-4 border border-gold/50 bg-gold/8 px-6 py-12 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-oxblood text-on-oxblood">
                    <Check size={28} />
                  </span>
                  <p className="font-display text-headline-md text-ink">
                    Request received{firstName ? `, ${firstName}` : ''}!
                  </p>
                  <p className="text-body-md text-ink-soft">
                    Thank you. We&rsquo;ll reach out to confirm your table. A reservation isn&rsquo;t final
                    until we&rsquo;ve confirmed it, so if you don&rsquo;t hear back soon, please call us at{' '}
                    {company.eventsPhone}.
                  </p>
                </div>
              ) : (
                <form
                  name="reservation"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  onSubmit={onSubmit}
                  className="mt-7 space-y-5"
                >
                  <input type="hidden" name="form-name" value="reservation" />
                  <p className="hidden">
                    <label>
                      Don’t fill this out: <input name="bot-field" />
                    </label>
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelCls} htmlFor="r-name">Name</label>
                      <input id="r-name" className={field} type="text" name="name" required />
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="r-phone">Phone</label>
                      <input id="r-phone" className={field} type="tel" name="phone" required />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="r-email">Email</label>
                    <input id="r-email" className={field} type="email" name="email" required />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <label className={labelCls} htmlFor="r-date">Date</label>
                      <input id="r-date" className={field} type="date" name="date" required />
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="r-time">Time</label>
                      <input id="r-time" className={field} type="time" name="time" required />
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="r-party">Party size</label>
                      <div className="relative">
                        <select id="r-party" name="party" defaultValue="" required className={`${field} appearance-none pr-10`}>
                          <option value="" disabled>Guests</option>
                          {['1', '2', '3', '4', '5', '6', '7', '8+'].map((n) => (
                            <option key={n}>{n}</option>
                          ))}
                        </select>
                        <ChevronDown size={18} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="r-occasion">Occasion (optional)</label>
                    <input id="r-occasion" className={field} type="text" name="occasion" placeholder="Birthday, anniversary, date night…" />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="r-notes">Special requests (optional)</label>
                    <textarea id="r-notes" className={field} name="notes" rows={3} placeholder="Seating preferences, allergies, high chair…" />
                  </div>
                  {error && (
                    <p className="text-body-md text-error">
                      Something went wrong sending your request. Please try again, or call {company.eventsPhone}.
                    </p>
                  )}
                  <button
                    type="submit"
                    className="w-full bg-oxblood px-8 py-4 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-on-oxblood transition-colors hover:bg-oxblood-2"
                  >
                    Request Reservation
                  </button>
                  <p className="text-center text-[13px] text-ink-faint">
                    Requests are confirmed by our team, not booked instantly.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Aside */}
          <aside className="reveal space-y-8">
            <div className="border border-line bg-paper p-7">
              <span className="inline-flex h-11 w-11 items-center justify-center bg-oxblood/10 text-oxblood">
                <Phone size={20} />
              </span>
              <h3 className="mt-4 font-display text-headline-sm text-ink">Prefer to call?</h3>
              <p className="mt-2 text-body-md text-ink-soft">
                For same-day tables, large parties or private events, our team can help right away.
              </p>
              <a href={company.eventsPhoneHref} className="mt-3 inline-block font-display text-headline-sm text-oxblood hover:text-oxblood-2">
                {company.eventsPhone}
              </a>
            </div>

            <div className="border border-line bg-paper p-7">
              <span className="inline-flex h-11 w-11 items-center justify-center bg-oxblood/10 text-oxblood">
                <Users size={20} />
              </span>
              <h3 className="mt-4 font-display text-headline-sm text-ink">Large parties & events</h3>
              <p className="mt-2 text-body-md text-ink-soft">
                Planning something bigger? Our private dining room and catering team have you covered.
              </p>
              <a href="/events" className="mt-3 inline-block text-[13px] font-semibold uppercase tracking-[0.16em] text-gold-deep hover:text-oxblood">
                Events & Catering →
              </a>
            </div>

            <div className="border border-line bg-paper p-7">
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-gold-deep" />
                <h3 className="font-display text-headline-sm text-ink">Hours</h3>
              </div>
              <HoursList className="mt-3 -mx-2" />
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
