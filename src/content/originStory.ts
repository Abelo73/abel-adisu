export type OriginChapter = {
  id: string
  era: string
  title: string
  body: string[]
  quote?: string
  stat?: { value: number; of: number; caption: string }
  ladder?: string[]
  loop?: string[]
  stack?: string[]
}

export const originOpening = {
  eyebrow: 'Origin',
  title: 'I didn’t choose software in a straight line.',
  lede: 'A movie. A missed cutoff. One point. A detour that wasn’t. This is how I got here.',
} as const

export const originChapters: OriginChapter[] = [
  {
    id: 'spark',
    era: 'Grade 10',
    title: 'The spark',
    body: [
      'I watched Nikita. There was a hacker in it. I did not understand programming, networks, or how software was built.',
      'I had one question. It did not leave.',
    ],
    quote: 'How does someone make a computer do all of this?',
  },
  {
    id: 'wall',
    era: 'Grade 12',
    title: 'The first wall',
    body: [
      'The university entrance exam was the first closed door. I wanted technology, and I wanted a public university.',
      'I missed the line. I did not stop studying.',
    ],
    stat: { value: 325, of: 700, caption: 'Passing was 350. I missed it.' },
  },
  {
    id: 'one-point',
    era: 'Second attempt',
    title: 'One point',
    body: [
      'Another sitting. Another number. The private-university threshold was 375.',
      'One point above the line opened the next room. It still was not Software Engineering.',
    ],
    stat: { value: 376, of: 700, caption: 'Threshold 375. One point above.' },
  },
  {
    id: 'detour',
    era: 'Wollega University',
    title: 'The detour that wasn’t',
    body: [
      'I entered Electrical & Computer Engineering at Wollega University. Not the degree I had named for myself.',
      'It taught the machine: hardware, logic, mathematics, software in one body. A 3.5+ GPA path moved me deeper into that meeting point. I took it.',
    ],
  },
  {
    id: 'calculator',
    era: 'First program',
    title: 'First creation',
    body: [
      'I wrote a Java calculator. Small. Finished.',
      'For the first time I was not only watching a computer. I was telling it what to do. I still did not know software engineering. I knew I could make a thing run.',
    ],
  },
  {
    id: 'tsega',
    era: 'University years',
    title: 'Learning with Tsega',
    body: [
      'No production mentors. A friend. Search bars. Broken programs. Documentation at midnight.',
      'The question changed from how to write Java to how a real application works.',
    ],
    quote: 'How does a real application work?',
  },
  {
    id: 'system',
    era: 'Fourth year',
    title: 'The system clicks',
    body: [
      'HTML, CSS, Java, PHP, databases. Browser to server to store and back.',
      'A website stopped being a screen. It became a path. Then we built real projects. That was the turn.',
    ],
    stack: ['Frontend', 'Backend', 'Database', 'APIs', 'Users'],
  },
  {
    id: 'industry',
    era: 'Atlas Computer Technology',
    title: 'Into the industry',
    body: [
      'I joined Atlas Computer Technology as a QA Engineer and junior software developer.',
      'The job was no longer “does my code work?” It was the system, the next developer, failure, load, test, deploy, watch, secure.',
    ],
    quote: 'Does the system work?',
  },
  {
    id: 'climb',
    era: 'The seat',
    title: 'The climb',
    body: [
      'QA taught me how software fails. Java and Spring Boot grew in the same building.',
      'The work got larger: APIs, React, Angular, PostgreSQL, Kafka, Docker, Kubernetes, CI/CD.',
    ],
    ladder: ['QA Engineer', 'Junior Software Developer', 'Software Developer', 'Software Engineer'],
    stack: ['Spring Boot', 'React', 'Angular', 'Kafka', 'Docker', 'Kubernetes'],
  },
  {
    id: 'ai',
    era: 'Now',
    title: 'AI as a tool, not a shortcut',
    body: [
      'I use models to explain, challenge an architecture, start faster, and hunt errors.',
      'I still need the why. If I cannot rebuild the idea without the chat window, I do not have it yet.',
    ],
    quote: 'I still want to understand why.',
  },
  {
    id: 'loop',
    era: 'Method',
    title: 'The loop',
    body: [
      'I do not learn everything before I build. I build. The gaps become the curriculum.',
      'This is how I learned Java, Spring Boot, the frontend, databases, DevOps, and automation.',
    ],
    loop: [
      'Curiosity',
      'Question',
      'Research',
      'Experiment',
      'Build',
      'Failure',
      'Debugging',
      'Understanding',
      'Improvement',
      'Repeat',
    ],
  },
  {
    id: 'looking',
    era: 'Still',
    title: 'Still looking',
    body: [
      'Architecture, distributed systems, AI automation, n8n, cloud, Kubernetes — the tools will move.',
      'The first question has not. I am still looking.',
    ],
  },
]

export const originClose = {
  title: 'This isn’t the story of someone who always knew the way.',
  line: 'It’s the story of someone who kept looking for it.',
} as const
