import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { absoluteUrl, defaultSeo, jsonLdPerson, seoByPath } from '@/content/seo'
import { profile } from '@/content/profile'
import { getProject } from '@/content/projects'
import { getService } from '@/content/services'
import { getCaseStudy, caseStudyProject } from '@/content/caseStudies'

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const projectMatch = pathname.match(/^\/projects\/([^/]+)$/)
    const serviceMatch = pathname.match(/^\/services\/([^/]+)$/)
    const caseMatch = pathname.match(/^\/case-studies\/([^/]+)$/)

    let title = defaultSeo.title
    let description = defaultSeo.description
    let path = pathname

    if (projectMatch) {
      const project = getProject(projectMatch[1])
      if (project) {
        title = `${project.title} — Abel Adisu`
        description = project.summary
      }
    } else if (serviceMatch) {
      const service = getService(serviceMatch[1])
      if (service) {
        title = `${service.title} — Abel Adisu`
        description = service.summary
      }
    } else if (caseMatch) {
      const study = getCaseStudy(caseMatch[1])
      const project = study ? caseStudyProject(study) : undefined
      if (study && project) {
        title = `Case study: ${project.title} — Abel Adisu`
        description = study.thesis
      }
    } else {
      const exact = seoByPath[pathname]
      if (exact) {
        title = exact.title
        description = exact.description
        path = exact.path
      }
    }

    document.title = title
    upsertMeta('name', 'description', description)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:url', absoluteUrl(path))
    upsertMeta('property', 'og:image', absoluteUrl(profile.photo))
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', absoluteUrl(path))

    let jsonLd = document.getElementById('jsonld-person')
    if (!jsonLd) {
      jsonLd = document.createElement('script')
      jsonLd.id = 'jsonld-person'
      jsonLd.setAttribute('type', 'application/ld+json')
      document.head.appendChild(jsonLd)
    }
    jsonLd.textContent = JSON.stringify(jsonLdPerson())
  }, [pathname])

  return null
}
