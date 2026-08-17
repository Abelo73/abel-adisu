import { motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/useMedia'

export function CareerLadder({ steps }: { steps: string[] }) {
  const reduced = useReducedMotion()

  return (
    <ol className="mt-8 space-y-3">
      {steps.map((step, index) => (
        <motion.li
          key={step}
          className="flex items-center gap-3"
          initial={reduced ? false : { opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ delay: reduced ? 0 : index * 0.08, duration: 0.4 }}
        >
          <span className="font-mono text-xs text-accent">{String(index + 1).padStart(2, '0')}</span>
          <span className="h-px w-6 bg-accent/50" />
          <span className="text-sm font-medium md:text-base">{step}</span>
        </motion.li>
      ))}
    </ol>
  )
}
