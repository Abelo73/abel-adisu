export type ExperienceItem = {
  id: string
  role: string
  org: string
  period: string
  summary: string
  responsibilities: string[]
  technologies: string[]
}

export const experience: ExperienceItem[] = [
  {
    id: 'ministry-of-revenue',
    role: 'Software Engineer',
    org: 'Ministry of Revenue',
    period: 'Present',
    summary:
      'Production Java systems in a revenue context: risk, data, and the operational software tax authorities actually run.',
    responsibilities: [
      'Build and maintain backend services in Java and Spring Boot.',
      'Work on tax-risk and revenue workflows where correctness matters more than novelty.',
      'Support migrations and integrations, including MySQL to PostgreSQL paths when the data layer has to move.',
    ],
    technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'MySQL', 'REST APIs'],
  },
  {
    id: 'upwork-freelance',
    role: 'Full-Stack Developer',
    org: 'Upwork — independent',
    period: 'Ongoing',
    summary:
      'Select freelance work: new enterprise systems, and rescue jobs — bugs, integrations, and unfinished features. Top Rated. 100% Job Success.',
    responsibilities: [
      'Deliver React, Angular, and Spring Boot applications for paying clients.',
      'Optimize existing Spring Boot services and close integration gaps.',
      'Own the path from requirement to a running admin console, API, or workflow.',
    ],
    technologies: ['Java', 'Spring Boot', 'React', 'Angular', 'Supabase', 'Stripe', 'PostgreSQL'],
  },
]
