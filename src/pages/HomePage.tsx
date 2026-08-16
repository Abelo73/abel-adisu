import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { profile } from '@/content/profile'
import { projects } from '@/content/projects'
import { services } from '@/content/services'
import { StoryHero } from '@/components/hero/StoryHero'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { MetaLabel } from '@/components/ui/MetaLabel'

export function HomePage() {
  return (
    <div>
      <StoryHero />

      <section className="border-b border-line py-16">
        <Container>
          <MetaLabel>Work</MetaLabel>
          <div className="mt-3 flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl">Systems that already shipped</h2>
            <Link to="/projects" className="hidden text-sm underline-offset-4 hover:underline sm:inline">
              All work
            </Link>
          </div>
          <ul className="mt-10 grid gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <li key={project.slug}>
                <Link to={`/projects/${project.slug}`} className="group block">
                  <div className="overflow-hidden rounded-[12px] border border-line bg-card">
                    <img
                      src={project.image}
                      alt=""
                      className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted">
                    {project.category}
                  </p>
                  <h3 className="mt-1 flex items-center gap-2 font-display text-2xl">
                    {project.title}
                    <ArrowUpRight size={18} className="text-muted group-hover:text-fg" aria-hidden="true" />
                  </h3>
                  <p className="mt-2 text-sm text-muted">{project.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-b border-line py-16">
        <Container>
          <MetaLabel>Capabilities</MetaLabel>
          <h2 className="font-display mt-3 text-3xl">What this practice is for</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {profile.builds.map((item) => (
              <li key={item} className="border border-line px-4 py-5">
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <MetaLabel>Services</MetaLabel>
          <h2 className="font-display mt-3 text-3xl">Hire for a system, not a ticket</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {services.slice(0, 4).map((service) => (
              <li key={service.slug} className="border border-line p-5">
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted">
                  {service.eyebrow}
                </p>
                <h3 className="mt-2 font-display text-2xl">{service.title}</h3>
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
        </Container>
      </section>
    </div>
  )
}
