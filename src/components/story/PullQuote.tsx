export function PullQuote({ children }: { children: string }) {
  return (
    <blockquote className="mt-8 max-w-xl font-display text-2xl italic leading-snug text-accent md:text-3xl">
      {children}
    </blockquote>
  )
}
