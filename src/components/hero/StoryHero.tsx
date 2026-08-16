import { Link } from 'react-router-dom'
import { profile } from '@/content/profile'
import { projects } from '@/content/projects'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { MetaLabel } from '@/components/ui/MetaLabel'
import { usePointerParallax, useScrollParallax } from '@/hooks/useParallax'

export function StoryHero() {
  const pointer = usePointerParallax(18)
  const scrollY = useScrollParallax()
  const frames = projects.slice(0, 3)

  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        className="bg-grid pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{ transform: `translate3d(0, ${scrollY * 0.18}px, 0)` }}
      />
      <div
        className="pointer-events-none absolute -top-24 right-[-10%] h-[28rem] w-[28rem] rounded-full bg-fg/5 blur-3xl"
        aria-hidden="true"
        style={{ transform: `translate3d(${pointer.x}px, ${pointer.y + scrollY * 0.08}px, 0)` }}
      />

      <Container className="relative grid items-center gap-16 py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:py-28">
        <div>
          <MetaLabel>
            {profile.locationLabel} · {profile.years}
          </MetaLabel>
          <h1 className="font-display mt-6 max-w-[14ch] text-[clamp(3rem,8vw,6.25rem)] font-medium leading-[0.92] tracking-tight">
            {profile.headline}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">{profile.summary}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {profile.badges.map((badge) => (
              <li key={badge} className="border border-line px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.08em]">
                {badge}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/projects">See the work</Button>
            <Button to="/contact" variant="secondary">
              Let’s build something
            </Button>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <li>
              <a href={profile.social.github} className="underline-offset-4 hover:underline">
                GitHub
              </a>
            </li>
            <li>
              <a href={profile.social.linkedin} className="underline-offset-4 hover:underline">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={profile.social.upwork} className="underline-offset-4 hover:underline">
                Upwork
              </a>
            </li>
          </ul>
        </div>

        <div className="relative mx-auto h-[420px] w-full max-w-lg lg:h-[520px]">
          {frames.map((project, index) => (
            <Link
              key={project.slug}
              to={`/projects/${project.slug}`}
              className="absolute inset-x-0 overflow-hidden rounded-[12px] border border-line bg-card shadow-[var(--shadow-lift)]"
              style={{
                top: index * 36,
                transform: `translate3d(${pointer.x * (index + 1) * 0.35}px, ${pointer.y * (index + 1) * 0.25 - scrollY * (0.04 + index * 0.02)}px, 0) rotate(${index === 0 ? -4 : index === 1 ? 2.5 : 6}deg)`,
                zIndex: 10 - index,
                width: `${100 - index * 6}%`,
                left: `${index * 4}%`,
              }}
            >
              <img
                src={project.image}
                alt=""
                className="aspect-[16/10] w-full object-cover"
              />
              <span className="sr-only">{project.title}</span>
            </Link>
          ))}
        </div>
      </Container>

      <Container className="relative grid gap-10 border-t border-line py-16 md:grid-cols-3">
        {profile.story.map((chapter, index) => (
          <article
            key={chapter.title}
            style={{ transform: `translate3d(0, ${Math.max(0, scrollY * 0.04 - index * 4)}px, 0)` }}
          >
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted">
              {chapter.kicker}
            </p>
            <h2 className="font-display mt-3 text-2xl leading-tight">{chapter.title}</h2>
            <p className="mt-3 text-sm text-muted">{chapter.body}</p>
          </article>
        ))}
      </Container>
    </section>
  )
}
