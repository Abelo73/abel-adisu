import { GlassCard, ParallaxLayer } from '@/components/ui/Reveal'

const insights = [
  { value: '6', label: 'Years in production systems' },
  { value: '4', label: 'Shipped products on this site' },
  { value: '2', label: 'Kinds of work: build or rescue' },
]

export function KeyInsights() {
  return (
    <section className="relative overflow-hidden py-24">
      <ParallaxLayer
        speed={0.22}
        className="pointer-events-none absolute -right-6 top-8"
      >
        <p className="watermark text-[18vw] leading-none md:text-[9rem]" aria-hidden="true">
          Insights
        </p>
      </ParallaxLayer>
      <h2 className="relative text-4xl font-semibold tracking-tight md:text-5xl">In-depth practice</h2>
      <p className="relative mt-4 max-w-xl text-muted">
        The numbers that are actually true — no invented interviews, traffic, or revenue.
      </p>
      <ul className="relative mt-16 grid gap-8 sm:grid-cols-3">
        {insights.map((item) => (
          <li key={item.label}>
            <p className="font-display text-6xl italic text-fg">{item.value}</p>
            <p className="mt-3 text-sm text-muted">{item.label}</p>
          </li>
        ))}
      </ul>
      <div className="relative mt-12 grid gap-4 md:grid-cols-2">
        <GlassCard>
          <p className="text-sm text-muted">
            Atlas Computer Technology by day. Select freelance work on Upwork — Top Rated, 100% Job Success.
          </p>
        </GlassCard>
        <GlassCard>
          <p className="text-sm text-muted">
            Education: B.Sc., Wollega University, 2019–2023. Based in Addis Ababa, Ethiopia.
          </p>
        </GlassCard>
      </div>
    </section>
  )
}
