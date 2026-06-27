import { useEffect, useRef, type ReactNode } from 'react'

// Subtle cursor-pull wrapper for primary CTAs. When the pointer is within
// `radius` of the element's center, the element drifts toward the cursor by
// `strength` of the delta — interpolated each frame for a magnetic feel, then
// eases back to rest on leave. Pure vanilla (no framer-motion); zero bundle
// cost. Respects prefers-reduced-motion (no-op). Pointer-only (skips touch).
export default function MagneticHover({
  children,
  strength = 0.32,
  radius = 140,
  className = '',
}: {
  readonly children: ReactNode
  readonly strength?: number
  readonly radius?: number
  readonly className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let raf = 0
    let active = false

    const tick = () => {
      currentX += (targetX - currentX) * 0.18
      currentY += (targetY - currentY) * 0.18
      el.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`
      if (active || Math.abs(currentX) > 0.1 || Math.abs(currentY) > 0.1) {
        raf = requestAnimationFrame(tick)
      } else {
        el.style.transform = ''
        raf = 0
      }
    }

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)
      if (dist < radius) {
        const s = (1 - dist / radius) * strength
        targetX = dx * s
        targetY = dy * s
        active = true
        if (!raf) raf = requestAnimationFrame(tick)
      } else if (active) {
        targetX = 0
        targetY = 0
        active = false
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
      el.style.transform = ''
    }
  }, [strength, radius])

  return (
    <span ref={ref} className={`inline-block will-change-transform ${className}`}>
      {children}
    </span>
  )
}
