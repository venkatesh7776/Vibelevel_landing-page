import { AgentVisual } from "@/components/sections/features/FeatureVisuals";
import ScreeningPixels from "@/components/sections/screening/ScreeningPixels";

const GRADIENT = "linear-gradient(150deg in oklab, #d4f1dd 0%, #eef6df 55%, #fdf1c7 100%)";

/** Right-hand panel of the sign-up page: VibeLevel Screening on our gradient, with live pixels. */
export default function ScreeningShowcase() {
  return (
    <div
      className="relative isolate flex h-full min-h-[560px] flex-col items-center justify-center overflow-hidden rounded-[28px] px-6 py-14 ring-1 ring-black/[0.05] sm:px-12 lg:sticky lg:top-[96px] lg:max-h-[calc(100dvh-120px)]"
      style={{ backgroundImage: GRADIENT }}
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <ScreeningPixels />
      </div>

      <p className="hero-rise font-body text-[12px] font-medium uppercase tracking-[0.16em] text-brand-green">VibeLevel Screening</p>
      <h2 className="hero-rise mt-3 max-w-[440px] text-balance text-center font-heading text-[30px] leading-[1.12] font-medium tracking-[-0.8px] text-black sm:text-[34px]">
        Evaluate how candidates <em className="text-headline-accent italic">work with AI.</em>
      </h2>
      <div className="hero-rise mt-5 flex flex-wrap justify-center gap-2" style={{ animationDelay: "150ms" }}>
        <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 font-body text-[13px] text-black/70 ring-1 ring-black/[0.06]">
          <span className="size-2 animate-pulse rounded-full bg-brand-green" />
          Session live
        </span>
        <span className="rounded-full bg-white/80 px-3 py-1.5 font-body text-[13px] text-black/70 ring-1 ring-black/[0.06]">
          Real workspace · AI tools
        </span>
      </div>
      <div className="hero-rise mt-8 w-full max-w-[520px]" style={{ animationDelay: "300ms" }}>
        <AgentVisual />
      </div>
    </div>
  );
}
