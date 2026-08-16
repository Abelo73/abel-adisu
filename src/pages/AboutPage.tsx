import { experience } from '@/content/experience'
import { profile } from '@/content/profile'
import { GithubRepos } from '@/components/github/GithubRepos'
import { Container, PageIntro } from '@/components/ui/Container'

export function AboutPage() {
  return (
    <Container as="article" className="pb-20">
      <PageIntro
        eyebrow="About"
        title="Build it right — or finish what stalled."
        lede={profile.summary}
      />
      <section className="max-w-3xl">
        <h2 className="font-display text-2xl">Introduction</h2>
        <p className="mt-4 text-muted">
          Clients come for one of two things: an enterprise-grade system built the right way from the
          start, or a rescue — bugs, integrations, and features other developers left unfinished.
          Abel works from Addis Ababa, at the Ministry of Revenue, and on select Upwork engagements.
          Education: {profile.education}.
        </p>
      </section>
      <section className="mt-16">
        <h2 className="font-display text-2xl">Engineering philosophy</h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {profile.philosophy.map((item) => (
            <li key={item.title} className="rounded-[12px] border border-line p-5">
              <h3 className="font-medium">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-16">
        <h2 className="font-display text-2xl">What I build</h2>
        <ul className="mt-6 flex flex-wrap gap-2">
          {profile.builds.map((item) => (
            <li key={item} className="rounded-full border border-line px-4 py-2 text-sm">
              {item}
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-16">
        <h2 className="font-display text-2xl">GitHub</h2>
        <div className="mt-4">
          <GithubRepos />
        </div>
      </section>
      <section className="mt-16">
        <h2 className="font-display text-2xl">Professional journey</h2>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          Company names and dates live in <code className="font-mono text-xs">src/content/experience.ts</code>.
          Until those fields are filled, the sequence is the role progression only.
        </p>
        <ol className="mt-8 border-l border-line pl-6">
          {experience.map((item) => (
            <li key={item.id} className="relative pb-8 last:pb-0">
              <span className="absolute -left-[29px] top-1.5 size-3 rounded-full border border-line bg-bg" />
              <h3 className="font-medium">{item.role}</h3>
              <p className="text-sm text-muted">
                {item.org} · {item.period}
              </p>
              <p className="mt-2 text-sm text-muted">{item.summary}</p>
            </li>
          ))}
        </ol>
      </section>
    </Container>
  )
}
