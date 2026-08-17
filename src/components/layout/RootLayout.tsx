import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { SiteHeader } from '@/components/navigation/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { HireDock } from '@/components/layout/HireDock'
import { AtmosphereOrbs } from '@/components/layout/AtmosphereOrbs'
import { Seo } from '@/components/seo/Seo'
import { useReducedMotion } from '@/hooks/useMedia'

export function RootLayout() {
  const location = useLocation()
  const reduced = useReducedMotion()

  return (
    <div className="atmosphere flex min-h-dvh flex-col text-fg">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Seo />
      <AtmosphereOrbs />
      <SiteHeader />
      <main id="content" className="relative flex-1 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <SiteFooter />
      <HireDock />
      <ScrollRestoration />
    </div>
  )
}
