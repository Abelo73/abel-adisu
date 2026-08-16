export type SkillLevel = 'primary' | 'experienced' | 'working' | 'exploring'

export type Skill = {
  name: string
  level: SkillLevel
}

export type SkillGroup = {
  id: string
  title: string
  items: Skill[]
}

export const skillLevels: Record<SkillLevel, { label: string; hint: string }> = {
  primary: {
    label: 'Primary',
    hint: 'Daily production work and the core of how I ship systems.',
  },
  experienced: {
    label: 'Experienced',
    hint: 'Used in real systems. Comfortable owning design and delivery.',
  },
  working: {
    label: 'Working knowledge',
    hint: 'Used in projects. Can implement, extend, and operate.',
  },
  exploring: {
    label: 'Exploring',
    hint: 'Active study and lab work. Not presented as a specialization.',
  },
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'backend',
    title: 'Backend',
    items: [
      { name: 'Java', level: 'primary' },
      { name: 'Spring Boot', level: 'primary' },
      { name: 'Spring Security', level: 'experienced' },
      { name: 'Spring Cloud', level: 'experienced' },
      { name: 'REST APIs', level: 'primary' },
      { name: 'Microservices', level: 'experienced' },
      { name: 'JWT', level: 'experienced' },
      { name: 'Kafka', level: 'experienced' },
      { name: 'RabbitMQ', level: 'working' },
      { name: 'Redis', level: 'experienced' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    items: [
      { name: 'React', level: 'primary' },
      { name: 'Angular', level: 'experienced' },
      { name: 'TypeScript', level: 'primary' },
      { name: 'Next.js', level: 'working' },
      { name: 'Vite', level: 'experienced' },
      { name: 'Tailwind CSS', level: 'experienced' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    items: [
      { name: 'PostgreSQL', level: 'primary' },
      { name: 'MySQL', level: 'experienced' },
      { name: 'MongoDB', level: 'working' },
      { name: 'Supabase', level: 'experienced' },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps & infrastructure',
    items: [
      { name: 'Docker', level: 'experienced' },
      { name: 'Kubernetes', level: 'experienced' },
      { name: 'Nginx', level: 'working' },
      { name: 'CI/CD', level: 'experienced' },
      { name: 'GitHub Actions', level: 'experienced' },
      { name: 'Harbor', level: 'working' },
      { name: 'Linux', level: 'experienced' },
    ],
  },
  {
    id: 'observability',
    title: 'Observability',
    items: [
      { name: 'Prometheus', level: 'working' },
      { name: 'Grafana', level: 'working' },
      { name: 'Loki', level: 'working' },
      { name: 'Jaeger', level: 'working' },
    ],
  },
  {
    id: 'security',
    title: 'Identity & security',
    items: [
      { name: 'Keycloak', level: 'working' },
      { name: 'OAuth2', level: 'experienced' },
      { name: 'JWT', level: 'experienced' },
      { name: 'Spring Security', level: 'experienced' },
    ],
  },
  {
    id: 'automation',
    title: 'AI & automation',
    items: [
      { name: 'n8n', level: 'experienced' },
      { name: 'LLM workflows', level: 'experienced' },
      { name: 'AI agents', level: 'working' },
      { name: 'API orchestration', level: 'experienced' },
      { name: 'Workflow automation', level: 'experienced' },
      { name: 'Content automation', level: 'working' },
      { name: 'Business process automation', level: 'experienced' },
    ],
  },
]
