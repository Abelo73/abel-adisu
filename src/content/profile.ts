export const SITE_URL = import.meta.env.VITE_SITE_URL ?? 'http://localhost:5173'

export const profile = {
  name: 'Abel Adisu',
  shortName: 'Abel',
  role: 'Full-Stack Software Engineer',
  headline: 'Two kinds of work.',
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
      body: 'Six years building production software. Ministry of Revenue by day. Select freelance work on Upwork — Top Rated, 100% Job Success.',
    },
  ],
  summary:
    'Full-stack engineer in Addis Ababa. Java, Spring Boot, React, Angular. Clients hire me to build the system correctly — or to finish the one that stalled.',
  status: 'AVAILABLE FOR SELECT PROJECTS',
  signal: 'BUILD · RESCUE · SHIP',
  locationLabel: 'Addis Ababa, Ethiopia',
  years: '6 years in production',
  education: 'B.Sc., Wollega University, 2019–2023',
  email: 'EMAIL_ADDRESS',
  social: {
    github: 'https://github.com/Abelo73',
    linkedin: 'https://www.linkedin.com/in/abeladisunugatu/',
    upwork: 'https://www.upwork.com/freelancers/~01e478e25e9d736c67',
  },
  badges: ['Top Rated', '100% Job Success'],
  focus: [
    'Java & Spring Boot specialist',
    'React, Angular & TypeScript',
    'Cloud-native & microservices',
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
