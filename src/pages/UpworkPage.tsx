import { profile } from '@/content/profile'
import { services } from '@/content/services'
import { Button } from '@/components/ui/Button'
import { Container, PageIntro } from '@/components/ui/Container'
import { isConfiguredUrl } from '@/lib/links'

const groups = [
  {
    title: 'Backend development',
    items: ['Java', 'Spring Boot', 'REST APIs', 'Microservices'],
  },
  {
    title: 'Full-stack',
    items: ['React', 'TypeScript', 'Spring Boot'],
  },
  {
    title: 'Automation',
    items: ['n8n', 'AI workflows', 'API integrations'],
  },
  {
    title: 'DevOps',
    items: ['Docker', 'Kubernetes', 'CI/CD'],
  },
]

export function UpworkPage() {
  return (
    <Container as="article" className="pb-20">
      <PageIntro
        eyebrow="Freelance"
        title="Hire for a bounded system with a clear done."
        lede={`${profile.name} takes select freelance work: Java/Spring backends, React products, n8n automation, and delivery architecture. Reviews and earnings are not shown because they are not in this repository.`}
      />
      <div className="grid gap-4 md:grid-cols-2">
        {groups.map((group) => (
          <section key={group.title} className="rounded-[12px] border border-line p-5">
            <h2 className="font-display text-xl">{group.title}</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item} className="rounded-full border border-line px-3 py-1 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <ul className="mt-10 max-w-2xl list-disc space-y-2 pl-5 text-muted">
        {services.slice(0, 4).map((service) => (
          <li key={service.slug}>{service.title}: {service.summary}</li>
        ))}
      </ul>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button to="/contact">Discuss a project</Button>
        {isConfiguredUrl(profile.social.upwork) ? (
          <Button href={profile.social.upwork} variant="secondary">
            Upwork profile
          </Button>
        ) : (
          <p className="self-center text-sm text-muted">
            Set <code className="font-mono text-xs">UPWORK_PROFILE_URL</code> in profile.ts
          </p>
        )}
      </div>
    </Container>
  )
}
