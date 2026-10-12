import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { getProject } from '@/content/projects'
import { Container } from '@/components/ui/Container'
import { STAGE, sceneHeight, useScrollStep } from '@/hooks/useScrollStep'
import { useReducedMotion } from '@/hooks/useMedia'
import { cn } from '@/lib/cn'

const shots = [
  { slug: 'art-information-center', src: '/work/art-information-center.webp' },
  { slug: 'itas-risk-studio', src: '/work/itas-risk-studio.webp' },
  { slug: 'medicare', src: '/work/medicare.webp' },
  { slug: 'ijcms', src: '/work/ijcms.webp' },
]

const items = shots.flatMap((shot) => {
  const project = getProject(shot.slug)
  return project ? [{ ...shot, project }] : []
})

export function WorkStage() {
  const reduced = useReducedMotion()
  const { ref, step: active, goTo } = useScrollStep(items.length)

  const current = items[active]

  return (
    <section ref={ref} style={{ height: sceneHeight(items.length) }} className="relative">
      <div className={STAGE}>
        <Container className="w-full">
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-steel">Shipped work</p>
        <h2 className="mt-3 font-display text-[clamp(2.2rem,6vw,4.5rem)] leading-[1.04]">Real systems, <span className="story-gradient">in real use.</span></h2>

      <div className="mt-6 grid items-center gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-12">
        {/* list */}
        <ul className="order-2 grid gap-2 lg:order-1">
          {items.map((item, index) => {
            const isActive = index === active
            return (
              <li key={item.slug}>
                <button
                  type="button"
                  onClick={() => goTo(index)}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'relative w-full cursor-pointer overflow-hidden rounded-[12px] border px-4 py-3.5 text-left transition-colors duration-300',
                    isActive ? 'glass border-[#36b7ff]/50 shadow-[0_0_40px_rgb(19_104_232_/_0.3)]' : 'border-transparent hover:bg-fg/5',
                  )}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className={cn('font-display text-lg', !isActive && 'text-muted')}>{item.project.title}</span>
                    <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, '0')}</span>
                  </span>
                  {isActive ? (
                    <motion.span
                      initial={reduced ? false : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="block overflow-hidden"
                    >
                      <span className="mt-2 hidden text-sm text-muted lg:block">{item.project.summary}</span>
                      <span className="mt-3 hidden flex-wrap gap-1.5 lg:flex">
                        {item.project.technologies.slice(0, 4).map((tech) => (
                          <span key={tech} className="rounded-full bg-alt px-2.5 py-1 text-xs font-medium">
                            {tech}
                          </span>
                        ))}
                      </span>
                    </motion.span>
                  ) : null}
                </button>
              </li>
            )
          })}
        </ul>

        {/* browser frame */}
        <div className="order-1 lg:order-2">
          <div className="glass overflow-hidden rounded-[16px] shadow-[0_30px_80px_rgb(0_0_0_/_0.5)]">
            <div className="flex items-center gap-1.5 border-b border-line bg-alt px-4 py-2.5">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" aria-hidden="true" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" aria-hidden="true" />
              <span className="size-2.5 rounded-full bg-[#28c840]" aria-hidden="true" />
              <span className="ml-3 flex-1 truncate rounded-full bg-bg px-3 py-1 font-mono text-[0.7rem] text-muted">
                {current.project.demo ? 'artinformationcenter.com' : current.project.title.toLowerCase().replace(/\s+/g, '-')}
              </span>
              {current.project.demo ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-ok">
                  <span className="live-dot size-1.5 rounded-full bg-ok" aria-hidden="true" />
                  Live
                </span>
              ) : null}
            </div>
            <div className="relative aspect-[16/10] overflow-hidden bg-alt">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.img
                  key={current.slug}
                  src={current.src}
                  alt={current.project.title}
                  width={1600}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                  initial={reduced ? false : { opacity: 0, scale: 1.08, x: 30 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={reduced ? undefined : { opacity: 0, scale: 0.97, x: -30 }}
                  transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              </AnimatePresence>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between gap-4 text-sm">
            <Link
              to={`/projects/${current.slug}`}
              className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-steel underline-offset-4 hover:underline"
            >
              Open {current.project.title}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <Link to="/projects" className="text-muted underline-offset-4 hover:underline">
              All work
            </Link>
          </div>
        </div>
      </div>
        </Container>
      </div>
    </section>
  )
}
