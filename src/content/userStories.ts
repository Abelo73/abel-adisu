export type SystemStory = {
  id: string
  who: string
  mark: string
  accent: string
  line: string
  quote?: boolean
}

export const leftSystemStories: SystemStory[] = [
  {
    id: 'case',
    who: 'Case officer',
    mark: 'CO',
    accent: '#7b61ff',
    line: 'As a case officer, I need the file on screen — not a training demo.',
  },
  {
    id: 'upwork-1',
    who: 'Upwork client',
    mark: 'UC',
    accent: '#9f7fdb',
    quote: true,
    line: 'He fixed a critical memory issue, resolved PostgreSQL migration problems, and improved overall backend stability.',
  },
  {
    id: 'clinic',
    who: 'Clinic staff',
    mark: 'CS',
    accent: '#5eead4',
    line: 'As clinic staff, I need software we can run on a Tuesday — not a slide.',
  },
]

export const rightSystemStories: SystemStory[] = [
  {
    id: 'revenue',
    who: 'Revenue ops',
    mark: 'RO',
    accent: '#e891ae',
    line: 'As revenue ops, the score has to be correct. Close enough is not enough.',
  },
  {
    id: 'upwork-2',
    who: 'Upwork client',
    mark: 'UC',
    accent: '#c4b5fd',
    quote: true,
    line: 'He quickly understood the requirements, set up a clean integration, and communicated clearly throughout.',
  },
  {
    id: 'saas',
    who: 'SaaS admin',
    mark: 'SA',
    accent: '#7b61ff',
    line: 'As an admin, one tenant must never see another’s data.',
  },
]
