import { AnimatePresence, motion } from 'motion/react'
import { stackWorkflow } from '@/content/stackWorkflow'
import { Container } from '@/components/ui/Container'
import { useReducedMotion } from '@/hooks/useMedia'
import { STAGE, sceneHeight, useScrollStep } from '@/hooks/useScrollStep'
import { cn } from '@/lib/cn'

const nodes = stackWorkflow.flat()

const stages = [
  { id: 'screen', short: 'Screen', title: 'The screen people use', blurb: 'I start with the UI and never hand off.', ids: ['react'] },
  { id: 'services', short: 'Services', title: 'The logic behind it', blurb: 'Java services and processes that do the real work.', ids: ['java', 'camunda'] },
  { id: 'trust', short: 'Trust', title: 'Identity, events, files', blurb: 'Who can do what, what happened, where it is stored.', ids: ['keycloak', 'kafka', 'minio'] },
  { id: 'data', short: 'Data', title: 'Where it lives', blurb: 'Postgres, auth and storage for product backends.', ids: ['supabase'] },
  { id: 'prod', short: 'Live', title: 'Running in production', blurb: 'Containers, a cluster, and the edge — until it runs.', ids: ['docker', 'k8s', 'rancher', 'nginx', 'prod'] },
].map((stage) => ({ ...stage, nodes: stage.ids.map((id) => nodes.find((n) => n.id === id)!).filter(Boolean) }))

export function ShipPipeline() {
  const reduced = useReducedMotion()
  const { ref, step: active, goTo } = useScrollStep(stages.length)
  const stage = stages[active]
  const progress = (active / (stages.length - 1)) * 100

  return (
    <section ref={ref} style={{ height: sceneHeight(stages.length) }} className="relative">
      <div className={STAGE}>
        <Container className="w-full">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-steel">How I ship</p>
          <h2 className="mt-3 max-w-4xl font-display text-[clamp(2.2rem,6vw,4.5rem)] leading-[1.04]">
            From a single screen to <span className="story-gradient">production.</span>
          </h2>

          <div className="relative mt-8 sm:mt-12">
            <div className="absolute left-[10%] right-[10%] top-6 h-px bg-line" aria-hidden="true" />
            <div
              className="absolute left-[10%] top-6 h-0.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#1368e8] to-[#36b7ff] transition-[width] duration-500 ease-out"
              style={{ width: `${progress * 0.8}%` }}
              aria-hidden="true"
            />
            <ol className="relative grid grid-cols-5">
              {stages.map((s, index) => {
                const reached = index <= active
                const current = index === active
                return (
                  <li key={s.id} className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => goTo(index)}
                      aria-current={current ? 'step' : undefined}
                      className="group flex cursor-pointer flex-col items-center gap-2.5 outline-offset-4"
                    >
                      <span
                        className={cn(
                          'relative grid size-12 place-items-center rounded-full border font-mono text-sm transition-all duration-500',
                          reached ? 'border-[#36b7ff] bg-[#1368e8] text-white' : 'border-line bg-bg text-muted',
                          current && 'scale-110 shadow-[0_0_30px_rgb(54_183_255_/_0.55)]',
                        )}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className={cn('text-xs font-semibold sm:text-sm', current ? 'text-fg' : 'text-muted')}>
                        {s.short}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>
          </div>

          <div className="mt-8 sm:mt-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage.id}
                initial={reduced ? false : { opacity: 0, y: 24, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={reduced ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                className="glass grid gap-5 rounded-[20px] p-5 sm:gap-8 sm:p-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
              >
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted">
                    Stage {String(active + 1).padStart(2, '0')} / {String(stages.length).padStart(2, '0')}
                  </p>
                  <h3 className="mt-2 font-display text-2xl md:text-3xl">{stage.title}</h3>
                  <p className="mt-2 text-muted">{stage.blurb}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {stage.nodes.map((node, i) => (
                      <motion.li
                        key={node.id}
                        initial={reduced ? false : { opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 + i * 0.07, type: 'spring', stiffness: 300, damping: 22 }}
                        className="rounded-full border border-[#36b7ff]/40 bg-[#1368e8]/20 px-3.5 py-1.5 text-sm font-semibold"
                      >
                        {node.label}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <ul className="hidden content-start gap-2.5 sm:grid sm:grid-cols-2">
                  {stage.nodes.flatMap((node) => node.done).slice(0, 6).map((item) => (
                    <li key={item} className="flex items-start gap-2.5 rounded-[10px] bg-fg/[0.05] px-3.5 py-3 text-sm">
                      <span className="mt-1.5 size-2 shrink-0 rounded-full bg-[#36b7ff]" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
          <p className="mt-5 text-center text-xs text-muted">Scroll to move through the stages</p>
        </Container>
      </div>
    </section>
  )
}
