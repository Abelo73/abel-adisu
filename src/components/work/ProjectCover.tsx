import { cn } from '@/lib/cn'

export function ProjectCover({
  src,
  alt,
  className,
  kind = 'board',
}: {
  src: string
  alt: string
  className?: string
  kind?: 'board' | 'screen'
}) {
  if (kind === 'screen') {
    return (
      <div className={cn('overflow-hidden rounded-[24px] border border-line bg-[#16161c] p-3 shadow-[var(--shadow-lift)] sm:p-4', className)}>
        <div className="mb-3 flex items-center gap-1.5 px-1">
          <span className="size-2 rounded-full bg-[#ff5f57]" aria-hidden="true" />
          <span className="size-2 rounded-full bg-[#febc2e]" aria-hidden="true" />
          <span className="size-2 rounded-full bg-[#28c840]" aria-hidden="true" />
        </div>
        <img src={src} alt={alt} className="block h-auto w-full rounded-[12px]" />
      </div>
    )
  }

  return (
    <div className={cn('overflow-hidden rounded-[24px] border border-line bg-[#111118] shadow-[var(--shadow-lift)]', className)}>
      <img src={src} alt={alt} className="block h-auto w-full" />
    </div>
  )
}
