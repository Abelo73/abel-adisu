import { Link } from 'react-router-dom'
import { profile } from '@/content/profile'

export function AtlasNowCard() {
  const { current } = profile

  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute -right-8 -top-10 size-48 rounded-full bg-ok/20 blur-[70px]"
        aria-hidden="true"
      />
      <article className="glass relative overflow-hidden rounded-[28px] p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">
            Production environment
          </p>
          <span className="inline-flex items-center gap-2 rounded-full border border-ok/35 bg-ok/10 px-3 py-1 text-xs font-medium text-ok">
            <span className="live-dot size-2 rounded-full bg-ok" aria-hidden="true" />
            Live
          </span>
        </div>

        <div className="mt-6 flex items-start gap-4">
          <img
            src={profile.photo}
            alt={profile.name}
            width={900}
            height={1200}
            fetchPriority="high"
            decoding="async"
            className="size-[4.5rem] rounded-full object-cover object-top ring-2 ring-ok/50 ring-offset-2 ring-offset-bg"
          />
          <div className="min-w-0">
            <p className="text-[0.65rem] uppercase tracking-[0.18em] text-muted">{current.workMode}</p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight">{current.org}</h2>
            <p className="mt-1 text-sm text-muted">
              {current.role} · {current.location}
            </p>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl border border-line bg-fg/5 px-4 py-3">
            <dt className="text-[0.65rem] uppercase tracking-[0.16em] text-muted">Status</dt>
            <dd className="mt-1 font-medium">{current.env} · {current.period}</dd>
          </div>
          <div className="rounded-2xl border border-line bg-fg/5 px-4 py-3">
            <dt className="text-[0.65rem] uppercase tracking-[0.16em] text-muted">Seat</dt>
            <dd className="mt-1 font-medium">{current.role}</dd>
          </div>
        </dl>

        <p className="mt-5 text-[0.65rem] uppercase tracking-[0.16em] text-muted">Stack in production</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {current.stack.map((item) => (
            <li key={item} className="rounded-full border border-line px-3 py-1.5 text-xs">
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium">
          <Link to="/experience" className="underline-offset-4 hover:underline">
            Current role
          </Link>
          <Link to="/upwork" className="text-muted underline-offset-4 hover:underline">
            Also on Upwork
          </Link>
        </div>
      </article>
    </div>
  )
}
