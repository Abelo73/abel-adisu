import { experienceByOrg } from '@/content/experience'
import { Container, PageIntro } from '@/components/ui/Container'
import { GlassCard } from '@/components/ui/Reveal'

export function ExperiencePage() {
  const groups = experienceByOrg()

  return (
    <Container as="article" className="pb-20">
      <PageIntro
        eyebrow="Experience"
        title="Atlas, then the freelance lane."
        lede="QA into software engineering at Atlas Computer Technology. Independent Spring Boot work on Upwork in parallel — Top Rated, 100% Job Success."
      />
      <ol className="space-y-12">
        {groups.map((group) => (
          <li key={group.org}>
            <p className="text-xs uppercase tracking-[0.18em] text-muted">{group.location}</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">{group.org}</h2>
            <ol className="mt-6 space-y-4">
              {group.roles.map((item, index) => (
                <li key={item.id}>
                  <GlassCard className="p-6">
                    <p className="text-xs uppercase tracking-[0.16em] text-muted">
                      {String(index + 1).padStart(2, '0')} · {item.period} · {item.workMode}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight">{item.role}</h3>
                    <p className="mt-4 text-muted">{item.summary}</p>
                    <h4 className="mt-6 text-sm font-medium">Responsibilities</h4>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
                      {item.responsibilities.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                    <h4 className="mt-6 text-sm font-medium">Technologies</h4>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {item.technologies.map((tech) => (
                        <li key={tech} className="rounded-full border border-line px-3 py-1 text-xs">
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </Container>
  )
}
