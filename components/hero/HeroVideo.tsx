"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const play = () => {
    setPlaying(true);
    void videoRef.current?.play();
  };

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
        {/* The product demo. It loads only its metadata until someone presses play. */}
        <video
          ref={videoRef}
          src="/videos/vibelevel-screening-demo.mp4"
          preload="metadata"
          playsInline
          controls={playing}
          onEnded={() => setPlaying(false)}
          className="absolute inset-0 size-full bg-black object-contain"
          aria-label="VibeLevel Screening product demo"
        />

        {/* Cover: the workspace thumbnail and a glass play button, until the video starts. */}
        <button
          type="button"
          onClick={play}
          aria-label="Play the VibeLevel Screening demo"
          className={`absolute inset-0 cursor-pointer transition-opacity duration-500 focus-visible:outline-none ${playing ? "pointer-events-none opacity-0" : "opacity-100"}`}
          tabIndex={playing ? -1 : 0}
        >
          <Image
            src="/images/Sunlit%20Modern%20Workspace%20Thumbnail.png"
            alt=""
            fill
            preload
            sizes="(min-width: 1092px) 1060px, calc(100vw - 32px)"
            className="object-cover transition-transform duration-[1200ms] ease-out-soft group-hover:scale-[1.02]"
          />
          <span aria-hidden="true" className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/30" />
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/25 ring-1 ring-white/40 backdrop-blur-xl transition-transform duration-300 ease-out-soft group-hover:scale-110 group-focus-visible:ring-2 group-focus-visible:ring-glow sm:size-[96px]"
          >
            <svg viewBox="0 0 24 24" className="ml-1 size-6 fill-white sm:size-9">
              <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.6-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
            </svg>
          </span>
        </button>
        {/* Inner highlight so the edge reads as glass rather than a hard crop. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/25" />
      </div>
    </div>
  );
}
