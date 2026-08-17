export type ExperienceItem = {
  id: string
  role: string
  org: string
  location: string
  workMode: string
  period: string
  summary: string
  responsibilities: string[]
  technologies: string[]
}

export const experience: ExperienceItem[] = [
  {
    id: 'atlas-software-engineer',
    role: 'Software Engineer',
    org: 'Atlas Computer Technology',
    location: 'Addis Ababa, Ethiopia',
    workMode: 'On-site',
    period: 'March 2024 – Present',
    summary:
      'Full-stack engineer on long-running enterprise systems — secure web applications from architecture through deployment.',
    responsibilities: [
      'Build role-based dashboards and UI in React, Vite, shadcn/ui, and Ant Design, including state management for operational consoles.',
      'Design and ship Java Spring Boot microservices and REST APIs.',
      'Own identity and data: PostgreSQL, Keycloak, OAuth2, and JWT.',
      'Build event-driven paths with Kafka.',
      'Work with the team from architecture discussion through deployment, with maintainable code as the bar.',
    ],
    technologies: [
      'Java',
      'Spring Boot',
      'React',
      'Vite',
      'shadcn/ui',
      'Ant Design',
      'PostgreSQL',
      'Keycloak',
      'OAuth2',
      'JWT',
      'Kafka',
    ],
  },
  {
    id: 'atlas-qa-engineer',
    role: 'QA Engineer',
    org: 'Atlas Computer Technology',
    location: 'Addis Ababa, Ethiopia',
    workMode: 'On-site',
    period: 'September 2023 – March 2024',
    summary:
      'Automated and manual testing to cut regression effort before moving into the software-engineer seat.',
    responsibilities: [
      'Wrote and maintained Selenium WebDriver scripts for web application testing.',
      'Integrated automated runs into regression cycles.',
      'Ran API automation and manual checks in Postman.',
      'Identified repeatable scenarios worth automating instead of re-testing by hand.',
    ],
    technologies: ['Selenium WebDriver', 'Postman', 'Linux', 'Quality Assurance'],
  },
  {
    id: 'upwork-freelance',
    role: 'Java Spring Boot Backend Engineer',
    org: 'Upwork',
    location: 'Remote',
    workMode: 'Freelance',
    period: 'September 2023 – Present',
    summary:
      'Independent backend and full-stack work for paying clients: secure APIs, JWT, Keycloak, Kafka. Top Rated. 100% Job Success.',
    responsibilities: [
      'Fixed a critical memory issue, PostgreSQL migration problems, and backend stability on a Java Spring Boot production service.',
      'Integrated WhatsApp via Meta APIs, secured PHP/Laravel API traffic, and added bot-attack protection.',
      'Optimized an existing Spring Boot microservice and delivered a Spring Boot API integration on time.',
    ],
    technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'Meta APIs', 'REST APIs'],
  },
]

export function experienceByOrg() {
  const groups: { org: string; location: string; roles: ExperienceItem[] }[] = []
  for (const item of experience) {
    const last = groups.at(-1)
    if (last && last.org === item.org) {
      last.roles.push(item)
    } else {
      groups.push({ org: item.org, location: item.location, roles: [item] })
    }
  }
  return groups
}
