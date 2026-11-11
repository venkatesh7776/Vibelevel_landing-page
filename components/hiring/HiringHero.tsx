import HeroToolStrip from "@/components/hero/HeroToolStrip";
import PrimaryButton from "@/components/hero/PrimaryButton";
import TypedPhrase from "@/components/hero/TypedPhrase";
import PixelIcon, { type PixelIconName } from "@/components/ui/PixelIcon";
import WatchDemo from "./WatchDemo";

const ROLES: { icon: PixelIconName; label: string }[] = [
  { icon: "code", label: "Engineers" },
  { icon: "doc", label: "Product / TPM" },
  { icon: "skill", label: "Sales" },
  { icon: "faq", label: "Support" },
  { icon: "report", label: "Finance" },
  { icon: "compass", label: "Operations" },
];

/** Hiring hero: headline, CTAs, the AI tools, then the real IDE with what it proves, and who it's for. */
export default function HiringHero() {
  return (
    <section aria-labelledby="hiring-heading" className="px-4 sm:px-8">
      <div className="mx-auto max-w-[1200px] pb-16 pt-14 text-center sm:pt-20 md:pb-20 lg:pt-24">
        <p className="hero-rise mx-auto inline-flex items-center gap-2 rounded-full bg-brand-green-50 px-3 py-1.5 font-body text-[10.5px] font-medium uppercase tracking-[0.1em] text-brand-green ring-1 ring-brand-green/15 sm:text-[12px] sm:tracking-[0.16em]">
          <span aria-hidden="true" className="size-[5px] bg-brand-green" />
          VibeLevel Hiring
        </p>
        <h1
          id="hiring-heading"
          className="hero-rise mx-auto mt-6 max-w-[900px] text-balance font-heading text-[34px] leading-[1.1] font-medium tracking-[-1px] text-ink md:text-[40px] lg:text-[46px]"
          style={{ animationDelay: "100ms" }}
        >
          Working with AI is{" "}
          <em className="text-headline-accent italic">
            <TypedPhrase text="the new skill." reserveSpace />
          </em>
        </h1>
        <p
          className="hero-rise mx-auto mt-[22px] max-w-[628px] text-pretty font-body text-[16px] leading-[23px] text-ink/80 sm:mt-[26px] sm:text-[18px] sm:leading-[25.4px]"
          style={{ animationDelay: "200ms" }}
        >
          See who can build production-grade work with AI, not just vibe-code.
        </p>
        <div className="hero-rise mx-auto mt-[22px] flex flex-wrap justify-center gap-[12px] sm:mt-[26px]" style={{ animationDelay: "300ms" }}>
          <PrimaryButton href="/request-demo">
            Request a Demo
          </PrimaryButton>
          <WatchDemo />
        </div>
        {/* For every role */}
        <div className="hero-rise mt-10 flex flex-col items-center gap-3" style={{ animationDelay: "400ms" }}>
          <p className="font-body text-[11.5px] font-medium uppercase tracking-[0.16em] text-black/40">For every role</p>
          <ul className="flex flex-wrap justify-center gap-2">
            {ROLES.map((r) => (
              <li
                key={r.label}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-body text-[14px] text-black/70 ring-1 ring-black/[0.07] transition-[background-color,color] duration-300 hover:bg-brand-green-50 hover:text-ink-900"
              >
                <PixelIcon name={r.icon} className="size-3.5 text-brand-green" />
                {r.label}
              </li>
            ))}
          </ul>
        </div>
        {/* The home page's tool marquee, closing the hero. */}
        <div className="mt-14 md:mt-16">
          <HeroToolStrip title="Assessments using" />
        </div>
      </div>
    </section>
  );
}
