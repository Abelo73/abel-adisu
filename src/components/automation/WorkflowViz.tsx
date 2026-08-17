import { useMemo, useState } from 'react'
import {
  Code2,
  Database,
  FileInput,
  GitBranch,
  Globe,
  MessageSquare,
  Play,
  Sparkles,
  UserCheck,
  Users,
  Webhook,
  Workflow,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { N8nKind, WorkflowStep } from '@/content/automation'
import { cn } from '@/lib/cn'

const NODE_W = 228
const NODE_H = 76
const GAP_X = 64
const GAP_Y = 92
const PAD = 40

const kinds: Record<N8nKind, { color: string; type: string; icon: LucideIcon }> = {
  trigger: { color: '#ff6d5a', type: 'Trigger', icon: Webhook },
  form: { color: '#ff6d5a', type: 'Form Trigger', icon: FileInput },
  n8n: { color: '#ea4b71', type: 'n8n', icon: Workflow },
  ai: { color: '#10a37f', type: 'LangChain', icon: Sparkles },
  if: { color: '#408000', type: 'IF', icon: GitBranch },
  http: { color: '#1a82e2', type: 'HTTP Request', icon: Globe },
  database: { color: '#336791', type: 'Postgres', icon: Database },
  notify: { color: '#4a154b', type: 'Slack', icon: MessageSquare },
  review: { color: '#ff9922', type: 'Wait', icon: UserCheck },
  code: { color: '#ff9922', type: 'Code', icon: Code2 },
  crm: { color: '#00a1e0', type: 'CRM', icon: Users },
}

function layout(count: number) {
  const cols = count <= 3 ? count : 4
  return Array.from({ length: count }, (_, i) => {
    const row = Math.floor(i / cols)
    const col = i % cols
    return {
      x: PAD + col * (NODE_W + GAP_X),
      y: PAD + row * (NODE_H + GAP_Y),
    }
  })
}

function endpoints(a: { x: number; y: number }, b: { x: number; y: number }) {
  if (b.y > a.y) {
    return {
      x1: a.x + NODE_W / 2,
      y1: a.y + NODE_H,
      x2: b.x + NODE_W / 2,
      y2: b.y,
    }
  }
  return {
    x1: a.x + NODE_W,
    y1: a.y + NODE_H / 2,
    x2: b.x,
    y2: b.y + NODE_H / 2,
  }
}

function curve(a: { x: number; y: number }, b: { x: number; y: number }) {
  const { x1, y1, x2, y2 } = endpoints(a, b)
  if (b.y > a.y) {
    return `M ${x1} ${y1} C ${x1} ${y1 + 40}, ${x2} ${y2 - 40}, ${x2} ${y2}`
  }
  const dx = Math.max(48, Math.abs(x2 - x1) / 2)
  return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`
}

export function WorkflowViz({
  steps,
  title,
}: {
  steps: WorkflowStep[]
  title: string
}) {
  const [active, setActive] = useState(0)
  const current = steps[active]
  const nodes = useMemo(() => layout(steps.length), [steps.length])
  const cols = steps.length <= 3 ? steps.length : 4
  const rows = Math.ceil(steps.length / cols)
  const width = PAD * 2 + cols * NODE_W + (cols - 1) * GAP_X
  const height = PAD * 2 + rows * NODE_H + (rows - 1) * GAP_Y
  const meta = current ? kinds[current.kind] : null

  return (
    <section className="overflow-hidden rounded-[24px] border border-white/10 bg-[#14141b] text-white shadow-[var(--shadow-lift)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="grid size-7 place-items-center rounded-md bg-[#ea4b71] text-[0.65rem] font-bold">n8</span>
          <div>
            <p className="text-sm font-medium">{title}</p>
            <p className="text-[0.65rem] uppercase tracking-[0.14em] text-white/45">Editor · inactive</p>
          </div>
        </div>
        <button
          type="button"
          className="inline-flex min-h-10 items-center gap-2 rounded-md bg-[#ff6d5a] px-3 text-sm font-medium text-white"
          onClick={() => setActive(0)}
        >
          <Play size={14} fill="currentColor" aria-hidden="true" />
          Execute workflow
        </button>
      </div>

      <div className="n8n-canvas overflow-x-auto">
        <div className="relative min-w-full" style={{ width, height }}>
          <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
            {nodes.slice(0, -1).map((node, index) => {
              const next = nodes[index + 1]
              const ends = endpoints(node, next)
              return (
              <g key={`${steps[index].id}-edge`}>
                <path
                  d={curve(node, next)}
                  fill="none"
                  stroke={index === active ? '#ff6d5a' : 'rgb(255 255 255 / 0.28)'}
                  strokeWidth="2"
                />
                <circle cx={ends.x1} cy={ends.y1} r="4" fill="#c3c3c9" />
                <circle cx={ends.x2} cy={ends.y2} r="4" fill="#c3c3c9" />
              </g>
              )
            })}
          </svg>
          {steps.map((step, index) => {
            const pos = nodes[index]
            const kind = kinds[step.kind]
            const Icon = kind.icon
            const selected = index === active
            return (
              <button
                key={step.id}
                type="button"
                data-cursor="node"
                onClick={() => setActive(index)}
                aria-pressed={selected}
                className={cn(
                  'absolute flex min-h-12 w-[228px] items-center gap-3 rounded-md border bg-[#414244] px-2 py-2 text-left shadow-lg',
                  selected ? 'border-[#ff6d5a] ring-2 ring-[#ff6d5a]/70' : 'border-white/10 hover:border-white/25',
                )}
                style={{ left: pos.x, top: pos.y, height: NODE_H }}
              >
                <span
                  className="grid size-10 shrink-0 place-items-center rounded-sm text-white"
                  style={{ background: kind.color }}
                >
                  <Icon size={18} aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-medium leading-tight">{step.label}</span>
                  <span className="mt-0.5 block text-[0.65rem] text-white/55">{kind.type}</span>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {current && meta ? (
        <div className="border-t border-white/10 bg-[#1c1c24] px-4 py-4">
          <p className="text-[0.65rem] uppercase tracking-[0.16em] text-white/45">Parameters · {meta.type}</p>
          <p className="mt-2 text-sm text-white/80">
            <span className="font-medium text-white">{current.label}. </span>
            {current.detail}
          </p>
        </div>
      ) : null}
    </section>
  )
}
