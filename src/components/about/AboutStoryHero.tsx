import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { aboutOpening } from '@/content/aboutStory'
import { profile } from '@/content/profile'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { useReducedMotion } from '@/hooks/useMedia'

export function AboutStoryHero() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const deskY = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-12%', '18%'])
  const copyY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -90])
  const portraitY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [40, -80])
  const watermarkY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 220])

  return (
    <section ref={ref} className="relative min-h-[92vh] overflow-hidden">
      <div className="absolute inset-0">
        <motion.img
          src={profile.deskPhoto}
          alt=""
          aria-hidden="true"
          width={1280}
          height={987}
          loading="lazy"
          decoding="async"
          style={{ y: deskY }}
          className="h-[130%] w-full object-cover object-[center_18%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-bg/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/40" />
      </div>

      <motion.p
        className="watermark pointer-events-none absolute left-1/2 top-10 w-[140%] -translate-x-1/2 text-center text-[18vw] leading-none"
        style={{ y: watermarkY }}
        aria-hidden="true"
      >
        ABEL
      </motion.p>

      <Container className="relative grid min-h-[92vh] items-end gap-10 pb-16 pt-28 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
        <motion.div style={{ y: portraitY }} className="relative z-10">
          <img
            src={profile.photo}
            alt={profile.name}
            width={900}
            height={1200}
            fetchPriority="high"
            decoding="async"
            className="aspect-[4/5] w-full max-w-sm rounded-[16px] object-cover object-top shadow-[var(--shadow-lift)] ring-1 ring-line"
          />
        </motion.div>

        <motion.div style={{ y: copyY }} className="relative z-10 pb-4">
          <p className="text-xs uppercase tracking-[0.22em] text-muted">
            {aboutOpening.eyebrow} · {profile.locationLabel}
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.8rem,6vw,5.2rem)] leading-[1.02] font-medium">
            {aboutOpening.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">{aboutOpening.lede}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={profile.cv}>Download CV</Button>
            <Button to="/contact" variant="secondary">
              Hire Abel
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
