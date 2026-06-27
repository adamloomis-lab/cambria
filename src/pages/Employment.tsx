import { useState, useRef } from 'react'
import type { FormEvent } from 'react'
import {
  Phone, Send, ArrowRight, Users, HandPlatter, ChefHat,
  UtensilsCrossed, Wine, Flame, Soup, GlassWater, ConciergeBell, Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { company } from '../data/site'
import { FloatField, IconCards, LightSelect, SuccessCheck } from '../components/FluidField'

const perks = [
  { icon: Users, title: 'A Family Table', blurb: 'A close, family-run team that looks out for each other, shift after shift.' },
  { icon: ChefHat, title: 'Made From Scratch', blurb: 'Learn a real Italian kitchen, from house marinara and fresh pasta to hand-rolled stromboli.' },
  { icon: HandPlatter, title: 'Honest Pay & Tips', blurb: 'Competitive pay, a steady downtown crowd, and a room people love to return to.' },
]

// Position icon cards. `value` stays identical to the old <select> so Netlify
// receives the same `position` field.
const POSITION_OPTIONS: { value: string; label: string; icon: LucideIcon }[] = [
  { value: 'Server / Waitstaff', label: 'Server', icon: UtensilsCrossed },
  { value: 'Bartender', label: 'Bartender', icon: Wine },
  { value: 'Line Cook', label: 'Line cook', icon: Flame },
  { value: 'Prep Cook', label: 'Prep cook', icon: Soup },
  { value: 'Dishwasher', label: 'Dishwasher', icon: GlassWater },
  { value: 'Host', label: 'Host', icon: ConciergeBell },
  { value: 'Anything available', label: 'Anything', icon: Sparkles },
]

const AVAILABILITY_OPTIONS = ['Full-time', 'Part-time', 'Either']

export default function Employment() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [position, setPosition] = useState('')
  const formCardRef = useRef<HTMLDivElement>(null)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(false)
    const form = e.currentTarget
    const fd = new FormData(form)
    const nameVal = String(fd.get('name') || '')
    try {
      const res = await fetch('/', { method: 'POST', body: fd })
      if (!res.ok) throw new Error()
      setFirstName(nameVal.trim().split(/\s+/)[0] || '')
      setSent(true)
      form.reset()
      setPosition('')
      requestAnimationFrame(() =>
        formCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
      )
    } catch {
      setError(true)
    }
  }

  return (
    <>
      {/* ---------- HEADER ---------- */}
      <section className="relative overflow-hidden bg-charcoal">
        <div className="container-x relative z-10 pt-36 pb-16 text-center">
          <p className="eyebrow on-dark">Now Hiring in Downtown Wadsworth</p>
          <h1 className="mt-4 font-display text-display-lg-mobile text-cream md:text-display-lg">
            Join the family.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-body-lg text-cream-soft">
            We&rsquo;re always looking for warm, hard-working people to help us serve Wadsworth great
            Italian food. Tell us about yourself and we&rsquo;ll be in touch.
          </p>
        </div>
      </section>

      {/* ---------- WHY WORK HERE ---------- */}
      <section className="bg-crema py-20 md:py-24">
        <div className="container-x">
          <div className="reveal-group grid gap-10 sm:grid-cols-3">
            {perks.map((p) => (
              <div key={p.title}>
                <span className="inline-flex h-12 w-12 items-center justify-center bg-oxblood/10 text-oxblood">
                  <p.icon size={22} />
                </span>
                <h3 className="mt-5 font-display text-headline-sm text-ink">{p.title}</h3>
                <p className="mt-2 text-body-md text-ink-soft">{p.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- APPLICATION ---------- */}
      <section className="bg-crema-soft py-20 md:py-24">
        <div className="container-x max-w-2xl">
          <div ref={formCardRef} className="scroll-mt-28 border border-line bg-paper p-8 md:p-10">
            <p className="eyebrow">Apply Online</p>
            <h2 className="mt-4 font-display text-headline-md text-ink">Tell us about yourself</h2>

            {sent ? (
              <div className="rise mt-8 flex flex-col items-center gap-4 border border-gold/50 bg-gold/8 px-6 py-12 text-center">
                <span className="flex h-16 w-16 items-center justify-center">
                  <SuccessCheck />
                </span>
                <p className="font-display text-headline-md text-ink">
                  Thank You{firstName ? `, ${firstName}` : ''}!
                </p>
                <p className="max-w-md text-body-md text-ink-soft">
                  We&rsquo;ve got your application and we&rsquo;ll review it soon. If it looks like a fit,
                  we&rsquo;ll reach out to set up a time to chat. Questions? Give us a call.
                </p>
                <a
                  href={company.phoneHref}
                  className="group relative mt-1 inline-flex items-center gap-2 overflow-hidden bg-oxblood px-7 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-on-oxblood transition-colors hover:bg-oxblood-2"
                >
                  <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/25 blur-md group-hover:[animation:sheen_0.9s_ease]" />
                  <Phone size={15} className="text-gold-soft" /> {company.phone}
                </a>
              </div>
            ) : (
              <form
                name="application"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                encType="multipart/form-data"
                onSubmit={onSubmit}
                className="mt-7 space-y-5"
              >
                <input type="hidden" name="form-name" value="application" />
                {/* Mirrors the icon-card selection into the Netlify `position` field. */}
                <input type="hidden" name="position" value={position} />
                <p className="hidden">
                  <label>
                    Don’t fill this out: <input name="bot-field" />
                  </label>
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FloatField idPrefix="app" name="name" label="Full name" required />
                  <FloatField idPrefix="app" name="phone" label="Phone" type="tel" required />
                </div>
                <FloatField idPrefix="app" name="email" label="Email" type="email" required />

                <IconCards
                  legend="What are you interested in?"
                  options={POSITION_OPTIONS}
                  value={position}
                  onChange={setPosition}
                  smCols={4}
                />

                <LightSelect
                  idPrefix="app"
                  name="availability"
                  label="Availability"
                  options={AVAILABILITY_OPTIONS}
                  placeholder="Select availability…"
                  required
                />

                <FloatField
                  idPrefix="app"
                  name="experience"
                  label="Tell us a little about your experience and when you can start"
                  textarea
                  rows={4}
                />
                <div>
                  <label htmlFor="resume" className="mb-2 block font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                    Resume (optional, PDF or Word)
                  </label>
                  <input
                    id="resume"
                    className="w-full border border-line bg-paper px-4 py-3 text-body-md text-ink-soft file:mr-4 file:border-0 file:bg-oxblood file:px-4 file:py-2 file:font-sans file:text-[12px] file:font-semibold file:uppercase file:tracking-[0.14em] file:text-on-oxblood hover:file:bg-oxblood-2"
                    type="file"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                  />
                </div>
                {error && (
                  <p className="text-body-md text-error">
                    Oops, something went wrong sending your application. Please try again, or call us at{' '}
                    {company.phone}.
                  </p>
                )}
                <button
                  type="submit"
                  className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden bg-oxblood px-8 py-4 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-on-oxblood transition-colors hover:bg-oxblood-2"
                >
                  <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/25 blur-md group-hover:[animation:sheen_0.9s_ease]" />
                  <Send size={14} /> Submit Application
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
