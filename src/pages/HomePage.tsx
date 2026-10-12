import { Link } from 'react-router-dom'
import { StoryHero } from '@/components/hero/StoryHero'
import { ShipPipeline } from '@/components/home/ShipPipeline'
import { ScopePath } from '@/components/home/ScopePath'
import { coreWorkflow } from '@/content/automation'
import { AutomationFlow } from '@/components/automation/AutomationFlow'
import { ClientStories } from '@/components/home/ClientStories'
import { WorkStage } from '@/components/work/WorkStage'
import { ServiceGrid } from '@/components/services/ServiceGrid'
import { HireBoard } from '@/components/home/HireBoard'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'

export function HomePage() {
  return (
    <div>
      <StoryHero />

      <ShipPipeline />

      <ClientStories />

      <ScopePath />

      <WorkStage />

      <section className="flex min-h-[calc(100dvh-4.0625rem)] flex-col justify-center py-16">
        <Container>
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-steel">Automation</p>
            <h2 className="mt-3 max-w-3xl font-display text-[clamp(2.2rem,6vw,4.5rem)] leading-[1.04]">Workflows <span className="story-gradient">designed as software.</span></h2>
            <p className="mt-4 max-w-xl text-muted">Watch one run: trigger, model, gate, side effect, and a record.</p>
            <div className="mt-10">
              <AutomationFlow steps={coreWorkflow} />
            </div>
            <Link
              to="/automation"
              className="mt-6 inline-flex min-h-12 items-center text-sm font-semibold text-steel underline-offset-4 hover:underline"
            >
              All automation plays →
            </Link>
          </Reveal>
        </Container>
      </section>

      <section className="flex min-h-[calc(100dvh-4.0625rem)] flex-col justify-center py-16">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-steel">Services</p>
                <h2 className="mt-3 max-w-3xl font-display text-[clamp(2.2rem,6vw,4.5rem)] leading-[1.04]">How you can <span className="story-gradient">hire me.</span></h2>
              </div>
              <Link
                to="/services"
                className="inline-flex min-h-11 items-center text-sm font-semibold text-steel underline-offset-4 hover:underline"
              >
                All services →
              </Link>
            </div>
          </Reveal>
          <div className="mt-10">
            <ServiceGrid />
          </div>
        </Container>
      </section>

      <HireBoard />
    </div>
  )
}
