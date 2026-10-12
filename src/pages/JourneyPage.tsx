import { Link } from 'react-router-dom'
import { journeyClose, journeyOpening } from '@/content/journey'
import { JourneyWalk } from '@/components/journey/JourneyWalk'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

export function JourneyPage() {
  return (
    <article className="pb-24">
      <Container>
        <header className="max-w-3xl pt-10 pb-12 sm:pt-16">
          <p className="text-xs uppercase tracking-[0.22em] text-muted">{journeyOpening.eyebrow}</p>
          <h1 className="mt-4 font-display text-[clamp(2.4rem,6vw,4.6rem)] leading-[1.02] font-medium">
            {journeyOpening.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">{journeyOpening.lede}</p>
          <p className="mt-4 text-sm text-muted">
            Watch the thought move. Each stop is a moment I had to understand — and a note for you if you are there now.
          </p>
        </header>

        <JourneyWalk />

        <section className="mt-24 max-w-2xl border-t border-line pt-12">
          <h2 className="font-display text-3xl leading-tight md:text-4xl">{journeyClose.title}</h2>
          <p className="mt-4 text-lg text-muted">{journeyClose.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/contact">Work with me</Button>
            <Button to="/about" variant="secondary">
              About
            </Button>
            <Link to="/experience" className="inline-flex min-h-12 items-center text-sm underline-offset-4 hover:underline">
              Experience
            </Link>
          </div>
        </section>
      </Container>
    </article>
  )
}
