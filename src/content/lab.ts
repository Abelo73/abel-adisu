export type LabStatus = 'experiment' | 'prototype' | 'idea' | 'research'

export type LabItem = {
  slug: string
  title: string
  status: LabStatus
  summary: string
  stack: string[]
}

export const labItems: LabItem[] = [
  {
    slug: 'ai-agents',
    title: 'Tool-using agents',
    status: 'research',
    summary:
      'Agents that call APIs with typed tools and a kill switch. Exploring evaluation more than autonomy theater.',
    stack: ['LLM workflows', 'AI agents', 'API orchestration'],
  },
  {
    slug: 'n8n-patterns',
    title: 'n8n pattern library',
    status: 'prototype',
    summary:
      'Reusable workflow shapes: ingest, review, effect. The interesting part is error branches and replay.',
    stack: ['n8n', 'Webhooks'],
  },
  {
    slug: 'distributed-lab',
    title: 'Failure injection on Spring services',
    status: 'experiment',
    summary:
      'What timeouts, retries, and Kafka lag look like when a dependency lies. Observability first.',
    stack: ['Spring Boot', 'Kafka', 'Jaeger'],
  },
  {
    slug: 'dev-tooling',
    title: 'Local platform DX',
    status: 'idea',
    summary:
      'One command to run gateway, identity, and a sample service with traces already flowing.',
    stack: ['Docker', 'Keycloak', 'Spring Cloud'],
  },
  {
    slug: 'cloud-topology',
    title: 'Cluster topology notes',
    status: 'research',
    summary:
      'Ingress, Harbor, and resource envelopes that match Spring Boot memory behavior.',
    stack: ['Kubernetes', 'Harbor', 'Nginx'],
  },
  {
    slug: 'frontend-lab',
    title: 'Product-grade SPA shells',
    status: 'experiment',
    summary:
      'Command palettes, nested routes, and motion that still respects reduced-motion — this site is one of those experiments.',
    stack: ['React', 'TypeScript', 'Vite'],
  },
]
