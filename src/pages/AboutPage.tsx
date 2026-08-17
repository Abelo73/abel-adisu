import { experience } from '@/content/experience'
import { profile } from '@/content/profile'
import { AboutChapters } from '@/components/about/AboutChapters'
import { AboutStoryHero } from '@/components/about/AboutStoryHero'
import { GithubRepos } from '@/components/github/GithubRepos'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { GlassCard, ParallaxMedia, Reveal } from '@/components/ui/Reveal'

export function AboutPage() {
  return (
    <article className="relative overflow-hidden pb-24">
      <AboutStoryHero />

      <Container className="relative">
        <AboutChapters />

        <section className="relative py-16">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Build. Rescue. Ship.</p>
            <h2 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight md:text-5xl">
              Three ways the work actually moves.
            </h2>
          </Reveal>
          <ol className="mt-14 space-y-16">
            {profile.story.map((chapter, index) => (
              <li key={chapter.kicker}>
                <Reveal delay={index * 0.05}>
                  <div className="grid items-end gap-6 md:grid-cols-[8rem_minmax(0,1fr)]">
                    <p className="font-display text-6xl italic text-muted/35">{String(index + 1).padStart(2, '0')}</p>
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-muted">{chapter.kicker}</p>
                      <h3 className="mt-2 font-display text-3xl italic md:text-4xl">{chapter.title}</h3>
                      <p className="mt-4 max-w-2xl text-muted">{chapter.body}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        <section className="relative py-24">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">The stack I actually own</p>
            <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight md:text-4xl">
              One person, three layers, one running system.
            </h2>
          </Reveal>
          <ol className="mt-12 space-y-4">
            {profile.layers.map((layer, index) => (
              <li key={layer.id}>
                <Reveal delay={index * 0.08}>
                  <div className="grid gap-4 md:grid-cols-[7rem_minmax(0,1fr)] md:items-stretch">
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
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        <section className="relative py-16">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Shipped into production</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Where the work already lives</h2>
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {profile.shipped.map((item, index) => (
              <li key={item.title}>
                <Reveal delay={index * 0.05}>
                  <div className="glass rounded-[24px] p-6">
                    <p className="font-display text-4xl italic text-muted/50">{String(index + 1).padStart(2, '0')}</p>
                    <h3 className="mt-3 text-xl font-semibold tracking-tight">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted">{item.hint}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid items-center gap-10 py-24 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <Reveal>
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ok">
              <span className="live-dot size-2 rounded-full bg-ok" aria-hidden="true" />
              Currently working · Atlas Computer Technology
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">The seat I hold now</h2>
            <p className="mt-4 text-muted">
              Software Engineer, {profile.current.period}. QA first, then this seat — same company, longer systems.{' '}
              {profile.current.location}, {profile.current.workMode.toLowerCase()}. Freelance on Upwork in parallel.
            </p>
            <Button to="/experience" variant="secondary" className="mt-6">
              Full experience
            </Button>
          </Reveal>
          <div className="overflow-hidden rounded-[28px] border border-line">
            <ParallaxMedia
              src={profile.deskPhoto}
              alt={`${profile.name} at his desk`}
              className="aspect-[16/10]"
            />
          </div>
        </section>

        <ol className="space-y-3 pb-8">
          {experience
            .filter((item) => item.org === 'Atlas Computer Technology')
            .map((item) => (
              <li key={item.id}>
                <Reveal>
                  <div className="glass rounded-[24px] p-5">
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
                  </div>
                </Reveal>
              </li>
            ))}
        </ol>

        <section className="py-16">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">GitHub</h2>
          </Reveal>
          <div className="mt-6">
            <GithubRepos />
          </div>
        </section>

        <Reveal>
          <div className="flex flex-wrap gap-3 pt-8">
            <Button href={profile.cv}>Download CV</Button>
            <Button to="/contact" variant="secondary">
              Have a system you want to build?
            </Button>
          </div>
        </Reveal>
      </Container>
    </article>
  )
}
