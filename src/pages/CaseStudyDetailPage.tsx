import { Link, Navigate, useParams } from 'react-router-dom'
import { caseStudyProject, getCaseStudy } from '@/content/caseStudies'
import { ArchitectureGraph } from '@/components/architecture/ArchitectureGraph'
import { Button } from '@/components/ui/Button'
import { Container, PageIntro } from '@/components/ui/Container'

export function CaseStudyDetailPage() {
  const { slug } = useParams()
  const study = slug ? getCaseStudy(slug) : undefined
  const project = study ? caseStudyProject(study) : undefined
  if (!study || !project) return <Navigate to="/case-studies" replace />

  return (
    <Container as="article" className="pb-20">
      <p className="pt-10">
        <Link to="/case-studies" className="text-sm text-muted underline-offset-4 hover:underline">
          All case studies
        </Link>
      </p>
      <PageIntro eyebrow="Case study" title={project.title} lede={study.thesis} />
      <ol className="grid gap-8 md:grid-cols-2">
        <li>
          <h2 className="text-2xl font-semibold tracking-tight">Problem</h2>
          <p className="mt-3 text-muted">{project.problem}</p>
        </li>
        <li>
          <h2 className="text-2xl font-semibold tracking-tight">Implementation</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
            {project.implementation.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </li>
      </ol>
      <section className="mt-12 max-w-xl">
        <h2 className="text-2xl font-semibold tracking-tight">Architecture</h2>
        <div className="mt-5">
          <ArchitectureGraph
            title="Trace the system"
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
        <h2 className="text-2xl font-semibold tracking-tight">Result</h2>
        <p className="mt-3 text-muted">{project.outcome}</p>
      </section>
      <p className="mt-8">
        <Link to={`/projects/${project.slug}`} className="underline-offset-4 hover:underline">
          Full project write-up
        </Link>
      </p>
      <div className="mt-10">
        <Button to="/contact">Discuss this architecture</Button>
      </div>
    </Container>
  )
}
