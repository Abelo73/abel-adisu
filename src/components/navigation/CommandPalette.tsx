import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { commandItems } from '@/content/navigation'
import { cn } from '@/lib/cn'

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!open) setQuery('')
  }, [open])

  if (!open) return null

  const q = query.toLowerCase().trim()
  const items = commandItems.filter((item) => {
    if (!q) return true
    const hay = `${item.label} ${item.to} ${item.keywords?.join(' ') ?? ''}`.toLowerCase()
    return hay.includes(q)
  })

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[15vh]">
      <button
        type="button"
        className="absolute inset-0 bg-bg/70 cursor-pointer"
        aria-label="Close command palette"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="command-title"
        className="relative w-full max-w-lg overflow-hidden rounded-[24px] border border-line bg-card shadow-[var(--shadow-lift)] backdrop-blur-xl"
      >
        <h2 id="command-title" className="sr-only">
          Command palette
        </h2>
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Jump to a page"
          className="w-full border-b border-line bg-transparent px-4 py-4 text-base outline-none"
          aria-label="Filter pages"
        />
        <ul className="max-h-80 overflow-auto p-2">
          {items.length === 0 ? (
            <li className="px-3 py-4 text-sm text-muted">No matching pages.</li>
          ) : (
            items.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={onClose}
                  className={cn(
                    'flex min-h-12 items-center rounded-full px-3 text-sm hover:bg-fg/5',
                  )}
                >
                  {item.label}
                </NavLink>
              </li>
            ))
          )}
        </ul>
        <p className="border-t border-line px-4 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted">
          Esc to close · Enter via links
        </p>
      </div>
    </div>
  )
}

export function useCommandPalette() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((value) => !value)
      }
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return { open, setOpen }
}
