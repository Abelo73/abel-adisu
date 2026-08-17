import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useInView, useMotionValue } from 'motion/react'
import {
  AppWindow,
  Boxes,
  Layers,
  Play,
  Server,
  Sparkles,
  Square,
  Workflow,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { services, type Service } from '@/content/services'
import { useFinePointer, useReducedMotion } from '@/hooks/useMedia'
import { cn } from '@/lib/cn'

const PATH =
  'M90 108 H810 Q870 108 870 158 V176 Q870 226 810 226 H290 Q230 226 230 276 V294 Q230 344 290 344 H640'

const icons: Record<string, LucideIcon> = {
  'software-engineering': Layers,
  'backend-development': Server,
  'web-development': AppWindow,
  'ai-automation': Sparkles,
  'n8n-automation': Workflow,
  'devops-cloud': Boxes,
}

const shorts = ['Software', 'Backend', 'Full-stack', 'AI', 'n8n', 'DevOps'] as const

type Hop = Service & {
  x: number
  y: number
  short: string
  label: 'top' | 'bottom' | 'right'
}

const placements: Pick<Hop, 'x' | 'y' | 'label'>[] = [
  { x: 90, y: 108, label: 'top' },
  { x: 430, y: 108, label: 'top' },
  { x: 810, y: 108, label: 'top' },
  { x: 810, y: 226, label: 'bottom' },
  { x: 290, y: 226, label: 'bottom' },
  { x: 640, y: 344, label: 'right' },
]

const hops: Hop[] = services.map((service, index) => ({
  ...service,
  short: shorts[index] ?? service.title,
  ...(placements[index] ?? { x: 90, y: 108, label: 'top' as const }),
}))

const VIEW_W = 1000
const VIEW_H = 400

function HopNote({ hop, index, total }: { hop: Hop; index: number; total: number }) {
  const Icon = icons[hop.slug] ?? Layers
  return (
    <div>
      <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.65rem] uppercase tracking-[0.16em] text-accent">
        <span className="inline-flex items-center gap-2">
          <Icon size={14} aria-hidden="true" />
          {hop.eyebrow}
        </span>
        <span className="font-mono text-muted">
          Stop {String(index + 1).padStart(2, '0')} of {String(total).padStart(2, '0')}
        </span>
      </p>
      <h3 className="mt-3 font-display text-2xl italic leading-tight md:text-3xl">{hop.title}</h3>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted md:text-base">{hop.summary}</p>
      <ul className="mt-4 space-y-2">
        {hop.problems.slice(0, 2).map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-ok" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <ul className="flex flex-wrap gap-2">
          {hop.technologies.slice(0, 5).map((tech) => (
            <li key={tech} className="rounded-full border border-line px-3 py-1 text-xs">
              {tech}
            </li>
          ))}
        </ul>
        <Link
          to={`/services/${hop.slug}`}
          className="inline-flex min-h-11 shrink-0 items-center text-sm text-accent underline-offset-4 hover:underline"
        >
          Scope, process, and stack
        </Link>
      </div>
    </div>
  )
}

export function ServicePath() {
  const reduced = useReducedMotion()
  const fine = useFinePointer()
  const uid = useId().replace(/:/g, '')
  const gradientId = `${uid}-line`
  const glowId = `${uid}-glow`
  const boardRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const inView = useInView(boardRef, { once: true, amount: 0.4 })
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [tookOver, setTookOver] = useState(false)
  const beadX = useMotionValue(hops[0]?.x ?? 90)
  const beadY = useMotionValue(hops[0]?.y ?? 108)
  const current = hops[active] ?? hops[0]
  const progress = hops.length <= 1 ? 1 : active / (hops.length - 1)

  const goTo = (index: number, fromUser = false) => {
    if (fromUser) {
      setPlaying(false)
      setTookOver(true)
    }
    setActive(Math.min(Math.max(index, 0), hops.length - 1))
  }

  useEffect(() => {
    if (reduced || !inView || tookOver || playing) return
    setPlaying(true)
  }, [inView, playing, reduced, tookOver])

  useEffect(() => {
    if (!playing || reduced) return
    const id = window.setInterval(() => {
      setActive((index) => {
        if (index >= hops.length - 1) {
          setPlaying(false)
          return index
        }
        return index + 1
      })
    }, 1800)
    return () => window.clearInterval(id)
  }, [playing, reduced])

  const moveBead = (pathLength: number) => {
    const path = pathRef.current
    if (!path) return
    const length = path.getTotalLength()
    if (!length) return
    const point = path.getPointAtLength(Math.min(Math.max(pathLength, 0), 1) * length)
    beadX.set(point.x)
    beadY.set(point.y)
  }

  if (!current) return null

  return (
    <div ref={boardRef} className="mt-10">
      <div className="workflow-board overflow-hidden rounded-[28px]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-7">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted">
            Stop {String(active + 1).padStart(2, '0')} · {current.short}
          </p>
          <button
            type="button"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-fg/5 px-4 text-sm font-medium hover:bg-fg/10"
            onClick={() => {
              if (playing) {
                setPlaying(false)
                setTookOver(true)
                return
              }
              setTookOver(true)
              setActive(0)
              setPlaying(!reduced)
            }}
          >
            {playing ? <Square size={12} fill="currentColor" aria-hidden="true" /> : <Play size={14} fill="currentColor" aria-hidden="true" />}
            {playing ? 'Stop' : 'Walk the path'}
          </button>
        </div>

        <p className="sr-only" aria-live="polite">
          {current.title}. {current.summary}
        </p>

        <div className="p-5 sm:p-7">
          <div className="relative lg:hidden">
            <div className="pointer-events-none absolute top-3 bottom-3 left-[1.35rem] w-px bg-line" />
            <motion.div
              className="pointer-events-none absolute top-3 bottom-3 left-[1.35rem] w-0.5 origin-top bg-gradient-to-b from-accent to-ok"
              animate={{ scaleY: reduced ? 1 : progress }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            />
            <ol className="relative space-y-5">
              {hops.map((hop, index) => {
                const selected = index === active
                const reached = reduced || index <= active
                const Icon = icons[hop.slug] ?? Layers
                return (
                  <li key={hop.slug}>
                    <button
                      type="button"
                      aria-pressed={selected}
                      onClick={() => goTo(index, true)}
                      className={cn(
                        'flex min-h-12 w-full items-center gap-3 rounded-2xl text-left transition-opacity',
                        reached ? 'opacity-100' : 'opacity-40',
                      )}
                    >
                      <span
                        className={cn(
                          'grid size-11 shrink-0 place-items-center rounded-full border bg-card transition-[border-color,background-color,color,box-shadow]',
                          selected
                            ? 'border-accent bg-accent text-white shadow-[0_0_22px_color-mix(in_srgb,var(--accent)_40%,transparent)]'
                            : index < active
                              ? 'border-ok/40 text-ok'
                              : 'border-line',
                        )}
                      >
                        <Icon size={16} aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
                          {String(index + 1).padStart(2, '0')} · {hop.eyebrow}
                        </span>
                        <span className="block font-medium leading-tight">{hop.title}</span>
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {selected ? (
                        <motion.div
                          key={hop.slug}
                          initial={reduced ? false : { opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={reduced ? undefined : { opacity: 0, y: -8 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="speech-bubble mt-3"
                        >
                          <HopNote hop={hop} index={index} total={hops.length} />
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </li>
                )
              })}
            </ol>
          </div>

          <div className="hidden lg:block">
            <div className="relative h-[22rem]">
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
                fill="none"
                aria-hidden="true"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <linearGradient id={gradientId} x1="90" y1="108" x2="640" y2="344" gradientUnits="userSpaceOnUse">
                    <stop stopColor="var(--accent)" />
                    <stop offset="1" stopColor="var(--ok)" />
                  </linearGradient>
                  <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
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
                  stroke={`url(#${gradientId})`}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  initial={false}
                  animate={{ pathLength: reduced ? 1 : progress }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  onUpdate={(latest) => {
                    if (typeof latest.pathLength === 'number') moveBead(latest.pathLength)
                  }}
                />
                {!reduced ? (
                  <motion.circle r="6" fill="var(--accent)" filter={`url(#${glowId})`} cx={beadX} cy={beadY} />
                ) : null}
              </svg>

              {hops.map((hop, index) => {
                const selected = index === active
                const reached = reduced || index <= active
                const Icon = icons[hop.slug] ?? Layers
                return (
                  <div
                    key={hop.slug}
                    className="absolute z-10"
                    style={{
                      left: `${(hop.x / VIEW_W) * 100}%`,
                      top: `${(hop.y / VIEW_H) * 100}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <button
                      type="button"
                      aria-pressed={selected}
                      aria-label={`${hop.title}. ${hop.eyebrow}`}
                      onMouseEnter={() => {
                        if (fine && !playing) goTo(index, true)
                      }}
                      onFocus={() => goTo(index, true)}
                      onClick={() => goTo(index, true)}
                      className={cn(
                        'relative grid size-12 place-items-center rounded-full border bg-card transition-[opacity,border-color,background-color,color,box-shadow]',
                        reached ? 'opacity-100' : 'opacity-40',
                        selected
                          ? 'border-accent bg-accent text-white shadow-[0_0_24px_color-mix(in_srgb,var(--accent)_45%,transparent)]'
                          : index < active
                            ? 'border-ok/40 text-ok'
                            : 'border-line',
                      )}
                    >
                      <Icon size={18} aria-hidden="true" />
                      <span
                        className={cn(
                          'absolute whitespace-nowrap rounded-full border bg-card px-2.5 py-1 text-xs leading-none text-fg',
                          selected ? 'border-accent/50' : 'border-line',
                          hop.label === 'top' && 'bottom-[calc(100%+0.55rem)] left-1/2 -translate-x-1/2',
                          hop.label === 'bottom' && 'top-[calc(100%+0.55rem)] left-1/2 -translate-x-1/2',
                          hop.label === 'right' && 'left-[calc(100%+0.55rem)] top-1/2 -translate-y-1/2',
                        )}
                      >
                        {String(index + 1).padStart(2, '0')} · {hop.short}
                      </span>
                    </button>
                  </div>
                )
              })}
            </div>

            <div className="relative mt-4">
              <motion.span
                aria-hidden="true"
                className="absolute top-0 z-10 size-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border-t border-l border-line bg-card"
                animate={{ left: `${(current.x / VIEW_W) * 100}%` }}
                transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 32 }}
              />
              <div className="speech-bubble p-6 sm:p-7" data-caret="none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.slug}
                    initial={reduced ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <HopNote hop={current} index={active} total={hops.length} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
