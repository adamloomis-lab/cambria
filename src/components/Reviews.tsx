import { useEffect, useState } from 'react'
import { Star, Quote, ExternalLink } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { reviews as staticReviews, ratingSummary, company } from '../data/site'

// "From Our Guests" — real Google reviews.
//
// The baked reviews from site.ts are server-rendered into the HTML (SEO +
// guaranteed first paint). On mount we hit /api/reviews (Places API) and swap
// in the freshest live reviews when available. If the function is unset or
// fails, the baked ones stay put — no empty shell.

interface LiveReview {
  author: string
  photo: string
  profileUrl: string
  rating: number | null
  text: string
  when: string
}
interface ReviewsResponse {
  configured?: boolean
  found?: boolean
  rating?: number | null
  total?: number | null
  mapsUri?: string
  reviews?: LiveReview[]
}

type Card = { author: string; rating: number; text: string; when?: string }

const initialCards: Card[] = staticReviews.map((r) => ({
  author: r.name,
  rating: r.rating,
  text: r.quote,
}))

function Stars({ n, size = 14 }: { n: number; size?: number }) {
  const rounded = Math.round(n)
  return (
    <span className="inline-flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= rounded ? 'fill-gold text-gold' : 'text-line-strong'}
          aria-hidden="true"
        />
      ))}
    </span>
  )
}

export default function Reviews() {
  const [cards, setCards] = useState<Card[]>(initialCards)
  const [rating, setRating] = useState<number>(Number(ratingSummary.value))
  const [total, setTotal] = useState<number>(ratingSummary.count)
  const [mapsUri, setMapsUri] = useState<string>(company.mapsReviews)

  useEffect(() => {
    let cancelled = false
    fetch(`/api/reviews?id=${encodeURIComponent(company.placeId)}`)
      .then((r) => r.json())
      .then((d: ReviewsResponse) => {
        if (cancelled || !d || d.configured === false || !d.found) return
        if (d.reviews && d.reviews.length) {
          const live: Card[] = d.reviews.map((r) => ({
            author: r.author,
            rating: r.rating ?? 5,
            text: r.text,
            when: r.when,
          }))
          // Top up with curated reviews (deduped) so a full 3x2 grid still
          // renders even if a source returns fewer than 6.
          const seen = new Set(live.map((c) => c.author.toLowerCase()))
          const merged = [...live]
          for (const c of initialCards) {
            if (merged.length >= 6) break
            if (!seen.has(c.author.toLowerCase())) merged.push(c)
          }
          setCards(merged)
        }
        if (typeof d.rating === 'number') setRating(d.rating)
        if (typeof d.total === 'number') setTotal(d.total)
        if (d.mapsUri) setMapsUri(d.mapsUri)
      })
      .catch(() => {
        /* keep baked reviews */
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="bg-crema-soft py-24 md:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="From Our Guests"
          title="Wadsworth's table"
          intro="Fresh from Google, no cherry-picking. A few words from the neighbors, regulars and first-timers who pull up a chair."
        />

        {/* Live rating strip */}
        <div className="reveal mt-8 flex flex-wrap items-center justify-center gap-3 text-ink-soft">
          <span className="font-display text-3xl leading-none text-ink">{rating.toFixed(1)}</span>
          <Stars n={rating} size={18} />
          <span className="text-body-md">
            {total.toLocaleString()} Google reviews
          </span>
        </div>

        <div className="reveal-group mt-12 grid gap-6 md:grid-cols-3">
          {cards.slice(0, 6).map((r, i) => (
            <figure
              key={`${r.author}-${i}`}
              className="relative flex flex-col border-t border-gold/60 bg-paper p-7"
            >
              <Quote size={22} className="text-gold" aria-hidden="true" />
              <div className="mt-3 flex items-center justify-between">
                <Stars n={r.rating} />
                {r.when && (
                  <span className="text-[12px] uppercase tracking-[0.14em] text-ink-faint">
                    {r.when}
                  </span>
                )}
              </div>
              <blockquote className="mt-4 flex-1 text-body-md text-ink-soft">
                “{r.text}”
              </blockquote>
              <figcaption className="mt-5 font-display text-headline-sm text-ink">
                {r.author}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="reveal mt-10 text-center">
          <a
            href={mapsUri}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-gold-deep transition-colors hover:text-oxblood"
          >
            Read all reviews on Google
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
