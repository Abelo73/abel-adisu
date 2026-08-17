import { useId, useState } from 'react'
import type { GraphEdge, GraphNode } from '@/content/architecture'
import { cn } from '@/lib/cn'

export function ArchitectureGraph({
  nodes,
  edges,
  title,
}: {
  nodes: GraphNode[]
  edges: GraphEdge[]
  title: string
}) {
  const labelId = useId()
  const [active, setActive] = useState(nodes[0]?.id ?? '')
  const current = nodes.find((node) => node.id === active) ?? nodes[0]

  return (
    <div className="glass rounded-[24px] p-4 sm:p-6">
      <p id={labelId} className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted">
        {title}
      </p>
      <ol className="mt-5 flex flex-col gap-0" aria-labelledby={labelId}>
        {nodes.map((node, index) => {
          const isActive = node.id === current?.id
          return (
            <li key={node.id} className="flex flex-col">
              <button
                type="button"
                data-cursor="node"
                onClick={() => setActive(node.id)}
                className={cn(
                  'flex min-h-12 w-full cursor-pointer items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition-colors duration-150',
                  isActive
                    ? 'border-steel bg-steel/10'
                    : 'border-line hover:border-steel/50',
                )}
                aria-pressed={isActive}
              >
                <span className="font-medium">{node.label}</span>
                <span className="font-mono text-[0.65rem] text-muted">{String(index + 1).padStart(2, '0')}</span>
              </button>
              {index < edges.length || index < nodes.length - 1 ? (
                <span className="mx-auto h-4 w-px bg-line" aria-hidden="true" />
              ) : null}
            </li>
          )
        })}
      </ol>
      {current ? (
        <p className="mt-5 border-t border-line pt-4 text-sm leading-relaxed text-muted">
          <span className="font-medium text-fg">{current.label}. </span>
          {current.detail}
        </p>
      ) : null}
    </div>
  )
}
