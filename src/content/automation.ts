export type N8nKind =
  | 'trigger'
  | 'n8n'
  | 'ai'
  | 'if'
  | 'http'
  | 'database'
  | 'notify'
  | 'review'
  | 'code'
  | 'crm'
  | 'form'

export type WorkflowStep = {
  id: string
  label: string
  detail: string
  kind: N8nKind
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
  { id: 'trigger', label: 'Webhook', detail: 'Webhook, schedule, form, or queue starts the run.', kind: 'trigger' },
  { id: 'n8n', label: 'n8n', detail: 'Orchestration, credentials, retries, and replay.', kind: 'n8n' },
  { id: 'model', label: 'OpenAI', detail: 'Structured output against a schema — no free-form fiction.', kind: 'ai' },
  { id: 'decision', label: 'IF', detail: 'Rules plus a human gate when the work leaves the building.', kind: 'if' },
  { id: 'api', label: 'HTTP Request', detail: 'CRM, CMS, or internal Spring services.', kind: 'http' },
  { id: 'db', label: 'Postgres', detail: 'Durable record, not a Slack message.', kind: 'database' },
  { id: 'notify', label: 'Slack', detail: 'Email, Slack, or in-app — with a link back to the record.', kind: 'notify' },
]

export const automationPlays: AutomationPlay[] = [
  {
    slug: 'content',
    title: 'AI content automation',
    summary: 'Topic in, reviewed publishable artifact out. The model never posts unsupervised.',
    steps: [
      { id: 'in', label: 'Form Trigger', detail: 'Topic, URL, or industry brief.', kind: 'form' },
      { id: 'research', label: 'HTTP Request', detail: 'Fetch and extract sources.', kind: 'http' },
      { id: 'ai', label: 'OpenAI', detail: 'Draft against a schema.', kind: 'ai' },
      { id: 'gen', label: 'Code', detail: 'Article, outline, or social pack.', kind: 'code' },
      { id: 'review', label: 'Wait', detail: 'Edit gate before anything public.', kind: 'review' },
      { id: 'pub', label: 'HTTP Request', detail: 'CMS or scheduled channels.', kind: 'http' },
    ],
  },
  {
    slug: 'leads',
    title: 'Lead automation',
    summary: 'Inbound form to a CRM record and a qualified alert — AI classifies, humans reply.',
    steps: [
      { id: 'form', label: 'Webhook', detail: 'Signed inbound form payload.', kind: 'trigger' },
      { id: 'crm', label: 'CRM', detail: 'Create or merge the person.', kind: 'crm' },
      { id: 'qual', label: 'OpenAI', detail: 'Score + summary, no invented facts.', kind: 'ai' },
      { id: 'email', label: 'Gmail', detail: 'Optional draft, not auto-send.', kind: 'notify' },
      { id: 'slack', label: 'Slack', detail: 'Notify with the CRM link.', kind: 'notify' },
    ],
  },
  {
    slug: 'ops',
    title: 'Business workflow automation',
    summary: 'Event in, validated process out — the same shape whether the work is a document or a ticket.',
    steps: [
      { id: 'trig', label: 'Schedule', detail: 'System event or cron.', kind: 'trigger' },
      { id: 'val', label: 'IF', detail: 'Schema and business rules.', kind: 'if' },
      { id: 'ai', label: 'OpenAI', detail: 'Extract, classify, or draft.', kind: 'ai' },
      { id: 'ext', label: 'HTTP Request', detail: 'The systems of record.', kind: 'http' },
      { id: 'db', label: 'Postgres', detail: 'Audit trail.', kind: 'database' },
      { id: 'note', label: 'Slack', detail: 'People who must act.', kind: 'notify' },
    ],
  },
]
