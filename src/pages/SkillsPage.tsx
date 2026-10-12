import { skillGroups, skillLevels, type SkillLevel } from '@/content/skills'
import { Container, PageIntro } from '@/components/ui/Container'
import { GlassCard } from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'

const order: SkillLevel[] = ['primary', 'experienced', 'working', 'exploring']

export function SkillsPage() {
  return (
    <Container as="article" className="pb-20">
      <PageIntro
        eyebrow="Skills"
        title="Specialization, not percentages."
        lede="Primary is daily production work. Exploring is lab work. Nothing here is a fake 95% bar."
      />
      <ul className="mb-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {order.map((level) => (
          <li key={level}>
            <GlassCard className="p-4">
              <p className="font-medium">{skillLevels[level].label}</p>
              <p className="mt-1 text-sm text-muted">{skillLevels[level].hint}</p>
            </GlassCard>
          </li>
        ))}
      </ul>
      <div className="space-y-12">
        {skillGroups.map((group) => (
          <section key={group.id} aria-labelledby={group.id}>
            <h2 id={group.id} className="text-2xl font-semibold tracking-tight">
              {group.title}
            </h2>
            <ul className="mt-4 divide-y divide-line overflow-hidden rounded-[16px] border border-line bg-card">
              {group.items.map((item) => (
                <li key={item.name} className="flex min-h-12 items-center justify-between gap-4 px-4 py-3">
                  <span>{item.name}</span>
                  <span
                    className={cn(
                      'font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted',
                    )}
                  >
                    {skillLevels[item.level].label}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Container>
  )
}
