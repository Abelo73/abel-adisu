import { Link } from 'react-router-dom'
import { caseStudies, caseStudyProject } from '@/content/caseStudies'
import { Container, PageIntro } from '@/components/ui/Container'

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
            <li key={study.slug} className="rounded-[12px] border border-line p-6">
              <h2 className="font-display text-2xl">
                <Link to={`/case-studies/${study.slug}`} className="hover:underline">
                  {project.title}
                </Link>
              </h2>
              <p className="mt-3 text-muted">{study.thesis}</p>
            </li>
          )
        })}
      </ul>
    </Container>
  )
}
