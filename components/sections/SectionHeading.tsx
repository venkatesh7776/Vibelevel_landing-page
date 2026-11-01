import type { ReactNode } from "react";
import TypedPhrase from "@/components/hero/TypedPhrase";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";

type SectionHeadingProps = {
  id: string;
  eyebrow?: string;
  /** Plain lead-in, then the phrase that types in as the green italic accent. */
  lead: string;
  accent: string;
  description?: ReactNode;
};

/**
 * The section header used since section 3: eyebrow + serif heading on the left, description on
 * the right (stacked on mobile). The accent phrase types in when it scrolls into view.
 */
export default function SectionHeading({ id, eyebrow, lead, accent, description }: SectionHeadingProps) {
  return (
    <div className="grid gap-8 px-5 pb-12 pt-16 sm:px-10 md:pb-16 md:pt-24 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16 lg:px-16 lg:pb-20 lg:pt-28">
      <Reveal>
        {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
        <h2
          id={id}
          className="max-w-[560px] text-balance font-heading text-[32px] leading-[1.1] font-medium tracking-[-1px] text-black sm:text-[40px] lg:text-[44px]"
        >
          {lead}{" "}
          <em className="text-headline-accent italic">
            <TypedPhrase text={accent} startOnView reserveSpace />
          </em>
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={120}>
          <p className={`text-pretty font-body text-[18px] leading-[1.55] text-black/55 lg:text-[20px]`}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
