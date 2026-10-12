import { profile } from '@/content/profile'
import { Button } from '@/components/ui/Button'

export function HireDock() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-center px-4 pb-[env(safe-area-inset-bottom)]">
      <div className="pointer-events-auto glass shadow-[var(--shadow-lift)] flex max-w-xl items-center gap-3 rounded-full px-3 py-2 pl-2">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#1368e8] to-[#36b7ff] font-display text-base text-white">
          A
        </span>
        <p className="hidden min-w-0 text-sm sm:block">At Atlas. Open to select work.</p>
        <Button to="/contact" className="min-h-10 px-4">
          Hire Abel
        </Button>
        <Button href={`mailto:${profile.email}`} variant="secondary" className="min-h-10 px-4">
          Email
        </Button>
        <Button href={profile.social.upwork} variant="secondary" className="hidden min-h-10 px-4 sm:inline-flex">
          Upwork
        </Button>
      </div>
    </div>
  )
}
