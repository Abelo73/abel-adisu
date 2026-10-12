import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'motion/react'
import { Bell, Bot, Database, GitBranch, Globe, Webhook, Workflow, type LucideIcon } from 'lucide-react'
import type { N8nKind, WorkflowStep } from '@/content/automation'
import { useReducedMotion } from '@/hooks/useMedia'
import { cn } from '@/lib/cn'

const icons: Partial<Record<N8nKind, LucideIcon>> = {
  trigger: Webhook,
  n8n: Workflow,
  ai: Bot,
  if: GitBranch,
  http: Globe,
  database: Database,
  notify: Bell,
}

const STEP_MS = 1100

/** Home-page automation run: a payload travels node to node, the log fills in, then it loops. */
export function AutomationFlow({ steps }: { steps: WorkflowStep[] }) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const onScreen = useInView(ref, { amount: 0.4 })
  const total = steps.length
  const [done, setDone] = useState(reduced ? total : 0)

  useEffect(() => {
    if (reduced || !onScreen) return
    const delay = done >= total ? 3200 : STEP_MS
    const timer = window.setTimeout(() => setDone((d) => (d >= total ? 0 : d + 1)), delay)
    return () => window.clearTimeout(timer)
  }, [done, onScreen, reduced, total])

  const finished = done >= total
  const fill = total > 1 ? (Math.min(done, total - 1) / (total - 1)) * 100 : 0

  return (
    <div ref={ref} className="glass overflow-hidden rounded-[20px] p-5 shadow-[var(--shadow-lift)] sm:p-8">
      <div className="flex items-center justify-between gap-3 text-xs">
        <span className="font-mono uppercase tracking-[0.08em] text-muted">Core intelligence path</span>
        <span
          className={cn(
            'inline-flex items-center gap-2 rounded-full px-3 py-1 font-semibold transition-colors',
            finished ? 'bg-[#34d399]/15 text-[#34d399]' : 'bg-[#36b7ff]/15 text-[#36b7ff]',
          )}
        >
          <span className={cn('size-1.5 rounded-full', finished ? 'bg-[#34d399]' : 'live-dot bg-[#36b7ff]')} style={{ ['--ok' as string]: '#36b7ff' }} />
          {finished ? 'Run complete' : 'Running'}
        </span>
      </div>

      {/* nodes */}
      <div className="relative mt-8">
        <div className="absolute left-[calc(100%/14)] right-[calc(100%/14)] top-6 hidden h-px bg-line lg:block" aria-hidden="true">
          <div
            className="relative h-0.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#1368e8] to-[#36b7ff] transition-[width] duration-[900ms] ease-out"
            style={{ width: `${fill}%` }}
          >
            <span className="absolute -right-1.5 top-1/2 size-3 -translate-y-1/2 rounded-full bg-[#36b7ff] shadow-[0_0_14px_#36b7ff]" />
          </div>
        </div>

        <ol className="relative grid grid-cols-1 gap-2 lg:grid-cols-7 lg:gap-0">
          {steps.map((step, index) => {
            const Icon = icons[step.kind] ?? Workflow
            const complete = index < done
            const current = index === done && !finished
            return (
              <li key={step.id} className="flex items-center gap-4 lg:flex-col lg:gap-3 lg:text-center">
                <span
                  className={cn(
                    'relative grid size-12 shrink-0 place-items-center rounded-[14px] border transition-all duration-500',
                    complete && 'border-[#36b7ff] bg-[#1368e8] text-white',
                    current && 'scale-110 border-[#36b7ff] bg-bg text-steel shadow-[0_0_30px_rgb(54_183_255_/_0.5)]',
                    !complete && !current && 'border-line bg-fg/5 text-muted',
                  )}
                >
                  <Icon size={20} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className={cn('block text-sm font-semibold transition-colors', complete || current ? 'text-fg' : 'text-muted')}>
                    {step.label}
                  </span>
                  <span className="block text-xs text-muted lg:hidden">{step.detail}</span>
                </span>
              </li>
            )
          })}
        </ol>
      </div>

      {/* log */}
      <div className="mt-8 hidden min-h-[8.5rem] rounded-[12px] bg-[#020817] p-4 font-mono text-white text-xs leading-relaxed sm:block">
        <AnimatePresence initial={false}>
          {steps.slice(Math.max(0, done - 4), done).map((step, i, arr) => (
            <motion.p
              key={step.id}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, x: -10 }}
              animate={{ opacity: 0.45 + (i / Math.max(arr.length, 1)) * 0.55, x: 0 }}
              exit={{ opacity: 0 }}
              className="truncate text-white"
            >
              <span className="text-[#34d399]">✓</span> <span className="text-[#36b7ff]">{step.label}</span> — {step.detail}
            </motion.p>
          ))}
        </AnimatePresence>
        {done === 0 ? <p className="text-white/40">$ waiting for a trigger…</p> : null}
        {finished ? <p className="mt-1 text-[#34d399]">run complete · every step recorded</p> : null}
      </div>
    </div>
  )
}
