import { Download, Github, Linkedin, Mail, Phone } from 'lucide-react'
import { profile } from '@/content/profile'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'

const channels = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  { label: 'Phone', value: profile.phoneLabel, href: `tel:${profile.phone}`, icon: Phone },
  { label: 'LinkedIn', value: 'abeladisunugatu', href: profile.social.linkedin, icon: Linkedin },
  { label: 'GitHub', value: 'Abelo73', href: profile.social.github, icon: Github },
]

export function HireBoard() {
  return (
    <section className="relative flex min-h-[calc(100dvh-4.0625rem)] items-center overflow-hidden py-20">
      <div
        className="pointer-events-none absolute left-1/2 top-0 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1368e8]/35 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage: 'radial-gradient(rgb(255 255 255 / 0.12) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 55%, #000 20%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      <Container className="relative w-full">
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <span className="relative">
              <img
                src={profile.photo}
                alt={profile.name}
                width={160}
                height={160}
                loading="lazy"
                decoding="async"
                className="size-24 rounded-full border-2 border-line object-cover object-top sm:size-28"
              />
              <span className="live-dot absolute bottom-1 right-1 size-4 rounded-full border-2 border-bg bg-[#34d399]" aria-hidden="true" />
            </span>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border glass px-3.5 py-1.5 text-xs font-semibold text-muted">
              Open to select full-stack, backend and frontend work
            </p>
            <h2 className="mt-6 font-display text-[clamp(2.4rem,7vw,5.5rem)] leading-[1.02]">
              Have a system you want to <span className="story-gradient">build?</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg text-muted">
              {profile.current.role} at {profile.current.org}. Tell me what it has to do — I’ll reply with a plan.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button to="/contact">
                Start a conversation
              </Button>
              <Button
                href={profile.cv}
                variant="secondary"
              >
                <Download size={16} aria-hidden="true" />
                Download CV
              </Button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mx-auto mt-14 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map(({ label, value, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group flex h-full items-center gap-3 rounded-[12px] glass p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#36b7ff]/50"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#1368e8]/25 text-steel transition-colors group-hover:bg-[#1368e8] group-hover:text-white">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-muted">{label}</span>
                    <span className="block truncate text-sm font-semibold">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}
