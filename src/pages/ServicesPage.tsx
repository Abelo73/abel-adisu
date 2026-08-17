import { ServicePath } from '@/components/services/ServicePath'
import { Button } from '@/components/ui/Button'
import { Container, PageIntro } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'

export function ServicesPage() {
  return (
    <Container as="article" className="pb-24">
      <Reveal>
        <PageIntro
          eyebrow="Services"
          title="The path from a brief to a running system."
          lede="Walk the path. Each stop is an engagement — the note stays in full view, with the problem, the stack, and how the work actually runs."
        />
      </Reveal>
      <ServicePath />
      <p className="mt-4 text-sm text-muted lg:hidden">Tap a stop on the path to open its note.</p>
      <div className="mt-14">
        <Button to="/contact">Let’s discuss your requirements</Button>
      </div>
    </Container>
  )
}
