export const SITE_URL = import.meta.env.VITE_SITE_URL ?? 'http://localhost:5173'

export const profile = {
  name: 'Abel Adisu',
  shortName: 'Abel',
  role: 'Software Engineer',
  headline: 'From database to UI.',
  intro:
    'I build secure, scalable backend systems and the polished frontends that sit on top of them — end to end, from database to UI.',
  story: [
    {
      kicker: 'Chapter one',
      title: 'Build it right from the start.',
      body: 'Enterprise-grade Java and Spring Boot systems — APIs, identity, data, and a UI that operations can actually run.',
    },
    {
      kicker: 'Chapter two',
      title: 'Rescue what others left unfinished.',
      body: 'Fix the bugs, close the integrations, and ship the features sitting in a half-dead codebase.',
    },
    {
      kicker: 'Chapter three',
      title: 'Ship it in production.',
      body: 'Currently Software Engineer at Atlas Computer Technology. Select freelance work on Upwork — Top Rated, 100% Job Success.',
    },
  ],
  summary:
    'Currently Software Engineer at Atlas Computer Technology in Addis Ababa — Java, Spring Boot, React, on-site in production. Select Upwork work on the side.',
  hero: {
    eyebrow: 'Hello — I’m Abel.',
    title: 'I write software people can finish at work.',
    lede: 'Backend, UI and production — end to end.',
    primaryCta: 'Work with me',
    highlights: [
      { value: '6 yrs', label: 'In production' },
      { value: '100%', label: 'Job Success' },
      { value: 'Top Rated', label: 'On Upwork' },
    ],
    skills: ['Java', 'Spring Boot', 'React', 'TypeScript', 'PostgreSQL'],
  },
  status: 'LIVE · ATLAS COMPUTER TECHNOLOGY',
  signal: 'ATLAS · PRODUCTION · ADDIS ABABA',
  locationLabel: 'Addis Ababa, Ethiopia',
  years: '6 years in production',
  education: 'B.Sc. Electrical & Computer Engineering, Wollega University, 2019–2023',
  email: 'abeladisu73@gmail.com',
  phone: '+251934777843',
  phoneLabel: '+251 934 777 843',
  employer: 'Atlas Computer Technology',
  current: {
    org: 'Atlas Computer Technology',
    role: 'Software Engineer',
    period: 'March 2024 – Present',
    location: 'Addis Ababa, Ethiopia',
    workMode: 'On-site',
    env: 'Production',
    stack: ['Java', 'Spring Boot', 'Angular', 'React', 'Keycloak', 'Kafka', 'PostgreSQL'],
  },
  availability: 'Employed at Atlas. Open to select full-stack, backend, and frontend work — on-site, hybrid, or remote.',
  social: {
    github: 'https://github.com/Abelo73',
    linkedin: 'https://www.linkedin.com/in/abeladisunugatu/',
    upwork: 'https://www.upwork.com/freelancers/~01e478e25e9d736c67',
  },
  badges: ['Top Rated', '100% Job Success'],
  photo: '/abel-adisu.webp',
  deskPhoto: '/abel-at-desk.webp',
  cv: '/Abel_Adisu_CV.pdf',
  topSkills: ['Java', 'Spring Boot', 'Angular', 'React', 'Apache Kafka'],
  layers: [
    {
      id: 'ui',
      label: 'UI',
      title: 'The surface operators can run',
      items: [
        'React, Angular, TypeScript, Tailwind CSS, shadcn/ui',
        'Dashboard-heavy, role-based UI for enterprise workflows',
        'API integration and real-time data views',
      ],
    },
    {
      id: 'api',
      label: 'API',
      title: 'The contracts the system keeps',
      items: [
        'Java & Spring Boot, Kotlin',
        'REST API design and event-driven microservices (Kafka)',
        'Authentication: JWT, OAuth2, Keycloak, RBAC',
      ],
    },
    {
      id: 'data',
      label: 'Data',
      title: 'The record that has to be true',
      items: [
        'PostgreSQL / MySQL schema design and optimization',
        'Supabase on product work — Postgres, Auth, Storage',
        'Docker, Kubernetes, Grafana, Loki, CI/CD',
      ],
    },
  ],
  clientsGet: [
    'End-to-end feature ownership — UI, API, database, deployment',
    'Clean, production-ready code with test coverage',
    'Clear communication and fast iteration',
  ],
  shipped: [
    { title: 'Justice case management', hint: 'Government casework, not a demo.' },
    { title: 'Real-time tax risk scoring', hint: 'Revenue operations that have to be correct.' },
    { title: 'Hospital operations', hint: 'Software a clinic can actually run.' },
    { title: 'Workforce operations', hint: 'An Angular suite operators can run.' },
    { title: 'Multi-tenant SaaS', hint: 'Production client environments.' },
  ],
  focus: [
    'Java & Spring Boot specialist',
    'React, Angular & TypeScript',
    'Cloud-native & microservices',
    'Supabase product backends',
    'AI automation with n8n',
  ],
  philosophy: [
    {
      title: 'Maintainability',
      body: 'Code is read more than it is written. Boundaries, naming, and tests should make the next change cheaper, not harder.',
    },
    {
      title: 'Scalability',
      body: 'Scale is a design choice: clear service contracts, isolated state, and work that can move independently under load.',
    },
    {
      title: 'Clean architecture',
      body: 'Domain logic stays independent of frameworks. Adapters can change; the system’s meaning should not.',
    },
    {
      title: 'Observability',
      body: 'If it cannot be traced, measured, and alerted, it is not production-ready.',
    },
    {
      title: 'Rescue with respect',
      body: 'A stalled codebase is still a product. Diagnose, stabilize, then ship — without a theatrical rewrite.',
    },
    {
      title: 'Production reliability',
      body: 'Timeouts, retries with limits, idempotency, and failure modes operators can handle.',
    },
  ],
  builds: [
    'Backend systems',
    'Modern web applications',
    'Tax & revenue platforms',
    'Hospital operations software',
    'Justice case management',
    'AI automation',
  ],
} as const
