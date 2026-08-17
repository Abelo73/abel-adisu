import { getProject, type Project } from '@/content/projects'

export type CaseStudy = {
  slug: string
  projectSlug: string
  thesis: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'revenue-risk',
    projectSlug: 'itas-risk-studio',
    thesis: 'A tax risk engine is a queue with a score. The table is the product.',
  },
  {
    slug: 'hospital-ops',
    projectSlug: 'medicare',
    thesis: 'Hospital software earns trust when occupancy and queues stay honest.',
  },
  {
    slug: 'justice-file',
    projectSlug: 'ijcms',
    thesis: 'Justice work is a file, a stage, and a document set — one aggregate, not a CRM.',
  },
  {
    slug: 'arts-admin',
    projectSlug: 'art-information-center',
    thesis: 'Stripe is the ledger. The admin is how staff actually run the community.',
  },
  {
    slug: 'workforce-ops',
    projectSlug: 'workforce',
    thesis: 'Workforce software is a queue of blocked people. The dashboard has to show that, not hide it.',
  },
]

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug)
}

export function caseStudyProject(study: CaseStudy): Project | undefined {
  return getProject(study.projectSlug)
}
