import { motion, useScroll, useTransform } from 'motion/react'
import { profile } from '@/content/profile'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { UpworkHeroCard } from '@/components/hero/UpworkHeroCard'
import { usePointerParallax } from '@/hooks/useParallax'
import { useReducedMotion } from '@/hooks/useMedia'

export function StoryHero() {
  const reduced = useReducedMotion()
  const pointer = usePointerParallax(reduced ? 0 : 48)
  const { scrollY } = useScroll()
  const watermarkY = useTransform(scrollY, [0, 900], [0, reduced ? 0 : 280])
  const copyY = useTransform(scrollY, [0, 700], [0, reduced ? 0 : -70])
  const cardY = useTransform(scrollY, [0, 900], [0, reduced ? 0 : -140])

  return (
    <section className="relative overflow-hidden pb-8 pt-10">
      <div className="pointer-events-none absolute left-1/2 top-6 w-[140%] -translate-x-1/2" aria-hidden="true">
        <motion.p className="watermark text-center text-[18vw] leading-none" style={{ y: watermarkY, x: pointer.x * 0.4 }}>
          ADISU
        </motion.p>
      </div>
      <motion.div
        className="pointer-events-none absolute left-[8%] top-10 size-[28rem] rounded-full bg-[#7B61FF]/35 blur-[120px]"
        style={{ x: pointer.x, y: pointer.y }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute right-[4%] top-32 size-[22rem] rounded-full bg-[#852848]/30 blur-[110px]"
        style={{ x: -pointer.x, y: pointer.y * 0.6 }}
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="flex items-start justify-between gap-6 text-xs uppercase tracking-[0.22em] text-muted">
          <span>{profile.locationLabel}</span>
          <span>Upwork · Top Rated</span>
        </div>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <motion.div style={{ y: copyY }}>
            <h1 className="font-display text-[clamp(2.5rem,5.4vw,4.4rem)] italic leading-[1.05] font-medium">
              Engineering starts with systems.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted">{profile.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/contact">Hire Abel</Button>
              <Button href={profile.social.upwork} variant="secondary">
                Upwork profile
              </Button>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
              {profile.badges.map((badge) => (
                <li key={badge}>{badge}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div style={{ y: cardY }}>
            <UpworkHeroCard />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
