import { useEffect, useState } from 'react'
import { weeklyFeatures, weeklyFeaturesLive } from '../data/site'
import Button from './Button'

// The week's features (data/site.ts `weeklyFeatures`). Hidden before
// `showFrom` and from `hideOn` on. Starts true so the prerendered HTML and the
// first client render match (no hydration error), then checks the visitor's
// date in Eastern time right after mount.
export function useWeeklyFeaturesLive(): boolean {
  const [live, setLive] = useState(true)
  useEffect(() => {
    setLive(weeklyFeaturesLive())
  }, [])
  return live
}

export default function WeeklyFeatures({ tone = 'light', withMenuLink = false }: { readonly tone?: 'light' | 'dark'; readonly withMenuLink?: boolean }) {
  const live = useWeeklyFeaturesLive()
  if (!live) return null
  const dark = tone === 'dark'
  return (
    <section
      id="features"
      aria-labelledby="features-title"
      className={`scroll-mt-20 py-20 md:py-24 ${dark ? 'bg-charcoal' : 'border-b border-line bg-crema'}`}
    >
      <div className="container-x">
        <div className="reveal mx-auto max-w-2xl text-center">
          <h2 id="features-title" className={`font-display text-headline-lg md:text-[44px] ${dark ? 'text-cream' : 'text-ink'}`}>
            This week&rsquo;s features
          </h2>
          <p className={`mt-5 text-body-lg ${dark ? 'text-cream-soft' : 'text-ink-soft'}`}>
            Specials from the kitchen, {weeklyFeatures.runs}, while they last.
          </p>
        </div>
        <ul className="reveal-group mt-14 flex flex-wrap justify-center gap-x-8 gap-y-12">
          {weeklyFeatures.items.map((f) => (
            <li key={f.name} className="flex w-full max-w-[300px] flex-col items-center text-center sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]">
              <div className="aspect-square w-48 overflow-hidden rounded-full shadow-[0_18px_40px_-16px_rgba(0,0,0,0.55)] md:w-56">
                <img src={f.img} alt={f.name} width={480} height={480} loading="lazy" className="h-full w-full scale-[1.08] object-cover" />
              </div>
              <h3 className={`mt-6 font-display text-headline-sm ${dark ? 'text-cream' : 'text-ink'}`}>{f.name}</h3>
              <p className={`mt-1 font-sans text-[17px] font-semibold ${dark ? 'text-gold-soft' : 'text-oxblood'}`}>${f.price}</p>
              {f.desc && <p className={`mt-2 text-body-md ${dark ? 'text-cream-soft' : 'text-ink-soft'}`}>{f.desc}</p>}
            </li>
          ))}
        </ul>
        {withMenuLink && (
          <div className="mt-14 text-center">
            <Button href="/menu" variant={dark ? 'ghost' : 'oxblood'}>
              See the Full Menu
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
