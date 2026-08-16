import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function Container({
  children,
  className,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'header' | 'footer' | 'article' | 'nav'
}) {
  return <Tag className={cn('mx-auto w-full max-w-[1120px] px-5 sm:px-8', className)}>{children}</Tag>
}

export function PageIntro({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string
  title: string
  lede: string
}) {
  return (
    <header className="max-w-3xl pt-10 pb-12 sm:pt-16 sm:pb-16">
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted">{eyebrow}</p>
      <h1 className="font-display mt-4 text-[clamp(2rem,3vw,2.75rem)] font-medium leading-[1.15] tracking-tight">
        {title}
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-muted">{lede}</p>
    </header>
  )
}
