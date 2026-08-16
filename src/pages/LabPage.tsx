import { labItems } from '@/content/lab'
import { Container, PageIntro } from '@/components/ui/Container'

export function LabPage() {
  return (
    <Container as="article" className="pb-20">
      <PageIntro
        eyebrow="Lab"
        title="Experiments without pretending they are products."
        lede="Agents, n8n patterns, failure injection, and SPA shells. Status is honest: idea, research, prototype, or experiment."
      />
      <ul className="grid gap-4 md:grid-cols-2">
        {labItems.map((item) => (
          <li key={item.slug} className="rounded-[12px] border border-dashed border-line p-5">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-steel">{item.status}</p>
            <h2 className="mt-2 font-display text-2xl">{item.title}</h2>
            <p className="mt-3 text-sm text-muted">{item.summary}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {item.stack.map((tech) => (
                <li key={tech} className="rounded-full border border-line px-3 py-1 text-xs">
                  {tech}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Container>
  )
}
