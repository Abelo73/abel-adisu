import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { absoluteUrl, defaultSeo, jsonLdGraph, ogImagePath, seoByPath } from '@/content/seo'
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

    const url = absoluteUrl(path)
    const image = absoluteUrl(ogImagePath)

    document.title = title
    upsertMeta('name', 'description', description)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:image', image)
    upsertMeta('property', 'og:image:width', '1200')
    upsertMeta('property', 'og:image:height', '630')
    upsertMeta('property', 'og:locale', 'en_US')
    upsertMeta('property', 'og:site_name', 'Abel Adisu')
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', image)

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)

    let jsonLd = document.getElementById('jsonld-graph')
    if (!jsonLd) {
      jsonLd = document.createElement('script')
      jsonLd.id = 'jsonld-graph'
      jsonLd.setAttribute('type', 'application/ld+json')
      document.head.appendChild(jsonLd)
    }
    jsonLd.textContent = JSON.stringify(jsonLdGraph())
  }, [pathname])

  return null
}
