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
      'Full-stack engineer on long-running enterprise systems — from React/shadcn and Camunda through Java microservices, then Docker, Kubernetes, Rancher, and Nginx into production.',
    responsibilities: [
      'Build role-based dashboards and UI in React, Vite, shadcn/ui, and Ant Design, including state management for operational consoles.',
      'Model business processes in Camunda and wire them to Java Spring Boot microservices.',
      'Own identity, events, and objects: Keycloak, Kafka, MinIO, PostgreSQL.',
      'Package with Docker, run on Kubernetes, operate the cluster in Rancher, and put Nginx in front — development through production.',
      'Work with the team from architecture discussion through deployment, with maintainable code as the bar.',
    ],
    technologies: [
      'Java',
      'Spring Boot',
      'React',
      'Vite',
      'shadcn/ui',
      'Camunda',
      'Keycloak',
      'Kafka',
      'MinIO',
      'PostgreSQL',
      'Docker',
      'Kubernetes',
      'Rancher',
      'Nginx',
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
      'Independent backend and full-stack work for paying clients: secure APIs, JWT, Keycloak, Kafka, and React on Supabase. Top Rated. 100% Job Success.',
    responsibilities: [
      'Fixed a critical memory issue, PostgreSQL migration problems, and backend stability on a Java Spring Boot production service.',
      'Integrated WhatsApp via Meta APIs, secured PHP/Laravel API traffic, and added bot-attack protection.',
      'Optimized an existing Spring Boot microservice and delivered a Spring Boot API integration on time.',
      'Shipped React product work on Supabase — Postgres, Auth, Storage — including payments-backed admin consoles.',
    ],
    technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'Supabase', 'React', 'Meta APIs', 'REST APIs'],
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
