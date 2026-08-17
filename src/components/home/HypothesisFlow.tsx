import { GlassCard } from '@/components/ui/Reveal'

export function HypothesisFlow() {
  return (
    <section className="relative py-24">
      <div className="flex items-end justify-between gap-6">
        <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Product hypothesis</h2>
        <span className="font-display text-5xl italic text-muted/40">01</span>
      </div>
      <div className="mt-14 grid gap-5 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-5">
          <GlassCard>
            <p className="text-xs uppercase tracking-[0.16em] text-muted">If the system is stalled</p>
            <p className="mt-3 text-lg">The problem is unfinished work, not a missing redesign.</p>
          </GlassCard>
          <GlassCard>
            <p className="text-xs uppercase tracking-[0.16em] text-muted">If we</p>
            <p className="mt-3 text-lg">Stabilize the domain, close integrations, and ship the features already owed.</p>
          </GlassCard>
        </div>
        <GlassCard className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.16em] text-muted">Then we’ll</p>
          <p className="mt-3 text-lg">Leave a system operators can run — traced, bounded, and actually in production.</p>
        </GlassCard>
      </div>
    </section>
  )
}
