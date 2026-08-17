import { Star } from 'lucide-react'
import { profile } from '@/content/profile'
import { upworkProof } from '@/content/upwork'
import { UpworkJobs } from '@/components/hero/UpworkHeroCard'
import { Button } from '@/components/ui/Button'
import { Container, PageIntro } from '@/components/ui/Container'
import { isConfiguredUrl } from '@/lib/links'

export function UpworkPage() {
  return (
    <Container as="article" className="pb-20">
      <PageIntro
        eyebrow="Freelance"
        title="What clients said. What I actually shipped."
        lede={`${upworkProof.badge}. ${upworkProof.jobSuccess} Job Success. Two written 5.0 reviews and three completed Spring Boot jobs from the public Upwork profile.`}
      />
      <div className="glass mb-12 flex flex-col gap-5 rounded-[28px] p-6 sm:flex-row sm:items-center">
        <img src={profile.photo} alt={profile.name} className="size-16 rounded-full object-cover ring-2 ring-[#F5C14A]/60" />
        <div className="flex-1">
          <p className="flex gap-1" aria-label="Five stars on Upwork">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} size={16} className="fill-[#F5C14A] text-[#F5C14A]" aria-hidden="true" />
            ))}
          </p>
          <p className="mt-2 text-sm text-muted">{upworkProof.promise}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {upworkProof.endorsements.map((item) => (
              <li key={item.label} className="rounded-full border border-line px-3 py-1 text-xs">
                {item.label} ({item.count})
              </li>
            ))}
          </ul>
        </div>
        {isConfiguredUrl(profile.social.upwork) ? (
          <Button href={profile.social.upwork}>Upwork profile</Button>
        ) : null}
      </div>

      <h2 className="text-3xl font-semibold tracking-tight">Completed jobs</h2>
      <p className="mt-3 max-w-2xl text-muted">
        What I shipped on each contract, then the client’s words when they wrote them.
      </p>
      <div className="mt-8">
        <UpworkJobs />
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        <Button to="/contact">Discuss a project</Button>
        {isConfiguredUrl(profile.social.upwork) ? (
          <Button href={profile.social.upwork} variant="secondary">
            Read them on Upwork
          </Button>
        ) : null}
      </div>
    </Container>
  )
}
