import { profile } from '@/content/profile'

export function ContactPortrait() {
  return (
    <figure className="relative mx-auto w-full max-w-[22rem] pb-10 pt-6 lg:mx-0 lg:max-w-[26rem]">
      <div
        className="absolute top-10 right-2 h-[78%] w-[72%] rotate-[4deg] rounded-[2rem] bg-[#eaf1fe] dark:bg-[#16295a]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-8 left-0 h-40 w-40 -rotate-[4deg] rounded-[1.5rem] bg-[#36b7ff]/25"
        aria-hidden="true"
      />

      <div className="relative ml-auto w-[86%] -rotate-[3.5deg]">
        <div className="overflow-hidden rounded-[1.75rem] bg-card p-2 border border-line shadow-[var(--shadow-lift)]">
          <img
            src={profile.deskPhoto}
            alt={`${profile.name} at a desk in ${profile.locationLabel}`}
            width={1280}
            height={987}
            fetchPriority="high"
            decoding="async"
            className="aspect-[3/4] w-full rounded-[1.25rem] object-cover object-[72%_40%]"
          />
        </div>
      </div>

      <div className="absolute bottom-2 left-1 w-[42%] rotate-[6deg]">
        <div className="overflow-hidden rounded-[1.35rem] bg-card p-1.5 border border-line shadow-[var(--shadow-lift)]">
          <img
            src={profile.photo}
            alt=""
            width={900}
            height={1200}
            decoding="async"
            className="aspect-[4/5] w-full rounded-[1.05rem] object-cover object-top"
          />
        </div>
      </div>

      <figcaption className="relative mt-8 max-w-[16rem] font-display text-lg leading-snug text-muted">
        {profile.current.role} at {profile.current.org}, {profile.locationLabel}.
      </figcaption>
    </figure>
  )
}
