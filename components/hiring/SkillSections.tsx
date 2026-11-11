import Image from "next/image";
import TypedPhrase from "@/components/hero/TypedPhrase";
import Reveal from "@/components/sections/Reveal";
import ScreeningPixels from "@/components/sections/screening/ScreeningPixels";
import codingIde from "@/public/Claude_Code_IDE.png";
import nonCodingIde from "@/public/NonCoding_IDE.png";
import { Body, CenterHeading, Section } from "./parts";
import StepCards from "./StepCards";

/* ---------- From flood to shortlist ---------- */

export function ShortlistSection() {
  return (
    <Section labelledBy="shortlist-heading" id="how-it-works">
      <CenterHeading
        id="shortlist-heading"
        eyebrow="From flood to shortlist"
        lead="From 1,000 candidates"
        accent="to your top 5."
        description="One real task for everyone. A scored report in 5 minutes."
      />
      <Body>
        <StepCards />
      </Body>
    </Section>
  );
}

/* ---------- Working with AI is the new skill ---------- */

const DIMENSIONS = [
  { title: "Subject matter expertise" },
  { title: "Requirements clarity" },
  { title: "Problem decomposition" },
  { title: "Product + design thinking" },
  { title: "AI steering" },
  { title: "Review + correction" },
];

function Pattern({ strong }: { strong?: boolean }) {
  const steps = strong ? ["Clear goal", "constrained task", "validate", "correct", "iterate."] : ["Vague goal", "agent output", "accept result", "wrong deliverable."];
  return (
    <div className={`h-full rounded-[18px] p-6 sm:p-7 ${strong ? "bg-brand-green-50 ring-1 ring-brand-green/15" : "bg-[#fbf0ee] ring-1 ring-[#e9c9c2]/50"}`}>
      <p className={`font-body text-[11.5px] font-medium uppercase tracking-[0.16em] ${strong ? "text-brand-green" : "text-[#b0503c]"}`}>
        {strong ? "Strong pattern" : "Weak pattern"}
      </p>
      <p className="mt-3 font-body text-[17px] leading-[1.55] text-black/55 sm:text-[18px]">
        {steps.map((s, i) => {
          const last = i === steps.length - 1;
          return (
            <span key={s}>
              {last ? <strong className="font-medium text-ink-900">{s}</strong> : s}
              {!last && <span className={strong ? "text-brand-green" : "text-black/30"}> → </span>}
            </span>
          );
        })}
      </p>
    </div>
  );
}

