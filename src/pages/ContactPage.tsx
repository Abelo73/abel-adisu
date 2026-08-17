import { profile } from '@/content/profile'
import { ContactFacts } from '@/components/contact/ContactFacts'
import { ContactForm } from '@/components/contact/ContactForm'
import { ContactPortrait } from '@/components/contact/ContactPortrait'
import { Container } from '@/components/ui/Container'

export function ContactPage() {
  return (
    <article className="pb-24">
      <Container>
        <header className="grid items-end gap-8 pt-10 pb-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:pt-16">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-muted">Contact</p>
            <h1 className="mt-4 font-display text-[clamp(3.4rem,10vw,7.5rem)] italic leading-[0.88] font-medium tracking-tight">
              <span className="block">Get</span>
              <span className="block text-muted">in touch</span>
            </h1>
          </div>
          <p className="max-w-md pb-2 text-lg leading-relaxed text-muted">
            Have a system you want to build? Write enough context and I’ll reply. No ticket queue — just me.
          </p>
        </header>

        <section className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <ContactPortrait />
          <div>
            <ContactFacts />
            <p className="mt-6 text-sm text-muted">{profile.availability}</p>
          </div>
        </section>
      </Container>

      <Container className="mt-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Write</p>
            <h2 className="mt-3 font-display text-4xl italic leading-tight md:text-5xl">Tell me about the work</h2>
            <p className="mt-4 max-w-md text-muted">
              Name, email, and enough of the problem that I can answer as a person — not a form bot.
            </p>
          </div>
          <ContactForm />
        </div>
      </Container>
    </article>
  )
}
