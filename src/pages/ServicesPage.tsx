import { Link } from 'react-router-dom'
import { services } from '@/content/services'
import { Button } from '@/components/ui/Button'
import { Container, PageIntro } from '@/components/ui/Container'

export function ServicesPage() {
  return (
    <Container as="article" className="pb-20">
      <PageIntro
        eyebrow="Services"
        title="Engagements with a system on the other side."
        lede="No public rate card. If the work is a fit, we discuss requirements, constraints, and a definition of done."
      />
      <ul className="grid gap-4">
        {services.map((service) => (
          <li key={service.slug} className="rounded-[12px] border border-line p-6">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted">
              {service.eyebrow}
            </p>
            <h2 className="font-display mt-2 text-2xl">
              <Link to={`/services/${service.slug}`} className="hover:underline">
                {service.title}
              </Link>
            </h2>
            <p className="mt-3 max-w-3xl text-muted">{service.summary}</p>
            <Link
              to={`/services/${service.slug}`}
              className="mt-4 inline-flex min-h-12 items-center text-sm underline-offset-4 hover:underline"
            >
              Scope, process, and stack
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-12">
        <Button to="/contact">Let’s discuss your requirements</Button>
      </div>
    </Container>
  )
}
