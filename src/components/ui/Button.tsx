import { cva, type VariantProps } from 'class-variance-authority'
import { Link } from 'react-router-dom'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

const styles = cva(
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed min-h-12 px-6 text-sm',
  {
    variants: {
      variant: {
        primary: 'bg-accent text-white shadow-[0_12px_40px_rgb(123_97_255_/_0.45)] hover:brightness-110',
        secondary: 'border border-line bg-fg/5 text-fg hover:bg-fg/10',
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
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
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
