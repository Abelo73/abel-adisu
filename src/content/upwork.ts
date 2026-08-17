export const upworkProof = {
  title: 'Java Developer | Angular & React | Spring Boot Specialist | Full-Stack',
  jobSuccess: '100%',
  badge: 'Top Rated',
  jobs: 7,
  hours: 97,
  stars: 5,
  agency: 'FusionTech Labs',
  promise:
    'Clients come to me for one of two things: building an enterprise-grade system the right way from the start, or rescuing an existing codebase — fixing bugs, resolving integrations, and shipping features other developers left unfinished.',
  endorsements: [
    { label: 'Clear Communicator', count: 2 },
    { label: 'Solution Oriented', count: 2 },
    { label: 'Collaborative', count: 1 },
    { label: 'Committed to Quality', count: 1 },
    { label: 'Detail Oriented', count: 1 },
    { label: 'Professional', count: 1 },
    { label: 'Reliable', count: 1 },
  ],
} as const

export type UpworkJob = {
  slug: string
  title: string
  period: string
  rating: 5
  quote?: string
  endorsements: string[]
  done: string[]
}

export const upworkJobs: UpworkJob[] = [
  {
    slug: 'java-springboot-expert',
    title: 'Java Spring Boot expert',
    period: 'Jan 31, 2026 – Feb 28, 2026',
    rating: 5,
    quote:
      'Abel did a great job on our Java Spring Boot project. He fixed a critical memory issue, resolved PostgreSQL migration problems, and improved overall backend stability. He also worked on WhatsApp integration using Meta (Facebook) APIs, secured communication with our PHP/Laravel APIs, and added proper protection against bot attacks. Communication was smooth and he handled production issues confidently. I would be happy to work with him again.',
    endorsements: ['Collaborative', 'Solution Oriented', 'Clear Communicator'],
    done: [
      'Fixed a critical memory issue in a production Spring Boot service',
      'Resolved PostgreSQL migration problems after a MySQL move',
      'Improved backend stability under real traffic',
      'Integrated WhatsApp through Meta (Facebook) APIs',
      'Secured communication with existing PHP/Laravel APIs',
      'Added protection against bot attacks',
      'Handled live production issues with the client',
    ],
  },
  {
    slug: 'spring-boot-optimization',
    title: 'Java Spring Boot application optimization',
    period: 'Oct 17, 2025 – Oct 30, 2025',
    rating: 5,
    endorsements: [],
    done: [
      'Optimized a Spring Boot microservice against a written request',
      'Worked inside an existing service instead of a rewrite',
    ],
  },
  {
    slug: 'spring-boot-api-integration',
    title: 'Web app development with Spring Boot',
    period: 'Sep 22, 2025 – Oct 22, 2025',
    rating: 5,
    quote:
      'Abel did an excellent job with our API integration project. He quickly understood the requirements, set up a clean and efficient integration, and communicated clearly throughout the process. The work was delivered on time, and any technical questions I had were explained in a simple and professional way. I really appreciate his attention to detail and problem-solving skills. Highly recommended for any backend or API-related work!',
    endorsements: [
      'Committed to Quality',
      'Clear Communicator',
      'Reliable',
      'Professional',
      'Solution Oriented',
      'Detail Oriented',
    ],
    done: [
      'Built the Spring Boot side of an API integration',
      'Turned requirements into a clean, efficient contract',
      'Delivered on the agreed timeline',
      'Explained technical decisions in plain language',
    ],
  },
]

export const upworkTestimonials = upworkJobs.filter((job) => Boolean(job.quote))
