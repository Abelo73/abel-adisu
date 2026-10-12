import type { CSSProperties, PointerEvent } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { AppWindow, ArrowUpRight, Boxes, Layers, Server, Sparkles, Workflow, type LucideIcon } from 'lucide-react'
import { services } from '@/content/services'
import { useReducedMotion } from '@/hooks/useMedia'

const icons: Record<string, LucideIcon> = {
  'software-engineering': Layers,
  'backend-development': Server,
  'web-development': AppWindow,
  'ai-automation': Sparkles,
  'n8n-automation': Workflow,
  'devops-cloud': Boxes,
}

function spotlight(event: PointerEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect()
  event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`)
  event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`)
}

/** Home-page services: a grid of tiles with a cursor spotlight and a staggered entrance. */
export function ServiceGrid() {
  const reduced = useReducedMotion()

  return (
    <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
      {services.map((service, index) => {
        const Icon = icons[service.slug] ?? Layers
        return (
          <motion.li
            key={service.slug}
            initial={reduced ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <Link
              to={`/services/${service.slug}`}
              onPointerMove={spotlight}
              style={{ '--mx': '50%', '--my': '0%' } as CSSProperties}
              className="group relative flex h-full flex-col overflow-hidden rounded-[16px] border border-line bg-card p-5 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[var(--shadow-lift)] sm:p-6"
            >
              <span
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(260px circle at var(--mx) var(--my), color-mix(in srgb, var(--steel) 16%, transparent), transparent 70%)',
                }}
                aria-hidden="true"
              />
              <span className="relative flex items-start justify-between">
                <span className="grid size-12 place-items-center rounded-[12px] bg-alt text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-fg">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <ArrowUpRight
                  size={20}
                  className="text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  aria-hidden="true"
                />
              </span>
              <span className="relative mt-5 text-xs font-semibold uppercase tracking-[0.08em] text-accent">
                {service.eyebrow}
              </span>
              <span className="relative mt-1 font-display text-xl">{service.title}</span>
              <span className="relative mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{service.summary}</span>
              <span className="relative mt-5 flex flex-wrap gap-1.5 pt-1">
                {service.technologies.slice(0, 3).map((tech) => (
                  <span key={tech} className="rounded-full bg-alt px-2.5 py-1 text-xs font-medium">
                    {tech}
                  </span>
                ))}
              </span>
            </Link>
          </motion.li>
        )
      })}
    </ul>
  )
}
