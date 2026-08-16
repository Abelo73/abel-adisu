import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function MetaLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        'font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted',
        className,
      )}
    >
      {children}
    </p>
  )
}
