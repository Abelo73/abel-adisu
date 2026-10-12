import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useReducedMotion } from '@/hooks/useMedia'
import { cn } from '@/lib/cn'

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function GlassCard({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('glass rounded-[16px] p-6', className)}>{children}</div>
}

export function ParallaxLayer({
  children,
  speed,
  className,
}: {
  children: ReactNode
  speed: number
  className?: string
}) {
  const reduced = useReducedMotion()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, (value) => (reduced ? 0 : value * speed))
  return (
    <motion.div className={className} style={{ y }}>
      {children}
    </motion.div>
  )
}

export function ParallaxMedia({
  src,
  alt = '',
  className,
}: {
  src: string
  alt?: string
  className?: string
}) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-18%', '18%'])

  return (
    <div ref={ref} className={cn('aspect-[16/10] overflow-hidden', className)}>
      <motion.img
        src={src}
        alt={alt}
        width={1600}
        height={1000}
        loading="lazy"
        decoding="async"
        style={{ y }}
        className="h-[130%] w-full object-cover"
      />
    </div>
  )
}
