import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { aboutChapters } from '@/content/aboutStory'
import { useReducedMotion } from '@/hooks/useMedia'
import { cn } from '@/lib/cn'

export function AboutChapters() {
  const reduced = useReducedMotion()
  const trackRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 0.7', 'end 0.45'],
  })
  const fill = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [0, 1])

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (reduced) return
    const next = Math.round(value * (aboutChapters.length - 1))
    setActive(Math.min(Math.max(next, 0), aboutChapters.length - 1))
  })

  return (
    <section ref={trackRef} className="relative py-28">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">The story</p>
      <h2 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">
        How I got to a running system.
      </h2>

      <div className="relative mt-16">
        <div className="pointer-events-none absolute top-2 bottom-2 left-[1.15rem] w-px bg-line md:left-[6.4rem]" />
        <motion.div
          className="pointer-events-none absolute top-2 bottom-2 left-[1.15rem] w-0.5 origin-top bg-gradient-to-b from-accent to-ok md:left-[6.4rem]"
          style={{ scaleY: fill }}
        />

        <ol className="space-y-20 md:space-y-28">
          {aboutChapters.map((chapter, index) => {
            const current = reduced || index === active
            const reached = reduced || index <= active
            return (
              <li key={chapter.id}>
                <motion.article
                  initial={reduced ? false : { opacity: 0, y: 48 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-12%' }}
                  transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    'grid items-start gap-6 transition-opacity duration-500 md:grid-cols-[11rem_minmax(0,1fr)]',
                    reached ? 'opacity-100' : 'opacity-40',
                  )}
                >
                  <p
                    className={cn(
                      'sticky top-28 pl-10 font-mono text-sm uppercase tracking-[0.14em] md:pl-0 md:text-right',
                      current ? 'text-accent' : 'text-muted',
                    )}
                  >
                    {chapter.year}
                  </p>
                  <div className="pl-10 md:pl-8">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted">{chapter.place}</p>
                    <h3 className="mt-3 font-display text-3xl leading-tight md:text-5xl">{chapter.title}</h3>
                    <p className="mt-5 max-w-2xl text-lg text-muted">{chapter.body}</p>
                  </div>
                </motion.article>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
