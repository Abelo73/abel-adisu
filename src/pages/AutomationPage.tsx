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
          <li key={item} className="rounded-full border border-line px-3 py-1 text-sm">
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-12">
        <WorkflowViz title="Core intelligence path" steps={coreWorkflow} />
      </div>
      <p className="mt-8">
        <Link to="/services/n8n-automation" className="underline-offset-4 hover:underline">
          n8n service page
        </Link>
      </p>
      <div className="mt-12 space-y-6">
        {automationPlays.map((play) => (
          <WorkflowViz key={play.slug} title={play.title} steps={play.steps} />
        ))}
      </div>
      <div className="mt-12">
        <Button to="/contact">Automate a workflow</Button>
      </div>
    </Container>
  )
}