export function NewSkillSection() {
  return (
    <section aria-labelledby="newskill-heading" className="border-t border-dashed border-black/10 bg-white px-4 sm:px-8">
      <div className="mx-auto max-w-[1200px] border-x border-black/[0.06] px-4 py-14 sm:px-8 md:py-20 lg:px-12">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[28px] bg-white px-5 py-12 ring-1 ring-black/[0.07] shadow-[0_40px_80px_-60px_rgba(6,36,24,0.45)] sm:px-10 md:py-16">
            <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-[260px] opacity-60 [mask-image:linear-gradient(to_bottom,#000,transparent)]">
              <ScreeningPixels />
            </div>
            <div className="mx-auto max-w-[680px] text-center">
              <h2 id="newskill-heading" className="text-balance font-heading text-[32px] leading-[1.1] font-medium tracking-[-1px] text-black sm:text-[40px] lg:text-[44px]">
                Working with AI is{" "}
                <em className="text-headline-accent italic">
                  <TypedPhrase text="the new skill." startOnView reserveSpace />
                </em>
              </h2>
              <p className="mt-5 text-pretty font-body text-[18px] leading-[1.55] text-black/55 lg:text-[20px]">
                The only way to measure it: watch someone do it, on a real task.
              </p>
            </div>

            <div className="mx-auto mt-10 grid max-w-[1000px] gap-4 md:grid-cols-2">
              <Reveal className="h-full">
                <Pattern />
              </Reveal>
              <Reveal delay={120} className="h-full">
                <Pattern strong />
              </Reveal>
            </div>

            <p className="mt-12 text-center font-body text-[11.5px] font-medium uppercase tracking-[0.16em] text-brand-green">
              AI fluency is a systems skill · 6 dimensions we measure
            </p>
            <ol className="mx-auto mt-5 grid max-w-[1000px] grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {DIMENSIONS.map((d, i) => (
                <Reveal as="li" key={d.title} delay={(i % 3) * 90}>
                  <div className="group flex h-full items-center gap-3 rounded-[14px] bg-[#f8f8f7] px-4 py-3.5 transition-colors duration-300 hover:bg-brand-green-50 sm:gap-4 sm:px-5 sm:py-4">
                    <span className="w-9 shrink-0 font-heading text-[24px] leading-none text-headline-accent italic transition-transform duration-500 group-hover:-translate-y-0.5 sm:w-auto sm:text-[28px]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="min-w-0 font-display text-[15px] leading-[1.3] font-semibold text-ink-900 sm:text-[16px]">{d.title}</h3>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Real tasks, real AI tools ---------- */

const TRACKS = [
  {
    tag: "Coding",
    logos: (
      <>
        <Image src="/logos/claude-code-mark.png" alt="Claude Code" width={600} height={162} unoptimized className="h-[18px] w-auto" />
        <Image src="/logos/github-copilot-mark.png" alt="GitHub Copilot" width={600} height={212} unoptimized className="h-[22px] w-auto" />
      </>
    ),
    title: "Assess AI coding skills",
    roles: ["Engineers", "Data scientists", "ML / AI roles", "DevOps", "QA"],
    shot: codingIde,
    alt: "VibeLevel Claude Code-style assessment IDE",
    bg: "linear-gradient(160deg in oklab, #d4f1dd 0%, #eef6df 100%)",
  },
  {
    tag: "Non-coding",
    logos: <span className="font-display text-[15px] font-semibold text-ink-900">Claude</span>,
    title: "Assess AI non-coding skills",
    roles: ["PMs", "Sales", "Support", "Analysts", "Ops"],
    shot: nonCodingIde,
    alt: "VibeLevel non-coding artifact IDE",
    bg: "linear-gradient(160deg in oklab, #eef6df 0%, #fdf1c7 100%)",
  },
];

export function RealTasksSection() {
  return (
    <Section labelledBy="tasks-heading">
      <CenterHeading
        id="tasks-heading"
        eyebrow="Claude, Copilot & Claude Code IDEs"
        lead="Real tasks. Real AI tools."
        accent="Real signal."
        description="Every role works with AI now. Measure it for all of them, on one platform."
      />
      <Body>
        <div className="grid gap-5 lg:grid-cols-2">
          {TRACKS.map((t, i) => (
            <Reveal key={t.tag} delay={i * 120} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-[24px] ring-1 ring-black/[0.06] transition-shadow duration-500 hover:shadow-[0_32px_64px_-40px_rgba(6,36,24,0.45)]" style={{ backgroundImage: t.bg }}>
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-3">
                    {t.logos}
                    <span className="font-body text-[11.5px] font-medium uppercase tracking-[0.16em] text-brand-green">{t.tag}</span>
                  </div>
                  <h3 className="mt-4 font-heading text-[26px] leading-[1.15] font-medium tracking-[-0.6px] text-black sm:text-[28px]">{t.title}</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {t.roles.map((r) => (
                      <li key={r} className="rounded-full bg-white/80 px-3 py-1 font-body text-[13.5px] text-black/70 ring-1 ring-black/[0.06]">
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Screenshot bleeds off the card's bottom edge and lifts on hover. */}
                <div className="relative mt-auto ml-6 aspect-[16/10] overflow-hidden rounded-tl-[14px] shadow-[0_-10px_40px_-20px_rgba(6,36,24,0.4)] ring-1 ring-black/[0.08] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5 sm:ml-8">
                  <Image src={t.shot} alt={t.alt} fill placeholder="blur" sizes="(min-width: 1024px) 560px, 100vw" className="object-cover object-left-top" />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Body>
    </Section>
  );
}

