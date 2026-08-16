export type GraphNode = {
  id: string
  label: string
  detail: string
  branch: 'product' | 'automation'
}

export type GraphEdge = { from: string; to: string }

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
    { id: 'data', label: 'Databases', detail: 'PostgreSQL, Redis, MySQL as appropriate.', branch: 'product' },
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
