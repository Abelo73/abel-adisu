import { Link } from 'react-router-dom'
import { automationCapabilities, automationHero, automationPlays, coreWorkflow } from '@/content/automation'
import { WorkflowViz } from '@/components/automation/WorkflowViz'
import { Button } from '@/components/ui/Button'
import { Container, PageIntro } from '@/components/ui/Container'

export function AutomationPage() {
  return (
    <Container as="article" className="pb-20">
      <PageIntro eyebrow="Automation" title={automationHero.headline} lede={automationHero.lede} />
      <ul className="flex flex-wrap gap-2">
        {automationCapabilities.map((item) => (
          <li key={item} className="rounded-full border border-line bg-card px-3 py-1 text-sm">
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-10 text-sm text-muted">
        Click a node the way you would in n8n. These canvases are designed like the editor — dotted grid, typed nodes,
        bezier wires — not a bullet list pretending to be a workflow.
      </p>
      <div className="mt-6">
        <WorkflowViz title="Core intelligence path" steps={coreWorkflow} />
      </div>
      <p className="mt-8">
        <Link to="/services/n8n-automation" className="underline-offset-4 hover:underline">
          n8n service page
        </Link>
      </p>
      <div className="mt-12 space-y-10">
        {automationPlays.map((play) => (
          <div key={play.slug}>
            <h2 className="mb-2 text-2xl font-semibold tracking-tight">{play.title}</h2>
            <p className="mb-5 max-w-2xl text-sm text-muted">{play.summary}</p>
            <WorkflowViz title={play.title} steps={play.steps} />
          </div>
        ))}
      </div>
      <div className="mt-12">
        <Button to="/contact">Automate a workflow</Button>
      </div>
    </Container>
  )
}
