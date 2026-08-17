import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Stars } from '@/components/ui/Stars'
import { leftSystemStories, rightSystemStories, type SystemStory } from '@/content/userStories'
import { upworkProof } from '@/content/upwork'
import { useReducedMotion } from '@/hooks/useMedia'
import { cn } from '@/lib/cn'

function StoryBubble({
  story,
  side,
  delay,
}: {
  story: SystemStory
  side: 'left' | 'right'
  delay: number
}) {
  const reduced = useReducedMotion()

  return (
    <motion.article
      className={cn('max-w-[22rem]', side === 'right' && 'lg:ml-auto')}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.7, delay: reduced ? 0 : delay * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="float-card" style={{ animationDelay: `${delay}s` }}>
        <div className={cn('flex items-start gap-3', side === 'right' && 'lg:flex-row-reverse')}>
          <div className="flex w-[4.5rem] shrink-0 flex-col items-center gap-2">
            <span
              className="grid size-16 place-items-center rounded-full text-sm font-semibold text-white ring-2 ring-white/20"
              style={{ background: story.accent }}
              aria-hidden="true"
            >
              {story.mark}
            </span>
            <p className="text-center text-[0.7rem] leading-tight text-muted">{story.who}</p>
          </div>
          <div className="speech-bubble" data-side={side}>
            {story.quote ? <Stars size={13} /> : null}
            <p className={cn('text-sm leading-relaxed', story.quote && 'mt-2')}>
              {story.quote ? `“${story.line}”` : story.line}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export function ClientStories() {
  const reduced = useReducedMotion()

  return (
    <section className={cn('relative overflow-hidden py-24', !reduced && 'float-enabled')}>
      <div className="pointer-events-none absolute left-[18%] top-[18%] size-[28rem] rounded-full bg-[#7B61FF]/18 blur-[120px]" />
      <div className="pointer-events-none absolute right-[12%] bottom-[8%] size-72 rounded-full bg-[#5eead4]/10 blur-[100px]" />

      <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">User stories</h2>
          <Link to="/upwork" className="hidden text-sm text-muted underline-offset-4 hover:underline sm:inline">
            Full reviews
          </Link>
        </div>
      </div>

      <div className="relative mx-auto mt-4 grid w-full max-w-[1180px] items-center gap-10 px-5 py-8 sm:px-8 lg:min-h-[40rem] lg:grid-cols-[minmax(0,1fr)_minmax(15rem,20rem)_minmax(0,1fr)] lg:gap-6">
        <div className="flex flex-col gap-10 lg:gap-14">
          {leftSystemStories.map((story, index) => (
            <div key={story.id} className={index === 1 ? 'lg:ml-6' : index === 2 ? 'lg:ml-2' : ''}>
              <StoryBubble story={story} side="left" delay={index} />
            </div>
          ))}
        </div>

        <div className="relative z-10 py-6 text-center lg:py-0">
          <p className="story-gradient text-[clamp(1.7rem,3.6vw,3.15rem)] font-semibold uppercase leading-[1.12] tracking-tight">
            What this
            <br />
            practice must
            <br />
            support
          </p>
          <p className="mt-5 text-sm text-muted">
            {upworkProof.badge} · {upworkProof.jobSuccess} Job Success
          </p>
        </div>

        <div className="flex flex-col gap-10 lg:gap-14">
          {rightSystemStories.map((story, index) => (
            <div
              key={story.id}
              className={index === 0 ? 'lg:mt-8' : index === 2 ? 'lg:mr-4 lg:mt-2' : 'lg:mt-0'}
            >
              <StoryBubble story={story} side="right" delay={index + 0.4} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
