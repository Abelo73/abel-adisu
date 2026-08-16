import { SITE_URL } from '@/content/profile'

export type SeoConfig = {
  title: string
  description: string
  path: string
}

export const defaultSeo: SeoConfig = {
  title: 'Abel Adisu — Full-Stack Software Engineer | Java, Spring Boot, React & AI Automation',
  description:
    'Abel Adisu builds production-grade backend systems, modern web applications, cloud infrastructure, and AI-powered automation with n8n.',
  path: '/',
}

export const seoByPath: Record<string, SeoConfig> = {
  '/': defaultSeo,
  '/about': {
    title: 'About — Abel Adisu',
    description: 'Engineering philosophy, what Abel builds, and how he approaches production software.',
    path: '/about',
  },
  '/experience': {
    title: 'Experience — Abel Adisu',
    description: 'Professional timeline: software development through full-stack, platform, and automation work.',
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

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString()
}

export function jsonLdPerson() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Abel Adisu',
    jobTitle: 'Full-Stack Software Engineer',
    url: SITE_URL,
    knowsAbout: ['Java', 'Spring Boot', 'React', 'TypeScript', 'Kubernetes', 'n8n', 'AI automation'],
  }
}
