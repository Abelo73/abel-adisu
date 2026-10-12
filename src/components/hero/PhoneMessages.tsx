import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { BatteryFull, Camera, Flashlight, Lock, MessageCircle, Signal, Wifi } from 'lucide-react'
import { profile } from '@/content/profile'
import { useReducedMotion } from '@/hooks/useMedia'

const messages = [
  `Hi, I’m ${profile.shortName} — ${profile.role} at ${profile.employer}, ${profile.locationLabel}.`,
  'I build Java + Spring Boot backends and the screens on top. Right now: a payment gateway in fintech.',
  'Top Rated on Upwork, 100% Job Success. Got something to build?',
]

const date = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date())

/** iPhone lock screen: notifications arrive one by one, hold, then the loop restarts. */
export function PhoneMessages() {
  const reduced = useReducedMotion()
  const [shown, setShown] = useState(reduced ? messages.length : 0)

  useEffect(() => {
    if (reduced) return
    let cancelled = false
    const timers: number[] = []
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(window.setTimeout(resolve, ms))
      })

    async function run() {
      while (!cancelled) {
        setShown(0)
        await wait(1200)
        for (let i = 1; i <= messages.length; i += 1) {
          if (cancelled) return
          setShown(i)
          await wait(1700)
        }
        await wait(4200)
      }
    }
    void run()
    return () => {
      cancelled = true
      timers.forEach(window.clearTimeout)
    }
  }, [reduced])

  return (
    <div className="relative mx-auto w-[17.5rem] sm:w-[19rem]" role="img" aria-label="iPhone lock screen with three messages from Abel">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 size-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1368e8]/25 blur-3xl phone-glow"
        aria-hidden="true"
      />
      <div style={{ perspective: 1400 }}>
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 140, rotateX: 28, rotateY: -32, scale: 0.82 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 70, damping: 16, mass: 1.1, delay: 0.15 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.div
            animate={reduced ? undefined : { rotateY: [-7, 7, -7], rotateX: [3, -2, 3], y: [0, -8, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
            style={{ transformStyle: 'preserve-3d' }}
            className="relative"
          >
      {/* side buttons: action + volume on the left, power on the right */}
      <span className="absolute -left-[3px] top-[6.2rem] h-7 w-[3px] rounded-l-sm bg-[#3a4a73]" aria-hidden="true" />
      <span className="absolute -left-[3px] top-[9rem] h-12 w-[3px] rounded-l-sm bg-[#3a4a73]" aria-hidden="true" />
      <span className="absolute -left-[3px] top-[12.4rem] h-12 w-[3px] rounded-l-sm bg-[#3a4a73]" aria-hidden="true" />
      <span className="absolute -right-[3px] top-[10rem] h-20 w-[3px] rounded-r-sm bg-[#3a4a73]" aria-hidden="true" />
      <div className="rounded-[3rem] border border-[#3a4a73] bg-[#0a1226] p-[7px] shadow-[var(--shadow-lift)]">
        <div className="relative flex h-[clamp(27rem,calc(100dvh-15rem),34rem)] flex-col overflow-hidden rounded-[2.6rem] bg-gradient-to-b from-[#0a2a8a] via-[#001a66] to-[#001645] text-white">
          {/* wallpaper glow */}
          <div
            className="wall-orb pointer-events-none absolute -top-16 left-1/2 size-72 -translate-x-1/2 rounded-full bg-[#36b7ff]/30 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="wall-orb pointer-events-none absolute -bottom-20 -left-10 size-64 rounded-full bg-[#1368e8]/40 blur-3xl [animation-delay:-6s] [animation-direction:reverse]"
            aria-hidden="true"
          />

          <div className="phone-glare pointer-events-none absolute inset-y-0 -left-1/2 z-20 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent" aria-hidden="true" />

          {/* dynamic island */}
          <div className="absolute left-1/2 top-2.5 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />

          {/* status bar */}
          <div className="relative flex items-center justify-between px-7 pt-3.5 text-[0.7rem] font-semibold">
            <span className="w-12">9:41</span>
            <span className="flex w-12 items-center justify-end gap-1">
              <Signal size={12} strokeWidth={2.5} aria-hidden="true" />
              <Wifi size={12} strokeWidth={2.5} aria-hidden="true" />
              <BatteryFull size={15} strokeWidth={2} aria-hidden="true" />
            </span>
          </div>

          {/* lock + clock */}
          <div className="relative mt-5 flex flex-col items-center">
            <Lock size={14} aria-hidden="true" className="opacity-80" />
            <p className="mt-1 text-xs font-medium text-white/80">{date}</p>
            <p className="font-display text-[3.6rem] font-semibold leading-none tracking-tight">9:41</p>
          </div>

          {/* notifications */}
          <div className="relative mt-5 flex flex-1 flex-col gap-2 px-3">
            <AnimatePresence initial={false}>
              {messages.slice(0, shown).map((text) => (
                <motion.div
                  key={text}
                  layout={!reduced}
                  initial={reduced ? false : { opacity: 0, y: 36, scale: 0.88 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  className="flex gap-2.5 rounded-[1.25rem] bg-white/20 p-3 backdrop-blur-xl"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-[0.6rem] bg-[#34c759]">
                    <MessageCircle size={20} fill="white" strokeWidth={0} aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="truncate text-[0.8rem] font-semibold">{profile.name}</p>
                      <p className="shrink-0 text-[0.65rem] text-white/60">now</p>
                    </div>
                    <p className="mt-0.5 text-[0.75rem] leading-snug text-white/90">{text}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* bottom controls */}
          <div className="relative flex items-center justify-between px-7 pb-3 pt-2">
            <span className="grid size-10 place-items-center rounded-full bg-black/35 backdrop-blur">
              <Flashlight size={17} aria-hidden="true" />
            </span>
            <span className="grid size-10 place-items-center rounded-full bg-black/35 backdrop-blur">
              <Camera size={17} aria-hidden="true" />
            </span>
          </div>
          <div className="relative mx-auto mb-2 h-1 w-28 rounded-full bg-white/80" />
        </div>
      </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
