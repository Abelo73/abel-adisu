import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import { useReducedMotion } from '@/hooks/useMedia'

export function StatCallout({
  value,
  of,
  caption,
}: {
  value: number
  of: number
  caption: string
}) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLParagraphElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const [shown, setShown] = useState(reduced ? value : 0)

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setShown(value)
      return
    }
    const start = performance.now()
    const duration = 900
    let frame = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - (1 - t) ** 3
      setShown(Math.round(value * eased))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, reduced, value])

  return (
    <div className="mt-8">
      <p ref={ref} className="font-display text-[clamp(3.2rem,9vw,6.5rem)] leading-none tracking-tight">
        {shown}
        <span className="ml-2 text-2xl text-muted">/ {of}</span>
      </p>
      <p className="mt-3 text-sm text-accent">{caption}</p>
    </div>
  )
}
