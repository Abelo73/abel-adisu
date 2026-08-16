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
    <header className="sticky top-0 z-40 border-b border-line/80 bg-bg/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link to="/" className="font-display text-lg tracking-tight">
          {profile.name}
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {primaryNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'min-h-12 px-3 text-sm text-muted hover:text-fg',
                  isActive && 'text-fg',
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
            className="hidden min-h-12 cursor-pointer items-center gap-2 rounded-[8px] border border-line px-3 text-xs text-muted md:inline-flex"
            aria-label="Open command palette"
          >
            Search
            <kbd className="font-mono text-[0.65rem]">⌘K</kbd>
          </button>
          <ThemeToggle />
          <NavLink
            to={hireNav.to}
            className="hidden min-h-12 items-center rounded-[8px] bg-accent px-4 text-sm font-medium text-accent-fg sm:inline-flex"
          >
            {hireNav.label}
          </NavLink>
          <button
            type="button"
            className="inline-flex min-h-12 min-w-12 cursor-pointer items-center justify-center lg:hidden"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </Container>
      {mobileOpen ? (
        <div className="border-t border-line lg:hidden">
          <Container as="nav" className="flex flex-col py-3" aria-label="Mobile">
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
          </Container>
        </div>
      ) : null}
      <CommandPalette open={palette.open} onClose={() => palette.setOpen(false)} />
    </header>
  )
}
