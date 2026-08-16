export type ProjectCategory =
  | 'backend'
  | 'fullstack'
  | 'ai'
  | 'automation'
  | 'devops'
  | 'experiments'

export type ArchitectureNode = {
  id: string
  label: string
  detail: string
  x: number
  y: number
}

export type ArchitectureEdge = {
  from: string
  to: string
}

export type Project = {
  slug: string
  title: string
  kind: 'shipped-work'
  category: ProjectCategory
  image: string
  summary: string
  problem: string
  context: string
  solution: string
  architecture: {
    caption: string
    nodes: ArchitectureNode[]
    edges: ArchitectureEdge[]
  }
  decisions: string[]
  implementation: string[]
  challenges: { challenge: string; approach: string }[]
  technologies: string[]
  outcome: string
  lessons: string[]
  related: string[]
  github?: string
  demo?: string
}

export const projects: Project[] = [
  {
    slug: 'art-information-center',
    title: 'Art Information Center',
    kind: 'shipped-work',
    category: 'fullstack',
    image: '/work/art-information-center.png',
    summary:
      'Full-stack admin platform for an arts community: discover feed, Stripe payments, and consoles for users, grants, sponsors, and events.',
    problem:
      'An arts organization needed one place to run discovery, membership payments, and back-office work instead of scattered tools.',
    context:
      'Upwork engagement. React client on Supabase (Postgres, Auth, Storage) with Stripe for profile payments and a transaction ledger.',
    solution:
      'A typed React admin: drag-to-reorder feeds, Stripe-backed payments, Gmail where mail has to leave the building, OpenAI where it helps classify — not invent facts.',
    architecture: {
      caption: 'Browser, Supabase, Stripe, and mail.',
      nodes: [
        { id: 'ui', label: 'React + shadcn/ui', detail: 'Admin console, discover feed, ledger.', x: 50, y: 10 },
        { id: 'sb', label: 'Supabase', detail: 'Postgres, Auth, Storage.', x: 50, y: 40 },
        { id: 'stripe', label: 'Stripe', detail: 'Profile payments and ledger events.', x: 22, y: 70 },
        { id: 'mail', label: 'Gmail API', detail: 'Outbound operational mail.', x: 78, y: 70 },
      ],
      edges: [
        { from: 'ui', to: 'sb' },
        { from: 'ui', to: 'stripe' },
        { from: 'ui', to: 'mail' },
      ],
    },
    decisions: [
      'Supabase for auth and data so the admin is a product, not a CMS pile.',
      'Stripe as the source of payment truth; the ledger mirrors events, it does not invent them.',
    ],
    implementation: [
      'React admin with drag-to-reorder lists.',
      'Stripe payment flow and transaction ledger.',
      'Consoles for users, grants, sponsors, and events.',
    ],
    challenges: [
      {
        challenge: 'Payments and admin state drifting apart.',
        approach: 'Treat Stripe webhooks as the write path for money; UI only displays the ledger.',
      },
    ],
    technologies: ['React', 'Supabase', 'Stripe', 'shadcn/ui', 'PostgreSQL', 'OpenAI API', 'Gmail API'],
    outcome:
      'A running arts-community admin: feed, payments, and back office in one surface. Screenshots on this site are representative UI frames, not live production captures.',
    lessons: [
      'Admin software is the product. If staff cannot reorder a list, the public feed does not matter.',
    ],
    related: ['medicare', 'ijcms'],
  },
  {
    slug: 'itas-risk-studio',
    title: 'ITAS Risk Studio',
    kind: 'shipped-work',
    category: 'backend',
    image: '/work/itas-risk-studio.png',
    summary:
      'Tax risk engine for a revenue authority. Java. Dense operational UI: cases, scores, and the tables people work all day.',
    problem:
      'Revenue work needs a risk view that operators can filter, open, and act on — not a slide about “analytics.”',
    context:
      'Built in a revenue-authority setting. Java backend. Light, data-heavy interface for case work.',
    solution:
      'A risk studio: sidebar navigation, case tables, scores, and workflows that match how tax officers actually move through a queue.',
    architecture: {
      caption: 'Operators, risk services, and the system of record.',
      nodes: [
        { id: 'ui', label: 'Risk console', detail: 'Tables, filters, case detail.', x: 50, y: 12 },
        { id: 'api', label: 'Java services', detail: 'Scoring, case lifecycle, auth.', x: 50, y: 42 },
        { id: 'db', label: 'Relational data', detail: 'Taxpayer and case records.', x: 50, y: 72 },
      ],
      edges: [
        { from: 'ui', to: 'api' },
        { from: 'api', to: 'db' },
      ],
    },
    decisions: [
      'Optimize for table work, not dashboards that nobody opens twice.',
      'Keep scoring logic on the server. The UI displays a decision, it does not re-implement tax rules.',
    ],
    implementation: [
      'Java services for risk and case flow.',
      'Operator console with filters and status chips.',
    ],
    challenges: [
      {
        challenge: 'Correctness under messy legacy data.',
        approach: 'Validate at the boundary. Fail visibly. Do not hide bad rows behind a pretty chart.',
      },
    ],
    technologies: ['Java', 'Spring Boot', 'REST APIs', 'PostgreSQL', 'MySQL'],
    outcome:
      'A risk console shaped for revenue operations. No invented case volumes or recovery figures.',
    lessons: [
      'Government software is judged by whether a clerk can finish a case, not by the hero animation.',
    ],
    related: ['ijcms', 'medicare'],
  },
  {
    slug: 'medicare',
    title: 'MediCare',
    kind: 'shipped-work',
    category: 'fullstack',
    image: '/work/medicare.png',
    summary:
      'Hospital management system. Java Spring Boot and React. Operations dashboard: queues, occupancy, appointments.',
    problem:
      'Hospital staff need one operations picture: who is waiting, what is occupied, what is booked — without five logins.',
    context:
      'Full-stack product: Spring Boot API and a React console for clinical operations staff.',
    solution:
      'A hospital ops surface: statistic cards, occupancy, queues, and calendar — backed by a Java API with clear resources.',
    architecture: {
      caption: 'React console on a Spring Boot clinical API.',
      nodes: [
        { id: 'ui', label: 'React console', detail: 'Occupancy, queues, appointments.', x: 50, y: 12 },
        { id: 'api', label: 'Spring Boot', detail: 'Patients, wards, bookings as resources.', x: 50, y: 42 },
        { id: 'db', label: 'PostgreSQL', detail: 'Operational source of truth.', x: 50, y: 72 },
      ],
      edges: [
        { from: 'ui', to: 'api' },
        { from: 'api', to: 'db' },
      ],
    },
    decisions: [
      'Separate clinical identity from UI chrome. The API owns the record.',
      'Empty and loading states are part of a ward board, not an afterthought.',
    ],
    implementation: [
      'Spring Boot resources for core hospital entities.',
      'React dashboard with cards, charts, and navigation.',
    ],
    challenges: [
      {
        challenge: 'Keeping the board honest when data is late.',
        approach: 'Show staleness. Never fake a green occupancy ring.',
      },
    ],
    technologies: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'REST APIs'],
    outcome:
      'A hospital operations console. Screenshots are representative frames of the product language.',
    lessons: [
      'Healthcare UIs fail when they hide uncertainty. Operators need the truth, even if it is ugly.',
    ],
    related: ['itas-risk-studio', 'art-information-center'],
  },
  {
    slug: 'ijcms',
    title: 'IJCMS',
    kind: 'shipped-work',
    category: 'backend',
    image: '/work/ijcms.png',
    summary:
      'Integrated Justice Case Management System. Java Spring Boot platform for case files, stages, and documents.',
    problem:
      'Justice work is a file moving through stages. If the system cannot show the file, the stage, and the documents together, staff go back to paper.',
    context:
      'Enterprise Java platform: overlapping panels for cases, workflow, and documents.',
    solution:
      'A case workbench: files, workflow stages, document lists, and a timeline in one Java Spring Boot application.',
    architecture: {
      caption: 'Case workbench, workflow, documents.',
      nodes: [
        { id: 'ui', label: 'Case workbench', detail: 'Files, stages, documents, timeline.', x: 50, y: 12 },
        { id: 'api', label: 'Spring Boot', detail: 'Case lifecycle and document metadata.', x: 50, y: 42 },
        { id: 'db', label: 'Database', detail: 'Cases and attachments.', x: 50, y: 72 },
      ],
      edges: [
        { from: 'ui', to: 'api' },
        { from: 'api', to: 'db' },
      ],
    },
    decisions: [
      'The case is the aggregate. Documents hang off it. Stages are a state machine, not a status string.',
    ],
    implementation: [
      'Spring Boot case and document services.',
      'Workbench UI for multi-panel case work.',
    ],
    challenges: [
      {
        challenge: 'Workflow that still makes sense after an exception.',
        approach: 'Explicit states and an audit trail. No silent jumps.',
      },
    ],
    technologies: ['Java', 'Spring Boot', 'REST APIs', 'PostgreSQL'],
    outcome:
      'A justice case platform oriented around the file, not around a generic CRM.',
    lessons: [
      'Legal ops software is a filing cabinet with a state machine. Design both.',
    ],
    related: ['itas-risk-studio', 'medicare'],
  },
]

export const projectFilters: { id: 'all' | ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'backend', label: 'Backend' },
  { id: 'fullstack', label: 'Full stack' },
  { id: 'ai', label: 'AI' },
  { id: 'automation', label: 'Automation' },
  { id: 'devops', label: 'DevOps' },
  { id: 'experiments', label: 'Experiments' },
]

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}

export function relatedProjects(slug: string) {
  const project = getProject(slug)
  if (!project) return []
  return project.related
    .map((relatedSlug) => getProject(relatedSlug))
    .filter((item): item is Project => Boolean(item))
}
