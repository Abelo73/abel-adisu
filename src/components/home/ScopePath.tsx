import { useRef, useState } from 'react'
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { Search, Globe, Users, Layers, Code2, Rocket } from 'lucide-react'
import { useFinePointer, useReducedMotion } from '@/hooks/useMedia'
import { cn } from '@/lib/cn'

const PATH =
  'M80 70 H820 Q880 70 880 120 V150 Q880 190 820 190 H280 Q220 190 220 240 V270 Q220 310 280 310 H620'

const steps = [
  { icon: Search, label: 'Discover' },
  { icon: Globe, label: 'Architecture' },
  { icon: Users, label: 'Contracts' },
  { icon: Layers, label: 'Build' },
  { icon: Code2, label: 'Rescue' },
  { icon: Rocket, label: 'Ship' },
]

const rows = [steps.slice(0, 3), steps.slice(3, 5), steps.slice(5)]

export function ScopePath() {
  const reduced = useReducedMotion()
  const fine = useFinePointer()
  const trackRef = useRef<HTMLElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const [active, setActive] = useState(0)
  const beadX = useMotionValue(80)
  const beadY = useMotionValue(70)

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 0.72', 'end 0.42'],
  })
  const fill = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [0, 1])

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const progress = reduced ? 1 : Math.min(Math.max(value, 0), 1)
    setActive(Math.round(progress * (steps.length - 1)))

    const path = pathRef.current
    if (!path) return
    const length = path.getTotalLength()
    if (!length) return
    const point = path.getPointAtLength(progress * length)
    beadX.set(point.x)
    beadY.set(point.y)
  })

  return (
    <section ref={trackRef} className="relative overflow-hidden py-24">
      <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Scope of work</h2>
      <p className="mt-4 max-w-xl text-muted">
        How an engagement actually moves — from the first constraint to a running system.
      </p>

      <div className="relative mt-16">
        <div className="pointer-events-none absolute top-3 bottom-3 left-6 w-px bg-line lg:hidden" />
        <motion.div
          className="pointer-events-none absolute top-3 bottom-3 left-6 w-0.5 origin-top bg-gradient-to-b from-accent to-ok lg:hidden"
          style={{ scaleY: fill }}
        />

        <svg
          className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
          viewBox="0 0 1000 360"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="scope-line" x1="80" y1="70" x2="620" y2="310" gradientUnits="userSpaceOnUse">
              <stop stopColor="var(--accent)" />
              <stop offset="1" stopColor="var(--ok)" />
            </linearGradient>
            <filter id="scope-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path d={PATH} stroke="currentColor" className="text-line" strokeWidth="1.4" strokeLinecap="round" />
          <motion.path
            ref={pathRef}
            d={PATH}
            stroke="url(#scope-line)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ pathLength: fill }}
          />
          {!reduced ? (
            <motion.circle
              r="6"
              fill="var(--accent)"
              filter="url(#scope-glow)"
              cx={beadX}
              cy={beadY}
            />
          ) : null}
        </svg>

        <ol className="relative space-y-10 pl-12 lg:pl-0">
          {rows.map((row, rowIndex) => (
            <li
              key={rowIndex}
              className={rowIndex === 1 ? 'flex flex-wrap justify-end gap-4' : 'flex flex-wrap gap-4'}
            >
              {row.map((step) => {
                const Icon = step.icon
                const index = steps.indexOf(step)
                const reached = reduced || index <= active
                const current = reduced ? index === steps.length - 1 : index === active
                const done = reduced || index < active
                return (
                  <motion.div
                    key={step.label}
                    className={cn(
                      'flex items-center gap-3 transition-opacity duration-300',
                      reached ? 'opacity-100' : 'opacity-40',
                    )}
                    whileHover={fine ? { y: -3 } : undefined}
                    transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                  >
                    <span
                      className={cn(
                        'grid size-12 place-items-center rounded-full border bg-card transition-[border-color,background-color,color,box-shadow] duration-300',
                        current
                          ? 'border-accent bg-accent text-white shadow-[0_0_24px_color-mix(in_srgb,var(--accent)_45%,transparent)]'
                          : done
                            ? 'border-ok/40 text-ok'
                            : 'border-line',
                      )}
                    >
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <span
                      className={cn(
                        'rounded-full border bg-card px-5 py-3 text-sm backdrop-blur-md transition-[border-color,box-shadow] duration-300',
                        current
                          ? 'border-accent/50 shadow-[0_12px_32px_color-mix(in_srgb,var(--accent)_18%,transparent)]'
                          : 'border-line',
                      )}
                    >
                      {String(index + 1).padStart(2, '0')} · {step.label}
                    </span>
                  </motion.div>
                )
              })}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
