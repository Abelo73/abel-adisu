import { Link } from 'react-router-dom'
import { StoryHero } from '@/components/hero/StoryHero'
import { BuiltFor } from '@/components/home/BuiltFor'
import { StoryVideo } from '@/components/home/StoryVideo'
import { PaymentGateway } from '@/components/home/PaymentGateway'
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
import { AnimatedText } from '@/components/ui/AnimatedText'

export function HomePage() {
  return (
    <div>
      <StoryHero />

      <ShipPipeline />

      <BuiltFor />

      <ClientStories />

      <ScopePath />

      <WorkStage />

      <PaymentGateway />

      <section className="flex min-h-[calc(100dvh-4.0625rem)] flex-col justify-center py-16">
        <Container>
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-steel">Automation</p>
            <AnimatedText as="h2" className="mt-3 max-w-3xl font-display text-[clamp(2.2rem,6vw,4.5rem)] leading-[1.04]">Workflows <span className="story-gradient">designed as software.</span></AnimatedText>
            <AnimatedText as="p" stagger={0.03} delay={0.4} className="mt-4 max-w-xl text-muted">Watch one run: trigger, model, gate, side effect, and a record.</AnimatedText>
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
                <AnimatedText as="h2" className="mt-3 max-w-3xl font-display text-[clamp(2.2rem,6vw,4.5rem)] leading-[1.04]">How you can <span className="story-gradient">hire me.</span></AnimatedText>
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

      <StoryVideo />

      <HireBoard />
    </div>
  )
}
