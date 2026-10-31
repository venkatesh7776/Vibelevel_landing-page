import Image from "next/image";

export default function HeroVideo() {
  return (
    // The glow stays outside the animated wrapper: an animating element forms its own stacking
    // context, which would lift the glow above the headline and CTAs and tint them green.
    <div className="relative w-full max-w-[1060px]">
      {/* Soft green glow behind the card (Figma "Group" blob, positioned relative to the card).
          The mask keeps it full around the card and fades it out below, so the area under the
          thumbnail stays light. The card's bottom edge sits at ~61% of the glow image. */}
      <div
        aria-hidden="true"
        className="hero-fade pointer-events-none absolute left-[-42.36%] top-[16%] -z-10 h-[107.05%] w-[184.7%]"
        style={{ animationDelay: "300ms" }}
      >
        <Image
          src="/images/bg-group.svg"
          alt=""
          width={2720}
          height={1749}
          className="absolute left-[-19.46%] top-[-79.78%] block h-[259.56%] w-[138.92%] max-w-none"
          style={{
            maskImage: "linear-gradient(to bottom, #000 0%, #000 50%, transparent 68%)",
            WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 50%, transparent 68%)",
          }}
        />
      </div>

      {/* Layered, green-tinted shadow + hairline ring give the card a lifted, crafted edge. */}
      <div
        className="hero-rise group relative aspect-[1060/629.597] w-full overflow-hidden rounded-[16px] bg-white shadow-[0_40px_90px_-40px_rgba(6,36,24,0.45),0_12px_30px_-18px_rgba(6,36,24,0.25)] ring-1 ring-black/5 sm:rounded-media"
        style={{ animationDelay: "450ms" }}
      >
        <Image
          src="/images/Sunlit%20Modern%20Workspace%20Thumbnail.png"
          alt="Engineer working on a laptop in a sunlit modern workspace"
          fill
          preload
          sizes="(min-width: 1092px) 1060px, calc(100vw - 32px)"
          className="object-cover transition-transform duration-[1200ms] ease-out-soft group-hover:scale-[1.02]"
        />
        {/* Inner highlight so the edge reads as glass rather than a hard crop. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/25" />
      </div>
    </div>
  );
}
