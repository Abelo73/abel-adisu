import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { journeyChapters, type JourneyArtifact } from '@/content/journey'
import { Button } from '@/components/ui/Button'
import { useReducedMotion } from '@/hooks/useMedia'
import { cn } from '@/lib/cn'

const hops = [
  { x: 36, y: 108 },
  { x: 98, y: 44 },
  { x: 168, y: 168 },
  { x: 248, y: 62 },
  { x: 328, y: 148 },
  { x: 412, y: 40 },
  { x: 492, y: 156 },
  { x: 568, y: 58 },
  { x: 640, y: 172 },
  { x: 708, y: 72 },
  { x: 760, y: 128 },
  { x: 812, y: 86 },
] as const

const THINK_PATH =
  'M36 108 C 60 108 72 44 98 44 S 140 168 168 168 S 220 62 248 62 S 300 148 328 148 S 380 40 412 40 S 460 156 492 156 S 540 58 568 58 S 610 172 640 172 S 680 72 708 72 S 740 128 760 128 S 790 86 812 86'

export function JourneyWalk() {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  const chapter = journeyChapters[index]
  const total = journeyChapters.length
  const hop = hops[index] ?? hops[0]

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault()
        setIndex((current) => Math.min(total - 1, current + 1))
      }
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault()
        setIndex((current) => Math.max(0, current - 1))
      }
      if (event.key === 'Home') setIndex(0)
      if (event.key === 'End') setIndex(total - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [total])

  return (
    <div>
      <div className="relative overflow-hidden rounded-[28px] border border-line bg-fg/[0.03] px-3 py-4 md:px-6">
        <p className="mb-2 flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.18em] text-muted">
          <ThinkingDots reduced={reduced} />
          Thinking through the path
        </p>
        <svg viewBox="0 0 848 214" className="h-auto w-full text-fg/40" aria-label="Journey thought map">
          <path
            d={THINK_PATH}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.15"
            strokeDasharray="4 6"
            strokeLinecap="round"
          />
          {hops.map((point, hopIndex) => (
            <g
              key={journeyChapters[hopIndex].id}
              className="cursor-pointer"
              onClick={() => setIndex(hopIndex)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  setIndex(hopIndex)
                }
              }}
              aria-current={hopIndex === index ? 'step' : undefined}
              aria-label={journeyChapters[hopIndex].era}
            >
              <circle cx={point.x} cy={point.y} r="14" className="fill-transparent" />
              <circle
                cx={point.x}
                cy={point.y}
                r={hopIndex === index ? 9 : 5}
                className={hopIndex === index ? 'fill-accent' : 'fill-fg/35'}
              />
              <text
                x={point.x}
                y={point.y + 22}
                textAnchor="middle"
                className="fill-current text-[9px] uppercase tracking-wide"
                opacity={hopIndex === index ? 1 : 0.55}
              >
                {journeyChapters[hopIndex].era.length > 14
                  ? journeyChapters[hopIndex].era.slice(0, 12)
                  : journeyChapters[hopIndex].era}
              </text>
            </g>
          ))}
          <motion.circle
            r="5.5"
            className="fill-accent"
            animate={{ cx: hop.x, cy: hop.y }}
            transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 80, damping: 18 }}
          />
        </svg>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <AnimatePresence mode="wait">
          <motion.article
            key={chapter.id}
            initial={reduced ? false : { opacity: 0, filter: 'blur(8px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={reduced ? undefined : { opacity: 0, filter: 'blur(6px)' }}
            transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-accent">
              Thought {String(index + 1).padStart(2, '0')} · {chapter.era}
            </p>
            <h2 className="mt-3 font-display text-3xl italic leading-tight md:text-5xl">{chapter.title}</h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted md:text-lg">
              {chapter.story.map((paragraph, line) => (
                <motion.p
                  key={paragraph.slice(0, 48)}
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduced ? 0 : 0.12 * line, duration: 0.4 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
            {chapter.artifact ? <div className="mt-8">{renderArtifact(chapter.artifact, reduced)}</div> : null}
          </motion.article>
        </AnimatePresence>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <motion.div
            key={`${chapter.id}-teach`}
            initial={reduced ? false : { opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: reduced ? 0 : 0.35, duration: 0.45 }}
            className="rounded-[28px] border border-line bg-card p-6 shadow-[var(--shadow-lift)]"
          >
            <p className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.18em] text-muted">
              <ThinkingDots reduced={reduced} />
              A thought for you
            </p>
            <h3 className="mt-3 font-display text-2xl italic leading-tight">{chapter.teach.label}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">{chapter.teach.body}</p>
          </motion.div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIndex((current) => Math.max(0, current - 1))}
              disabled={index === 0}
            >
              Previous thought
            </Button>
            <Button
              type="button"
              onClick={() => setIndex((current) => Math.min(total - 1, current + 1))}
              disabled={index === total - 1}
            >
              Next thought
            </Button>
          </div>
          <p className="mt-3 text-xs text-muted">Arrow keys move the thought along the path.</p>
        </aside>
      </div>
    </div>
  )
}

function ThinkingDots({ reduced }: { reduced: boolean }) {
  return (
    <span className="inline-flex w-6 items-end justify-between" aria-hidden="true">
      {[0, 1, 2].map((dot) => (
        <motion.span
          key={dot}
          className="size-1 rounded-full bg-accent"
          animate={reduced ? { opacity: 1 } : { opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: dot * 0.18 }}
        />
      ))}
    </span>
  )
}

function renderArtifact(artifact: JourneyArtifact, reduced: boolean) {
  if (artifact.kind === 'quote') {
    return (
      <blockquote className="border-l-2 border-accent pl-5 font-display text-2xl italic leading-snug md:text-3xl">
        {artifact.text}
      </blockquote>
    )
  }
  if (artifact.kind === 'score') {
    return (
      <div>
        <p className="font-display text-[clamp(3.5rem,10vw,6rem)] italic leading-none">
          {artifact.value}
          <span className="ml-2 text-2xl text-muted not-italic">/ {artifact.of}</span>
        </p>
        <p className="mt-2 text-sm text-muted">{artifact.note}</p>
      </div>
    )
  }
  if (artifact.kind === 'stack') {
    return (
      <ul className="flex flex-wrap gap-2">
        {artifact.items.map((item, i) => (
          <motion.li
            key={item}
            initial={reduced ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: reduced ? 0 : 0.06 * i }}
            className="rounded-full border border-line px-3 py-1.5 text-sm"
          >
            {item}
          </motion.li>
        ))}
      </ul>
    )
  }
  if (artifact.kind === 'ladder') {
    return (
      <ol className="space-y-2">
        {artifact.steps.map((step, stepIndex) => (
          <motion.li
            key={step}
            initial={reduced ? false : { opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: reduced ? 0 : 0.1 * stepIndex }}
            className="flex items-center gap-3 text-sm"
          >
            <span className="font-mono text-xs text-muted">{String(stepIndex + 1).padStart(2, '0')}</span>
            <span className="h-px max-w-8 flex-1 bg-line" />
            <span>{step}</span>
          </motion.li>
        ))}
      </ol>
    )
  }
  return <LearningLoop steps={artifact.steps} reduced={reduced} />
}

function LearningLoop({ steps, reduced }: { steps: string[]; reduced: boolean }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % steps.length)
    }, 1600)
    return () => window.clearInterval(id)
  }, [reduced, steps.length])

  return (
    <div>
      <p className="text-[0.65rem] uppercase tracking-[0.16em] text-muted">The loop — click a step</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {steps.map((step, stepIndex) => (
          <li key={step}>
            <button
              type="button"
              onClick={() => setActive(stepIndex)}
              className={cn(
                'min-h-11 cursor-pointer rounded-full border px-3 text-sm transition',
                stepIndex === active ? 'border-accent bg-accent/15 text-fg' : 'border-line text-muted hover:text-fg',
              )}
            >
              {step}
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-4 font-display text-2xl italic">
        {steps[active]}
        <span className="text-muted"> → {steps[(active + 1) % steps.length]}</span>
      </p>
    </div>
  )
}
