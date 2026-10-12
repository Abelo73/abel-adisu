export type StackNode = {
  id: string
  label: string
  accent: string
  done: string[]
  open: string[]
}

export const stackWorkflow: StackNode[][] = [
  [
    {
      id: 'react',
      label: 'React + shadcn',
      accent: '#1368e8',
      done: ['Role-based dashboards', 'Vite + shadcn/ui', 'The click that starts the path'],
      open: ['Storybook for the console'],
    },
  ],
  [
    {
      id: 'camunda',
      label: 'Camunda',
      accent: '#0f766e',
      done: ['BPMN process instances', 'Human tasks', 'Service tasks'],
      open: ['Operate metrics on this path'],
    },
    {
      id: 'keycloak',
      label: 'Keycloak',
      accent: '#001745',
      done: ['OAuth2 / JWT', 'Roles on the request'],
      open: ['Realm export shown here'],
    },
  ],
  [
    {
      id: 'java',
      label: 'Java services',
      accent: '#b45309',
      done: ['Spring Boot microservices', 'REST contracts', 'Service-task execution'],
      open: ['Public OpenAPI on this path'],
    },
    {
      id: 'supabase',
      label: 'Supabase',
      accent: '#3ecf8e',
      done: ['Postgres, Auth, Storage', 'Product backends I have shipped', 'Familiar from client projects'],
      open: ['Edge functions on this path'],
    },
  ],
  [
    {
      id: 'kafka',
      label: 'Kafka',
      accent: '#1d4ed8',
      done: ['Domain events', 'Bounded retries'],
      open: ['Schema registry on this path'],
    },
    {
      id: 'minio',
      label: 'MinIO',
      accent: '#c2410c',
      done: ['Process files stored', 'Object keys returned'],
      open: ['Lifecycle rules on this path'],
    },
  ],
  [
    {
      id: 'docker',
      label: 'Docker',
      accent: '#2563eb',
      done: ['Image as the unit of ship', 'Same artifact that ran locally'],
      open: ['Image scan on this path'],
    },
  ],
  [
    {
      id: 'k8s',
      label: 'Kubernetes',
      accent: '#326ce5',
      done: ['Deployments and pods', 'Services in the cluster'],
      open: ['Grafana / Loki on this path'],
    },
  ],
  [
    {
      id: 'rancher',
      label: 'Rancher',
      accent: '#1d4ed8',
      done: ['Cluster visualized', 'Workloads in the open'],
      open: ['GitOps on this path'],
    },
    {
      id: 'nginx',
      label: 'Nginx',
      accent: '#14795b',
      done: ['TLS at the edge', 'UI and /api routes'],
      open: ['WAF board on this path'],
    },
  ],
  [
    {
      id: 'prod',
      label: 'Production',
      accent: '#15803d',
      done: ['Operators can run it', 'UI through cluster, live'],
      open: ['Public status page'],
    },
  ],
]
