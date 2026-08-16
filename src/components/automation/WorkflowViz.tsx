import { useState } from 'react'
import type { WorkflowStep } from '@/content/automation'
import { cn } from '@/lib/cn'

export function WorkflowViz({
  steps,
  title,
}: {
  steps: WorkflowStep[]
  title: string
}) {
  const [active, setActive] = useState(0)
  const current = steps[active]

  return (
    <section className="rounded-[12px] border border-line bg-card/60 p-4 sm:p-6">
      <h3 className="font-display text-xl">{title}</h3>
      <ol className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.id}>
            <button
              type="button"
              data-cursor="node"
              onClick={() => setActive(index)}
              className={cn(
                'flex min-h-12 w-full cursor-pointer flex-col items-start rounded-[8px] border px-3 py-3 text-left',
                index === active ? 'border-accent bg-accent/10' : 'border-line hover:border-accent/40',
              )}
              aria-pressed={index === active}
            >
              <span className="font-mono text-[0.65rem] text-muted">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="mt-1 text-sm font-medium">{step.label}</span>
            </button>
          </li>
        ))}
      </ol>
      {current ? (
        <p className="mt-5 text-sm leading-relaxed text-muted">
          <span className="font-medium text-fg">{current.label}. </span>
          {current.detail}
        </p>
      ) : null}
    </section>
  )
}
