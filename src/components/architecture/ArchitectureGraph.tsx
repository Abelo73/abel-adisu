import { useEffect, useId, useMemo, useRef, useState } from 'react'
import type { GraphEdge, GraphNode } from '@/content/architecture'
import { cn } from '@/lib/cn'

const GAP_X = 16
const GAP_Y = 44
const PAD_Y = 20

function useContainerWidth() {
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(640)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => setWidth(el.clientWidth)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, width }
}

function layoutGraph(nodes: GraphNode[], edges: GraphEdge[], containerWidth: number) {
  const ids = nodes.map((node) => node.id)
  const manual = nodes.every((node) => node.layer != null)
  const stacked = containerWidth < 540
  const nodeH = 52
  const available = Math.max(containerWidth, 280)

  if (manual && !stacked) {
    const maxLayer = Math.max(...nodes.map((node) => node.layer ?? 0))
    const cols = Math.max(...nodes.map((node) => node.row ?? 0), 0) + 1
    const nodeW = Math.min(200, (available - GAP_X * (cols - 1)) / cols)
    const blockW = cols * nodeW + (cols - 1) * GAP_X
    const offsetX = Math.max((available - blockW) / 2, 0)
    const height = PAD_Y * 2 + (maxLayer + 1) * nodeH + maxLayer * GAP_Y
    const pos = new Map<string, { x: number; y: number }>()
    for (const node of nodes) {
      pos.set(node.id, {
        x: offsetX + (node.row ?? 0) * (nodeW + GAP_X),
        y: PAD_Y + (node.layer ?? 0) * (nodeH + GAP_Y),
      })
    }
    return { pos, width: available, height, nodeW, nodeH }
  }

  const places = new Map<string, { layer: number; col: number; cols: number }>()

  if (stacked) {
    const ordered = manual
      ? [...nodes].sort((a, b) => (a.layer ?? 0) - (b.layer ?? 0) || (a.row ?? 0) - (b.row ?? 0))
      : nodes
    ordered.forEach((node, index) => places.set(node.id, { layer: index, col: 0, cols: 1 }))
  } else {
    const outgoing = new Map(ids.map((id) => [id, [] as string[]]))
    const incomingCount = new Map(ids.map((id) => [id, 0]))
    for (const edge of edges) {
      if (!outgoing.has(edge.from) || !incomingCount.has(edge.to)) continue
      outgoing.get(edge.from)!.push(edge.to)
      incomingCount.set(edge.to, (incomingCount.get(edge.to) ?? 0) + 1)
    }

    const depth = new Map<string, number>()
    const queue = ids.filter((id) => incomingCount.get(id) === 0)
    if (queue.length === 0 && ids[0]) queue.push(ids[0])
    for (const id of queue) depth.set(id, 0)

    while (queue.length) {
      const id = queue.shift()!
      const current = depth.get(id) ?? 0
      for (const to of outgoing.get(id) ?? []) {
        const next = current + 1
        if (!depth.has(to) || next > (depth.get(to) ?? 0)) {
          depth.set(to, next)
          queue.push(to)
        }
      }
    }

    for (const id of ids) if (!depth.has(id)) depth.set(id, 0)

    const layers = new Map<number, string[]>()
    for (const id of ids) {
      const layer = depth.get(id) ?? 0
      const list = layers.get(layer) ?? []
      list.push(id)
      layers.set(layer, list)
    }
    for (const [layer, list] of layers) {
      list.forEach((id, col) => places.set(id, { layer, col, cols: list.length }))
    }
  }

  const maxLayer = Math.max(...[...places.values()].map((item) => item.layer), 0)
  const maxCols = Math.max(...[...places.values()].map((item) => item.cols), 1)
  const nodeW = Math.min(stacked ? 280 : 200, (available - GAP_X * (maxCols - 1)) / maxCols)
  const height = PAD_Y * 2 + (maxLayer + 1) * nodeH + maxLayer * GAP_Y
  const pos = new Map<string, { x: number; y: number }>()

  for (const node of nodes) {
    const place = places.get(node.id) ?? { layer: 0, col: 0, cols: 1 }
    const blockW = place.cols * nodeW + (place.cols - 1) * GAP_X
    const offsetX = Math.max((available - blockW) / 2, 0)
    pos.set(node.id, {
      x: offsetX + place.col * (nodeW + GAP_X),
      y: PAD_Y + place.layer * (nodeH + GAP_Y),
    })
  }

  return { pos, width: available, height, nodeW, nodeH }
}

function edgePath(
  from: { x: number; y: number },
  to: { x: number; y: number },
  nodeW: number,
  nodeH: number,
) {
  const x1 = from.x + nodeW / 2
  const y1 = from.y + nodeH
  const x2 = to.x + nodeW / 2
  const y2 = to.y
  const curve = Math.max((y2 - y1) * 0.45, 22)
  return `M ${x1} ${y1} C ${x1} ${y1 + curve}, ${x2} ${y2 - curve}, ${x2} ${y2}`
}

export function ArchitectureGraph({
  nodes,
  edges,
  title,
  live = false,
}: {
  nodes: GraphNode[]
  edges: GraphEdge[]
  title: string
  live?: boolean
}) {
  const labelId = useId()
  const { ref, width: containerWidth } = useContainerWidth()
  const [active, setActive] = useState(nodes[0]?.id ?? '')
  const current = nodes.find((node) => node.id === active) ?? nodes[0]
  const { pos, width, height, nodeW, nodeH } = useMemo(
    () => layoutGraph(nodes, edges, containerWidth),
    [nodes, edges, containerWidth],
  )

  return (
    <div className="glass rounded-[24px] p-4 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p id={labelId} className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted">
          {title}
        </p>
        {live ? (
          <span className="inline-flex items-center gap-2 text-xs font-medium text-ok">
            <span className="live-dot size-2 rounded-full bg-ok" aria-hidden="true" />
            Live
          </span>
        ) : null}
      </div>

      <div ref={ref} className="mt-5 w-full overflow-hidden" role="group" aria-labelledby={labelId}>
        <div className="relative w-full" style={{ height }}>
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMin meet"
            aria-hidden="true"
          >
            {edges.map((edge) => {
              const from = pos.get(edge.from)
              const to = pos.get(edge.to)
              if (!from || !to) return null
              const d = edgePath(from, to, nodeW, nodeH)
              const lit = active === edge.from || active === edge.to
              return (
                <path
                  key={`${edge.from}-${edge.to}`}
                  d={d}
                  fill="none"
                  className={lit ? 'stroke-steel' : 'stroke-line'}
                  strokeWidth={lit ? 2 : 1.25}
                />
              )
            })}
          </svg>
          {nodes.map((node) => {
            const point = pos.get(node.id)
            if (!point) return null
            const isActive = node.id === current?.id
            return (
              <button
                key={node.id}
                type="button"
                data-cursor="node"
                onClick={() => setActive(node.id)}
                style={{ left: point.x, top: point.y, width: nodeW, height: nodeH }}
                className={cn(
                  'absolute cursor-pointer rounded-2xl border px-3 text-center text-[0.8125rem] font-medium transition-colors duration-150',
                  isActive
                    ? 'border-steel bg-steel/15 text-fg'
                    : 'border-line bg-card text-fg hover:border-steel/50',
                )}
                aria-pressed={isActive}
              >
                {node.label}
              </button>
            )
          })}
        </div>
      </div>

      {current ? (
        <p className="mt-5 border-t border-line pt-4 text-sm leading-relaxed text-muted">
          <span className="font-medium text-fg">{current.label}. </span>
          {current.detail}
        </p>
      ) : null}
    </div>
  )
}
