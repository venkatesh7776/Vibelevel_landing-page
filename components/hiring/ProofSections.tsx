import Image from "next/image";
import Reveal from "@/components/sections/Reveal";
import ScreeningPixels from "@/components/sections/screening/ScreeningPixels";
import type { PixelIconName } from "@/components/ui/PixelIcon";
import builderShot from "@/public/Assessment_Builder_Image.png";
import { Body, CenterHeading, GRADIENT, Section } from "./parts";
import ScoreExplorer from "./ScoreExplorer";
import { AnimatedSteps } from "@/components/site/ProductBlocks";

/* ---------- Scoring engine ---------- */

const PRINCIPLES = ["Matched to a skills taxonomy", "Craft and contribution scored separately", "Contribution measured, not judged", "Thin evidence gets a question"];

export function ScoringSection() {
  return (
    <Section labelledBy="scoring-heading">
      <CenterHeading
        id="scoring-heading"
        eyebrow="Scoring engine"
        lead="Four questions behind"
        accent="every score."
        description="An evidence-based engine, calibrated on thousands of real assessments. Not a prompt around a model."
      />
      <Body>
        <Reveal>
          <ScoreExplorer />
        </Reveal>
        <Reveal className="mt-6">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {PRINCIPLES.map((p) => (
              <li key={p} className="flex items-center gap-2 font-body text-[14px] text-black/55">
                <span aria-hidden="true" className="size-[5px] bg-brand-green" />
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </Body>
    </Section>
  );
}

/* ---------- Candidate understanding ---------- */

const ANSWERS = [
  { file: "backend/main.py", q: "How does your /chat endpoint keep answers grounded in real data?", status: "No answer recorded", level: 1, ok: false },
  { file: "backend/tools.py", q: "Why did you separate these three tools this way?", status: "Answered · 41s", level: 4, ok: true },
];

export function UnderstandingSection() {
  return (
    <Section labelledBy="understanding-heading">
      <CenterHeading
        id="understanding-heading"
        eyebrow="Candidate understanding"
        lead="Proof they understand"
        accent="what they built."
        description="Short video questions about their own code. Can they explain it, not just ship it?"
      />
      <Body>
        <div className="relative isolate overflow-hidden rounded-[26px] p-4 ring-1 ring-black/[0.05] sm:p-8 lg:p-10" style={{ backgroundImage: GRADIENT }}>
          <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-60">
            <ScreeningPixels />
          </div>
          <div className="mx-auto grid max-w-[920px] gap-4 md:grid-cols-2">
            {ANSWERS.map((a, i) => (
              <Reveal key={a.file} delay={i * 160}>
                <article className="h-full rounded-[20px] bg-white p-6 shadow-[0_24px_50px_-30px_rgba(6,36,24,0.5)] ring-1 ring-black/[0.05] transition-transform duration-500 hover:-translate-y-1">
                  <p className="font-mono text-[12px] text-black/40">{a.file}</p>
                  <p className="mt-3 font-heading text-[20px] leading-[1.35] text-black">&ldquo;{a.q}&rdquo;</p>
                  <div className="mt-6 flex items-center justify-between gap-3 border-t border-dashed border-black/10 pt-4">
                    <span
                      className={`rounded-full px-3 py-1 font-body text-[13px] font-medium ${
                        a.ok ? "bg-brand-green-50 text-brand-green ring-1 ring-brand-green/15" : "bg-[#fbf0ee] text-[#b0503c] ring-1 ring-[#e9c9c2]/60"
                      }`}
                    >
                      {a.status}
                    </span>
                    <span className="flex items-center gap-2 font-body text-[13px] text-black/55">
                      Understanding
                      <span aria-label={`${a.level} of 4`} className="flex gap-1">
                        {[0, 1, 2, 3].map((k) => (
                          <span key={k} className={`h-3 w-2 ${k < a.level ? (a.ok ? "bg-brand-green" : "bg-[#d4513a]") : "bg-black/10"}`} />
                        ))}
                      </span>
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Body>
    </Section>
  );
}

/* ---------- Hiring manager journey ---------- */

const JOURNEY: { icon: PixelIconName; title: string; body: string }[] = [
  { icon: "doc", title: "Describe the role", body: "Get a task-based assessment in under 5 minutes." },
  { icon: "compass", title: "Trigger from your ATS", body: "Fires at your screening stage in Ashby or Lever." },
  { icon: "code", title: "Candidates build", body: "20–45 min in a real, proctored AI IDE." },
  { icon: "skill", title: "Get your shortlist", body: "Ranked across 7 dimensions. Interview the best." },
];

export function ManagerJourneySection() {
  return (
    <Section labelledBy="journey-heading">
      <CenterHeading
        id="journey-heading"
        eyebrow="Hiring manager journey"
        lead="From job req to shortlist."
        accent="In days, not weeks."
        description="Four steps, no extra tooling."
      />
      <Body>
        <AnimatedSteps steps={JOURNEY} />
      </Body>
    </Section>
  );
}

/* ---------- AI assessment builder ---------- */

const BUILDER_STEPS = ["Describe the role", "Validated in a live sandbox", "Published, candidate-ready"];

export function BuilderSection({
  id = "builder-heading",
  lead = "Chat your assessment",
  accent = "into existence.",
  eyebrow = "AI assessment builder",
  description = "Describe the role and skills. VibeLevel builds, validates and publishes the test.",
  steps = BUILDER_STEPS,
}: { id?: string; lead?: string; accent?: string; eyebrow?: string; description?: string; steps?: string[] } = {}) {
  return (
    <Section labelledBy={id}>
      <CenterHeading id={id} eyebrow={eyebrow} lead={lead} accent={accent} description={description} />
      <Body>
        <Reveal>
          <div className="group relative isolate overflow-hidden rounded-[26px] px-4 pt-6 ring-1 ring-black/[0.05] sm:px-10 sm:pt-10 lg:px-16 lg:pt-14" style={{ backgroundImage: GRADIENT }}>
            <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-70">
              <ScreeningPixels />
            </div>
            <ol className="mb-6 flex flex-wrap justify-center gap-2 sm:mb-8">
              {steps.map((s, i) => (
                <li key={s} className="flex items-center gap-2 rounded-full bg-white/85 px-3.5 py-1.5 font-body text-[13.5px] text-ink-900 ring-1 ring-black/[0.06] backdrop-blur">
                  <span className="flex size-5 items-center justify-center rounded-full bg-brand-green font-body text-[11px] text-white">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
            {/* The builder rises out of the bottom edge and lifts on hover. */}
            <div className="overflow-hidden rounded-t-[16px] shadow-[0_-20px_60px_-30px_rgba(6,36,24,0.5)] ring-1 ring-black/[0.08] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5">
              <Image src={builderShot} alt="VibeLevel AI Assessment Builder, chat-driven authoring" placeholder="blur" sizes="(min-width: 1100px) 1000px, 100vw" className="block h-auto w-full" />
            </div>
          </div>
        </Reveal>
      </Body>
    </Section>
  );
}
