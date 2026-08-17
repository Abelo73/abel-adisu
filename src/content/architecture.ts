export type GraphNode = {
  id: string
  label: string
  detail: string
  branch: 'product' | 'automation'
  layer?: number
  row?: number
}

export type GraphEdge = { from: string; to: string }

export const atlasProductionGraph = {
  nodes: [
    {
      id: 'react',
      label: 'React + shadcn',
      detail:
        'I start with a single UI: React, Vite, and shadcn/ui — role-based screens people can actually run.',
      branch: 'product',
      layer: 0,
      row: 1,
    },
    {
      id: 'camunda',
      label: 'Camunda',
      detail: 'BPMN in Camunda: human tasks, service tasks, and a process instance that outlives a single HTTP call.',
      branch: 'product',
      layer: 1,
      row: 0,
    },
    {
      id: 'keycloak',
      label: 'Keycloak',
      detail: 'OAuth2 and JWT. Who started this process, and what they are allowed to do.',
      branch: 'product',
      layer: 1,
      row: 2,
    },
    {
      id: 'java',
      label: 'Java services',
      detail:
        'Spring Boot microservices execute the service tasks — explicit contracts, not a single monolith hiding everything.',
      branch: 'product',
      layer: 2,
      row: 1,
    },
    {
      id: 'kafka',
      label: 'Kafka',
      detail: 'Events on Kafka so other services react without a hidden RPC tangle. Bounded retries, not silent loss.',
      branch: 'product',
      layer: 3,
      row: 0,
    },
    {
      id: 'minio',
      label: 'MinIO',
      detail: 'Object storage for documents and binaries the workflow must keep — next to the transactional record.',
      branch: 'product',
      layer: 3,
      row: 2,
    },
    {
      id: 'docker',
      label: 'Docker',
      detail: 'Container images are the unit of ship. What passed on a laptop is what the cluster pulls.',
      branch: 'product',
      layer: 4,
      row: 1,
    },
    {
      id: 'k8s',
      label: 'Kubernetes',
      detail: 'Deployments, services, and pods — the runtime that keeps the UI, Camunda, and Java services up.',
      branch: 'product',
      layer: 5,
      row: 1,
    },
    {
      id: 'rancher',
      label: 'Rancher',
      detail: 'The production cluster, visualized — workloads, namespaces, the same system operated in the open.',
      branch: 'product',
      layer: 6,
      row: 0,
    },
    {
      id: 'nginx',
      label: 'Nginx',
      detail: 'TLS, the React app, and API routes — one reverse proxy in front of the cluster, development through production.',
      branch: 'product',
      layer: 6,
      row: 2,
    },
    {
      id: 'prod',
      label: 'Production',
      detail:
        'The path ends when operators can run it: screen, process, services, identity, events, objects, cluster, edge.',
      branch: 'product',
      layer: 7,
      row: 1,
    },
  ] satisfies GraphNode[],
  edges: [
    { from: 'react', to: 'camunda' },
    { from: 'react', to: 'keycloak' },
    { from: 'camunda', to: 'java' },
    { from: 'keycloak', to: 'java' },
    { from: 'java', to: 'kafka' },
    { from: 'java', to: 'minio' },
    { from: 'java', to: 'docker' },
    { from: 'kafka', to: 'docker' },
    { from: 'minio', to: 'docker' },
    { from: 'docker', to: 'k8s' },
    { from: 'k8s', to: 'rancher' },
    { from: 'k8s', to: 'nginx' },
    { from: 'rancher', to: 'prod' },
    { from: 'nginx', to: 'prod' },
  ] satisfies GraphEdge[],
}

export const productGraph = {
  nodes: [
    { id: 'react', label: 'React', detail: 'Typed UI. Nested routes. Honest async states.', branch: 'product' },
    { id: 'gateway', label: 'API Gateway', detail: 'Single public edge: TLS, routing, limits.', branch: 'product' },
    { id: 'spring', label: 'Spring Boot', detail: 'Services with explicit contracts and data ownership.', branch: 'product' },
    { id: 'kafka', label: 'Kafka', detail: 'Async facts between services. Bounded retries.', branch: 'product' },
    { id: 'postgres', label: 'PostgreSQL', detail: 'Transactional source of truth.', branch: 'product' },
    { id: 'obs', label: 'Observability', detail: 'Metrics, logs, traces with one correlation ID.', branch: 'product' },
  ] satisfies GraphNode[],
  edges: [
    { from: 'react', to: 'gateway' },
    { from: 'gateway', to: 'spring' },
    { from: 'spring', to: 'kafka' },
    { from: 'kafka', to: 'postgres' },
    { from: 'postgres', to: 'obs' },
  ] satisfies GraphEdge[],
}

export const automationGraph = {
  nodes: [
    { id: 'ai', label: 'AI', detail: 'Models as components, not the product.', branch: 'automation' },
    { id: 'n8n', label: 'n8n', detail: 'Orchestration, credentials, replayable runs.', branch: 'automation' },
    { id: 'auto', label: 'Automation', detail: 'Triggers, validation, side effects.', branch: 'automation' },
    { id: 'biz', label: 'Business workflow', detail: 'Humans still decide what leaves the building.', branch: 'automation' },
  ] satisfies GraphNode[],
  edges: [
    { from: 'ai', to: 'n8n' },
    { from: 'n8n', to: 'auto' },
    { from: 'auto', to: 'biz' },
  ] satisfies GraphEdge[],
}

export const backendServiceGraph = {
  nodes: [
    { id: 'fe', label: 'Frontend', detail: 'React SPA and other API clients.', branch: 'product' },
    { id: 'gw', label: 'API Gateway', detail: 'Spring Cloud Gateway: routing and policy.', branch: 'product' },
    { id: 'auth', label: 'Authentication', detail: 'Keycloak, OAuth2, JWT at the edge.', branch: 'product' },
    { id: 'ms', label: 'Microservices', detail: 'Spring Boot bounded contexts.', branch: 'product' },
    { id: 'bus', label: 'Kafka / RabbitMQ', detail: 'Integration events, not a hidden RPC bus.', branch: 'product' },
    { id: 'data', label: 'Databases', detail: 'PostgreSQL, Redis, MySQL, Supabase as appropriate.', branch: 'product' },
    { id: 'obs', label: 'Observability', detail: 'Prometheus, Grafana, Loki, Jaeger.', branch: 'product' },
  ] satisfies GraphNode[],
  edges: [
    { from: 'fe', to: 'gw' },
    { from: 'gw', to: 'auth' },
    { from: 'gw', to: 'ms' },
    { from: 'ms', to: 'bus' },
    { from: 'ms', to: 'data' },
    { from: 'ms', to: 'obs' },
    { from: 'bus', to: 'obs' },
  ] satisfies GraphEdge[],
}
