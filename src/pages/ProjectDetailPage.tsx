import { Link, Navigate, useParams } from 'react-router-dom'
import { getProject, relatedProjects } from '@/content/projects'
import { ArchitectureGraph } from '@/components/architecture/ArchitectureGraph'
import { Button } from '@/components/ui/Button'
import { Container, PageIntro } from '@/components/ui/Container'
import { isConfiguredUrl } from '@/lib/links'

export function ProjectDetailPage() {
  const { slug } = useParams()
  const project = slug ? getProject(slug) : undefined
  if (!project) return <Navigate to="/projects" replace />
  const related = relatedProjects(project.slug)

  return (
    <Container as="article" className="pb-20">
      <p className="pt-10">
        <Link to="/projects" className="text-sm text-muted underline-offset-4 hover:underline">
          All projects
        </Link>
      </p>
      <PageIntro eyebrow={project.kind.replace('-', ' ')} title={project.title} lede={project.summary} />

      <img
        src={project.image}
        alt=""
        className="mb-12 aspect-[16/9] w-full rounded-[12px] border border-line object-cover"
      />

      <dl className="grid gap-8 md:grid-cols-2">
        <div>
          <dt className="font-display text-2xl">Problem</dt>
          <dd className="mt-3 text-muted">{project.problem}</dd>
        </div>
        <div>
          <dt className="font-display text-2xl">Context</dt>
          <dd className="mt-3 text-muted">{project.context}</dd>
        </div>
      </dl>

      <section className="mt-12 max-w-xl">
        <h2 className="font-display text-2xl">Architecture</h2>
        <p className="mt-2 text-sm text-muted">{project.architecture.caption}</p>
        <div className="mt-5">
          <ArchitectureGraph
            title="Select a component"
            nodes={project.architecture.nodes.map((node) => ({
              id: node.id,
              label: node.label,
              detail: node.detail,
              branch: 'product',
            }))}
            edges={project.architecture.edges}
          />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl">Technical decisions</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
          {project.decisions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl">Implementation</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
          {project.implementation.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl">Challenges</h2>
        <ul className="mt-4 space-y-4">
          {project.challenges.map((item) => (
            <li key={item.challenge} className="rounded-[12px] border border-line p-4">
              <p className="font-medium">{item.challenge}</p>
              <p className="mt-2 text-sm text-muted">{item.approach}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl">Technology stack</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <li key={tech} className="rounded-full border border-line px-3 py-1 text-sm">
              {tech}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2 className="font-display text-2xl">Results</h2>
        <p className="mt-3 text-muted">{project.outcome}</p>
        <p className="mt-4 text-sm text-muted">
          Screenshots belong here when they exist. This study does not invent usage numbers.
        </p>
        {project.github && isConfiguredUrl(project.github) ? (
          <a href={project.github} className="mt-3 inline-flex min-h-12 items-center underline">
            GitHub
          </a>
        ) : null}
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl">Lessons</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
          {project.lessons.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {related.length > 0 ? (
        <section className="mt-12">
          <h2 className="font-display text-2xl">Related</h2>
          <ul className="mt-4 space-y-2">
            {related.map((item) => (
              <li key={item.slug}>
                <Link to={`/projects/${item.slug}`} className="underline-offset-4 hover:underline">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="mt-12">
        <Button to="/contact">Discuss a related system</Button>
      </div>
    </Container>
  )
}
