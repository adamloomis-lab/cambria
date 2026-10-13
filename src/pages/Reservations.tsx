import { useEffect, useState, useRef } from 'react'
import type { FormEvent } from 'react'
import {
  Phone, Clock, Users, Send, ArrowRight, CalendarX,
  Cake, Heart, Wine, PartyPopper, UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react'
import { company, activeClosure, isDateInClosure, formatClosureDate, type Closure } from '../data/site'
import Backdrop from '../components/Backdrop'
import HoursList from '../components/HoursList'
import { FloatField, IconCards, SuccessCheck } from '../components/FluidField'

// The reservation form books through Cambria's Hub (company.hubUrl). The
// hub says which times the room can really seat for the party size and
// date, so only those are offered, and the booking lands in the hub's book
// with the guest emailed and the team notified. Same-day tables still have
// to clear the hub's notice window; anything it will not take says why.

const field =
  'w-full border border-line bg-paper px-4 py-3.5 text-body-md text-ink placeholder:text-ink-faint focus:border-oxblood focus:outline-none focus:ring-1 focus:ring-oxblood/30'
const labelCls = 'mb-2 block font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-faint'

const OCCASION_OPTIONS: { value: string; label: string; icon: LucideIcon }[] = [
  { value: 'Birthday', label: 'Birthday', icon: Cake },
  { value: 'Anniversary', label: 'Anniversary', icon: Heart },
  { value: 'Date Night', label: 'Date night', icon: Wine },
  { value: 'Celebration', label: 'Celebration', icon: PartyPopper },
  { value: 'Just Dinner', label: 'Just dinner', icon: UtensilsCrossed },
]

const MAX_PARTY = 8
const PARTY_OPTIONS = Array.from({ length: MAX_PARTY }, (_, i) => i + 1)

type Slot = { time: string; open: boolean }

// "18:30" -> "6:30 PM"
function clockTime(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const hr = h % 12 || 12
  return m === 0 ? `${hr} ${ampm}` : `${hr}:${String(m).padStart(2, '0')} ${ampm}`
}

function todayIso(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export default function Reservations() {
  const [sent, setSent] = useState<{ status: string; manage: string } | null>(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [occasion, setOccasion] = useState('')
  const [dateValue, setDateValue] = useState('')
  const [party, setParty] = useState(2)
  const [time, setTime] = useState('')
  const [slots, setSlots] = useState<Slot[] | null>(null)
  const [slotNote, setSlotNote] = useState('')
  const [upcomingClosure, setUpcomingClosure] = useState<Closure | null>(null)
  const formCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setUpcomingClosure(activeClosure())
    setDateValue(todayIso())
  }, [])

  const dateBlockedBy = isDateInClosure(dateValue)

  // Ask the hub which times are open for this date and party.
  useEffect(() => {
    if (!dateValue || dateBlockedBy) {
      setSlots(null)
      return
    }
    let stale = false
    setTime('')
    setSlots(null)
    setSlotNote('')
    fetch(`${company.hubUrl}/api/availability?date=${dateValue}&party=${party}`)
      .then((r) => r.json())
      .then((j: { slots?: Slot[]; error?: string }) => {
        if (stale) return
        setSlots(j.slots ?? [])
        if (j.error) setSlotNote(j.error)
      })
      .catch(() => {
        if (stale) return
        setSlots([])
        setSlotNote(`We could not check availability just now. Please call ${company.eventsPhone}.`)
      })
    return () => {
      stale = true
    }
  }, [dateValue, party, dateBlockedBy])

  const openSlots = (slots ?? []).filter((s) => s.open)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    if (dateBlockedBy) return
    if (!time) {
      setError('Pick a time.')
      return
    }
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form) as never) as Record<string, string>
    setBusy(true)
    try {
      const res = await fetch(`${company.hubUrl}/api/reserve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name, phone: data.phone, email: data.email,
          date: dateValue, time, party, occasion, notes: data.notes ?? '',
          website: data['bot-field'] ?? '',
        }),
      })
      const j = (await res.json().catch(() => ({}))) as { error?: string; status?: string; manage_url?: string; taken?: boolean }
      setBusy(false)
      if (!res.ok) {
        setError(j.error ?? `Something went wrong sending your request. Please try again, or call ${company.eventsPhone}.`)
        // That time was just taken: ask the hub again so the list is honest.
        if (j.taken) {
          setTime('')
          const again = await fetch(`${company.hubUrl}/api/availability?date=${dateValue}&party=${party}`).then((r) => r.json()).catch(() => null)
          if (again?.slots) setSlots(again.slots)
        }
        return
      }
      setFirstName((data.name || '').trim().split(/\s+/)[0] || '')
      setSent({ status: j.status ?? 'requested', manage: j.manage_url ?? '' })
      form.reset()
      setOccasion('')
      requestAnimationFrame(() =>
        formCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
      )
    } catch {
      setBusy(false)
      setError(`Something went wrong sending your request. Please try again, or call ${company.eventsPhone}.`)
    }
  }

  const confirmedNow = sent?.status === 'confirmed'

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative flex min-h-[52vh] items-end overflow-hidden">
        <Backdrop src="/images/stuffed-shells.webp" position="center 50%" />
        <div className="container-x relative z-10 pb-14 pt-36 text-center">
          <p className="eyebrow on-dark mx-auto">Reserve Your Table</p>
          <h1 className="mt-4 font-display text-display-lg-mobile text-cream md:text-display-lg">
            Join us at Cambria&rsquo;s
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-body-lg text-cream-soft">
            Pick a day and a party size and we show you the times we can seat you. Our team confirms
            every reservation by email. For parties of more than {MAX_PARTY}, please call us directly.
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

              {upcomingClosure && !sent && (
                <div className="mt-6 flex items-start gap-3 border border-oxblood/40 bg-oxblood/8 p-4 text-body-md">
                  <CalendarX size={20} className="mt-0.5 shrink-0 text-oxblood" aria-hidden="true" />
                  <p className="text-ink-soft">
                    <span className="font-semibold text-oxblood">Please note:</span>{' '}
                    We&rsquo;ll be closed{' '}
                    <span className="font-semibold text-ink">
                      {formatClosureDate(upcomingClosure.start)} – {formatClosureDate(upcomingClosure.end)}
                    </span>{' '}
                    for {upcomingClosure.reason}. Reservations for those dates aren&rsquo;t available.
                  </p>
                </div>
              )}

              {sent ? (
                <div className="rise mt-8 flex flex-col items-center gap-4 border border-gold/50 bg-gold/8 px-6 py-12 text-center">
                  <span className="flex h-16 w-16 items-center justify-center">
                    <SuccessCheck />
                  </span>
                  <p className="font-display text-headline-md text-ink">
                    {confirmedNow ? 'You' : 'Thank You'}{confirmedNow ? '’re all set' : ''}{firstName ? `, ${firstName}` : ''}!
                  </p>
                  <p className="max-w-md text-body-md text-ink-soft">
                    {confirmedNow
                      ? 'Your table is confirmed and a confirmation email is on its way.'
                      : 'We have your request and an email is on its way. A reservation isn’t final until our team confirms it, and you’ll get a second email the moment we do. If you don’t hear back soon, please give us a call.'}
                  </p>
                  {sent.manage && (
                    <a href={sent.manage} className="text-[13px] font-semibold uppercase tracking-[0.16em] text-gold-deep hover:text-oxblood">
                      Manage your reservation →
                    </a>
                  )}
                  <a
                    href={company.eventsPhoneHref}
                    className="group relative mt-1 inline-flex items-center gap-2 overflow-hidden bg-oxblood px-7 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-on-oxblood transition-colors hover:bg-oxblood-2"
                  >
                    <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/25 blur-md group-hover:[animation:sheen_0.9s_ease]" />
                    <Phone size={15} className="text-gold-soft" /> {company.eventsPhone}
                  </a>
                </div>
              ) : (
                <form name="reservation" onSubmit={onSubmit} className="mt-7 space-y-5">
                  <p className="hidden">
                    <label>
                      Don’t fill this out: <input name="bot-field" />
                    </label>
                  </p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelCls} htmlFor="r-date">Date</label>
                      <input
                        id="r-date"
                        className={`${field} ${dateBlockedBy ? 'border-oxblood ring-1 ring-oxblood/40' : ''}`}
                        type="date"
                        name="date"
                        min={todayIso()}
                        value={dateValue}
                        onChange={(e) => setDateValue(e.target.value)}
                        aria-invalid={dateBlockedBy ? true : undefined}
                        aria-describedby={dateBlockedBy ? 'r-date-error' : undefined}
                        required
                      />
                      {dateBlockedBy && (
                        <p id="r-date-error" className="mt-1.5 text-[13px] text-oxblood">
                          Closed for {dateBlockedBy.reason}. Please pick a date outside{' '}
                          {formatClosureDate(dateBlockedBy.start)} – {formatClosureDate(dateBlockedBy.end)}.
                        </p>
                      )}
                    </div>
                    <div>
                      <span className={labelCls}>Party size</span>
                      <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Party size">
                        {PARTY_OPTIONS.map((n) => (
                          <button
                            key={n}
                            type="button"
                            role="radio"
                            aria-checked={party === n}
                            onClick={() => setParty(n)}
                            className={`h-11 min-w-11 border px-3 font-sans text-[14px] font-semibold transition-colors ${party === n ? 'border-oxblood bg-oxblood text-on-oxblood' : 'border-line bg-paper text-ink hover:border-oxblood'}`}
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className={labelCls}>
                      Time{slots && openSlots.length > 0 ? ` · ${openSlots.length} open` : ''}
                    </span>
                    {dateBlockedBy ? null : slots === null ? (
                      <p className="text-body-md text-ink-faint">Checking the book…</p>
                    ) : slots.length === 0 ? (
                      <p className="text-body-md text-ink-soft">{slotNote || 'We are closed that day.'}</p>
                    ) : openSlots.length === 0 ? (
                      <p className="text-body-md text-ink-soft">
                        Nothing is open for {party} that day. Try another day, or call {company.eventsPhone} and we&rsquo;ll do our best.
                      </p>
                    ) : (
                      <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-6" role="radiogroup" aria-label="Time">
                        {slots.map((s) => (
                          <button
                            key={s.time}
                            type="button"
                            role="radio"
                            aria-checked={time === s.time}
                            disabled={!s.open}
                            onClick={() => setTime(s.time)}
                            className={`h-11 border font-sans text-[13.5px] font-semibold transition-colors ${time === s.time ? 'border-oxblood bg-oxblood text-on-oxblood' : s.open ? 'border-line bg-paper text-ink hover:border-oxblood' : 'border-line/50 bg-crema text-ink-faint/50 line-through'}`}
                          >
                            {clockTime(s.time)}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FloatField idPrefix="r" name="name" label="Name" required />
                    <FloatField idPrefix="r" name="phone" label="Phone" type="tel" required />
                  </div>
                  <FloatField idPrefix="r" name="email" label="Email" type="email" required />

                  <IconCards
                    legend="Occasion (optional)"
                    options={OCCASION_OPTIONS}
                    value={occasion}
                    onChange={setOccasion}
                  />

                  <FloatField
                    idPrefix="r"
                    name="notes"
                    label="Special requests (seating, allergies, high chair…)"
                    textarea
                    rows={3}
                  />
                  {error && (
                    <p className="text-body-md text-error" role="alert">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={!!dateBlockedBy || busy || !time}
                    className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden bg-oxblood px-8 py-4 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-on-oxblood transition-colors hover:bg-oxblood-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-oxblood"
                  >
                    <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/25 blur-md group-hover:[animation:sheen_0.9s_ease]" />
                    <Send size={14} /> {busy ? 'Sending' : 'Request Reservation'}
                    <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
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
                Hosting a rehearsal dinner, shower, birthday or business gathering? We host private
                events in the restaurant. Get in touch and we&rsquo;ll plan it together.
              </p>
              <a href="/contact" className="mt-3 inline-block text-[13px] font-semibold uppercase tracking-[0.16em] text-gold-deep hover:text-oxblood">
                Contact Us →
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
