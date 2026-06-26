import { Link } from 'wouter'

// Cambria's Bistro script wordmark. White linework on dark surfaces (hero,
// footer); charcoal recolor on the light crema base (scrolled navbar, light
// sections). Both variants share the original artwork's alpha.
export default function Logo({
  onDark = false,
  className = 'h-12',
}: {
  readonly onDark?: boolean
  readonly className?: string
}) {
  return (
    <Link href="/" aria-label="Cambria's Bistro, home" className={`inline-flex ${className}`}>
      <img
        src={onDark ? '/images/logo-white.webp' : '/images/logo-dark.webp'}
        alt="Cambria's Bistro"
        width={650}
        height={207}
        className="h-full w-auto"
      />
    </Link>
  )
}
