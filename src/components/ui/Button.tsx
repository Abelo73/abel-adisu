import { cva, type VariantProps } from 'class-variance-authority'
import { Link } from 'react-router-dom'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

const styles = cva(
  'inline-flex items-center justify-center gap-2 rounded-[8px] font-medium transition-transform duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed min-h-12 px-5 text-sm',
  {
    variants: {
      variant: {
        primary: 'bg-accent text-accent-fg hover:brightness-105',
        secondary:
          'border border-line bg-transparent text-fg hover:border-fg/40',
        ghost: 'text-fg hover:bg-fg/5',
      },
    },
    defaultVariants: { variant: 'primary' },
  },
)

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof styles> & {
    to?: string
    href?: string
    children: ReactNode
  }

export function Button({ className, variant, to, href, children, ...props }: Props) {
  const classes = cn(styles({ variant }), className)
  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} rel="noreferrer">
        {children}
      </a>
    )
  }
  return (
    <button className={classes} type={props.type ?? 'button'} {...props}>
      {children}
    </button>
  )
}
