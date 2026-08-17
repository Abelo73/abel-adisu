import { Link } from 'react-router-dom'
import { caseStudies, caseStudyProject } from '@/content/caseStudies'
import { Container, PageIntro } from '@/components/ui/Container'
import { GlassCard } from '@/components/ui/Reveal'
import { ProjectCover } from '@/components/work/ProjectCover'

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
              <GlassCard className="overflow-hidden p-0">
                <ProjectCover
                  src={project.image}
                  alt={`${project.title} overview`}
                  kind={project.coverKind}
                  className="rounded-none border-0 shadow-none"
                />
                <div className="p-6">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    <Link to={`/case-studies/${study.slug}`} className="hover:underline">
                      {project.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-muted">{study.thesis}</p>
                </div>
              </GlassCard>
            </li>
          )
        })}
      </ul>
    </Container>
  )
}
