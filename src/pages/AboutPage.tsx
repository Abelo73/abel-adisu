import { experience } from '@/content/experience'
import { profile } from '@/content/profile'
import { GithubRepos } from '@/components/github/GithubRepos'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { GlassCard } from '@/components/ui/Reveal'

export function AboutPage() {
  return (
    <article className="relative overflow-hidden pb-24">
      <p
        className="watermark pointer-events-none absolute left-1/2 top-8 w-[130%] -translate-x-1/2 text-center text-[22vw] leading-none"
        aria-hidden="true"
      >
        ABEL
      </p>

      <Container className="relative">
        <header className="grid gap-10 pt-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.15fr)] lg:pt-24">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-muted">About · {profile.locationLabel}</p>
            <h1 className="mt-5 font-display text-[clamp(2.8rem,6vw,4.6rem)] italic leading-[1.05] font-medium">
              {profile.headline}
            </h1>
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-lg text-muted">{profile.intro}</p>
            <p className="mt-5 text-sm text-muted">
              Currently {profile.current.role} at {profile.current.org}. {profile.education}. {profile.availability}
            </p>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
              {profile.badges.map((badge) => (
                <li key={badge}>{badge}</li>
              ))}
              <li>Upwork freelance</li>
            </ul>
          </div>
        </header>

        <section className="relative mt-24">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">The stack I actually own</p>
          <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight md:text-4xl">
            One person, three layers, one running system.
          </h2>
          <ol className="mt-12 space-y-4">
            {profile.layers.map((layer, index) => (
              <li key={layer.id} className="grid gap-4 md:grid-cols-[7rem_minmax(0,1fr)] md:items-stretch">
                <div className="flex items-center gap-3 md:flex-col md:items-start md:justify-center">
                  <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, '0')}</span>
                  <span className="font-display text-3xl italic">{layer.label}</span>
                </div>
                <GlassCard className="p-6">
                  <h3 className="font-semibold tracking-tight">{layer.title}</h3>
                  <ul className="mt-4 space-y-2 text-sm text-muted">
                    {layer.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </GlassCard>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-24">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Shipped into production</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Where the work already lives</h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {profile.shipped.map((item, index) => (
              <li key={item.title} className="glass rounded-[24px] p-6">
                <p className="font-display text-4xl italic text-muted/50">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.hint}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-24 grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div>
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ok">
              <span className="live-dot size-2 rounded-full bg-ok" aria-hidden="true" />
              Currently working · Atlas Computer Technology
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">The seat I hold now</h2>
            <p className="mt-4 text-muted">
              Software Engineer, March 2024 – Present. QA first, then this seat — same company, longer systems. Addis
              Ababa, on-site. Freelance on Upwork in parallel.
            </p>
            <Button to="/experience" variant="secondary" className="mt-6">
              Full experience
            </Button>
          </div>
          <ol className="space-y-3">
            {experience
              .filter((item) => item.org === 'Atlas Computer Technology')
              .map((item) => (
                <li key={item.id} className="glass rounded-[24px] p-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted">
                    {item.period}
                    {item.period.includes('Present') ? (
                      <span className="ml-2 inline-flex items-center gap-1.5 normal-case tracking-normal text-ok">
                        <span className="live-dot size-1.5 rounded-full bg-ok" aria-hidden="true" />
                        Live
                      </span>
                    ) : null}
                  </p>
                  <h3 className="mt-2 font-semibold">{item.role}</h3>
                  <p className="mt-2 text-sm text-muted">{item.summary}</p>
                </li>
              ))}
          </ol>
        </section>

        <section className="mt-24">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">What teams actually get</h2>
          <ul className="mt-8 flex flex-wrap gap-3">
            {profile.clientsGet.map((item) => (
              <li key={item} className="rounded-full border border-line bg-card px-5 py-3 text-sm">
                {item}
              </li>
            ))}
          </ul>
          <ul className="mt-8 flex flex-wrap gap-2">
            {profile.topSkills.map((skill) => (
              <li key={skill} className="rounded-full bg-accent/15 px-4 py-2 text-sm text-fg">
                {skill}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-24">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">GitHub</h2>
          <div className="mt-6">
            <GithubRepos />
          </div>
        </section>

        <div className="mt-16">
          <Button to="/contact">Have a system you want to build?</Button>
        </div>
      </Container>
    </article>
  )
}
