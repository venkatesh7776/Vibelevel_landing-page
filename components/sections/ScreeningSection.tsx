import TypedPhrase from "@/components/hero/TypedPhrase";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";
import PillarsShowcase from "./screening/PillarsShowcase";

/**
 * Section 3 — introduces VibeLevel Screening and its four pillars. Same frame as the
 * problem section: full-bleed dashed rule on top, side rules, heading left / copy right, and a
 * dashed rule closing the block.
 */
export default function ScreeningSection() {
  return (
    <section
      aria-labelledby="screening-heading"
      className="border-t border-dashed border-black/10 bg-white px-4 sm:px-8"
    >
      <div className="mx-auto max-w-[1200px] border-x border-black/[0.06]">
        <div className="border-b border-dashed border-black/10">
          <div className="grid gap-8 px-5 pb-12 pt-16 sm:px-10 md:pb-16 md:pt-24 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16 lg:px-16 lg:pb-20 lg:pt-28">
            <Reveal>
              <Eyebrow>The next-gen hiring process</Eyebrow>
              <h2
                id="screening-heading"
                className="mt-5 max-w-[560px] text-balance font-heading text-[32px] leading-[1.1] font-medium tracking-[-1px] text-black sm:text-[40px] lg:text-[44px]"
              >
                Meet{" "}
                <em className="text-headline-accent italic">
                  <TypedPhrase text="VibeLevel Screening." startOnView reserveSpace />
                </em>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-pretty font-body text-[18px] leading-[1.55] text-black/55 lg:text-[20px]">
                An AI-powered assessment platform that helps companies evaluate candidates through real-world tasks,
                AI collaboration, and evidence-backed skill assessment.
              </p>
            </Reveal>
          </div>

          <Reveal className="px-4 pb-12 sm:px-8 md:pb-16 lg:px-12 lg:pb-20">
            <PillarsShowcase />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
