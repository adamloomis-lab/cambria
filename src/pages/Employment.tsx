import { useState, useRef } from 'react'
import type { FormEvent } from 'react'
import { Check, ChevronDown, Users, HandPlatter, ChefHat } from 'lucide-react'
import { company } from '../data/site'

const perks = [
  { icon: Users, title: 'A Family Table', blurb: 'A close, family-run team that looks out for each other, shift after shift.' },
  { icon: ChefHat, title: 'Made From Scratch', blurb: 'Learn a real Italian kitchen, from house marinara and fresh pasta to hand-rolled stromboli.' },
  { icon: HandPlatter, title: 'Honest Pay & Tips', blurb: 'Competitive pay, a steady downtown crowd, and a room people love to return to.' },
]

const field =
  'w-full border border-line bg-paper px-4 py-3.5 text-body-md text-ink placeholder:text-ink-faint focus:border-oxblood focus-visible:outline-none focus:ring-1 focus:ring-oxblood/30'

export default function Employment() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)
  const [firstName, setFirstName] = useState('')
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
              <div className="mt-8 flex flex-col items-center gap-4 border border-gold/50 bg-gold/8 px-6 py-12 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-oxblood text-on-oxblood">
                  <Check size={28} />
                </span>
                <p className="font-display text-headline-md text-ink">
                  Thanks{firstName ? `, ${firstName}` : ''}!
                </p>
                <p className="text-body-md text-ink-soft">
                  We&rsquo;ve got your application and we&rsquo;ll review it soon. If it looks like a fit,
                  we&rsquo;ll reach out to set up a time to chat. Questions? Call us at {company.phone}.
                </p>
              </div>
            ) : (
              <form
                name="application"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                encType="multipart/form-data"
                onSubmit={onSubmit}
                className="mt-7 space-y-4"
              >
                <input type="hidden" name="form-name" value="application" />
                <p className="hidden">
                  <label>
                    Don’t fill this out: <input name="bot-field" />
                  </label>
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="app-name" className="sr-only">Full name</label>
                    <input id="app-name" className={field} type="text" name="name" placeholder="Full name" required />
                  </div>
                  <div>
                    <label htmlFor="app-phone" className="sr-only">Phone</label>
                    <input id="app-phone" className={field} type="tel" name="phone" placeholder="Phone" required />
                  </div>
                </div>
                <label htmlFor="app-email" className="sr-only">Email</label>
                <input id="app-email" className={field} type="email" name="email" placeholder="Email" required />
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="relative">
                    <label htmlFor="app-position" className="sr-only">Position of interest</label>
                    <select id="app-position" name="position" defaultValue="" required className={`${field} appearance-none pr-11`}>
                      <option value="" disabled>Position of interest</option>
                      <option>Server / Waitstaff</option>
                      <option>Bartender</option>
                      <option>Line Cook</option>
                      <option>Prep Cook</option>
                      <option>Dishwasher</option>
                      <option>Host</option>
                      <option>Anything available</option>
                    </select>
                    <ChevronDown size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-faint" />
                  </div>
                  <div className="relative">
                    <label htmlFor="app-availability" className="sr-only">Availability</label>
                    <select id="app-availability" name="availability" defaultValue="" required className={`${field} appearance-none pr-11`}>
                      <option value="" disabled>Availability</option>
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Either</option>
                    </select>
                    <ChevronDown size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-faint" />
                  </div>
                </div>
                <label htmlFor="app-experience" className="sr-only">Experience and availability</label>
                <textarea
                  id="app-experience"
                  className={field}
                  name="experience"
                  rows={4}
                  placeholder="Tell us a little about your experience and when you can start"
                />
                <div>
                  <label htmlFor="resume" className="mb-2 block text-[12px] uppercase tracking-[0.14em] text-ink-faint">
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
                  className="w-full bg-oxblood px-8 py-4 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-on-oxblood transition-colors hover:bg-oxblood-2"
                >
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
