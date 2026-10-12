import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useInView } from 'motion/react'
import { Check, Landmark, Repeat, ScrollText, ShieldCheck, ShieldHalf, Smartphone, Store } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { useReducedMotion } from '@/hooks/useMedia'
import { cn } from '@/lib/cn'
import { AnimatedText } from '@/components/ui/AnimatedText'

const nodes = [
  { icon: Smartphone, label: 'Customer' },
  { icon: ShieldCheck, label: 'Gateway' },
  { icon: Landmark, label: 'Bank / wallet' },
  { icon: Store, label: 'Merchant' },
]

const rules = [
  { icon: Repeat, title: 'Never charge twice', text: 'Retries must be safe. The same request can never move money again.' },
  { icon: ScrollText, title: 'Every state recorded', text: 'Authorized, captured, settled, refunded — each step leaves a trace.' },
  { icon: ShieldHalf, title: 'Fail safely', text: 'When a bank or network drops, the system stops in a known state.' },
]

const feed = [
  { status: 'Authorized', amount: 'ETB 1,250.00', ref: 'PAY-4821' },
  { status: 'Settled', amount: 'ETB 8,400.00', ref: 'PAY-4817' },
  { status: 'Authorized', amount: 'ETB 320.50', ref: 'PAY-4816' },
  { status: 'Refunded', amount: 'ETB 540.00', ref: 'PAY-4809' },
]

const STEP_MS = 900

/** Home-page scene for the fintech payment gateway work: a payment travels the rails, a feed scrolls. */
export function PaymentGateway() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const onScreen = useInView(ref, { amount: 0.4 })
  const [done, setDone] = useState(reduced ? nodes.length : 0)

  useEffect(() => {
    if (reduced || !onScreen) return
    const timer = window.setTimeout(
      () => setDone((d) => (d >= nodes.length ? 0 : d + 1)),
      done >= nodes.length ? 2200 : STEP_MS,
    )
    return () => window.clearTimeout(timer)
  }, [done, onScreen, reduced])

  const finished = done >= nodes.length
  const fill = (Math.min(done, nodes.length - 1) / (nodes.length - 1)) * 100

  return (
    <section className="flex min-h-[calc(100dvh-4.0625rem)] items-center py-16">
      <Container className="w-full">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <Reveal>
            <div ref={ref} className="glass mx-auto w-full max-w-xl rounded-[22px] p-5 shadow-[0_30px_80px_rgb(0_0_0_/_0.35)] sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <p className="font-display text-base">Payment gateway</p>
                <span
                  className={cn(
                    'inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold transition-colors',
                    finished ? 'bg-ok/15 text-ok' : 'bg-[#1368e8]/20 text-steel',
                  )}
                >
                  <span className="size-1.5 rounded-full bg-current" />
                  {finished ? 'Settled' : 'Processing'}
                </span>
              </div>

              <div className="relative mt-8">
                <div className="absolute left-[12.5%] right-[12.5%] top-6 h-px bg-line" aria-hidden="true" />
                <div
                  className="absolute left-[12.5%] top-6 h-0.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#1368e8] to-[#36b7ff] transition-[width] duration-700 ease-out"
                  style={{ width: `${fill * 0.75}%` }}
                  aria-hidden="true"
                >
                  <span className="absolute -right-1.5 top-1/2 size-3 -translate-y-1/2 rounded-full bg-[#36b7ff] shadow-[0_0_16px_#36b7ff]" />
                </div>
                <ol className="relative grid grid-cols-4">
                  {nodes.map(({ icon: Icon, label }, index) => {
                    const complete = index < done
                    const current = index === done && !finished
                    return (
                      <li key={label} className="flex flex-col items-center gap-2.5 text-center">
                        <span
                          className={cn(
                            'relative grid size-12 place-items-center rounded-[14px] border transition-all duration-500',
                            complete && 'border-[#36b7ff] bg-[#1368e8] text-white',
                            current && 'scale-110 border-[#36b7ff] bg-bg text-steel shadow-[0_0_28px_rgb(54_183_255_/_0.5)]',
                            !complete && !current && 'border-line bg-fg/5 text-muted',
                          )}
                        >
                          {complete && index === nodes.length - 1 ? (
                            <Check size={20} aria-hidden="true" />
                          ) : (
                            <Icon size={20} aria-hidden="true" />
                          )}
                        </span>
                        <span className={cn('text-xs font-semibold', complete || current ? 'text-fg' : 'text-muted')}>
                          {label}
                        </span>
                      </li>
                    )
                  })}
                </ol>
              </div>

              <div className="relative mt-8 h-[9.5rem] overflow-hidden rounded-[14px] border border-line bg-fg/[0.03]">
                <ul className={reduced ? '' : 'ticker-up'}>
                  {[...feed, ...(reduced ? [] : feed)].map((row, i) => (
                    <li key={`${row.ref}-${i}`} className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 last:border-0">
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold leading-tight">{row.status}</span>
                        <span className="block font-mono text-xs text-muted">{row.ref}</span>
                      </span>
                      <span className="shrink-0 font-mono text-sm">{row.amount}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-3 text-center text-[0.7rem] text-muted">Illustration · sample data</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-steel">Right now</p>
            <AnimatedText as="h2" className="mt-3 font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05]">
              Building a payment gateway for <span className="story-gradient">fintech</span>
            </AnimatedText>
            <AnimatedText as="p" stagger={0.02} delay={0.3} className="mt-5 max-w-lg text-lg text-muted">
              At Atlas Computer Technology I’m working on payment gateway systems, where every transaction has to be
              correct, secure and traceable.
            </AnimatedText>
            <ul className="mt-8 grid gap-4">
              {rules.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-[12px] bg-[#1368e8]/20 text-steel">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-display text-base">{title}</span>
                    <span className="block text-sm text-muted">{text}</span>
                  </span>
                </li>
              ))}
            </ul>
            <Link
              to="/experience"
              className="mt-8 inline-flex min-h-12 items-center rounded-full border border-[color-mix(in_srgb,var(--fg)_25%,transparent)] px-6 text-[0.9375rem] font-semibold transition-colors hover:bg-fg hover:text-bg"
            >
              See my experience
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
