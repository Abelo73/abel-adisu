export type WorkflowStep = {
  id: string
  label: string
  detail: string
}

export type AutomationPlay = {
  slug: string
  title: string
  summary: string
  steps: WorkflowStep[]
}

export const automationHero = {
  headline: 'Turn repetitive work into intelligent systems.',
  lede: 'n8n, APIs, and models — arranged as software: triggers, contracts, review, side effects, and a record of what happened.',
} as const

export const automationCapabilities = [
  'AI-powered workflows',
  'n8n automation',
  'API integrations',
  'LLM workflows',
  'AI agents',
  'Content pipelines',
  'Lead processing',
  'Business process automation',
  'Notifications',
  'Data synchronization',
  'Document workflows',
] as const

export const coreWorkflow: WorkflowStep[] = [
  { id: 'trigger', label: 'Trigger', detail: 'Webhook, schedule, form, or queue.' },
  { id: 'n8n', label: 'n8n', detail: 'Orchestration, credentials, retries.' },
  { id: 'model', label: 'AI model', detail: 'Structured output against a schema.' },
  { id: 'decision', label: 'Decision', detail: 'Rules plus human review when it leaves the building.' },
  { id: 'api', label: 'API', detail: 'CRM, CMS, internal Spring services.' },
  { id: 'db', label: 'Database', detail: 'Durable record, not a Slack message.' },
  { id: 'notify', label: 'Notification', detail: 'Email, Slack, or in-app — with a link back.' },
]

export const automationPlays: AutomationPlay[] = [
  {
    slug: 'content',
    title: 'AI content automation',
    summary: 'Topic in, reviewed publishable artifact out. The model never posts unsupervised.',
    steps: [
      { id: 'in', label: 'Input', detail: 'Topic, URL, or industry brief.' },
      { id: 'research', label: 'Research', detail: 'Fetch and extract sources.' },
      { id: 'ai', label: 'AI processing', detail: 'Draft against a schema.' },
      { id: 'gen', label: 'Generation', detail: 'Article, outline, or social pack.' },
      { id: 'review', label: 'Human review', detail: 'Edit gate before anything public.' },
      { id: 'pub', label: 'Publishing', detail: 'CMS or scheduled channels.' },
    ],
  },
  {
    slug: 'leads',
    title: 'Lead automation',
    summary: 'Inbound form to a CRM record and a qualified alert — AI classifies, humans reply.',
    steps: [
      { id: 'form', label: 'Website form', detail: 'Signed webhook.' },
      { id: 'crm', label: 'CRM', detail: 'Create or merge the person.' },
      { id: 'qual', label: 'AI qualification', detail: 'Score + summary, no invented facts.' },
      { id: 'email', label: 'Email', detail: 'Optional draft, not auto-send.' },
      { id: 'slack', label: 'Slack', detail: 'Notify with the CRM link.' },
    ],
  },
  {
    slug: 'ops',
    title: 'Business workflow automation',
    summary: 'Event in, validated process out — the same shape whether the work is a document or a ticket.',
    steps: [
      { id: 'trig', label: 'Trigger', detail: 'System event or schedule.' },
      { id: 'val', label: 'Validation', detail: 'Schema and business rules.' },
      { id: 'ai', label: 'AI processing', detail: 'Extract, classify, or draft.' },
      { id: 'ext', label: 'External APIs', detail: 'The systems of record.' },
      { id: 'db', label: 'Database', detail: 'Audit trail.' },
      { id: 'note', label: 'Notification', detail: 'People who must act.' },
    ],
  },
]
