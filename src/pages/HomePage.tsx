import { Link } from 'react-router-dom'
import { profile } from '@/content/profile'
import { StoryHero } from '@/components/hero/StoryHero'
import { StackWorkflow } from '@/components/architecture/StackWorkflow'
import { ScopePath } from '@/components/home/ScopePath'
import { coreWorkflow } from '@/content/automation'
import { WorkflowViz } from '@/components/automation/WorkflowViz'
import { ClientStories } from '@/components/home/ClientStories'
import { WorkStage } from '@/components/work/WorkStage'
import { ServicePath } from '@/components/services/ServicePath'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'

export function HomePage() {
  return (
    <div>
      <StoryHero />

      <section className="py-8">
        <Container>
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">How I ship</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              From a single UI to production-ready.
            </h2>
            <p className="mt-4 max-w-2xl text-muted">
              I start with the screen and I don’t hand off. React and shadcn, then Camunda, Java services, Keycloak,
              Kafka, MinIO — Docker, Kubernetes, Rancher, Nginx — until it runs. On product work I also ship with
              Supabase: Postgres, Auth, and Storage.
            </p>
          </Reveal>
          <StackWorkflow />
        </Container>
      </section>

      <ClientStories />

      <Container>
        <Reveal>
          <ScopePath />
        </Reveal>
      </Container>

      <section className="py-24">
        <Container>
          <WorkStage />
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Automation</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Workflows designed as software</h2>
            <p className="mt-4 max-w-2xl text-muted">
              n8n under the hood. On the page: one run you can walk — trigger, model, gate, side effect, and a
              record.
            </p>
            <div className="mt-10">
              <WorkflowViz title="Core intelligence path" steps={coreWorkflow} />
            </div>
            <Link
              to="/automation"
              className="mt-6 inline-flex min-h-12 items-center text-sm underline-offset-4 hover:underline"
            >
              All automation plays
            </Link>
          </Reveal>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Services</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">How you can hire the practice</h2>
            <p className="mt-4 max-w-2xl text-muted">
              Walk the path. Each stop is an engagement you can hire — the note below stays in full view.
            </p>
          </Reveal>
          <ServicePath />
          <Link
            to="/services"
            className="mt-8 inline-flex min-h-12 items-center text-sm underline-offset-4 hover:underline"
          >
            Open a stop in full
          </Link>
        </Container>
      </section>

      <section className="pb-28 pt-8">
        <Container>
          <Reveal>
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
              <img
                src={profile.photo}
                alt={profile.name}
                width={900}
                height={1200}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full max-w-sm rounded-[28px] object-cover shadow-[var(--shadow-lift)]"
              />
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted">Hire</p>
                <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                  Hire for a system, not a ticket
                </h2>
                <p className="mt-4 max-w-xl text-muted">
                  {profile.current.role} at {profile.current.org}. Open to select full-stack, backend, and frontend
                  work. CV is the same record as this site.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button to="/contact">Have a system you want to build?</Button>
                  <Button href={profile.cv} variant="secondary">
                    Download CV
                  </Button>
                  <Button to="/services" variant="ghost">
                    Services
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  )
}
