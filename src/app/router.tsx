import { lazy, Suspense, type ReactNode } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/components/layout/RootLayout'

const HomePage = lazy(() => import('@/pages/HomePage').then((m) => ({ default: m.HomePage })))
const AboutPage = lazy(() => import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage })))
const ExperiencePage = lazy(() =>
  import('@/pages/ExperiencePage').then((m) => ({ default: m.ExperiencePage })),
)
const SkillsPage = lazy(() => import('@/pages/SkillsPage').then((m) => ({ default: m.SkillsPage })))
const ProjectsPage = lazy(() =>
  import('@/pages/ProjectsPage').then((m) => ({ default: m.ProjectsPage })),
)
const ProjectDetailPage = lazy(() =>
  import('@/pages/ProjectDetailPage').then((m) => ({ default: m.ProjectDetailPage })),
)
const ServicesPage = lazy(() =>
  import('@/pages/ServicesPage').then((m) => ({ default: m.ServicesPage })),
)
const ServiceDetailPage = lazy(() =>
  import('@/pages/ServiceDetailPage').then((m) => ({ default: m.ServiceDetailPage })),
)
const AutomationPage = lazy(() =>
  import('@/pages/AutomationPage').then((m) => ({ default: m.AutomationPage })),
)
const CaseStudiesPage = lazy(() =>
  import('@/pages/CaseStudiesPage').then((m) => ({ default: m.CaseStudiesPage })),
)
const CaseStudyDetailPage = lazy(() =>
  import('@/pages/CaseStudyDetailPage').then((m) => ({ default: m.CaseStudyDetailPage })),
)
const UpworkPage = lazy(() => import('@/pages/UpworkPage').then((m) => ({ default: m.UpworkPage })))
const ContactPage = lazy(() =>
  import('@/pages/ContactPage').then((m) => ({ default: m.ContactPage })),
)
const LabPage = lazy(() => import('@/pages/LabPage').then((m) => ({ default: m.LabPage })))
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
)

function Fallback() {
  return (
    <div className="px-5 py-24 text-sm text-muted" role="status">
      Loading…
    </div>
  )
}

function wrap(element: ReactNode) {
  return <Suspense fallback={<Fallback />}>{element}</Suspense>
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: wrap(<HomePage />) },
      { path: 'about', element: wrap(<AboutPage />) },
      { path: 'experience', element: wrap(<ExperiencePage />) },
      { path: 'skills', element: wrap(<SkillsPage />) },
      { path: 'projects', element: wrap(<ProjectsPage />) },
      { path: 'projects/:slug', element: wrap(<ProjectDetailPage />) },
      { path: 'services', element: wrap(<ServicesPage />) },
      { path: 'services/:slug', element: wrap(<ServiceDetailPage />) },
      { path: 'automation', element: wrap(<AutomationPage />) },
      { path: 'case-studies', element: wrap(<CaseStudiesPage />) },
      { path: 'case-studies/:slug', element: wrap(<CaseStudyDetailPage />) },
      { path: 'upwork', element: wrap(<UpworkPage />) },
      { path: 'contact', element: wrap(<ContactPage />) },
      { path: 'lab', element: wrap(<LabPage />) },
      { path: '*', element: wrap(<NotFoundPage />) },
    ],
  },
])
