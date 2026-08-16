import { useEffect, useState } from 'react'
import { useFinePointer, useReducedMotion } from '@/hooks/useMedia'

export function CustomCursor() {
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hover, setHover] = useState(false)

  useEffect(() => {
    if (!fine || reduced) return
    const move = (event: PointerEvent) => setPos({ x: event.clientX, y: event.clientY })
    const over = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null
      setHover(Boolean(target?.closest('a, button, [data-cursor="node"]')))
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerover', over)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
    }
  }, [fine, reduced])

  if (!fine || reduced) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[60] hidden md:block"
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`,
      }}
    >
      <span
        className="block rounded-full border border-accent/70 bg-accent/15 transition-[width,height] duration-150"
        style={{ width: hover ? 36 : 14, height: hover ? 36 : 14 }}
      />
    </div>
  )
}
