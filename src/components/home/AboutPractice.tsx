import { profile } from '@/content/profile'
import { GlassCard } from '@/components/ui/Reveal'

export function AboutPractice() {
  return (
    <section className="relative grid gap-12 py-24 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">About the practice</h2>
      <div className="space-y-8">
        <div>
          <h3 className="font-semibold">The problem</h3>
          <p className="mt-3 text-muted">
            Teams either start a system <strong className="font-medium text-fg">without a durable architecture</strong>,
            or inherit one that stalled — bugs, missing integrations, and features sitting in a half-dead codebase.
          </p>
        </div>
        <div>
          <h3 className="font-semibold">The goal</h3>
          <p className="mt-3 text-muted">
            {profile.intro} Day job:{' '}
            <strong className="font-medium text-fg">{profile.employer}</strong>. Freelance:{' '}
            <strong className="font-medium text-fg">Upwork</strong>, Top Rated.
          </p>
        </div>
        <GlassCard className="p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Now</p>
          <p className="mt-2 text-sm text-muted">
            Software Engineer · Addis Ababa · Java, Spring Boot, React, Keycloak, Kafka
          </p>
        </GlassCard>
      </div>
    </section>
  )
}
