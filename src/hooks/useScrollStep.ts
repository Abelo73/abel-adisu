import { useCallback, useRef, useState } from 'react'
import { useMotionValueEvent, useScroll } from 'motion/react'

/** Scroll-driven scenes: a tall wrapper holds a sticky stage; scroll position picks the active step. */
export function useScrollStep(count: number) {
  const ref = useRef<HTMLElement>(null)
  const [step, setStep] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setStep(Math.min(count - 1, Math.max(0, Math.floor(value * count))))
  })

  const goTo = useCallback(
    (index: number) => {
      const el = ref.current
      if (!el) return
      const range = el.offsetHeight - window.innerHeight
      const top = el.getBoundingClientRect().top + window.scrollY + range * ((index + 0.5) / count)
      window.scrollTo({ top, behavior: 'smooth' })
    },
    [count],
  )

  return { ref, step, goTo, progress: scrollYProgress }
}

/** Wrapper height: enough scroll distance for every step. */
export const sceneHeight = (count: number) => `${count * 55 + 45}vh`
export const STAGE = 'sticky top-[4.0625rem] flex h-[calc(100dvh-4.0625rem)] items-center'
