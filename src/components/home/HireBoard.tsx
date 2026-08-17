import { profile } from '@/content/profile'
import { Button } from '@/components/ui/Button'
import { WirePortrait } from '@/components/media/WirePortrait'

export function HireBoard() {
  return (
    <div className="flex flex-col items-center lg:flex-row lg:items-center">
      <WirePortrait src={profile.photo} alt={profile.name} />

      <div className="flex flex-col items-center lg:min-w-[7rem] lg:flex-1 lg:flex-row lg:items-center">
        <svg
          className="h-16 w-10 text-fg/45 lg:hidden"
          viewBox="0 0 40 72"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M20 0v14c0 4-3 6-8 6H10c-5 0-8 3-8 8v16c0 5 3 8 8 8h2c5 0 8 2 8 6v14"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <circle cx="20" cy="0" r="2.2" fill="currentColor" />
          <circle cx="20" cy="72" r="2.2" fill="currentColor" />
        </svg>
        <svg
          className="hidden h-24 w-full min-w-[7rem] text-fg/45 lg:block"
          viewBox="0 0 220 96"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M0 48h36c8 0 12-4 12-12V22c0-8 4-12 12-12h70c8 0 12 4 12 12v26c0 8 4 12 12 12h66"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path
            d="M36 48h18v28c0 6 4 10 10 10h28"
            stroke="currentColor"
            strokeWidth="0.9"
            strokeLinecap="round"
            strokeDasharray="2.4 3.2"
            opacity="0.55"
          />
          <circle cx="0" cy="48" r="2.6" fill="currentColor" />
          <circle cx="82" cy="10" r="2.1" fill="currentColor" />
          <circle cx="220" cy="48" r="2.6" fill="currentColor" />
          <rect x="45" y="45" width="6" height="6" rx="0.6" fill="currentColor" />
        </svg>
        <p className="shrink-0 text-xs uppercase tracking-[0.22em] text-muted lg:pl-3">Hire</p>
      </div>

      <div className="mt-4 min-w-0 max-w-xl flex-[1.35] text-center lg:mt-0 lg:pl-6 lg:text-left">
        <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Hire for a system, not a ticket</h2>
        <p className="mt-4 text-muted">
          {profile.current.role} at {profile.current.org}. Open to select full-stack, backend, and frontend work. CV is
          the same record as this site.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
          <Button to="/contact">Have a system you want to build?</Button>
          <Button href={profile.cv} variant="secondary">
            Download CV
          </Button>
          <Button to="/services" variant="ghost">
            Services
          </Button>
        </div>
      </div>
    </div>
  )
}
