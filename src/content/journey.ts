export type JourneyArtifact =
  | { kind: 'quote'; text: string }
  | { kind: 'score'; value: string; of: string; note: string }
  | { kind: 'stack'; items: string[] }
  | { kind: 'ladder'; steps: string[] }
  | { kind: 'loop'; steps: string[] }

export type JourneyChapter = {
  id: string
  era: string
  title: string
  story: string[]
  teach: {
    label: string
    body: string
  }
  artifact?: JourneyArtifact
}

export const journeyOpening = {
  eyebrow: 'A path, not a plan',
  title: 'From Electrical & Computer Engineering to Software Engineering',
  lede: 'I didn’t choose software engineering in a straight line. Curiosity, a failed exam, a friend, a calculator, and years of searching quietly took me here.',
} as const

export const journeyChapters: JourneyChapter[] = [
  {
    id: 'not-straight',
    era: 'The shape',
    title: 'I didn’t choose this in a straight line.',
    story: [
      'There was no moment when I knew exactly what I wanted to become. It started with curiosity, a failed entrance exam, an unexpected opportunity, a change of direction, a good friend, countless searches, and years of teaching myself how things actually work.',
      'Looking back, every wrong turn was quietly taking me toward the right place.',
    ],
    teach: {
      label: 'If your path looks messy',
      body: 'A career can be a sequence of honest next steps. You do not need the whole map on day one. You need a question you will not drop.',
    },
  },
  {
    id: 'nikita',
    era: 'Grade 10',
    title: 'It started with a movie.',
    story: [
      'When I was in Grade 10, I watched Nikita. There was a hacker in the movie, and something about that character completely caught my attention.',
      'I didn’t understand programming, networks, or how software was actually built. I had one question: how does someone make a computer do all of this?',
      'I started searching — what is programming, how computers work, what Java is, how a website talks to a database. I didn’t have a roadmap. I followed the curiosity. That became the beginning.',
    ],
    teach: {
      label: 'Start with a real question',
      body: 'You do not need to “learn to code” in the abstract. Find one thing a computer is doing that you cannot explain, and refuse to leave it unexplained.',
    },
    artifact: {
      kind: 'quote',
      text: 'How does someone make a computer do all of this?',
    },
  },
  {
    id: 'exam-fail',
    era: 'Grade 12',
    title: 'The first closed door.',
    story: [
      'The university entrance exam was the first major obstacle. I scored 325 out of 700. The passing score was 350. I had missed it.',
      'At the time it felt like a door had closed. I wanted to continue toward technology, and I wanted a public university rather than simply choosing a private option. So I didn’t stop. I kept studying. I kept looking for another way forward.',
    ],
    teach: {
      label: 'A closed door is data',
      body: 'Failing a cutoff is not a verdict on whether you belong in the field. It is a score on one day. The useful move is the next attempt, not the story you tell yourself that night.',
    },
    artifact: { kind: 'score', value: '325', of: '700', note: 'Passing was 350. I missed it.' },
  },
  {
    id: 'exam-pass',
    era: 'Second attempt',
    title: 'One point above the line.',
    story: [
      'Another opportunity came. I reached 376 out of 700. The private-university threshold was 375. Just one point above the requirement.',
      'That single point let me continue. I still wanted Software Engineering. The score wasn’t enough for the exact field I wanted. Instead of giving up on engineering, I entered Electrical & Computer Engineering. I didn’t yet know how important that decision would become.',
    ],
    teach: {
      label: 'Take the adjacent door',
      body: 'If the exact programme is closed, take the neighbouring one that still teaches systems. Hardware, logic, and mathematics are not a detour from software. They are the machine software sits on.',
    },
    artifact: { kind: 'score', value: '376', of: '700', note: 'One point above the private-university line.' },
  },
  {
    id: 'wollega',
    era: 'University',
    title: 'Electrical & Computer Engineering at Wollega.',
    story: [
      'I joined Wollega University to study Electrical & Computer Engineering. It wasn’t the degree I had originally imagined. I wanted software.',
      'Engineering gave me a foundation I didn’t know I needed. I started seeing computers as hardware, logic, communication, mathematics, and software together.',
      'There was a path for students who performed strongly in the initial engineering period to move into Electrical & Computer Engineering — around a 3.5+ GPA. I studied, I pushed, and I made that transition. That put me where hardware and software meet.',
    ],
    teach: {
      label: 'Treat the degree as a machine, not a brand',
      body: 'ECE is not “not software.” It is how electricity, logic, and programs share a body. If you are in a related engineering track, steal the systems thinking and write code on purpose.',
    },
  },
  {
    id: 'calculator',
    era: 'First program',
    title: 'A Java calculator.',
    story: [
      'At university I eventually started writing code. One of my early projects was extremely simple: a Java calculator.',
      'Today a calculator feels almost trivial. For me it was the first time I wasn’t only consuming technology. I was creating something. I could write instructions. The computer could execute them.',
      'That feeling changed how I looked at programming. I could write code. I still didn’t understand software engineering.',
    ],
    teach: {
      label: 'Ship something tiny on purpose',
      body: 'Your first real program should be small enough to finish. The point is not the calculator. The point is crossing from “I watch computers” to “I tell them what to do.”',
    },
    artifact: { kind: 'quote', text: 'I wasn’t simply consuming technology. I was creating something.' },
  },
  {
    id: 'tsega',
    era: 'University years',
    title: 'Meeting Tsega — how software actually works.',
    story: [
      'During university I met my friend Tsega. We started learning together. That became another turning point.',
      'We didn’t have experienced software engineers standing beside us explaining production. So we searched, asked, experimented, broke things, watched tutorials, read documentation, and tried to understand the applications we used every day.',
      'The questions changed. Instead of “How do I write Java code?” we asked “How does a real application work?”',
    ],
    teach: {
      label: 'Find one person to search with',
      body: 'A friend who will debug with you is worth more than a perfect syllabus. Change the question from syntax to systems as soon as you can write a loop.',
    },
    artifact: {
      kind: 'quote',
      text: 'How does a real application work?',
    },
  },
  {
    id: 'fourth-year',
    era: 'Fourth year',
    title: 'From code to software.',
    story: [
      'Learning became practical: HTML, CSS, Java, PHP, databases, backend, frontend — how browsers talk to servers, how data moves, how databases store records, how backends process requests.',
      'A website wasn’t simply HTML on a screen. There was a whole system behind it: frontend, backend, database, APIs, business logic, users.',
      'Then we built our first real projects. Programming stopped being only an academic exercise. We were building software. That changed everything.',
    ],
    teach: {
      label: 'Draw the request',
      body: 'For any page you use, sketch the path: browser → server → database → back. If you cannot draw that path, you do not yet understand the app — even if the UI looks finished.',
    },
    artifact: {
      kind: 'stack',
      items: ['Frontend', 'Backend', 'Database', 'APIs', 'Business logic', 'Users'],
    },
  },
  {
    id: 'how-i-learn',
    era: 'Method',
    title: 'The internet was the second university.',
    story: [
      'University gave the foundation. The internet became the second university. When I didn’t understand something, I searched. When a project failed, I searched. When I wanted to know how professionals built systems, I searched.',
      'I learned that programming isn’t about memorizing syntax. It’s about learning how to solve problems. I don’t try to learn everything before I build. I build first, discover what I don’t know, learn that, then improve the system.',
    ],
    teach: {
      label: 'Build, then study the gap',
      body: 'Do not wait until you “know enough.” Start a small system. The gaps that appear are the curriculum. Debug until you can explain why it broke.',
    },
    artifact: {
      kind: 'loop',
      steps: [
        'Curiosity',
        'Question',
        'Research',
        'Experiment',
        'Build',
        'Failure',
        'Debugging',
        'Understanding',
        'Improvement',
      ],
    },
  },
  {
    id: 'java',
    era: 'Language',
    title: 'Java became my language.',
    story: [
      'As I explored backend development, Java became increasingly important. I moved beyond simple programs into how Java is used in real applications. Then came Spring Boot.',
      'That opened REST APIs, authentication, databases, dependency injection, Spring Security, microservices, messaging, distributed systems, Docker, Kubernetes, CI/CD, observability, cloud infrastructure.',
      'The small Java calculator was now connected to a much bigger world.',
    ],
    teach: {
      label: 'Pick a spine, then branch',
      body: 'One language deep enough to ship with is more useful than five tutorials. Java and Spring Boot became my spine. React, Kafka, and Kubernetes grew off that spine when a real system needed them.',
    },
    artifact: {
      kind: 'stack',
      items: ['Java', 'Spring Boot', 'REST', 'Spring Security', 'Kafka', 'Docker', 'Kubernetes', 'CI/CD'],
    },
  },
  {
    id: 'atlas',
    era: 'Atlas Computer Technology',
    title: 'QA first. Then the engineer seat.',
    story: [
      'I joined Atlas Computer Technology Plc as a QA Engineer and junior software developer. Suddenly the question wasn’t only “does my code work?” It was: does the system work, can another developer maintain it, what happens when it fails, what happens with thousands of users, how do we test, deploy, monitor, and secure it?',
      'QA gave me an unusual advantage. I learned to look at software from how it can fail, not only how it can succeed. I learned Java and Spring Boot deeply while working as a tester. The role that looked like a step away from software engineering was another step toward it.',
      'The work evolved: QA Engineer, then junior developer, then developer, then software engineer — full-stack applications, enterprise systems, React and Angular, PostgreSQL, microservices, Kafka, Docker, Kubernetes, auth, CI/CD, observability, and later AI automation.',
    ],
    teach: {
      label: 'Testing is a way in, not a side quest',
      body: 'If you enter through QA, treat every bug as a tour of the architecture. Ask how the request arrived, where state lives, and what operators see when it fails. That is software engineering.',
    },
    artifact: {
      kind: 'ladder',
      steps: ['QA Engineer', 'Junior Software Developer', 'Software Developer', 'Software Engineer'],
    },
  },
  {
    id: 'ai',
    era: 'Now',
    title: 'AI changed the speed. Not the curiosity.',
    story: [
      'As AI became more powerful I didn’t treat it as a replacement for learning. I treated it as another tool: explain a concept from more than one side, challenge an architecture, compare approaches, start faster, investigate errors.',
      'The important part stayed the same. I still want to understand why. AI can help me move faster. It doesn’t replace the curiosity that started this journey.',
      'I don’t consider the journey finished. Architecture, distributed systems, automation, n8n, cloud, DevOps, Kubernetes, system design — the tools will change. The thing that started everything is still a question I couldn’t answer, and the willingness to keep searching until I understood it.',
    ],
    teach: {
      label: 'Use the tool. Keep the why.',
      body: 'Ask a model to explain, then rebuild the idea in your own words and in running code. If you cannot teach the step without the chat window, you don’t have it yet.',
    },
    artifact: {
      kind: 'quote',
      text: 'This isn’t the story of someone who always knew the way. It’s the story of someone who kept looking for it.',
    },
  },
]

export const journeyClose = {
  title: 'From a movie about a hacker to building real software.',
  body: 'I’m still looking.',
} as const
