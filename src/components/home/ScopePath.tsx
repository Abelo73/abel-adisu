import { Search, Globe, Users, Layers, Code2, Rocket } from 'lucide-react'

const rows = [
  [
    { icon: Search, label: 'Discover' },
    { icon: Globe, label: 'Architecture' },
    { icon: Users, label: 'Contracts' },
  ],
  [
    { icon: Layers, label: 'Build' },
    { icon: Code2, label: 'Rescue' },
  ],
  [{ icon: Rocket, label: 'Ship' }],
]

export function ScopePath() {
  let index = 0

  return (
    <section className="relative overflow-hidden py-24">
      <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">Scope of work</h2>
      <p className="mt-4 max-w-xl text-muted">
        How an engagement actually moves — from the first constraint to a running system.
      </p>
      <div className="relative mt-16">
        <svg
          className="pointer-events-none absolute inset-0 hidden h-full w-full text-fg/20 lg:block"
          viewBox="0 0 1000 360"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M80 70 H820 Q880 70 880 120 V150 Q880 190 820 190 H280 Q220 190 220 240 V270 Q220 310 280 310 H620"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
        <ol className="space-y-10">
          {rows.map((row, rowIndex) => (
            <li
              key={rowIndex}
              className={rowIndex === 1 ? 'flex flex-wrap justify-end gap-4' : 'flex flex-wrap gap-4'}
            >
              {row.map((step) => {
                const Icon = step.icon
                index += 1
                return (
                  <div key={step.label} className="flex items-center gap-3">
                    <span className="grid size-12 place-items-center rounded-full border border-line bg-card">
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <span className="rounded-full border border-line bg-card px-5 py-3 text-sm backdrop-blur-md">
                      {String(index).padStart(2, '0')} · {step.label}
                    </span>
                  </div>
                )
              })}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
