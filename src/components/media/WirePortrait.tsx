export function WirePortrait({
  src,
  alt,
}: {
  src: string
  alt: string
}) {
  return (
    <figure className="relative mx-auto size-[16.5rem] sm:size-[18.5rem] lg:mx-0">
      <svg className="absolute inset-0 text-fg/35 dark:text-white/30" viewBox="0 0 200 200" aria-hidden="true">
        <circle cx="100" cy="100" r="98" fill="none" stroke="currentColor" strokeWidth="0.7" />
        <circle
          cx="100"
          cy="100"
          r="91"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.45"
          strokeDasharray="1.6 3.2"
        />
      </svg>
      <div className="absolute inset-[0.85rem] overflow-hidden rounded-full bg-[#0b0b0f] shadow-[0_18px_40px_rgb(0_0_0_/_0.35)] ring-1 ring-white/10">
        <img
          src={src}
          alt={alt}
          width={900}
          height={1200}
          loading="lazy"
          decoding="async"
          className="size-full object-cover object-top"
        />
      </div>
      <span
        className="absolute bottom-0 left-1/2 size-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-fg lg:hidden"
        aria-hidden="true"
      />
      <span
        className="absolute top-1/2 right-0 hidden size-2 -translate-y-1/2 translate-x-1/2 rounded-full bg-fg lg:block"
        aria-hidden="true"
      />
    </figure>
  )
}
