export type NavItem = {
  to: string
  label: string
  keywords?: string[]
}

export const primaryNav: NavItem[] = [
  { to: '/projects', label: 'Work', keywords: ['projects', 'case studies'] },
  { to: '/services', label: 'Services' },
  { to: '/automation', label: 'Automation', keywords: ['n8n', 'ai'] },
  { to: '/about', label: 'About' },
  { to: '/journey', label: 'Journey' },
  { to: '/story', label: 'My Story' },
  { to: '/experience', label: 'Experience' },
]

export const commandItems: NavItem[] = [
  { to: '/projects', label: 'Go to Projects', keywords: ['work', 'portfolio'] },
  { to: '/case-studies', label: 'Go to Case studies' },
  { to: '/services', label: 'Go to Services' },
  { to: '/automation', label: 'Go to Automation' },
  { to: '/about', label: 'Go to About' },
  { to: '/journey', label: 'Go to Journey', keywords: ['story', 'ece', 'wollega'] },
  { to: '/story', label: 'Go to My Story', keywords: ['origin', 'timeline'] },
  { to: '/experience', label: 'Go to Experience' },
  { to: '/skills', label: 'Go to Skills' },
  { to: '/upwork', label: 'Go to Upwork' },
  { to: '/lab', label: 'Go to Lab' },
  { to: '/contact', label: 'Contact Abel', keywords: ['hire', 'email'] },
]

export const hireNav: NavItem = { to: '/contact', label: 'Contact' }
