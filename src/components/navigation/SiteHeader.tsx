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
    <header className="sticky top-0 z-40">
      <Container className="pt-4">
        <div className="glass flex h-14 items-center justify-between gap-4 rounded-full px-3 sm:px-5">
          <Link to="/" className="pl-2 text-sm font-semibold tracking-tight">
            {profile.shortName}
          </Link>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {primaryNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'min-h-10 rounded-full px-3 text-sm text-muted hover:text-fg',
                    isActive && 'bg-fg/5 text-fg',
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
              className="hidden min-h-10 cursor-pointer items-center gap-2 rounded-full border border-line px-3 text-xs text-muted md:inline-flex"
              aria-label="Open command palette"
            >
              Search
              <kbd className="font-mono text-[0.65rem]">⌘K</kbd>
            </button>
            <ThemeToggle />
            <NavLink
              to={hireNav.to}
              className="hidden min-h-10 items-center rounded-full bg-accent px-4 text-sm font-medium text-white sm:inline-flex"
            >
              {hireNav.label}
            </NavLink>
            <button
              type="button"
              className="inline-flex min-h-10 min-w-10 cursor-pointer items-center justify-center rounded-full lg:hidden"
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
        <Container className="pt-3 lg:hidden">
          <nav className="glass flex flex-col rounded-[24px] px-4 py-3" aria-label="Mobile">
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
