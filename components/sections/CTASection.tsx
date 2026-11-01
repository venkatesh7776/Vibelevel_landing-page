import TypedPhrase from "@/components/hero/TypedPhrase";
import PrimaryButton from "@/components/hero/PrimaryButton";
import SecondaryButton from "@/components/hero/SecondaryButton";
import Reveal from "./Reveal";
import ScreeningPixels from "./screening/ScreeningPixels";

const GRADIENT = "linear-gradient(135deg in oklab, #d4f1dd 0%, #eef6df 50%, #fdf1c7 100%)";

/** Section 8 — the closing call to action: our gradient, live corner pixels, one strong headline. */
export default function CTASection() {
  return (
    <section aria-labelledby="cta-heading" className="border-t border-dashed border-black/10 bg-white px-4 sm:px-8">
      <div className="mx-auto max-w-[1200px] border-x border-black/[0.06] px-4 py-12 sm:px-8 md:py-16 lg:px-12">
        <Reveal>
          <div
            className="relative isolate overflow-hidden rounded-[28px] px-6 py-20 text-center ring-1 ring-black/[0.04] sm:px-12 md:py-28"
            style={{ backgroundImage: GRADIENT }}
          >
            {/* The same live pixels as the landscape above: they blink and part around the cursor. */}
            <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-50 sm:opacity-100">
              <ScreeningPixels />
            </div>
            <h2
              id="cta-heading"
              className="mx-auto max-w-[760px] text-balance font-heading text-[36px] leading-[1.08] font-medium tracking-[-1.2px] text-black sm:text-[48px] lg:text-[56px]"
            >
              Hire for what people can{" "}
              <em className="text-headline-accent italic">
                <TypedPhrase text="actually do." startOnView reserveSpace />
              </em>
            </h2>
            <p className="mx-auto mt-5 max-w-[540px] text-pretty font-body text-[17px] leading-[1.55] text-black/60 md:text-[19px]">
              See how VibeLevel helps your team evaluate real-world skills, AI collaboration, and job readiness.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <PrimaryButton href="#book-demo" size="lg">
                Book a demo
              </PrimaryButton>
              <SecondaryButton href="#screening-heading" size="lg" className="bg-white/70">
                Explore VibeLevel Screening
              </SecondaryButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
