import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'motion/react'
import { Quote, Star } from 'lucide-react'
import { upworkJobs, upworkProof } from '@/content/upwork'
import { leftSystemStories, rightSystemStories } from '@/content/userStories'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { useReducedMotion } from '@/hooks/useMedia'
import { cn } from '@/lib/cn'

const reviews = upworkJobs.filter((job) => job.quote)
const needs = [...leftSystemStories, ...rightSystemStories].filter((s) => !s.quote).map((s) => s.line)

export function ClientStories() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const onScreen = useInView(ref, { amount: 0.35 })
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduced || !onScreen || reviews.length < 2) return
    const timer = window.setTimeout(() => setActive((i) => (i + 1) % reviews.length), 6000)
    return () => window.clearTimeout(timer)
  }, [active, onScreen, reduced])

  return (
    <section
      ref={ref}
      className="relative flex min-h-[calc(100dvh-4.0625rem)] flex-col justify-center overflow-hidden py-16"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-steel">Client words</p>
            <div className="mt-4 flex items-end gap-4">
              <span className="story-gradient font-display text-[clamp(5rem,12vw,9rem)] leading-none">5.0</span>
              <div className="pb-3">
                <p className="flex gap-0.5" aria-label="Five stars on Upwork">
                  {Array.from({ length: upworkProof.stars }, (_, i) => (
                    <Star key={i} size={20} className="fill-[#F5C14A] text-[#F5C14A]" aria-hidden="true" />
                  ))}
                </p>
                <p className="mt-1 text-sm text-muted">on Upwork</p>
              </div>
            </div>
            <p className="mt-5 text-lg text-muted">
              {upworkProof.badge} · {upworkProof.jobSuccess} Job Success · {upworkProof.jobs} jobs
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {upworkProof.endorsements.slice(0, 5).map((item) => (
                <li
                  key={item.label}
                  className="rounded-full border border-line bg-alt px-3.5 py-1.5 text-sm font-medium"
                >
                  {item.label}
                </li>
              ))}
            </ul>
            <Link to="/upwork" className="mt-8 inline-flex min-h-12 items-center text-sm font-semibold text-steel underline-offset-4 hover:underline">
              Read all reviews →
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative mx-auto h-[24rem] max-w-xl sm:h-[21rem]">
              {reviews.map((job, index) => {
                const pos = (index - active + reviews.length) % reviews.length
                const front = pos === 0
                return (
                  <motion.figure
                    key={job.slug}
                    animate={{
                      y: pos * 18,
                      scale: 1 - pos * 0.05,
                      opacity: pos > 1 ? 0 : 1 - pos * 0.45,
                      rotate: front ? 0 : pos % 2 ? 1.5 : -1.5,
                    }}
                    transition={{ type: 'spring', stiffness: 160, damping: 22 }}
                    style={{ zIndex: reviews.length - pos }}
                    className={cn(
                      'absolute inset-x-0 top-0 flex h-[22rem] flex-col glass rounded-[16px] p-6 shadow-[var(--shadow-lift)] sm:h-[19rem] sm:p-8',
                    )}
                    aria-hidden={!front}
                  >
                    <Quote size={28} className="text-steel" aria-hidden="true" />
                    <blockquote className="mt-4 overflow-hidden text-[0.95rem] leading-relaxed sm:text-base">
                      “{job.quote}”
                    </blockquote>
                    <figcaption className="mt-auto flex items-center justify-between gap-3 pt-4 text-sm">
                      <span className="font-semibold">{job.title}</span>
                      <span className="shrink-0 text-muted">Upwork client</span>
                    </figcaption>
                  </motion.figure>
                )
              })}
              <div className="absolute -bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
                {reviews.map((job, index) => (
                  <button
                    key={job.slug}
                    type="button"
                    aria-label={`Show review ${index + 1}`}
                    onClick={() => setActive(index)}
                    className={cn('h-2 cursor-pointer rounded-full transition-all', index === active ? 'w-6 bg-steel' : 'w-2 bg-line')}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>

      <div className="marquee mt-20 border-y border-line py-4" aria-label="What teams need from the software">
        <div className="marquee-track flex w-max gap-4">
          {[...needs, ...needs].map((line, i) => (
            <span
              key={`${line}-${i}`}
              className="whitespace-nowrap rounded-full border border-line bg-card px-4 py-2 text-sm text-muted"
              aria-hidden={i >= needs.length}
            >
              {line}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
