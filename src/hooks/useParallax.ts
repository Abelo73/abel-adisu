import { useEffect, useState } from 'react'
import { useReducedMotion } from '@/hooks/useMedia'

export function usePointerParallax(strength = 12) {
  const reduced = useReducedMotion()
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (reduced) return
    const move = (event: PointerEvent) => {
      const nx = event.clientX / window.innerWidth - 0.5
      const ny = event.clientY / window.innerHeight - 0.5
      setOffset({ x: nx * strength, y: ny * strength })
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [reduced, strength])

  return reduced ? { x: 0, y: 0 } : offset
}

export function useScrollParallax() {
  const reduced = useReducedMotion()
  const [y, setY] = useState(0)

  useEffect(() => {
    if (reduced) return
    const onScroll = () => setY(window.scrollY)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [reduced])

  return reduced ? 0 : y
}
