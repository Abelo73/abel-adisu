import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { stackWorkflow } from '@/content/stackWorkflow'
import { useReducedMotion } from '@/hooks/useMedia'
import { cn } from '@/lib/cn'

export function StackWorkflow() {
  const reduced = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 0.7', 'end 0.4'],
  })
  const fill = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [0, 1])
  const marker = useTransform(fill, (value) => `${value * 100}%`)

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (reduced) return
    const next = Math.round(value * (stackWorkflow.length - 1))
    setActive(Math.min(Math.max(next, 0), stackWorkflow.length - 1))
  })

  return (
    <div ref={trackRef} className="workflow-board relative mt-12 overflow-hidden rounded-[28px] p-5 sm:p-8">
      <div className="pointer-events-none absolute top-8 bottom-8 left-5 w-px bg-line sm:left-8" />
      <motion.div
        className="pointer-events-none absolute top-8 bottom-8 left-5 w-0.5 origin-top bg-gradient-to-b from-accent via-[#0f766e] to-ok sm:left-8"
        style={{ scaleY: fill }}
      />
      {!reduced ? (
        <motion.span
          className="pointer-events-none absolute left-5 size-2.5 -translate-x-1/2 rounded-full bg-ok shadow-[0_0_14px_color-mix(in_srgb,var(--ok)_45%,transparent)] sm:left-8"
          style={{ top: marker }}
        />
      ) : null}

      <ol className="relative space-y-5 pl-6 sm:pl-8">
        {stackWorkflow.map((row, index) => {
          const current = reduced || index === active
          const reached = reduced || index <= active
          return (
            <li key={row.map((node) => node.id).join('-')}>
              <ul className={cn('grid gap-4', row.length > 1 && 'md:grid-cols-2')}>
                {row.map((node) => (
                  <li key={node.id}>
                    <article
                      className={cn(
                        'workflow-node rounded-2xl border p-4 shadow-[0_12px_40px_rgb(20_12_34_/_0.08)] transition-[opacity,border-color,box-shadow] duration-300 dark:shadow-[0_16px_40px_rgb(0_0_0_/_0.35)]',
                        reached ? 'opacity-100' : 'opacity-50',
                        current ? 'border-transparent' : 'border-line',
                      )}
                      style={
                        current
                          ? { boxShadow: `0 16px 48px color-mix(in srgb, ${node.accent} 22%, transparent)` }
                          : undefined
                      }
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="size-2.5 rounded-full"
                          style={{ background: node.accent }}
                          aria-hidden="true"
                        />
                        <h3 className="text-lg font-semibold tracking-tight text-fg">{node.label}</h3>
                      </div>

                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <div>
                          <p className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-ok">
                            In place
                          </p>
                          <ul className="mt-2 space-y-1.5">
                            {node.done.map((item) => (
                              <li key={item} className="flex items-start gap-2.5 text-sm text-fg">
                                <span className="workflow-port mt-1.5 size-2 shrink-0 rounded-full bg-ok" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted">
                            Not on this path
                          </p>
                          <ul className="mt-2 space-y-1.5">
                            {node.open.map((item) => (
                              <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                                <span className="mt-1.5 size-2 shrink-0 rounded-full border border-dashed border-muted bg-transparent" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
