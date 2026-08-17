import { useRef, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'motion/react'
import { getProject } from '@/content/projects'
import { Reveal } from '@/components/ui/Reveal'
import { useFinePointer, useReducedMotion } from '@/hooks/useMedia'
import { usePointerParallax } from '@/hooks/useParallax'
import { cn } from '@/lib/cn'

const panes = [
  {
    slug: 'ijcms',
    src: '/work/ijcms.webp',
    className: 'left-[48%] top-[2%] w-[38%] max-lg:left-auto max-lg:top-auto max-lg:w-auto',
    rotateY: -26,
    rotateX: 12,
    z: 1,
  },
  {
    slug: 'itas-risk-studio',
    src: '/work/itas-risk-studio.webp',
    className: 'left-[2%] top-[28%] w-[36%] max-lg:left-auto max-lg:top-auto max-lg:w-auto',
    rotateY: -28,
    rotateX: 10,
    z: 2,
  },
  {
    slug: 'medicare',
    src: '/work/medicare.webp',
    className: 'left-[54%] top-[38%] w-[40%] max-lg:left-auto max-lg:top-auto max-lg:w-auto',
    rotateY: -12,
    rotateX: 7,
    z: 3,
  },
  {
    slug: 'art-information-center',
    src: '/work/art-information-center.webp',
    className: 'left-[18%] top-[10%] w-[48%] max-lg:left-auto max-lg:top-auto max-lg:w-auto',
    rotateY: -16,
    rotateX: 8,
    z: 5,
  },
] as const

export function WorkStage() {
  const reduced = useReducedMotion()
  const fine = useFinePointer()
  const pointer = usePointerParallax(reduced ? 0 : 28)
  const stageRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start end', 'end start'],
  })
  const lift = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [40, -40])

  return (
    <div>
      <Reveal>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Discover work</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Shipped.</h2>
          </div>
          <p className="max-w-md text-muted lg:text-right">
            Live product screens in space — Art Information Center, tax risk, hospital ops, and justice casework.
          </p>
        </div>
      </Reveal>

      <div
        ref={stageRef}
        className="work-stage relative mt-10 overflow-hidden rounded-[28px] border border-white/10 bg-[#0c0b12]"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_70%_10%,rgb(123_97_255_/_0.22),transparent_60%)]" />
        <motion.div
          className="work-stage-inner relative grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:block lg:h-[42rem] lg:p-0"
          style={{
            y: lift,
            rotateY: reduced ? 0 : pointer.x * 0.35,
            rotateX: reduced ? 0 : pointer.y * -0.12,
          }}
        >
          {panes.map((pane, index) => {
            const project = getProject(pane.slug)
            if (!project) return null
            return (
              <motion.div
                key={pane.slug}
                className={cn('lg:absolute', pane.className)}
                style={{ zIndex: pane.z }}
                initial={reduced ? false : { opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={`/projects/${project.slug}`}
                  data-tilt={reduced ? 'false' : 'true'}
                  className="work-pane group block rounded-[18px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  style={
                    {
                      '--ry': `${pane.rotateY}deg`,
                      '--rx': `${pane.rotateX}deg`,
                    } as CSSProperties
                  }
                >
                  <motion.span
                    className="block overflow-hidden rounded-[18px] border border-white/15 bg-[#f4f1fb] shadow-[0_30px_70px_rgb(0_0_0_/_0.5)]"
                    whileHover={fine && !reduced ? { y: -10, scale: 1.03 } : undefined}
                    transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                  >
                    <span className="flex items-center gap-1.5 bg-[#ece8f4] px-3 py-2">
                      <span className="size-2 rounded-full bg-[#ff5f57]" aria-hidden="true" />
                      <span className="size-2 rounded-full bg-[#febc2e]" aria-hidden="true" />
                      <span className="size-2 rounded-full bg-[#28c840]" aria-hidden="true" />
                      <span className="ml-2 truncate font-mono text-[0.65rem] text-[#5c5470]">
                        {project.demo ? 'artinformationcenter.com' : project.title}
                      </span>
                    </span>
                    <img
                      src={pane.src}
                      alt={project.title}
                      width={1600}
                      height={1000}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/10] w-full object-cover object-top"
                    />
                  </motion.span>
                  <span className="mt-3 block text-sm text-white/80">
                    {project.title}
                    {project.demo ? (
                      <span className="ml-2 inline-flex items-center gap-1.5 text-ok">
                        <span className="live-dot size-1.5 rounded-full bg-ok" aria-hidden="true" />
                        Live
                      </span>
                    ) : null}
                  </span>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      <p className="mt-6">
        <Link to="/projects" className="text-sm underline-offset-4 hover:underline">
          All work — full boards
        </Link>
      </p>
    </div>
  )
}
