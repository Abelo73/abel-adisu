import { useState } from 'react'
import { Play } from 'lucide-react'
import { profile } from '@/content/profile'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'

/** Journey video. Click-to-play: the YouTube player only loads once the visitor asks for it. */
export function StoryVideo() {
  const { youtubeId, title, length } = profile.storyVideo
  const [playing, setPlaying] = useState(false)
  if (!youtubeId) return null

  return (
    <section id="story-video" className="flex min-h-[calc(100dvh-4.0625rem)] items-center py-16">
      <Container className="w-full">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-steel">My story · {length}</p>
          <AnimatedText as="h2" className="mt-3 font-display text-[clamp(2rem,5.5vw,4rem)] leading-[1.05]">
            Want to know who I am? <span className="story-gradient">Watch my journey.</span>
          </AnimatedText>
        </div>

        <Reveal delay={0.1}>
          <div className="glass relative mx-auto mt-10 aspect-video max-w-4xl overflow-hidden rounded-[22px] shadow-[0_30px_80px_rgb(0_0_0_/_0.45)]">
            {playing ? (
              <iframe
                className="absolute inset-0 size-full"
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={`Play video: ${title}`}
                className="group absolute inset-0 cursor-pointer bg-[#001745]"
              >
                <img
                  src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20" />
                <span className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-[#001645] shadow-[0_0_0_10px_rgb(255_255_255_/_0.18)] transition-transform duration-300 group-hover:scale-110 sm:size-24">
                  <Play size={30} fill="currentColor" aria-hidden="true" className="ml-1" />
                </span>
                <span className="absolute bottom-4 left-5 right-5 text-left font-display text-base text-white sm:text-lg">
                  {title}
                </span>
              </button>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
