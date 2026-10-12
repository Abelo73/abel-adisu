import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { hireNav, primaryNav } from '@/content/navigation'
import { profile } from '@/content/profile'
import { CommandPalette, useCommandPalette } from '@/components/navigation/CommandPalette'
import { ThemeToggle } from '@/components/navigation/ThemeToggle'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/cn'

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const palette = useCommandPalette()

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/60 backdrop-blur-xl">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link to="/" className="font-display text-lg tracking-tight">
            {profile.shortName}
          </Link>
          <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary">
            {primaryNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'inline-flex min-h-10 items-center rounded-full px-3 text-sm font-medium text-muted transition-colors hover:text-fg',
                    isActive && 'bg-alt text-fg',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => palette.setOpen(true)}
              className="hidden min-h-10 cursor-pointer items-center gap-2 rounded-full border border-line px-3 text-xs text-muted lg:inline-flex"
              aria-label="Open command palette"
            >
              Search
              <kbd className="font-mono text-[0.65rem]">⌘K</kbd>
            </button>
            <ThemeToggle />
            <NavLink
              to={hireNav.to}
              className="hidden min-h-10 items-center rounded-full bg-fg px-5 text-sm font-semibold text-bg transition-opacity hover:opacity-90 sm:inline-flex"
            >
              {hireNav.label}
            </NavLink>
            <button
              type="button"
              className="inline-flex min-h-10 min-w-10 cursor-pointer items-center justify-center rounded-full xl:hidden"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </Container>
      {mobileOpen ? (
        <Container className="xl:hidden">
          <nav className="flex max-h-[calc(100dvh-4.5rem)] flex-col overflow-y-auto border-t border-line pb-3 pt-2" aria-label="Mobile">
            {[...primaryNav, hireNav, { to: '/lab', label: 'Lab' }, { to: '/skills', label: 'Skills' }].map(
              (item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className="flex min-h-12 items-center text-base"
                >
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>
        </Container>
      ) : null}
      <CommandPalette open={palette.open} onClose={() => palette.setOpen(false)} />
    </header>
  )
}
