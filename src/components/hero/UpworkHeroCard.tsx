import { useReducedMotion } from '@/hooks/useMedia'
import { profile } from '@/content/profile'
import { upworkJobs, upworkProof, upworkTestimonials } from '@/content/upwork'
import { Stars } from '@/components/ui/Stars'
import { newTab } from '@/lib/links'

export function UpworkHeroCard() {
  const featured = upworkTestimonials[0]

  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute -right-8 -top-10 size-48 rounded-full bg-[#F5C14A]/20 blur-[70px]"
        aria-hidden="true"
      />
      <a
        href={profile.social.upwork}
        {...newTab}
        className="glass relative block overflow-hidden rounded-[28px] p-6 transition duration-300 hover:border-accent/40"
      >
        <div className="flex items-start gap-4">
          <span className="relative shrink-0">
            <img
              src={profile.photo}
              alt=""
              className="size-[4.5rem] rounded-full object-cover ring-2 ring-[#F5C14A]/70 ring-offset-2 ring-offset-bg"
            />
            <span className="absolute right-0.5 top-0.5 size-3 rounded-full bg-[#14a800] ring-2 ring-bg" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-[0.65rem] uppercase tracking-[0.18em] text-muted">Upwork · public profile</p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight">{profile.name}</h2>
            <p className="mt-1 text-sm text-muted">{profile.locationLabel}</p>
            <Stars className="mt-3" size={18} />
          </div>
        </div>

        {featured?.quote ? (
          <blockquote className="mt-5 text-sm leading-relaxed text-muted">
            “{featured.quote.length > 220 ? `${featured.quote.slice(0, 220).replace(/\s+\S*$/, '')}…` : featured.quote}”
          </blockquote>
        ) : null}

        <ul className="mt-5 flex flex-wrap gap-2">
          <li className="rounded-full bg-[#1F57C3]/20 px-3 py-1.5 text-xs font-medium text-[#8EB4FF]">
            {upworkProof.jobSuccess} Job Success
          </li>
          <li className="rounded-full bg-[#1F57C3]/20 px-3 py-1.5 text-xs font-medium text-[#8EB4FF]">
            {upworkProof.badge}
          </li>
          <li className="rounded-full border border-line px-3 py-1.5 text-xs">{upworkJobs.length} completed jobs shown</li>
        </ul>

        <p className="mt-5 text-sm font-medium text-fg">
          Open Upwork profile
          <span className="ml-1 text-muted">↗</span>
        </p>
      </a>
    </div>
  )
}

export function UpworkTestimonials({ compact = false }: { compact?: boolean }) {
  const reduced = useReducedMotion()
  const loop = [...upworkTestimonials, ...upworkTestimonials]

  if (compact && !reduced) {
    return (
      <div className="marquee" role="region" aria-label="Upwork testimonials">
        <ul className="marquee-track">
          {loop.map((job, index) => (
            <li
              key={`${job.slug}-${index}`}
              className="glass w-[min(34rem,85vw)] shrink-0 rounded-[24px] p-6"
            >
              <Stars />
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-muted">
                {job.title} · {job.period}
              </p>
              <blockquote className="mt-4 text-sm leading-relaxed text-muted">“{job.quote}”</blockquote>
              <ul className="mt-4 flex flex-wrap gap-2">
                {job.endorsements.slice(0, 3).map((tag) => (
                  <li key={tag} className="rounded-full border border-line px-3 py-1 text-xs">
                    {tag}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <ul className={compact ? 'grid gap-4 md:grid-cols-2' : 'grid gap-6'}>
      {upworkTestimonials.map((job) => (
        <li key={job.slug} className="glass rounded-[24px] p-6">
          <Stars />
          <p className="mt-2 text-xs uppercase tracking-[0.16em] text-muted">
            {job.title} · {job.period}
          </p>
          <blockquote className="mt-4 text-sm leading-relaxed text-muted">“{job.quote}”</blockquote>
          <ul className="mt-4 flex flex-wrap gap-2">
            {job.endorsements.map((tag) => (
              <li key={tag} className="rounded-full border border-line px-3 py-1 text-xs">
                {tag}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}

export function UpworkWorkDone() {
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {upworkJobs.map((job) => (
        <li key={job.slug} className="glass rounded-[24px] p-5">
          <Stars />
          <h3 className="mt-3 font-semibold tracking-tight">{job.title}</h3>
          <p className="mt-1 text-xs text-muted">{job.period}</p>
          <ul className="mt-4 list-disc space-y-1 pl-4 text-sm text-muted">
            {job.done.slice(0, 4).map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}

export function UpworkJobs() {
  return (
    <ol className="space-y-6">
      {upworkJobs.map((job) => (
        <li key={job.slug} className="glass rounded-[24px] p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-xl font-semibold tracking-tight">{job.title}</h3>
              <p className="mt-1 text-sm text-muted">{job.period} · Upwork client</p>
            </div>
            <Stars />
          </div>
          <h4 className="mt-6 text-sm font-medium">What I did</h4>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
            {job.done.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          {job.quote ? (
            <>
              <h4 className="mt-6 text-sm font-medium">Client review</h4>
              <blockquote className="mt-2 text-sm leading-relaxed text-muted">“{job.quote}”</blockquote>
            </>
          ) : (
            <p className="mt-6 text-sm text-muted">5.0 stars on Upwork. No written comment on this contract.</p>
          )}
          {job.endorsements.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {job.endorsements.map((tag) => (
                <li key={tag} className="rounded-full border border-line px-3 py-1 text-xs">
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ol>
  )
}
