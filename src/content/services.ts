export type Service = {
  slug: string
  title: string
  eyebrow: string
  summary: string
  problems: string[]
  deliverables: string[]
  process: string[]
  technologies: string[]
}

export const services: Service[] = [
  {
    slug: 'software-engineering',
    title: 'Software engineering',
    eyebrow: 'Systems',
    summary:
      'Custom software with production constraints: clear boundaries, tests, and an operational story — not a demo that only runs on one laptop.',
    problems: [
      'A product idea that needs a real application, not a slide.',
      'An existing codebase that cannot take another feature without architecture work.',
      'A team that needs a senior engineer to own delivery end to end.',
    ],
    deliverables: [
      'Working software with source, docs, and a deploy path.',
      'Architecture notes that a future engineer can extend.',
      'Handover: how to run, observe, and change it.',
    ],
    process: [
      'Scope the system and the failure modes that matter.',
      'Agree contracts, environments, and definition of done.',
      'Build in vertical slices, not layers that only meet at the end.',
      'Harden: tests, observability, and a release path.',
    ],
    technologies: ['Java', 'Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'Docker'],
  },
  {
    slug: 'backend-development',
    title: 'Backend development',
    eyebrow: 'Java / Spring',
    summary:
      'APIs, microservices, and distributed Java systems: Spring Boot, Spring Security, messaging, and the data layer they sit on.',
    problems: [
      'A monolith that needs service boundaries without a rewrite fantasy.',
      'Auth, tenancy, or API design that has become implicit.',
      'Need for Kafka/Rabbit, Redis, and Postgres used as designed — not as a junk drawer.',
    ],
    deliverables: [
      'Versioned APIs with explicit errors.',
      'Service topology, identity, and data ownership documented.',
      'Actuator, metrics, and tracing wired in.',
    ],
    process: [
      'Map current runtime and data ownership.',
      'Draw the target topology and the migration steps that are actually safe.',
      'Implement gateway, identity, and one vertical slice first.',
      'Add messaging and observability before the third service.',
    ],
    technologies: [
      'Java',
      'Spring Boot',
      'Spring Security',
      'Spring Cloud',
      'Kafka',
      'RabbitMQ',
      'Redis',
      'PostgreSQL',
      'JWT',
      'Keycloak',
    ],
  },
  {
    slug: 'web-development',
    title: 'Full-stack web development',
    eyebrow: 'React + Spring',
    summary:
      'Typed React applications on Spring Boot APIs: routing, auth, and UI that treats loading and failure as part of the product.',
    problems: [
      'A backend with no durable client, or a client that fights the API.',
      'SPA routing, auth expiry, and form validation implemented ad hoc.',
      'Need for a maintainable TypeScript frontend without a framework zoo.',
    ],
    deliverables: [
      'React + TypeScript application with nested routes.',
      'API contracts and auth flow that match the UI.',
      'Accessible forms and states for empty, loading, and error.',
    ],
    process: [
      'Define the user jobs and the routes they imply.',
      'Lock API shapes before screens proliferate.',
      'Build layouts, then pages, then the awkward states.',
      'Performance pass: split routes, reserve space, respect reduced motion.',
    ],
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Spring Boot', 'PostgreSQL'],
  },
  {
    slug: 'ai-automation',
    title: 'AI automation',
    eyebrow: 'Intelligence',
    summary:
      'LLM workflows and agents used as components in a system: structured output, review gates, and side effects that can be replayed.',
    problems: [
      'Chat tools used as an unofficial operating system.',
      'Generated content published with no review or log.',
      'Need to combine models with existing APIs and databases.',
    ],
    deliverables: [
      'Workflow design with schemas, not prompt folklore.',
      'Human-in-the-loop where output leaves the building.',
      'Run history and failure paths operators can use.',
    ],
    process: [
      'Name the job, the inputs, and what must never be automated.',
      'Design the graph: trigger → model → decision → effect.',
      'Implement with n8n and/or Spring services as the durable core.',
      'Evaluate with stored outputs, not vibes.',
    ],
    technologies: ['n8n', 'LLM workflows', 'AI agents', 'API orchestration'],
  },
  {
    slug: 'n8n-automation',
    title: 'n8n automation',
    eyebrow: 'Workflows',
    summary:
      'Production n8n systems: credentials, retries, branching, and integrations — designed as software, not a canvas doodle.',
    problems: [
      'Manual copy between tools (forms, CRM, email, Slack).',
      'Fragile zaps that break silently.',
      'Need for content, lead, or document pipelines with auditability.',
    ],
    deliverables: [
      'Documented workflows with error branches.',
      'Credential and environment strategy.',
      'Handover: how to change a node without guessing.',
    ],
    process: [
      'Inventory systems, events, and the human approvals required.',
      'Draw the workflow before opening the editor.',
      'Implement with idempotency and alerts.',
      'Run a failure drill: timeout, 500, duplicate event.',
    ],
    technologies: ['n8n', 'Webhooks', 'API orchestration', 'Business process automation'],
  },
  {
    slug: 'devops-cloud',
    title: 'DevOps / cloud',
    eyebrow: 'Delivery',
    summary:
      'Docker, Kubernetes, CI/CD, and observability so the system you built can actually be operated.',
    problems: [
      'Releases that only one person can perform.',
      'Containers without probes, resources, or a registry story.',
      'No metrics, logs, or traces when something pages.',
    ],
    deliverables: [
      'CI that tests and publishes images.',
      'Kubernetes (or equivalent) manifests with probes.',
      'Prometheus / Grafana / Loki / Jaeger baseline.',
    ],
    process: [
      'Capture how software gets to production today, including the unsafe parts.',
      'Make CI the only supported path.',
      'Add health, resources, and rollback.',
      'Wire observability and one alert that means something.',
    ],
    technologies: [
      'Docker',
      'Kubernetes',
      'GitHub Actions',
      'Harbor',
      'Nginx',
      'Prometheus',
      'Grafana',
      'Linux',
    ],
  },
]

export function getService(slug: string) {
  return services.find((service) => service.slug === slug)
}
