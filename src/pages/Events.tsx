import { Phone, Check } from 'lucide-react'
import { company, eventInfo } from '../data/site'
import Backdrop from '../components/Backdrop'
import Button from '../components/Button'
import SectionHeading from '../components/SectionHeading'

export default function Events() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden">
        <Backdrop src="/images/event-space.webp" position="center 45%" />
        <div className="container-x relative z-10 pb-14 pt-36 text-center">
          <p className="eyebrow on-dark mx-auto">Private Events & Catering</p>
          <h1 className="mt-4 font-display text-display-lg-mobile text-cream md:text-display-lg">
            For the moments worth gathering
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-body-lg text-cream-soft">
            A private dining room beneath exposed brick and warm light, plus off-site catering across the
            Wadsworth area.
          </p>
        </div>
      </section>

      {/* ---------- INTRO + CAPABILITIES ---------- */}
      <section className="bg-crema py-24 md:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          <div className="reveal">
            <p className="eyebrow">Host With Us</p>
            <h2 className="mt-4 font-display text-headline-lg text-ink md:text-[44px]">
              Celebrations, made effortless
            </h2>
            <span className="gold-rule mt-6 block w-[64px]" />
            <p className="mt-7 text-body-lg text-ink-soft">{eventInfo.blurb}</p>
            <ul className="check-list mt-8 space-y-3 text-body-md text-ink-soft">
              {eventInfo.capabilities.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <div className="reveal">
            <img
              src="/images/event-table-long.webp"
              alt="A long banquet table set for a private gathering at Cambria's"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ---------- GALLERY ---------- */}
      <section className="bg-crema-soft py-24 md:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="The Room"
            title="A space that sets the mood"
            intro="Exposed brick, white linens and soft light, ready to dress up or keep relaxed."
          />
          <div className="reveal-group mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {eventInfo.gallery.map((g) => (
              <img
                key={g.src}
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="aspect-[3/4] w-full object-cover"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CATERING NOTE ---------- */}
      <section className="bg-charcoal py-24 md:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div className="reveal">
            <p className="eyebrow on-dark">Off-Site Catering</p>
            <h2 className="mt-4 font-display text-headline-lg text-cream md:text-[40px]">
              We&rsquo;ll bring Cambria&rsquo;s to you
            </h2>
            <span className="gold-rule mt-6 block w-[64px]" />
            <p className="mt-7 text-body-lg text-cream-soft">
              From family-style trays of Nonna&rsquo;s lasagna to full plated service with a bar, we cater
              showers, corporate lunches, graduations and holidays throughout the Wadsworth area. Tell us
              what you&rsquo;re planning and we&rsquo;ll build a menu around it.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href="/contact" variant="cream">
                Request a Quote
              </Button>
              <a
                href={company.eventsPhoneHref}
                className="inline-flex items-center gap-2 border border-gold/60 px-8 py-4 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:border-gold hover:bg-gold/12"
              >
                <Phone size={16} className="text-gold-soft" /> {company.eventsPhone}
              </a>
            </div>
          </div>
          <div className="reveal grid grid-cols-2 gap-5">
            {[
              { src: '/images/stuffed-shells.webp', alt: 'Stuffed shells with house marinara' },
              { src: '/images/fettuccine-chicken-alfredo.webp', alt: 'Fettuccine alfredo with grilled chicken' },
              { src: '/images/dessert-chocolate.webp', alt: 'Warm chocolate dessert' },
              { src: '/images/wine-selection.webp', alt: 'A selection of wines at the bar' },
            ].map((g) => (
              <img key={g.src} src={g.src} alt={g.alt} loading="lazy" className="aspect-square w-full object-cover" />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="bg-oxblood py-20 text-center">
        <div className="container-x">
          <span className="mx-auto flex h-14 w-14 items-center justify-center bg-cream/10 text-gold-soft">
            <Check size={26} />
          </span>
          <h2 className="mt-6 font-display text-headline-lg text-on-oxblood md:text-[40px]">
            Let&rsquo;s plan your event
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-body-lg text-cream-soft">
            Call our events team at {company.eventsPhone}, or send the details and we&rsquo;ll be in touch.
          </p>
          <div className="mt-9">
            <Button href="/contact" variant="cream">
              Start Planning
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
