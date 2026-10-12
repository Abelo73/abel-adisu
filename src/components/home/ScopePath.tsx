import { motion } from 'motion/react'
import { Check, Code2, Globe, Layers, Rocket, Search, Users } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { STAGE, sceneHeight, useScrollStep } from '@/hooks/useScrollStep'
import { cn } from '@/lib/cn'
import { AnimatedText } from '@/components/ui/AnimatedText'

const steps = [
  { icon: Search, label: 'Discover', text: 'Constraints, users, and what “done” means.' },
  { icon: Globe, label: 'Architecture', text: 'Boundaries, data, and one diagram everyone agrees on.' },
  { icon: Users, label: 'Contracts', text: 'APIs and events agreed before code is written.' },
  { icon: Layers, label: 'Build', text: 'Services and UI, shipped in working slices.' },
  { icon: Code2, label: 'Rescue', text: 'Fix the bugs and finish what was left half-done.' },
  { icon: Rocket, label: 'Ship', text: 'Containers, cluster and edge — live for real users.' },
]

export function ScopePath() {
  const { ref, step: active, goTo } = useScrollStep(steps.length)

  return (
    <section ref={ref} style={{ height: sceneHeight(steps.length) }} className="relative">
      <div className={STAGE}>
        <Container className="w-full">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-steel">Scope of work</p>
          <AnimatedText as="h2" className="mt-3 max-w-2xl font-display text-[clamp(2.2rem,6vw,4.5rem)] leading-[1.04]">How an <span className="story-gradient">engagement</span> moves.</AnimatedText>
        </div>
        <AnimatedText as="p" stagger={0.03} delay={0.4} className="max-w-xs text-muted">From the first constraint to a running system — six steps.</AnimatedText>
      </div>

      {/* progress strip */}
      <div className="mt-6 grid grid-cols-6 gap-1.5" aria-hidden="true">
        {steps.map((step, index) => (
          <span key={step.label} className="h-1 overflow-hidden rounded-full bg-line">
            <span
              className="block h-full origin-left rounded-full bg-accent transition-transform duration-700 ease-out"
              style={{ transform: `scaleX(${index <= active ? 1 : 0})` }}
            />
          </span>
        ))}
      </div>

      <ol className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {steps.map((step, index) => {
          const Icon = step.icon
          const current = index === active
          const done = index < active
          return (
            <li key={step.label}>
              <motion.button
                type="button"
                onClick={() => goTo(index)}
                aria-current={current ? 'step' : undefined}
                animate={{ y: current ? -6 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className={cn(
                  'glass relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-[16px] border p-4 text-left transition-colors duration-500 sm:p-6',
                  current
                    ? 'border-[#36b7ff]/60 bg-[#1368e8]/30 text-fg shadow-[0_0_40px_rgb(19_104_232_/_0.4)]'
                    : 'border-line bg-card',
                )}
              >
                <span className="flex items-center justify-between">
                  <span
                    className={cn(
                      'grid size-11 place-items-center rounded-full transition-colors duration-500',
                      current ? 'bg-[#1368e8] text-white' : done ? 'bg-ok/10 text-ok' : 'bg-alt text-accent',
                    )}
                  >
                    {done ? <Check size={20} aria-hidden="true" /> : <Icon size={20} aria-hidden="true" />}
                  </span>
                  <span className={cn('font-mono text-sm', 'text-muted')}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </span>
                <span className="mt-3 font-display text-lg sm:mt-5 sm:text-xl">{step.label}</span>
                <span className={cn('mt-2 hidden text-sm leading-snug sm:block', current ? 'text-fg/80' : 'text-muted')}>
                  {step.text}
                </span>
              </motion.button>
            </li>
          )
        })}
      </ol>
        </Container>
      </div>
    </section>
  )
}
