import { cva, type VariantProps } from 'class-variance-authority'
import { Link } from 'react-router-dom'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

const styles = cva(
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed min-h-12 px-6 text-[0.9375rem]',
  {
    variants: {
      variant: {
        primary: 'bg-fg text-bg hover:opacity-90',
        secondary: 'border border-[color-mix(in_srgb,var(--fg)_22%,transparent)] bg-transparent text-fg hover:bg-fg hover:text-bg',
        ghost: 'text-fg hover:bg-alt',
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
