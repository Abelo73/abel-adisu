import { experience } from '@/content/experience'
import { Container, PageIntro } from '@/components/ui/Container'

export function ExperiencePage() {
  return (
    <Container as="article" className="pb-20">
      <PageIntro
        eyebrow="Experience"
        title="A career read as a sequence of systems, not a list of logos."
        lede="Replace COMPANY_NAME and PERIOD in the content file with real employment data. Responsibilities below describe the work those roles actually contain."
      />
      <ol className="space-y-6">
        {experience.map((item, index) => (
          <li key={item.id} className="rounded-[12px] border border-line p-6">
            <p className="font-mono text-[0.6875rem] text-muted">
              {String(index + 1).padStart(2, '0')} · {item.period}
            </p>
            <h2 className="font-display mt-2 text-2xl">{item.role}</h2>
            <p className="text-sm text-muted">{item.org}</p>
            <p className="mt-4 text-muted">{item.summary}</p>
            <h3 className="mt-6 text-sm font-medium">Responsibilities</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
              {item.responsibilities.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <h3 className="mt-6 text-sm font-medium">Technologies</h3>
            <ul className="mt-2 flex flex-wrap gap-2">
              {item.technologies.map((tech) => (
                <li key={tech} className="rounded-full border border-line px-3 py-1 text-xs">
                  {tech}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Container>
  )
}
