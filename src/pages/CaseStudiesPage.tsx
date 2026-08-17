import { Link } from 'react-router-dom'
import { caseStudies, caseStudyProject } from '@/content/caseStudies'
import { Container, PageIntro } from '@/components/ui/Container'
import { GlassCard } from '@/components/ui/Reveal'

export function CaseStudiesPage() {
  return (
    <Container as="article" className="pb-20">
      <PageIntro
        eyebrow="Case studies"
        title="Problem → architecture → implementation → lesson."
        lede="Longer readings of the engineering studies. No invented revenue, traffic, or client names."
      />
      <ul className="space-y-4">
        {caseStudies.map((study) => {
          const project = caseStudyProject(study)
          if (!project) return null
          return (
            <li key={study.slug}>
              <GlassCard className="p-6">
                <h2 className="text-2xl font-semibold tracking-tight">
                  <Link to={`/case-studies/${study.slug}`} className="hover:underline">
                    {project.title}
                  </Link>
                </h2>
                <p className="mt-3 text-muted">{study.thesis}</p>
              </GlassCard>
            </li>
          )
        })}
      </ul>
    </Container>
  )
}
