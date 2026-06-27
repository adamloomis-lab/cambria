import { company, aboutParagraphs, featurePillars } from '../data/site'
import Backdrop from '../components/Backdrop'
import Button from '../components/Button'
import SectionHeading from '../components/SectionHeading'

const familyDishes = [
  { name: "Nonna's Lasagna", who: 'Nonna' },
  { name: "Pop's Stuffed Shells", who: 'Pop' },
  { name: "Mimi's Spaghetti", who: 'Mimi' },
  { name: "Christian's Caponata", who: 'Christian' },
  { name: "Erin's Carbonara", who: 'Erin' },
  { name: "Braden's Panino", who: 'Braden' },
]

export default function About() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative flex min-h-[56vh] items-end overflow-hidden">
        <Backdrop src="/images/storefront.webp" position="center 65%" />
        <div className="container-x relative z-10 pb-14 pt-36 text-center">
          <p className="eyebrow on-dark mx-auto">Our Story</p>
          <h1 className="mt-4 font-display text-display-lg-mobile text-cream md:text-display-lg">
            The warmth of an Italian villa, on Main Street
          </h1>
        </div>
      </section>

      {/* ---------- STORY ---------- */}
      <section className="bg-crema py-24 md:py-28">
        <div className="container-x grid items-start gap-14 lg:grid-cols-2">
          <div className="reveal">
            <p className="eyebrow">A Family-Owned Bistro</p>
            <h2 className="mt-4 font-display text-headline-lg text-ink md:text-[44px]">
              Two worlds, one table
            </h2>
            <span className="gold-rule mt-6 block w-[64px]" />
            <div className="mt-7 space-y-5 text-body-lg text-ink-soft">
              {aboutParagraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
          <div className="reveal space-y-5">
            <div className="elegant-img aspect-[4/3]">
              <img
                src="/images/wine-selection.webp"
                alt="A selection of wines at Cambria's bar"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="elegant-img aspect-square">
                <img
                  src="/images/caprese.webp"
                  alt="A dish from Cambria's kitchen"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="elegant-img aspect-square">
                <img
                  src="/images/spaghetti-pomodoro.webp"
                  alt="A dish from Cambria's kitchen"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- MEET THE FAMILY ---------- */}
      <section className="bg-charcoal py-24 md:py-28">
        <div className="container-x">
          <SectionHeading
            tone="dark"
            eyebrow="Read the Menu Closely"
            title="Meet the family"
            intro="Nearly every plate at Cambria's carries a name. These are the people behind the recipes, cooked the way they would be at home."
          />
          <div className="reveal-group mx-auto mt-14 grid max-w-3xl gap-x-10 gap-y-6 sm:grid-cols-2">
            {familyDishes.map((d) => (
              <div key={d.name} className="flex items-baseline border-b border-line-dark pb-4">
                <span className="font-display text-headline-sm text-cream">{d.name}</span>
                <span className="menu-leader on-dark" />
                <span className="text-[12px] uppercase tracking-[0.16em] text-gold-soft">{d.who}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- PILLARS ---------- */}
      <section className="bg-crema py-24 md:py-28">
        <div className="container-x">
          <div className="reveal-group grid gap-10 md:grid-cols-3">
            {featurePillars.map((f) => (
              <div key={f.title}>
                <h3 className="font-display text-headline-sm text-ink">{f.title}</h3>
                <span className="gold-rule mt-4 block w-[44px]" />
                <p className="mt-4 text-body-md text-ink-soft">{f.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="bg-oxblood py-20 text-center">
        <div className="container-x">
          <h2 className="font-display text-headline-lg text-on-oxblood md:text-[40px]">
            Come sit at our table
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-body-lg text-cream-soft">
            Find us in the heart of downtown Wadsworth at {company.address.street}.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button href="/menu" variant="cream">
              View the Menu
            </Button>
            <Button href="/reservations" variant="ghost">
              Reserve a Table
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
