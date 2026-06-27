import type { ReactNode } from 'react'
import { ReactLenis } from 'lenis/react'

// Buttery smooth scroll for the whole site, in the spirit of premium editorial
// sites. Restrained easing (not slow/laggy). SSR-safe: ReactLenis only attaches
// scroll listeners on the client, so the prerendered HTML is untouched.
//
// Existing scroll-driven effects (useParallax, useScrollReveal, useScrolled,
// the hero slideshow, the Menu page's sticky jump-nav and anchor links) all
// keep working because Lenis still drives window.scrollY and dispatches scroll
// events — it just interpolates motion between frames.
export default function SmoothScroll({ children }: { readonly children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.085, // smooth without feeling laggy
        duration: 1.1,
        smoothWheel: true,
        // Honour native anchor links (Menu page jump nav, etc.) with smooth scroll.
        anchors: true,
        // Allow elements that opt out (e.g. the mobile menu panel) to scroll natively.
        prevent: (node) =>
          node instanceof HTMLElement && node.hasAttribute('data-lenis-prevent'),
      }}
    >
      {children}
    </ReactLenis>
  )
}
