import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '@/content/projects'
import { services } from '@/content/services'
import { StoryHero } from '@/components/hero/StoryHero'
import { StackWorkflow } from '@/components/architecture/StackWorkflow'
import { ScopePath } from '@/components/home/ScopePath'
import { coreWorkflow } from '@/content/automation'
import { WorkflowViz } from '@/components/automation/WorkflowViz'
import { ClientStories } from '@/components/home/ClientStories'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { ParallaxMedia, Reveal } from '@/components/ui/Reveal'

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
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Discover work</p>
            <div className="mt-3 flex items-end justify-between gap-4">
              <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Systems that already shipped</h2>
              <Link to="/projects" className="hidden text-sm text-muted underline-offset-4 hover:underline sm:inline">
                All work
              </Link>
            </div>
          </Reveal>
          <ul className="mt-12 grid gap-8 md:grid-cols-2">
            {projects.map((project, index) => (
              <li key={project.slug}>
                <Reveal delay={index * 0.06}>
                  <Link to={`/projects/${project.slug}`} className="group block">
                    <div className="overflow-hidden rounded-[24px] border border-line bg-card shadow-[var(--shadow-lift)]">
                      <ParallaxMedia
                        src={project.image}
                        className="transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <p className="mt-4 text-xs uppercase tracking-[0.16em] text-muted">{project.category}</p>
                    <h3 className="mt-1 flex items-center gap-2 text-2xl font-semibold tracking-tight">
                      {project.title}
                      <ArrowUpRight size={18} className="text-muted group-hover:text-fg" aria-hidden="true" />
                    </h3>
                    <p className="mt-2 text-sm text-muted">{project.summary}</p>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
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

      <section className="pb-28 pt-8">
        <Container>
          <Reveal>
            <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Hire for a system, not a ticket</h2>
            <ul className="mt-10 grid gap-4 md:grid-cols-2">
              {services.slice(0, 4).map((service) => (
                <li key={service.slug} className="glass rounded-[24px] p-6">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted">{service.eyebrow}</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight">{service.title}</h3>
                  <p className="mt-3 text-sm text-muted">{service.summary}</p>
                  <Link
                    to={`/services/${service.slug}`}
                    className="mt-4 inline-flex min-h-12 items-center text-sm underline-offset-4 hover:underline"
                  >
                    Service details
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Button to="/contact">Have a system you want to build?</Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  )
}
