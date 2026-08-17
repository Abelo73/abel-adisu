import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { projects, type Project } from '@/content/projects'
import { ProjectCover } from '@/components/work/ProjectCover'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { isConfiguredUrl } from '@/lib/links'
import { cn } from '@/lib/cn'

function LiveMark() {
  return (
    <span className="inline-flex items-center gap-1.5 text-ok">
      <span className="live-dot size-1.5 rounded-full bg-ok" aria-hidden="true" />
      Live
    </span>
  )
}

function ProjectCopy({ project }: { project: Project }) {
  return (
    <div>
      <p className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.16em] text-muted">
        <span>{project.category}</span>
        {project.demo ? <LiveMark /> : null}
      </p>
      <h3 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
        <Link to={`/projects/${project.slug}`} className="inline-flex items-center gap-2 hover:underline">
          {project.title}
          <ArrowUpRight size={20} className="text-muted" aria-hidden="true" />
        </Link>
      </h3>
      <p className="mt-4 max-w-xl text-muted">{project.summary}</p>
      {project.demo && isConfiguredUrl(project.demo) ? (
        <p className="mt-6">
          <Button href={project.demo} variant="secondary" className="min-h-11 px-5">
            Open live site
          </Button>
        </p>
      ) : null}
    </div>
  )
}

export function ShippedWork({
  items = projects,
  heading = true,
}: {
  items?: Project[]
  heading?: boolean
}) {
  const featured = heading && items[0]?.demo ? items[0] : undefined
  const rest = featured ? items.slice(1) : items

  return (
    <div>
      {heading ? (
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Discover work</p>
          <div className="mt-3 flex items-end justify-between gap-4">
            <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Systems that already shipped</h2>
            <Link to="/projects" className="hidden text-sm text-muted underline-offset-4 hover:underline sm:inline">
              All work
            </Link>
          </div>
        </Reveal>
      ) : null}

      {featured ? (
        <Reveal>
          <article className="mt-12">
            <Link to={`/projects/${featured.slug}`} className="group block">
              <ProjectCover
                src={featured.image}
                alt={`${featured.title} overview`}
                kind={featured.coverKind}
              />
            </Link>
            <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <ProjectCopy project={featured} />
            </div>
          </article>
        </Reveal>
      ) : null}

      <ul className="mt-20 space-y-20">
        {rest.map((project, index) => (
          <li key={project.slug}>
            <Reveal delay={index * 0.04}>
              <article
                className={cn(
                  'grid items-center gap-8 lg:grid-cols-2 lg:gap-12',
                  index % 2 === 1 && 'lg:[&>a]:order-2',
                )}
              >
                <Link to={`/projects/${project.slug}`} className="block">
                  <ProjectCover
                    src={project.image}
                    alt={`${project.title} overview`}
                    kind={project.coverKind}
                  />
                </Link>
                <ProjectCopy project={project} />
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  )
}
