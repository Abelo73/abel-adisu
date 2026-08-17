import { User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { upworkProof, upworkTestimonials, type UpworkJob } from '@/content/upwork'
import { Stars } from '@/components/ui/Stars'
import { useReducedMotion } from '@/hooks/useMedia'
import { cn } from '@/lib/cn'

function excerpt(text: string) {
  const cut = text.split(/(?<=\.)\s/).slice(0, 2).join(' ')
  return cut.length < text.length ? `${cut}…` : cut
}

function SpeechBubble({
  job,
  side,
  delay,
}: {
  job: UpworkJob
  side: 'left' | 'right'
  delay: string
}) {
  return (
    <article
      className={cn('float-card max-w-md', side === 'right' && 'lg:ml-auto')}
      style={{ animationDelay: delay }}
    >
      <div className={cn('flex items-start gap-3', side === 'right' && 'lg:flex-row-reverse')}>
        <div className="flex w-16 shrink-0 flex-col items-center gap-2">
          <span className="grid size-12 place-items-center rounded-full bg-white/10 ring-1 ring-white/20">
            <User size={20} aria-hidden="true" />
          </span>
          <p className="text-center text-[0.7rem] leading-tight text-fg">Upwork client</p>
        </div>
        <div className="speech-bubble">
          <Stars size={14} />
          <blockquote className="mt-2 text-sm leading-relaxed">“{excerpt(job.quote ?? '')}”</blockquote>
        </div>
      </div>
    </article>
  )
}

function FloatChip({ label, delay, className }: { label: string; delay: string; className?: string }) {
  return (
    <p
      className={cn('float-card speech-bubble w-fit px-4 py-2 text-sm', className)}
      style={{ animationDelay: delay }}
    >
      {label}
    </p>
  )
}

export function ClientStories() {
  const reduced = useReducedMotion()
  const [first, second] = upworkTestimonials
  const motionClass = reduced ? '' : 'float-enabled'

  return (
    <section className={cn('relative overflow-hidden py-24', motionClass)}>
      <div className="pointer-events-none absolute left-[12%] top-[20%] size-72 rounded-full bg-[#7B61FF]/20 blur-[90px]" />
      <div className="pointer-events-none absolute right-[10%] bottom-[10%] size-64 rounded-full bg-[#5eead4]/10 blur-[90px]" />

      <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">User stories</h2>
          <Link to="/upwork" className="hidden text-sm text-muted underline-offset-4 hover:underline sm:inline">
            Full reviews
          </Link>
        </div>
      </div>

      <div className="relative mx-auto mt-6 grid min-h-[36rem] w-full max-w-[1180px] items-center gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,auto)_minmax(0,1fr)]">
        <div className="space-y-12">
          {first ? <SpeechBubble job={first} side="left" delay="0s" /> : null}
          <FloatChip label={`${upworkProof.jobSuccess} Job Success`} delay="1.1s" className="lg:ml-10" />
          <FloatChip label={upworkProof.endorsements[0].label} delay="2s" className="lg:ml-2" />
        </div>

        <div className="relative z-10 text-center">
          <p className="story-gradient text-[clamp(1.6rem,3.4vw,3rem)] font-semibold uppercase leading-[1.15] tracking-tight">
            What this practice
            <br />
            must support
          </p>
        </div>

        <div className="space-y-12">
          <FloatChip label={upworkProof.badge} delay="0.6s" className="lg:ml-auto" />
          {second ? <SpeechBubble job={second} side="right" delay="1.4s" /> : null}
          <FloatChip label={upworkProof.endorsements[1].label} delay="2.4s" className="lg:ml-auto lg:mr-6" />
        </div>
      </div>
    </section>
  )
}
