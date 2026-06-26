import { useEffect, useState } from 'react'

const STORAGE_KEY = 'cookie-consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return
    const timer = setTimeout(() => setVisible(true), 700)
    return () => clearTimeout(timer)
  }, [])

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed bottom-3 left-3 right-3 z-50 mx-auto max-w-2xl rounded border border-line-dark bg-charcoal px-5 py-4 shadow-2xl sm:bottom-5 sm:left-5 sm:right-5"
    >
      <p className="font-sans text-[13px] leading-relaxed text-cream-soft">
        This site uses cookies to keep things running smoothly. We never sell
        your data.{' '}
        <a
          href="/privacy"
          className="text-gold underline-offset-2 hover:underline"
        >
          Privacy Policy
        </a>
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          onClick={accept}
          className="inline-flex items-center justify-center bg-oxblood px-5 py-2 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-on-oxblood transition-colors hover:bg-oxblood-2 active:scale-[0.98]"
        >
          Sounds Good
        </button>
        <button
          onClick={decline}
          className="inline-flex items-center justify-center border border-gold/60 px-5 py-2 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:border-gold hover:bg-gold/12 active:scale-[0.98]"
        >
          No Thanks
        </button>
      </div>
    </div>
  )
}
