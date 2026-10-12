import { motion } from 'motion/react'
import { CreditCard, Landmark, Layers, Palette, Receipt, Scale, ShieldAlert, Stethoscope, Users } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { useReducedMotion } from '@/hooks/useMedia'
import { AnimatedText } from '@/components/ui/AnimatedText'

const tiles = [
  { icon: Stethoscope, label: 'MediCare', tone: 'from-[#0b6a45] to-[#34d399]' },
  { icon: ShieldAlert, label: 'ITAS Risk Studio', tone: 'from-[#0026a0] to-[#1368e8]' },
  { icon: Palette, label: 'Art Information Center', tone: 'from-[#1368e8] to-[#36b7ff]' },
  { icon: Scale, label: 'IJCMS', tone: 'from-[#001745] to-[#3a6ee0]' },
  { icon: Users, label: 'Workforce', tone: 'from-[#3a6ee0] to-[#8fc4ff]' },
]

const sectors = [
  { label: 'Fintech & payments', icon: CreditCard },
  { label: 'Government', icon: Landmark },
  { label: 'Healthcare', icon: Stethoscope },
  { label: 'Tax & revenue', icon: Receipt },
  { label: 'Justice', icon: Scale },
  { label: 'SaaS', icon: Layers },
]

const SPREAD = 54 // degrees either side of the top

/** A fan of tilted photo tiles on an arc above the headline, as on Blink. */
export function BuiltFor() {
  const reduced = useReducedMotion()

  return (
    <section className="flex min-h-[calc(100dvh-4.0625rem)] relative items-center overflow-x-clip py-16">
      <Container className="relative w-full">
        <div className="relative mx-auto h-[20rem] max-w-3xl [--r:6.6rem] sm:h-[27rem] sm:[--r:14rem]">
          {tiles.map((tile, index) => {
            const angle = -SPREAD + (index * (SPREAD * 2)) / (tiles.length - 1)
            const rad = (angle * Math.PI) / 180
            const sin = Math.sin(rad)
            const cos = Math.cos(rad)
            return (
              <div
                key={tile.label}
                className="absolute left-1/2 top-[calc(100%-6.5rem)] sm:top-[calc(100%-8.5rem)]"
                style={{
                  transform: `translate(calc(-50% + var(--r) * ${sin.toFixed(3)} * 1.35), calc(-50% - var(--r) * ${cos.toFixed(3)} * 1.05)) rotate(${(angle * 0.8).toFixed(1)}deg)`,
                }}
              >
                <motion.div
                  initial={reduced ? false : { opacity: 0, y: 60, scale: 0.6, rotate: -angle * 0.4 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ type: 'spring', stiffness: 140, damping: 16, delay: 0.1 + index * 0.08 }}
                >
                  <div
                    className="float-card"
                    style={{ animation: reduced ? 'none' : `float-card ${5 + (index % 3) * 0.7}s ease-in-out ${index * -0.8}s infinite` }}
                  >
                    <span
                      role="img"
                      aria-label={tile.label}
                      className={`grid size-[5rem] place-items-center rounded-[1.1rem] border-[5px] border-white bg-gradient-to-br ${tile.tone} text-white shadow-[0_14px_36px_rgb(0_0_0_/_0.4)] transition-transform duration-300 hover:scale-110 sm:size-[7.5rem] sm:rounded-[1.5rem]`}
                    >
                      <tile.icon className="size-8 sm:size-12" strokeWidth={1.7} aria-hidden="true" />
                    </span>
                  </div>
                </motion.div>
              </div>
            )
          })}
          <div className="absolute inset-x-0 bottom-0 px-2 text-center">
            <AnimatedText as="h2" className="mx-auto max-w-2xl font-display text-[clamp(1.8rem,4.6vw,3.2rem)] leading-[1.08]">
              Built for the people who keep <span className="story-gradient">operations moving</span>
            </AnimatedText>
          </div>
        </div>

        <p className="mt-8 text-center text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted">
          Made for teams like yours
        </p>
        <ul className="mx-auto mt-4 flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-3">
          {sectors.map(({ label, icon: Icon }) => (
            <li key={label} className="inline-flex items-center gap-2 font-display text-sm sm:text-base">
              <Icon size={17} className="text-steel" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
