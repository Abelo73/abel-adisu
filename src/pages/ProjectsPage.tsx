import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { projectFilters, projects, type ProjectCategory } from '@/content/projects'
import { Container, PageIntro } from '@/components/ui/Container'
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
        title="Four systems. Real products."
        lede="Arts admin, tax risk, hospital operations, and justice casework — the work on Abel’s Upwork and GitHub, not placeholder studies."
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
              filter === item.id ? 'border-accent bg-accent text-white' : 'border-line bg-card hover:border-fg/40',
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      {visible.length === 0 ? (
        <p className="mt-10 text-muted">Nothing in this category yet. Backend and full-stack hold the current work.</p>
      ) : (
        <ul className="mt-10 grid gap-10 md:grid-cols-2">
          {visible.map((project) => (
            <li key={project.slug}>
              <Link to={`/projects/${project.slug}`} className="group block">
                <img
                  src={project.image}
                  alt=""
                  className="aspect-[16/10] w-full rounded-[24px] border border-line object-cover shadow-[var(--shadow-lift)]"
                />
                <p className="mt-4 text-xs uppercase tracking-[0.16em] text-muted">
                  {project.kind.replace('-', ' ')} · {project.category}
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">{project.title}</h2>
                <p className="mt-2 text-muted">{project.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Container>
  )
}
