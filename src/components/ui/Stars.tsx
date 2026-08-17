import { Star } from 'lucide-react'
import { upworkProof } from '@/content/upwork'
import { cn } from '@/lib/cn'

export function Stars({
  className,
  size = 16,
  label = '5.0 on Upwork',
}: {
  className?: string
  size?: number
  label?: string
}) {
  return (
    <p className={cn('flex items-center gap-1', className)} aria-label={label}>
      {Array.from({ length: upworkProof.stars }, (_, i) => (
        <Star
          key={i}
          size={size}
          className="fill-[#F5C14A] text-[#F5C14A] drop-shadow-[0_0_8px_rgb(245_193_74_/_0.45)]"
          aria-hidden="true"
        />
      ))}
      <span className="ml-1 text-sm font-medium">5.0</span>
    </p>
  )
}
