import type { ReactNode } from "react";
import TypedPhrase from "@/components/hero/TypedPhrase";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";
import { AgentVisual, EvidenceVisual, SignalsVisual, TaskVisual } from "./features/FeatureVisuals";

type Feature = {
  n: string;
  /** Title split so the second half carries the green italic accent. */
  title: [string, string];
  body: string;
  points: string[];
  visual: ReactNode;
};

const FEATURES: Feature[] = [
  {
    n: "01",
    title: ["Real", "agentic workflows"],
    body: "Assess how candidates work with AI tools like Claude Code and GitHub Copilot in a real development environment.",
    points: ["Claude Code", "GitHub Copilot", "A real development environment"],
    visual: <AgentVisual />,
  },
  {
    n: "02",
    title: ["Production-grade", "tasks"],
    body: "Create role-specific assessments based on your job description, technology stack, and actual workflows.",
    points: ["Built from your job description", "Matched to your technology stack", "Based on your actual workflows"],
    visual: <TaskVisual />,
  },
  {
    n: "03",
    title: ["Beyond", "prompting scores"],
    body: "Evaluate AI fluency, engineering judgment, job-specific skills, and human contribution.",
    points: ["AI fluency", "Engineering judgment", "Job-specific skills", "Human contribution"],
    visual: <SignalsVisual />,
  },
  {
    n: "04",
    title: ["Evidence-backed", "scoring"],
    body: "Get skill-level scores with written justifications based on candidates' actual work.",
    points: ["Skill-level scores", "Written justifications", "Grounded in candidates' actual work"],
    visual: <EvidenceVisual />,
  },
];

function Check() {
  return (
    <svg aria-hidden="true" viewBox="0 0 12 12" className="mt-[7px] size-3.5 shrink-0 text-brand-green">
      <path d="M2.5 6.2 5 8.5l4.5-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const GRADIENT = "linear-gradient(135deg in oklab, #d4f1dd 0%, #eef6df 50%, #fdf1c7 100%)";

/**
 * Section 4 — the four features as alternating rows: copy on one side, a product visual on our
 * gradient on the other. Same frame as the sections above (dashed rules, side rules).
 */
export default function FeaturesSection() {
  return (
    <section aria-labelledby="features-heading" className="bg-white px-4 sm:px-8">
      <div className="mx-auto max-w-[1200px] border-x border-black/[0.06]">
        <div className="px-5 pb-6 pt-16 sm:px-10 md:pt-24 lg:px-16 lg:pt-28">
          <Reveal>
            <h2
              id="features-heading"
              className="max-w-[640px] text-balance font-heading text-[32px] leading-[1.1] font-medium tracking-[-1px] text-black sm:text-[40px] lg:text-[44px]"
            >
              Everything you need to evaluate{" "}
              <em className="text-headline-accent italic">
                <TypedPhrase text="real-world skills." startOnView reserveSpace />
              </em>
            </h2>
          </Reveal>
        </div>

        <ul>
          {FEATURES.map((f, i) => (
            <li
              key={f.n}
              className={`grid items-center gap-10 px-4 py-12 sm:px-8 md:py-16 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-20 ${i ? "border-t border-dashed border-black/10" : ""}`}
            >
              <Reveal className={`px-1 sm:px-2 lg:px-4 ${i % 2 ? "lg:order-2" : ""}`}>
                <Eyebrow>{f.n}</Eyebrow>
                <h3 className="mt-4 text-balance font-heading text-[28px] leading-[1.15] font-medium tracking-[-0.8px] text-black sm:text-[34px] lg:text-[38px]">
                  {f.title[0]} <em className="text-headline-accent italic">{f.title[1]}</em>
                </h3>
                <p className="mt-4 max-w-[480px] text-pretty font-body text-[17px] leading-[1.55] text-black/55 lg:text-[18px]">
                  {f.body}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {f.points.map((p) => (
                    <li key={p} className="flex gap-3 font-body text-[16px] leading-[1.6] text-black/70">
                      <Check />
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={120} className={i % 2 ? "lg:order-1" : ""}>
                <div
                  className="flex min-h-[360px] items-center justify-center overflow-hidden rounded-[24px] px-5 py-10 ring-1 ring-black/[0.04] sm:min-h-[420px] sm:px-10"
                  style={{ backgroundImage: GRADIENT }}
                >
                  {f.visual}
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
