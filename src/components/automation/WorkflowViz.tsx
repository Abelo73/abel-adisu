import { useEffect, useId, useState } from 'react'
import { motion } from 'motion/react'
import { Play, Square } from 'lucide-react'
import type { N8nKind, WorkflowStep } from '@/content/automation'
import { useReducedMotion } from '@/hooks/useMedia'
import { cn } from '@/lib/cn'

const roles: Record<N8nKind, { role: string; inn: string; out: string }> = {
  trigger: { role: 'Start', inn: 'Webhook, cron, or form', out: 'Signed payload' },
  form: { role: 'Intake', inn: 'Topic or brief', out: 'Normalized request' },
  n8n: { role: 'Orchestrate', inn: 'The payload', out: 'Routed work' },
  ai: { role: 'Model', inn: 'Schema + context', out: 'Structured JSON' },
  if: { role: 'Gate', inn: 'Model output + rules', out: 'Continue or hold' },
  http: { role: 'Request', inn: 'Contract + credentials', out: 'Upstream response' },
  database: { role: 'Record', inn: 'Validated facts', out: 'Durable row' },
  notify: { role: 'Notify', inn: 'Record link', out: 'A human sees it' },
  review: { role: 'Review', inn: 'Draft', out: 'Approved or rejected' },
  code: { role: 'Transform', inn: 'Structured output', out: 'Publishable artifact' },
  crm: { role: 'CRM', inn: 'Person payload', out: 'Merged record' },
}

export function WorkflowViz({
  steps,
  title,
}: {
  steps: WorkflowStep[]
  title: string
}) {
  const reduced = useReducedMotion()
  const markerId = useId()
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)
  const current = steps[active]
  const meta = current ? roles[current.kind] : null
  const total = steps.length
  const progress = total ? ((active + 1) / total) * 100 : 0

  useEffect(() => {
    if (!playing || reduced) return
    const id = window.setInterval(() => {
      setActive((index) => {
        if (index >= steps.length - 1) {
          setPlaying(false)
          return index
        }
        return index + 1
      })
    }, 850)
    return () => window.clearInterval(id)
  }, [playing, reduced, steps.length])

  if (!current || !meta) return null

  return (
    <section className="run-desk overflow-hidden rounded-[16px] border border-line">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">The run</p>
          <h3 className="mt-1 text-lg font-semibold tracking-tight">{title}</h3>
        </div>
        <button
          type="button"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-fg/5 px-4 text-sm font-medium hover:bg-fg/10"
          onClick={() => {
            if (playing) {
              setPlaying(false)
              return
            }
            setActive(0)
            setPlaying(!reduced)
          }}
        >
          {playing ? <Square size={12} fill="currentColor" aria-hidden="true" /> : <Play size={14} fill="currentColor" aria-hidden="true" />}
          {playing ? 'Stop' : 'Walk the run'}
        </button>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <ol className="relative order-2 space-y-1 p-4 lg:order-1 lg:border-r lg:border-line lg:p-5">
          <span className="pointer-events-none absolute top-6 bottom-6 left-[2.15rem] w-px bg-line lg:left-[2.4rem]" aria-hidden="true" />
          {steps.map((step, index) => {
            const selected = index === active
            const passed = index < active
            const role = roles[step.kind]
            return (
              <li key={step.id} className="relative">
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => {
                    setPlaying(false)
                    setActive(index)
                  }}
                  className={cn(
                    'relative flex min-h-12 w-full items-center gap-3 rounded-2xl px-2 py-2 text-left transition-colors',
                    selected ? 'bg-fg/6' : 'hover:bg-fg/4',
                  )}
                >
                  {selected ? (
                    <motion.span
                      layoutId={markerId}
                      className="absolute inset-0 rounded-2xl bg-accent/10 ring-1 ring-accent/35"
                      transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  <span
                    className={cn(
                      'relative z-10 grid size-8 shrink-0 place-items-center rounded-full font-mono text-[0.7rem]',
                      selected
                        ? 'bg-accent text-accent-fg'
                        : passed
                          ? 'bg-ok/15 text-ok'
                          : 'bg-fg/8 text-muted',
                    )}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="relative z-10 min-w-0">
                    <span className="block truncate font-medium leading-tight">{step.label}</span>
                    <span className="mt-0.5 block font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted">
                      {role.role}
                    </span>
                  </span>
                </button>
              </li>
            )
          })}
        </ol>

        <aside
          className="run-inspect order-1 flex flex-col justify-between gap-8 p-5 lg:order-2 lg:p-8"
          aria-live="polite"
        >
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-accent">
              Now · {meta.role}
            </p>
            <p className="mt-3 font-display text-4xl leading-none tracking-tight">{current.label}</p>
            <p className="mt-4 max-w-md text-muted">{current.detail}</p>
          </div>

          <dl className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-bg/40 p-4">
              <dt className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">In</dt>
              <dd className="mt-2 text-sm">{meta.inn}</dd>
            </div>
            <div className="rounded-2xl border border-line bg-bg/40 p-4">
              <dt className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">Out</dt>
              <dd className="mt-2 text-sm">{meta.out}</dd>
            </div>
          </dl>

          <div>
            <div className="h-1 overflow-hidden rounded-full bg-line">
              <motion.div
                className="h-full origin-left bg-accent"
                animate={{ width: `${progress}%` }}
                transition={reduced ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
              Hop {String(active + 1).padStart(2, '0')} of {String(total).padStart(2, '0')}
            </p>
          </div>
        </aside>
      </div>
    </section>
  )
}
