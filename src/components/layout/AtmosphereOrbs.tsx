import { motion, useScroll, useTransform } from 'motion/react'
import { useReducedMotion } from '@/hooks/useMedia'

export function AtmosphereOrbs() {
  const reduced = useReducedMotion()
  const { scrollY } = useScroll()
  const ySlow = useTransform(scrollY, [0, 2400], [0, 420])
  const yMid = useTransform(scrollY, [0, 2400], [0, -320])
  const yFast = useTransform(scrollY, [0, 2400], [0, 220])

  if (reduced) return null

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <motion.div
        style={{ y: ySlow }}
        className="absolute left-[-12%] top-[8%] size-[38rem] rounded-full bg-[#7B61FF]/28 blur-[140px]"
      />
      <motion.div
        style={{ y: yMid }}
        className="absolute right-[-8%] top-[28%] size-[28rem] rounded-full bg-[#852848]/24 blur-[130px]"
      />
      <motion.div
        style={{ y: yFast }}
        className="absolute bottom-[-10%] left-[30%] size-[24rem] rounded-full bg-[#9F7FDB]/18 blur-[120px]"
      />
    </div>
  )
}
