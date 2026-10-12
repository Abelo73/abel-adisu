import { motion } from 'motion/react'
import type { OriginChapter } from '@/content/originStory'
import { CareerLadder } from '@/components/story/CareerLadder'
import { PullQuote } from '@/components/story/PullQuote'
import { StatCallout } from '@/components/story/StatCallout'
import { useReducedMotion } from '@/hooks/useMedia'
import { cn } from '@/lib/cn'

export function StoryChapter({
  chapter,
  index,
}: {
  chapter: OriginChapter
  index: number
}) {
  const reduced = useReducedMotion()
  const right = index % 2 === 1

  return (
    <section className="relative py-16 md:py-24">
      <span
        className="absolute top-20 left-[14px] size-2.5 rounded-full bg-accent md:left-1/2 md:-translate-x-1/2"
        aria-hidden="true"
      />
      <div
        className={cn(
          'md:grid md:grid-cols-2 md:gap-16',
          right ? 'md:[&>*]:col-start-2' : 'md:[&>*]:col-start-1',
        )}
      >
        <motion.div
          className="pl-10 md:pl-0"
          initial={reduced ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12%' }}
          transition={{ duration: reduced ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            className="text-xs uppercase tracking-[0.2em] text-muted"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: reduced ? 0 : 0.05 }}
          >
            {chapter.era}
          </motion.p>
          <motion.h2
            className="mt-3 font-display text-3xl leading-tight md:text-5xl"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: reduced ? 0 : 0.12 }}
          >
            {chapter.title}
          </motion.h2>
          <div className="mt-5 max-w-xl space-y-4 text-muted">
            {chapter.body.map((paragraph, line) => (
              <motion.p
                key={paragraph}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: reduced ? 0 : 0.18 + line * 0.08 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
          {chapter.quote ? <PullQuote>{chapter.quote}</PullQuote> : null}
          {chapter.stat ? (
            <StatCallout value={chapter.stat.value} of={chapter.stat.of} caption={chapter.stat.caption} />
          ) : null}
          {chapter.ladder ? <CareerLadder steps={chapter.ladder} /> : null}
          {chapter.stack ? (
            <ul className="mt-6 flex flex-wrap gap-2">
              {chapter.stack.map((item) => (
                <li key={item} className="rounded-full border border-line px-3 py-1.5 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
          {chapter.loop ? (
            <ol className="mt-8 flex flex-wrap gap-2">
              {chapter.loop.map((step) => (
                <li
                  key={step}
                  className="rounded-full border border-accent/35 bg-accent/10 px-3 py-1.5 text-sm"
                >
                  {step}
                </li>
              ))}
            </ol>
          ) : null}
        </motion.div>
      </div>
    </section>
  )
}
