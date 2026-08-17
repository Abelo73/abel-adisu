import { profile } from '@/content/profile'
import { Button } from '@/components/ui/Button'
import { isConfiguredEmail, isConfiguredUrl, newTab } from '@/lib/links'
import { cn } from '@/lib/cn'
import type { ReactNode } from 'react'

export function ContactFacts() {
  return (
    <dl className="divide-y divide-line border-y border-line">
      <Fact label="Phone">
        <a className="inline-flex min-h-12 items-center underline-offset-4 hover:underline" href={`tel:${profile.phone}`}>
          {profile.phoneLabel}
        </a>
      </Fact>
      <Fact label="Email">
        {isConfiguredEmail(profile.email) ? (
          <a
            className="inline-flex min-h-12 items-center underline-offset-4 hover:underline"
            href={`mailto:${profile.email}`}
          >
            {profile.email}
          </a>
        ) : (
          <span className="text-muted">set EMAIL_ADDRESS in profile.ts</span>
        )}
      </Fact>
      <Fact label="Based">
        <span className="inline-flex min-h-12 items-center">{profile.locationLabel}</span>
      </Fact>
      <Fact label="Also">
        <span className="flex min-h-12 flex-wrap items-center gap-x-4 gap-y-1">
          {isConfiguredUrl(profile.social.linkedin) ? (
            <a className="underline-offset-4 hover:underline" href={profile.social.linkedin} {...newTab}>
              LinkedIn
            </a>
          ) : null}
          {isConfiguredUrl(profile.social.github) ? (
            <a className="underline-offset-4 hover:underline" href={profile.social.github} {...newTab}>
              GitHub
            </a>
          ) : null}
          {isConfiguredUrl(profile.social.upwork) ? (
            <a className="underline-offset-4 hover:underline" href={profile.social.upwork} {...newTab}>
              Upwork
            </a>
          ) : null}
          <a className="underline-offset-4 hover:underline" href={profile.cv} {...newTab}>
            CV
          </a>
        </span>
      </Fact>
    </dl>
  )
}

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[7.5rem_minmax(0,1fr)] items-center gap-4 py-1 sm:grid-cols-[9rem_minmax(0,1fr)]">
      <dt className={cn('text-xs uppercase tracking-[0.18em] text-muted')}>{label}</dt>
      <dd className="min-w-0 text-sm font-medium">{children}</dd>
    </div>
  )
}
