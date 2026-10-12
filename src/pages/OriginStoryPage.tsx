import { motion, useScroll, useTransform } from 'motion/react'
import { originChapters, originClose, originOpening } from '@/content/originStory'
import { StoryChapter } from '@/components/story/StoryChapter'
import { StoryProgress } from '@/components/story/StoryProgress'
import { TimelineSpine } from '@/components/story/TimelineSpine'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { useReducedMotion } from '@/hooks/useMedia'

export function OriginStoryPage() {
  const reduced = useReducedMotion()
  const { scrollY } = useScroll()
  const glowY = useTransform(scrollY, [0, 1200], reduced ? [0, 0] : [0, 180])

  return (
    <article className="relative pb-8">
      <StoryProgress />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-[12%] top-24 size-[22rem] rounded-full bg-accent/20 blur-[110px]"
        style={{ y: glowY }}
      />

      <Container>
        <header className="relative max-w-3xl pt-14 pb-20 md:pt-24 md:pb-28">
          <p className="text-xs uppercase tracking-[0.22em] text-muted">{originOpening.eyebrow}</p>
          <h1 className="mt-4 font-display text-[clamp(2.6rem,7vw,5.2rem)] leading-[1.02] font-medium">
            {originOpening.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">{originOpening.lede}</p>
        </header>

        <div className="relative">
          <TimelineSpine />
          {originChapters.map((chapter, index) => (
            <StoryChapter key={chapter.id} chapter={chapter} index={index} />
          ))}
        </div>
      </Container>

      <section className="relative mt-8 flex min-h-[70vh] items-center justify-center px-5 py-24 text-center">
        <div className="absolute inset-0 bg-fg/[0.03]" aria-hidden="true" />
        <div className="relative max-w-3xl">
          <p className="font-display text-[clamp(1.8rem,4.5vw,3.2rem)] leading-tight">
            {originClose.title}
          </p>
          <p className="mt-6 font-display text-[clamp(1.4rem,3.2vw,2.2rem)] text-muted">
            {originClose.line}
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <Button to="/contact">Work with me</Button>
            <Button to="/journey" variant="secondary">
              Thinking map
            </Button>
          </div>
        </div>
      </section>
    </article>
  )
}
