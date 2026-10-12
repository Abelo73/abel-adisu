import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { projectFilters, projects, type ProjectCategory } from '@/content/projects'
import { Container, PageIntro } from '@/components/ui/Container'
import { ProjectCover } from '@/components/work/ProjectCover'
import { Button } from '@/components/ui/Button'
import { isConfiguredUrl } from '@/lib/links'
import { cn } from '@/lib/cn'

export function ProjectsPage() {
  const [filter, setFilter] = useState<'all' | ProjectCategory>('all')
  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((project) => project.category === filter)),
    [filter],
  )

  return (
    <Container as="article" className="pb-20">
      <PageIntro
        eyebrow="Work"
        title="Five systems. Real products."
        lede="Arts admin, tax risk, hospital operations, justice casework, and workforce ops — the work on Abel’s Upwork and GitHub, not placeholder studies."
      />
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Project categories">
        {projectFilters.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={filter === item.id}
            onClick={() => setFilter(item.id)}
            className={cn(
              'min-h-12 cursor-pointer rounded-full border px-4 text-sm',
              filter === item.id ? 'border-accent bg-accent text-accent-fg' : 'border-line bg-card hover:border-fg/40',
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      {visible.length === 0 ? (
        <p className="mt-10 text-muted">Nothing in this category yet. Backend and full-stack hold the current work.</p>
      ) : (
        <ul className="mt-12 space-y-16">
          {visible.map((project, index) => (
            <li key={project.slug}>
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
                <div>
                  <p className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.16em] text-muted">
                    <span>
                      {project.kind.replace('-', ' ')} · {project.category}
                    </span>
                    {project.demo ? (
                      <span className="inline-flex items-center gap-1.5 normal-case tracking-normal text-ok">
                        <span className="live-dot size-1.5 rounded-full bg-ok" aria-hidden="true" />
                        Live
                      </span>
                    ) : null}
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                    <Link to={`/projects/${project.slug}`} className="inline-flex items-center gap-2 hover:underline">
                      {project.title}
                      <ArrowUpRight size={18} className="text-muted" aria-hidden="true" />
                    </Link>
                  </h2>
                  <p className="mt-4 text-muted">{project.summary}</p>
                  {project.demo && isConfiguredUrl(project.demo) ? (
                    <div className="mt-6">
                      <Button href={project.demo} variant="secondary">
                        Open live site
                      </Button>
                    </div>
                  ) : null}
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </Container>
  )
}
