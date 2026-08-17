import { Link, Navigate, useParams } from 'react-router-dom'
import { backendServiceGraph } from '@/content/architecture'
import { coreWorkflow } from '@/content/automation'
import { getService } from '@/content/services'
import { ArchitectureGraph } from '@/components/architecture/ArchitectureGraph'
import { WorkflowViz } from '@/components/automation/WorkflowViz'
import { Button } from '@/components/ui/Button'
import { Container, PageIntro } from '@/components/ui/Container'

export function ServiceDetailPage() {
  const { slug } = useParams()
  const service = slug ? getService(slug) : undefined
  if (!service) return <Navigate to="/services" replace />

  return (
    <Container as="article" className="pb-20">
      <p className="pt-10">
        <Link to="/services" className="text-sm text-muted underline-offset-4 hover:underline">
          All services
        </Link>
      </p>
      <PageIntro eyebrow={service.eyebrow} title={service.title} lede={service.summary} />

      {service.slug === 'backend-development' ? (
        <div className="mb-12 max-w-xl">
          <ArchitectureGraph
            title="Click a node"
            nodes={[...backendServiceGraph.nodes]}
            edges={[...backendServiceGraph.edges]}
          />
        </div>
      ) : null}

      {service.slug === 'n8n-automation' ? (
        <div className="mb-12">
          <WorkflowViz title="n8n automation shape" steps={coreWorkflow} />
        </div>
      ) : null}

      <div className="grid gap-10 md:grid-cols-2">
        <section>
          <h2 className="text-2xl font-semibold tracking-tight">Typical problems</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
            {service.problems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold tracking-tight">Deliverables</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
            {service.deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight">Process</h2>
        <ol className="mt-4 space-y-3">
          {service.process.map((step, index) => (
            <li key={step} className="flex gap-4 text-muted">
              <span className="font-mono text-xs text-fg">{String(index + 1).padStart(2, '0')}</span>
              {step}
            </li>
          ))}
        </ol>
      </section>
      <section className="mt-12">
        <h2 className="text-2xl font-semibold tracking-tight">Technologies</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {service.technologies.map((tech) => (
            <li key={tech} className="rounded-full border border-line px-3 py-1 text-sm">
              {tech}
            </li>
          ))}
        </ul>
      </section>
      <div className="mt-12">
        <Button to="/contact">Let’s discuss your requirements</Button>
      </div>
    </Container>
  )
}
