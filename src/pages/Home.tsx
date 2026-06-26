import type { CSSProperties } from 'react'
import { Link } from 'wouter'
import { Phone, CalendarHeart, Star, Quote } from 'lucide-react'
import { company, aboutParagraphs, featurePillars, featuredDishes, barHighlights, reviews } from '../data/site'
import Backdrop from '../components/Backdrop'
import HeroSlideshow from '../components/HeroSlideshow'
import Button from '../components/Button'
import SectionHeading from '../components/SectionHeading'
import Divider from '../components/Divider'

// Appetizing food shots that cross-fade behind the hero for gentle movement.
const heroImages = [
  { src: '/images/spaghetti-pomodoro.webp', position: 'center 55%' },
  { src: '/images/tortellini-vodka.webp', position: 'center 55%' },
  { src: '/images/fettuccine-pomodoro.webp', position: 'center 50%' },
  { src: '/images/caprese.webp', position: 'center 50%' },
  { src: '/images/stuffed-shells.webp', position: 'center 55%' },
]

export default function Home() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden">
        <HeroSlideshow images={heroImages} />
        <div className="container-x relative z-10 w-full pt-24 text-center">
          <p className="eyebrow on-dark mx-auto rise">Downtown Wadsworth · Italian Bistro & Bar</p>
          <h1 className="rise rise-1 mx-auto mt-6 max-w-4xl font-display text-display-lg-mobile text-cream md:text-display-xl">
            Time-Honored Favorites,
            <span className="block italic text-gold-soft">Today&rsquo;s Brightest Flavors</span>
          </h1>
          <p className="rise rise-2 mx-auto mt-7 max-w-xl text-body-lg text-cream-soft">
            A family-owned Italian bistro where old-world recipes meet the warmth of a modern grill and
            pub, in the heart of Main Street.
          </p>
          <div className="rise rise-3 mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button href="/menu" variant="cream">
              View the Menu
            </Button>
            <Button href="/reservations" variant="ghost">
              Reserve a Table
            </Button>
          </div>
        </div>
      </section>

      {/* ---------- ABOUT TEASER ---------- */}
      <section className="bg-crema py-24 md:py-28">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <div className="reveal">
            <p className="eyebrow">Our Story</p>
            <h2 className="mt-4 font-display text-headline-lg text-ink md:text-[44px]">
              A family table in downtown Wadsworth
            </h2>
            <span className="gold-rule mt-6 block w-[64px]" />
            <p className="mt-7 text-body-lg text-ink-soft">{aboutParagraphs[0]}</p>
            <p className="mt-4 text-body-md text-ink-soft">{aboutParagraphs[2]}</p>
            <Link
              href="/about"
              className="mt-8 inline-block text-[12px] font-semibold uppercase tracking-[0.18em] text-gold-deep transition-colors hover:text-oxblood"
            >
              Read Our Story →
            </Link>
          </div>
          <div className="reveal relative">
            <div className="relative aspect-[4/5] overflow-hidden">
              <div className="parallax absolute -inset-y-[8%] inset-x-0" style={{ ['--p-amt']: '36px' } as CSSProperties}>
                <img
                  src="/images/interior-bar.webp"
                  alt="Guests dining in Cambria's warm bar and dining room"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <span className="pointer-events-none absolute -bottom-3 -right-3 hidden h-24 w-24 border-b border-r border-gold md:block" />
          </div>
        </div>
      </section>

      <Divider />

      {/* ---------- PILLARS ---------- */}
      <section className="bg-crema pb-24 pt-16 md:pb-28">
        <div className="container-x">
          <div className="reveal-group grid gap-10 md:grid-cols-3">
            {featurePillars.map((f) => (
              <div key={f.title} className="text-center md:text-left">
                <h3 className="font-display text-headline-sm text-ink">{f.title}</h3>
                <span className="gold-rule mx-auto mt-4 block w-[44px] md:mx-0" />
                <p className="mt-4 text-body-md text-ink-soft">{f.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FEATURED MENU (dark) ---------- */}
      <section className="bg-charcoal py-24 md:py-28">
        <div className="container-x">
          <SectionHeading
            tone="dark"
            eyebrow="From the Kitchen"
            title="An Exquisite Menu"
            intro="A handful of guest favorites, all made from scratch. Italian classics beside today's brightest flavors."
          />
          <div className="reveal-group mt-14 grid gap-8 md:grid-cols-3">
            {featuredDishes.map((d) => (
              <article key={d.name} className="group">
                <div className="overflow-hidden">
                  <img
                    src={d.img}
                    alt={d.name}
                    loading="lazy"
                    className="aspect-[5/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-5 font-display text-headline-sm text-cream">{d.name}</h3>
                <span className="gold-rule mt-3 block w-[40px]" />
                <p className="mt-3 text-body-md text-cream-soft">{d.desc}</p>
              </article>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button href="/menu" variant="ghost">
              See the Full Menu
            </Button>
          </div>
        </div>
      </section>

      {/* ---------- BAR & CELLAR ---------- */}
      <section className="bg-crema py-24 md:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="Bar & Cellar"
            title="A proper drink to go with it"
            intro="A full bar of hand-built cocktails, a curated Italian wine list, and cold draughts, poured the way they should be."
          />
          <div className="reveal-group mt-14 grid gap-8 md:grid-cols-3">
            {barHighlights.map((b) => (
              <article key={b.title} className="border-t border-gold/60 pt-6">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={b.img}
                    alt={b.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                    style={{ objectPosition: b.pos ?? 'center' }}
                  />
                </div>
                <h3 className="mt-5 font-display text-headline-sm text-ink">{b.title}</h3>
                <p className="mt-2 text-body-md text-ink-soft">{b.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- TESTIMONIALS ---------- */}
      <section className="bg-crema-soft py-24 md:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="From Our Guests"
            title="Wadsworth's table"
            intro="A few words from the neighbors, regulars and first-timers who pull up a chair."
          />
          <div className="reveal-group mt-14 grid gap-6 md:grid-cols-3">
            {reviews.slice(0, 6).map((r) => (
              <figure key={r.name} className="relative border-t border-gold/60 bg-paper p-7">
                <Quote size={22} className="text-gold" aria-hidden="true" />
                <div className="mt-3 flex gap-0.5" aria-label="Five star review">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className="fill-gold text-gold" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="mt-4 text-body-md text-ink-soft">“{r.quote}”</blockquote>
                <figcaption className="mt-5 font-display text-headline-sm text-ink">{r.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- EVENTS TEASER ---------- */}
      <section className="relative overflow-hidden">
        <Backdrop src="/images/event-space.webp" kenburns={false} position="center 40%" />
        <div className="container-x relative z-10 py-28 text-center md:py-32">
          <p className="eyebrow on-dark mx-auto reveal">Private Events & Catering</p>
          <h2 className="reveal mt-4 font-display text-headline-lg text-cream md:text-[44px]">
            For the moments worth gathering
          </h2>
          <p className="reveal mx-auto mt-5 max-w-2xl text-body-lg text-cream-soft">
            Rehearsal dinners, showers, business gatherings and celebrations, in our private dining room
            or catered to your door.
          </p>
          <div className="reveal mt-8">
            <Button href="/events" variant="cream">
              Plan Your Event
            </Button>
          </div>
        </div>
      </section>

      {/* ---------- CTA BAND (oxblood) ---------- */}
      <section className="bg-oxblood py-20 md:py-24">
        <div className="container-x text-center">
          <h2 className="font-display text-headline-lg text-on-oxblood md:text-[40px]">
            Experience the art of dining
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-body-lg text-cream-soft">
            Whether it&rsquo;s an intimate dinner or a grand celebration, your table is waiting.
          </p>
          <div className="mx-auto mt-10 grid max-w-2xl gap-5 sm:grid-cols-2">
            <a href={company.phoneHref} className="group border border-cream/25 p-7 transition-colors hover:border-gold">
              <Phone size={22} className="mx-auto text-gold-soft" />
              <p className="mt-3 text-label-sm uppercase tracking-[0.2em] text-cream-soft">Dining</p>
              <p className="mt-1 font-display text-headline-md text-cream">{company.phone}</p>
            </a>
            <a href={company.eventsPhoneHref} className="group border border-cream/25 p-7 transition-colors hover:border-gold">
              <CalendarHeart size={22} className="mx-auto text-gold-soft" />
              <p className="mt-3 text-label-sm uppercase tracking-[0.2em] text-cream-soft">Reservations & Catering</p>
              <p className="mt-1 font-display text-headline-md text-cream">{company.eventsPhone}</p>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
