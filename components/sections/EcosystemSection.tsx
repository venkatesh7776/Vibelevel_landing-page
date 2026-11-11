import type { ReactNode } from "react";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { AuraVisual, CampusVisual } from "./ecosystem/ProductVisuals";

type Product = {
  id: string;
  label: string;
  /** Headline split so the second half carries the green italic accent. */
  title: [string, string];
  body: string;
  cta: string;
  /** No product pages exist yet, so the CTAs point at the cards themselves. */
  href: string;
  visual: ReactNode;
  gradient: string;
};

const PRODUCTS: Product[] = [
  {
    id: "aura",
    label: "Aura · For individuals",
    title: ["Practice.", "Earn evidence you can share."],
    body: "Practice in a real AI workspace and earn shareable skill evidence.",
    cta: "Explore Aura",
    href: "/products/aura",
    visual: <AuraVisual />,
    // The mint end of the theme gradient.
    gradient: "linear-gradient(160deg in oklab, #d4f1dd 0%, #eef6df 100%)",
  },
  {
    id: "campus",
    label: "Campus · For campuses",
    title: ["AI-ready students,", "proven to employers."],
    body: "Run campus-wide AI vibeathons and surface top performers to hiring partners.",
    cta: "Explore Campus",
    href: "/products/campus",
    visual: <CampusVisual />,
    // The cream end of the theme gradient.
    gradient: "linear-gradient(160deg in oklab, #eef6df 0%, #fdf1c7 100%)",
  },
];

function Arrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 transition-transform duration-300 ease-out group-hover/cta:translate-x-1">
      <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Section 6 — the two products beyond hiring: Aura for individuals, Campus for campuses. */
export default function EcosystemSection() {
  return (
    <section aria-labelledby="ecosystem-heading" className="border-t border-dashed border-black/10 bg-white px-4 sm:px-8">
      <div className="mx-auto max-w-[1200px] border-x border-black/[0.06]">
        <SectionHeading
          id="ecosystem-heading"
          lead="Building an AI-ready future,"
          accent="beyond hiring."
          description="VibeLevel helps individuals build skills and campuses develop AI-ready talent through practical experiences."
        />

        <ul className="grid gap-5 px-4 pb-16 sm:px-8 md:pb-24 lg:grid-cols-2 lg:gap-6 lg:px-12 lg:pb-28">
          {PRODUCTS.map((p, i) => (
            <Reveal as="li" key={p.id} delay={i * 120}>
              <article
                id={p.id}
                className="group flex h-full scroll-mt-28 flex-col overflow-hidden rounded-[24px] bg-white ring-1 ring-black/[0.07] transition-[box-shadow,translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_32px_64px_-40px_rgba(6,36,24,0.45)]"
              >
                <div
                  className="flex h-[190px] items-center justify-center overflow-hidden px-8 sm:h-[210px]"
                  style={{ backgroundImage: p.gradient }}
                >
                  <div className="scale-[0.68] sm:scale-75">{p.visual}</div>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:px-8 sm:py-7">
                  <Eyebrow>{p.label}</Eyebrow>
                  <h3 className="mt-4 text-balance font-heading text-[24px] leading-[1.15] font-medium tracking-[-0.6px] text-black sm:text-[26px]">
                    {p.title[0]} <em className="text-headline-accent italic">{p.title[1]}</em>
                  </h3>
                  <p className="mt-2.5 max-w-[460px] text-pretty font-body text-[16px] leading-[1.55] text-black/55">
                    {p.body}
                  </p>
                  <a
                    href={p.href}
                    className="group/cta mt-auto inline-flex w-fit items-center gap-2 pt-5 font-body text-[16px] font-medium text-ink-900 transition-colors duration-200 hover:text-brand-green focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-green"
                  >
                    {p.cta}
                    <Arrow />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
