import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { SiteHeader } from '@/components/navigation/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { Seo } from '@/components/seo/Seo'
import { CustomCursor } from '@/components/animations/CustomCursor'
import { useReducedMotion } from '@/hooks/useMedia'

export function RootLayout() {
  const location = useLocation()
  const reduced = useReducedMotion()

  return (
    <div className="flex min-h-dvh flex-col bg-bg text-fg">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
      >
        Skip to content
      </a>
      <Seo />
      <CustomCursor />
      <SiteHeader />
      <main id="content" className="relative flex-1">
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
      <ScrollRestoration />
    </div>
  )
}
