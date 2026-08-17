import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { originChapters } from '@/content/originStory'

export function StoryProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })
  const total = originChapters.length

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <motion.div className="h-0.5 origin-left bg-accent" style={{ scaleX }} />
      <ol className="absolute top-16 right-4 hidden flex-col gap-2.5 lg:flex" aria-hidden="true">
        {originChapters.map((chapter, index) => (
          <ProgressDot key={chapter.id} index={index} total={total} progress={scrollYProgress} />
        ))}
      </ol>
    </div>
  )
}

function ProgressDot({
  index,
  total,
  progress,
}: {
  index: number
  total: number
  progress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const threshold = index / Math.max(1, total - 1)
  const backgroundColor = useTransform(progress, (value) =>
    value >= threshold - 0.02 ? 'var(--accent)' : 'color-mix(in srgb, var(--fg) 25%, transparent)',
  )

  return <motion.li className="size-1.5 rounded-full" style={{ backgroundColor }} />
}
