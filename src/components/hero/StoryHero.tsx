import { motion } from 'motion/react'
import { profile } from '@/content/profile'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { PhoneMessages } from '@/components/hero/PhoneMessages'
import { useReducedMotion } from '@/hooks/useMedia'

export function StoryHero() {
  const reduced = useReducedMotion()
  const words = profile.hero.title.split(' ')
  const enter = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: [0.2, 0.8, 0.2, 1] as const },
        }

  return (
    <section className="relative flex min-h-[calc(100dvh-4.0625rem)] items-center overflow-hidden pb-28 pt-10 md:pb-24">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute right-[8%] top-1/2 hidden size-[34rem] -translate-y-1/2 rounded-full lg:block"
        style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--glow-color) 38%, transparent), transparent 65%)' }}
        aria-hidden="true"
      />
      <Container className="relative w-full">
        <div className="grid items-center gap-12 lg:gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <motion.div {...enter(0)}>
            <span className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 text-xs font-semibold text-ok">
              <span className="live-dot size-1.5 rounded-full bg-ok" aria-hidden="true" />
              {profile.current.role} at Atlas
            </span>
            <h1 className="mt-6 font-display text-[clamp(2.4rem,6vw,5rem)] leading-[1.02]">
              {words.map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  className={index >= words.length - 3 ? 'story-gradient inline-block pr-[0.25em]' : 'inline-block pr-[0.25em]'}
                  initial={reduced ? false : { opacity: 0, y: 28, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.7, delay: 0.15 + index * 0.09, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted">{profile.hero.lede}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/contact">{profile.hero.primaryCta}</Button>
              <Button to="/projects" variant="secondary">
                See my work
              </Button>
            </div>
            <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-5">
              {profile.hero.highlights.map((item) => (
                <div key={item.label}>
                  <dt className="sr-only">{item.label}</dt>
                  <dd className="font-display text-2xl text-fg">{item.value}</dd>
                  <p className="text-sm text-muted">{item.label}</p>
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.div className="relative mx-auto w-full max-w-sm py-6" {...enter(0.12)}>
            <PhoneMessages />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
