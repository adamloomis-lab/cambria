import { useCallback, useEffect, useRef, useState } from 'react'
import { Star, Quote, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'
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

type Card = { author: string; rating: number; text: string; when?: string; photo?: string }

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
            photo: r.photo || undefined,
          }))
          // Top up with curated reviews (deduped) so the carousel always has
          // a good handful to swipe through.
          const seen = new Set(live.map((c) => c.author.toLowerCase()))
          const merged = [...live]
          for (const c of initialCards) {
            if (merged.length >= 10) break
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
    <section aria-labelledby="reviews-title" className="bg-crema-soft py-24 md:py-28">
      <div className="container-x">
        <div className="reveal mx-auto max-w-2xl text-center">
          <h2 id="reviews-title" className="font-display text-headline-lg text-ink md:text-[44px]">
            Wadsworth&rsquo;s table
          </h2>
          <p className="mt-6 text-body-lg text-ink-soft">
            Fresh from Google, no cherry-picking. A few words from the neighbors, regulars and first-timers who pull up a chair.
          </p>
        </div>

        {/* Live rating strip */}
        <div className="reveal mt-8 flex flex-wrap items-center justify-center gap-3 text-ink-soft">
          <span className="font-display text-3xl leading-none text-ink">{rating.toFixed(1)}</span>
          <Stars n={rating} size={18} />
          <span className="text-body-md">
            {total.toLocaleString()} Google reviews
          </span>
        </div>

        <ReviewCarousel cards={cards} />

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

// Swipeable row of review cards. Native horizontal scrolling with snap, so a
// thumb swipe, a trackpad swipe, the arrow buttons and the keyboard all work.
// The next card peeks in from the edge so it is obvious there is more.
function ReviewCarousel({ cards }: { readonly cards: Card[] }) {
  const track = useRef<HTMLUListElement>(null)
  const reduced = useReducedMotion()
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const [current, setCurrent] = useState(0)

  const update = useCallback(() => {
    const el = track.current
    if (!el) return
    setAtStart(el.scrollLeft <= 4)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4)
    const first = el.firstElementChild as HTMLElement | null
    const step = first ? first.offsetWidth + 24 : el.clientWidth
    setCurrent(Math.min(cards.length - 1, Math.round(el.scrollLeft / step)))
  }, [cards.length])

  useEffect(() => {
    update()
    const el = track.current
    if (!el) return
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [update, cards])

  function go(dir: 1 | -1) {
    const el = track.current
    if (!el) return
    const first = el.firstElementChild as HTMLElement | null
    const step = first ? first.offsetWidth + 24 : el.clientWidth * 0.8
    el.scrollBy({ left: dir * step, behavior: reduced ? 'auto' : 'smooth' })
  }

  const arrow =
    'flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 bg-paper text-ink transition-colors hover:border-gold hover:bg-gold/10 disabled:cursor-default disabled:opacity-35 disabled:hover:bg-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxblood'

  return (
    <div className="reveal mt-12" role="region" aria-roledescription="carousel" aria-label="Guest reviews from Google">
      <ul
        ref={track}
        tabIndex={0}
        aria-label="Reviews. Swipe or use the arrow keys to see more."
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
          if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
        }}
        className="-mx-5 flex snap-x snap-mandatory items-start gap-6 overflow-x-auto scroll-px-5 px-5 pb-4 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oxblood md:mx-0 md:scroll-px-0 md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((r, i) => (
          <li
            key={`${r.author}-${i}`}
            aria-roledescription="slide"
            aria-label={`Review ${i + 1} of ${cards.length}`}
            className="w-[84%] max-w-[380px] shrink-0 snap-start sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
          >
            <ReviewCard r={r} />
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-center gap-5">
        <button type="button" onClick={() => go(-1)} disabled={atStart} aria-label="Previous reviews" className={arrow}>
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <p className="min-w-[5.5rem] text-center font-sans text-[13px] font-semibold tracking-[0.08em] text-ink-soft" aria-live="polite">
          {current + 1} of {cards.length}
        </p>
        <button type="button" onClick={() => go(1)} disabled={atEnd} aria-label="Next reviews" className={arrow}>
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

// One review. Long reviews are cut to a few lines with a "Read more" toggle,
// shown only when the text is actually cut off.
function ReviewCard({ r }: { readonly r: Card }) {
  const [open, setOpen] = useState(false)
  const [clipped, setClipped] = useState(false)
  const [photoOk, setPhotoOk] = useState(true)
  const textRef = useRef<HTMLQuoteElement>(null)

  useEffect(() => {
    const measure = () => {
      const el = textRef.current
      if (el && !open) setClipped(el.scrollHeight > el.clientHeight + 2)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [r.text, open])

  const initial = r.author.trim().charAt(0).toUpperCase() || '?'

  return (
    <figure className="flex min-h-[19rem] flex-col border-t-2 border-gold/70 bg-paper p-7 shadow-[0_14px_34px_-22px_rgba(33,28,26,0.45)]">
      <div className="flex items-center justify-between gap-3">
        <Stars n={r.rating} />
        <Quote size={20} className="text-gold" aria-hidden="true" />
      </div>
      <blockquote
        ref={textRef}
        className={`mt-4 text-body-md text-ink-soft ${open ? '' : 'line-clamp-6'}`}
      >
        &ldquo;{r.text}&rdquo;
      </blockquote>
      {(clipped || open) && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-2 self-start font-sans text-[13px] font-semibold text-oxblood underline underline-offset-4 hover:text-gold-deep"
        >
          {open ? 'Show less' : 'Read more'}
        </button>
      )}
      <figcaption className="mt-auto flex items-center gap-3 pt-6">
        {r.photo && photoOk ? (
          <img
            src={r.photo}
            alt=""
            width={40}
            height={40}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setPhotoOk(false)}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 font-display text-[18px] text-gold-deep">
            {initial}
          </span>
        )}
        <span className="min-w-0">
          <span className="block truncate font-display text-[19px] leading-tight text-ink">{r.author}</span>
          {r.when && <span className="block text-[13px] text-ink-faint">{r.when} on Google</span>}
        </span>
      </figcaption>
    </figure>
  )
}
