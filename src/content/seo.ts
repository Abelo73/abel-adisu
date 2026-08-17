import { profile, SITE_URL } from '@/content/profile'

export type SeoConfig = {
  title: string
  description: string
  path: string
}

export const defaultSeo: SeoConfig = {
  title: 'Abel Adisu — Software Engineer at Atlas Computer Technology',
  description:
    'Currently Software Engineer at Atlas Computer Technology in Addis Ababa. Java, Spring Boot, React, Keycloak, Kafka — production systems, plus select Upwork work.',
  path: '/',
}

export const seoByPath: Record<string, SeoConfig> = {
  '/': defaultSeo,
  '/about': {
    title: 'About — Abel Adisu',
    description: 'From database to UI: Atlas Computer Technology, Upwork, and the systems Abel actually ships.',
    path: '/about',
  },
  '/experience': {
    title: 'Experience — Abel Adisu',
    description: 'Currently Software Engineer at Atlas Computer Technology. QA first, then the engineer seat — plus independent Upwork work.',
    path: '/experience',
  },
  '/skills': {
    title: 'Skills — Abel Adisu',
    description: 'Java, Spring Boot, React, TypeScript, Kubernetes, observability, n8n, and related systems — organized by specialization, not fake percentages.',
    path: '/skills',
  },
  '/projects': {
    title: 'Projects — Abel Adisu',
    description: 'Engineering studies across backend, full-stack, AI automation, and delivery architecture.',
    path: '/projects',
  },
  '/services': {
    title: 'Services — Abel Adisu',
    description: 'Software engineering, backend, full-stack, AI automation, n8n, and DevOps services.',
    path: '/services',
  },
  '/automation': {
    title: 'AI Automation — Abel Adisu',
    description: 'n8n, LLM workflows, and API orchestration designed as operable systems.',
    path: '/automation',
  },
  '/case-studies': {
    title: 'Case studies — Abel Adisu',
    description: 'Problem, architecture, implementation, and lessons from engineering studies.',
    path: '/case-studies',
  },
  '/upwork': {
    title: 'Upwork — Abel Adisu',
    description: 'Hire Abel for Java/Spring backends, React full-stack work, n8n automation, and DevOps.',
    path: '/upwork',
  },
  '/contact': {
    title: 'Contact — Abel Adisu',
    description: 'Discuss a backend, a full-stack product, or an automation system.',
    path: '/contact',
  },
  '/lab': {
    title: 'Lab — Abel Adisu',
    description: 'Experiments in agents, n8n, distributed systems, and developer tooling.',
    path: '/lab',
  },
}

export const ogImagePath = '/og.jpg'

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString()
}

export function jsonLdPerson() {
  return {
    '@type': 'Person',
    '@id': `${SITE_URL}#person`,
    name: profile.name,
    jobTitle: profile.current.role,
    email: profile.email,
    url: SITE_URL,
    worksFor: {
      '@type': 'Organization',
      name: profile.current.org,
    },
    image: absoluteUrl(profile.photo),
    telephone: profile.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Addis Ababa',
      addressCountry: 'ET',
    },
    sameAs: [profile.social.github, profile.social.linkedin, profile.social.upwork],
    knowsAbout: ['Java', 'Spring Boot', 'Angular', 'React', 'TypeScript', 'Keycloak', 'Kafka', 'Supabase', 'n8n'],
  }
}

export function jsonLdGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      jsonLdPerson(),
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}#website`,
        name: profile.name,
        url: SITE_URL,
        description: defaultSeo.description,
        inLanguage: 'en',
        publisher: { '@id': `${SITE_URL}#person` },
      },
    ],
  }
}
