import { profile } from '@/content/profile'

export function PracticeStories() {
  return (
    <section className="relative overflow-hidden py-24">
      <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">User of the system</h2>
      <div className="relative mx-auto mt-16 max-w-3xl text-center">
        <p className="text-sm uppercase tracking-[0.22em] text-muted">What this practice must support</p>
        <p className="mt-4 story-gradient font-display text-3xl uppercase md:text-5xl">
          Build. Rescue. Ship.
        </p>
        <ul className="mt-14 grid gap-4 md:grid-cols-3">
          {profile.story.map((chapter) => (
            <li
              key={chapter.kicker}
              className="rounded-[16px] border border-line bg-card px-5 py-6 text-left backdrop-blur-md"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-muted">{chapter.kicker}</p>
              <p className="mt-3 font-medium">{chapter.title}</p>
              <p className="mt-2 text-sm text-muted">{chapter.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
