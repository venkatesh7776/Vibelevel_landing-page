import PrimaryButton from "@/components/hero/PrimaryButton";
import TypedPhrase from "@/components/hero/TypedPhrase";
import Reveal from "@/components/sections/Reveal";
import FAQAccordion, { type FAQItem } from "@/components/sections/faq/FAQAccordion";
import ScreeningPixels from "@/components/sections/screening/ScreeningPixels";
import PixelIcon, { type PixelIconName } from "@/components/ui/PixelIcon";
import Eyebrow from "@/components/sections/Eyebrow";
import Expandable from "./Expandable";
import WatchDemo from "./WatchDemo";
import { Body, CenterHeading, Check, Chip, Cross, GRADIENT, Kicker, Section } from "./parts";

/* ---------- ATS integrations ---------- */

const ATS = [
  { name: "Ashby", points: ["Trigger from any pipeline stage", "Scores sync to the profile"] },
  { name: "Lever", points: ["One-click activation", "Results land as candidate notes"] },
];

function AtsCard({ a }: { a: (typeof ATS)[number] }) {
  return (
    <article className="h-full rounded-[22px] bg-white p-6 ring-1 ring-black/[0.07] shadow-[0_24px_50px_-40px_rgba(6,36,24,0.5)] transition-[box-shadow,translate] duration-500 hover:-translate-y-1 hover:shadow-[0_28px_56px_-36px_rgba(6,36,24,0.45)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-[12px] font-display text-[20px] font-bold text-brand-green ring-1 ring-brand-green/10" style={{ backgroundImage: GRADIENT }}>
            {a.name[0]}
          </span>
          <h3 className="font-display text-[20px] font-semibold text-ink-900">{a.name}</h3>
        </div>
        <Chip tone="green">Native</Chip>
      </div>
      <ul className="mt-5 space-y-2.5">
        {a.points.map((p) => (
          <li key={p} className="flex items-center gap-2.5 font-body text-[15px] text-black/65">
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-green-50 text-brand-green">
              <Check className="size-3" />
            </span>
            {p}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function ATSSection() {
  return (
    <Section labelledBy="ats-heading">
      <CenterHeading
        id="ats-heading"
        eyebrow="ATS integrations"
        lead="Fits your workflow."
        accent="Zero friction."
        description="Native Ashby and Lever integrations. Results flow straight back."
      />
      <Body>
        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          {ATS.map((a, i) => (
            <Reveal key={a.name} delay={i * 120}>
              <AtsCard a={a} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <span className="font-body text-[14px] text-black/45">Also works standalone:</span>
          <span className="flex flex-wrap justify-center gap-2">
            <Chip>Direct link</Chip>
            <Chip>Careers page embed</Chip>
            <Chip>More ATS soon</Chip>
          </span>
        </Reveal>
      </Body>
    </Section>
  );
}

/* ---------- Proctoring & anti-cheat ---------- */

const PROCTOR: { icon: PixelIconName; title: string }[] = [
  { icon: "shield", title: "Multi-signal detection" },
  { icon: "skill", title: "Confidence-graded" },
  { icon: "person", title: "Reviewer-ready evidence" },
];

const LEVELS = [
  { label: "Low", score: 14, signals: 1, text: "text-black/70", bar: "bg-black/40", dot: "bg-black/40", w: "group-data-[shown=true]:w-[14%]" },
  { label: "Medium", score: 38, signals: 2, text: "text-[#8a6a00]", bar: "bg-[#d9a514]", dot: "bg-[#d9a514]", w: "group-data-[shown=true]:w-[38%]" },
  { label: "High", score: 64, signals: 3, text: "text-[#b0503c]", bar: "bg-[#d4513a]", dot: "bg-[#d4513a]", w: "group-data-[shown=true]:w-[64%]" },
];

export function ProctoringSection() {
  return (
    <Section labelledBy="proctor-heading">
      <CenterHeading
        id="proctor-heading"
        eyebrow="Proctoring & anti-cheat"
        lead="Built-in detection for"
        accent="external AI tool use."
        description="ChatGPT, side-panels, automation and more, flagged with a confidence score."
      />
      <Body>
        <div className="relative isolate overflow-hidden rounded-[26px] p-4 ring-1 ring-black/[0.05] sm:p-8 lg:p-10" style={{ backgroundImage: GRADIENT }}>
          <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-60">
            <ScreeningPixels />
          </div>
          <ul className="grid gap-3 md:grid-cols-3 md:gap-4">
            {LEVELS.map((l, i) => (
              <Reveal as="li" key={l.label} delay={i * 140} className="group">
                <div className="h-full rounded-[18px] bg-white p-5 shadow-[0_24px_50px_-32px_rgba(6,36,24,0.5)] ring-1 ring-black/[0.05] transition-transform duration-500 hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <span className={`flex items-center gap-2 font-display text-[15px] font-semibold ${l.text}`}>
                      <span className={`size-2 rounded-full ${l.dot}`} />
                      {l.label} confidence
                    </span>
                    <span className="font-mono text-[13px] text-black/45">{l.score}/100</span>
                  </div>
                  {/* Fills to the score when the card scrolls in. */}
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-black/[0.06]">
                    <div className={`h-full w-0 rounded-full transition-[width] delay-300 duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${l.bar} ${l.w}`} />
                  </div>
                  <p className="mt-3 font-body text-[13.5px] text-black/50">
                    {l.signals} signal{l.signals > 1 ? "s" : ""} of external assistance
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
        <ul className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {PROCTOR.map((p) => (
            <li key={p.title} className="flex items-center gap-2.5 font-display text-[15px] font-semibold text-ink-900">
              <PixelIcon name={p.icon} className="size-5 text-brand-green" />
              {p.title}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-center font-body text-[13.5px] italic text-black/40">We don&rsquo;t publish detection methods. It keeps the system honest.</p>
      </Body>
    </Section>
  );
}

/* ---------- Identity verification ---------- */

export function IdentitySection() {
  return (
    <Section labelledBy="identity-heading">
      <CenterHeading
        id="identity-heading"
        eyebrow="Identity verification"
        lead="Make sure the right person"
        accent="took the assessment."
        description="Two checks that make impersonation expensive."
      />
      <Body>
        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          {/* ID verification */}
          <Reveal className="h-full">
            <article className="flex h-full flex-col overflow-hidden rounded-[24px] bg-white ring-1 ring-black/[0.07]">
              <div className="p-6 sm:p-8">
                <Chip tone="green">ID verification</Chip>
                <h3 className="mt-4 font-heading text-[24px] leading-[1.2] font-medium text-black">Live photo capture</h3>
                <p className="mt-2 font-body text-[15.5px] leading-[1.5] text-black/55">
                  A baseline photo, checked through the session. Verified or rejected, next to the score.
                </p>
              </div>
              <div className="relative isolate mt-auto flex h-[220px] items-center justify-center overflow-hidden sm:h-[240px]" style={{ backgroundImage: GRADIENT }}>
                <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-60">
                  <ScreeningPixels />
                </div>
                <div className="w-[260px] rounded-[16px] bg-white p-4 shadow-[0_24px_50px_-30px_rgba(6,36,24,0.55)] ring-1 ring-black/[0.06]">
                  <ol className="flex items-center justify-between font-body text-[11px] text-black/45">
                    {["Consent", "Camera", "Capture", "Review"].map((s, i) => (
                      <li key={s} className="flex flex-col items-center gap-1">
                        <span className={`size-2 rounded-full ${i < 3 ? "bg-brand-green" : "bg-black/15"}`} />
                        {s}
                      </li>
                    ))}
                  </ol>
                  <div className="mt-4 flex items-center gap-3 rounded-[12px] bg-[#f8f8f7] p-3">
                    <span className="flex size-11 items-center justify-center rounded-full bg-brand-green-50 text-brand-green">
                      <PixelIcon name="person" className="size-6" />
                    </span>
                    <div className="font-body">
                      <p className="text-[13px] font-medium text-ink-900">Baseline photo</p>
                      <p className="flex items-center gap-1 text-[12px] text-brand-green">
                        <Check className="size-3" /> Verified
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>

          {/* LinkedIn */}
          <Reveal delay={120} className="h-full">
            <article className="flex h-full flex-col overflow-hidden rounded-[24px] bg-white ring-1 ring-black/[0.07]">
              <div className="p-6 sm:p-8">
                <Chip tone="green">LinkedIn authentication</Chip>
                <h3 className="mt-4 font-heading text-[24px] leading-[1.2] font-medium text-black">Verified LinkedIn profile</h3>
                <p className="mt-2 font-body text-[15.5px] leading-[1.5] text-black/55">
                  A real person behind every score, not just an email.
                </p>
              </div>
              <div className="relative isolate mt-auto flex h-[220px] items-center justify-center overflow-hidden sm:h-[240px]" style={{ backgroundImage: GRADIENT }}>
                <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-60">
                  <ScreeningPixels />
                </div>
                <div className="w-[260px] rounded-[16px] bg-white p-4 shadow-[0_24px_50px_-30px_rgba(6,36,24,0.55)] ring-1 ring-black/[0.06]">
                  <div className="flex items-center gap-3">
                    <span className="size-11 rounded-full bg-black/[0.06]" />
                    <div className="flex-1 space-y-1.5">
                      <span className="block h-2.5 w-24 rounded-full bg-black/15" />
                      <span className="block h-2 w-32 rounded-full bg-black/[0.08]" />
                    </div>
                    <span className="flex size-6 items-center justify-center rounded-full bg-brand-green text-white">
                      <Check className="size-3.5" />
                    </span>
                  </div>
                  <span className="mt-4 flex items-center justify-center gap-2 rounded-[10px] bg-[#0A66C2] py-2.5 font-body text-[13px] font-medium text-white">
                    <span className="flex size-4 items-center justify-center rounded-[3px] bg-white text-[10px] font-bold text-[#0A66C2]">in</span>
                    Sign in with LinkedIn to start
                  </span>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </Body>
    </Section>
  );
}

/* ---------- Human-AI collaboration engine ---------- */

const INPUTS = [
  "Prompts",
  "AI Pairing",
  "Design Thinking",
  "Product Thinking",
  "Code Understanding",
  "Testing Skills",
  "Requirements",
  "Strategic Thinking",
];

const LADDER = [
  { level: "Advanced", range: "8.51–10", cls: "bg-brand-green text-white", range_cls: "text-white/75" },
  { level: "Capable", range: "7.01–8.5", cls: "bg-brand-green-50 text-brand-green ring-1 ring-brand-green/15", range_cls: "text-brand-green/70" },
  { level: "Developing", range: "4.01–7", cls: "bg-[#fdf6dc] text-[#7a6200] ring-1 ring-[#e9d48a]/50", range_cls: "text-[#7a6200]/70" },
  { level: "Novice", range: "0–4", cls: "bg-black/[0.04] text-black/60", range_cls: "text-black/40" },
];

/** A connector with dots streaming toward the engine (desktop) or downward (mobile). */
function Stream({ vertical }: { vertical?: boolean }) {
  return (
    <span aria-hidden="true" className={`flex items-center ${vertical ? "flex-col" : ""}`}>
      <span className={vertical ? "engine-stream-y mx-auto block h-10 w-[3px]" : "engine-stream-x block h-[3px] flex-1"} />
      <svg viewBox="0 0 10 10" className={`size-2.5 shrink-0 text-brand-green ${vertical ? "rotate-90" : ""}`}>
        <path d="M2 1l5 4-5 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function EngineSection() {
  return (
    <Section labelledBy="engine-heading">
      <CenterHeading
        id="engine-heading"
        eyebrow="Human-AI collaboration engine"
        lead="Multi-input scoring,"
        accent="four-level ladder."
        description="Every session becomes one comparable level, from Novice to Advanced."
      />
      <Body>
        <Reveal>
          <div className="grid items-center gap-4 rounded-[26px] bg-[#f8f8f7] p-4 ring-1 ring-black/[0.04] sm:p-8 lg:grid-cols-[1.2fr_60px_200px_60px_1fr] lg:gap-0 lg:p-10">
            <div>
              <Kicker>Inputs</Kicker>
              <ul className="mt-4 grid grid-cols-2 gap-2">
                {INPUTS.map((x) => (
                  <li key={x} className="flex items-center gap-2 rounded-[12px] bg-white px-3 py-2.5 font-body text-[14px] text-ink-900 ring-1 ring-black/[0.06]">
                    <span aria-hidden="true" className="size-[5px] shrink-0 bg-brand-green" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden px-1 lg:block">
              <Stream />
            </div>
            <div className="lg:hidden">
              <Stream vertical />
            </div>

            {/* The engine */}
            <div className="relative mx-auto flex size-[180px] items-center justify-center">
              <svg aria-hidden="true" viewBox="0 0 100 100" className="engine-spin absolute inset-0 size-full fill-pixel/70">
                {Array.from({ length: 28 }, (_, k) => {
                  const a = (k / 28) * Math.PI * 2;
                  return <rect key={k} x={50 + 46 * Math.cos(a) - 1.6} y={50 + 46 * Math.sin(a) - 1.6} width="3.2" height="3.2" opacity={k % 3 ? 0.45 : 1} />;
                })}
              </svg>
              <div className="flex size-[138px] flex-col items-center justify-center rounded-full px-3 text-center shadow-[0_20px_44px_-22px_rgba(6,36,24,0.55)] ring-1 ring-brand-green/15" style={{ backgroundImage: GRADIENT }}>
                <PixelIcon name="aura" className="size-6 text-brand-green" />
                <p className="mt-2 font-display text-[15px] font-semibold text-ink-900">Scoring Engine</p>
                <p className="font-body text-[10px] uppercase tracking-[0.1em] text-black/45">Human-AI collab</p>
              </div>
            </div>

            <div className="hidden px-1 lg:block">
              <Stream />
            </div>
            <div className="lg:hidden">
              <Stream vertical />
            </div>
            <div>
              <Kicker>4-level ladder</Kicker>
              <ol className="mt-4 space-y-2">
                {LADDER.map((l, i) => (
                  <Reveal as="li" key={l.level} delay={300 + i * 110}>
                    <div className={`flex items-center justify-between rounded-[12px] px-4 py-3 font-display text-[15px] font-semibold ${l.cls}`}>
                      {l.level}
                      <span className={`font-mono text-[12.5px] font-normal ${l.range_cls}`}>{l.range}</span>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <p className="mx-auto mt-6 max-w-[620px] text-center font-body text-[15px] leading-[1.5] text-black/50">
            Every result is level-tagged: candidates can show a verified badge, and hiring teams can rank like-for-like.
          </p>
        </Reveal>
      </Body>
    </Section>
  );
}

/* ---------- VibeLevel vs others ---------- */

type Cell = boolean | string;
const ROWS: [string, Cell, Cell][] = [
  ["AI coding agent (Copilot-class)", false, true],
  ["AI non-coding assessments (Claude-class)", false, true],
  ["Full IDE (editor, terminal, file tree)", "Basic", true],
  ["AI-native assessment scoring", false, true],
  ["Human contribution detection", false, true],
  ["Anti-cheating & proctoring signals", "Basic", true],
  ["AI resume scoring", false, true],
  ["End-to-end hiring funnel", false, true],
  ["Agentic auto-filter & screening", false, true],
  ["Application forms & resume collection", "Add-on", true],
  ["Multi-dimensional scoring", false, true],
  ["Custom AI agent persona", false, true],
  ["Candidate comparison & ranking", "Limited", true],
  ["Campus Vibeathons & talent pipeline", false, true],
  ["Algorithm / LeetCode-style tests", true, "Supported + AI"],
  ["Pricing", "$300–$500/seat/yr", "Pay-as-you-go"],
  ["Free tier", "Limited", "Generous"],
];

function CellView({ v, us }: { v: Cell; us?: boolean }) {
  if (v === true)
    return (
      <span className={`inline-flex size-6 items-center justify-center rounded-full ${us ? "bg-brand-green text-white" : "bg-black/[0.06] text-black/50"}`}>
        <Check className="size-3.5" />
        <span className="sr-only">Yes</span>
      </span>
    );
  if (v === false)
    return (
      <span className="inline-flex size-6 items-center justify-center text-black/25">
        <Cross className="size-3.5" />
        <span className="sr-only">No</span>
      </span>
    );
  return <span className={`font-body text-[12px] leading-[1.3] sm:text-[13.5px] ${us ? "font-medium text-brand-green" : "text-black/50"}`}>{v}</span>;
}

export function CompareSection({
  id = "compare-heading",
  description = "2–3× more capability at 50% less cost, with the hiring funnel built in.",
}: { id?: string; description?: string } = {}) {
  return (
    <Section labelledBy={id}>
      <CenterHeading id={id} eyebrow="VibeLevel vs others" lead="Built for" accent="the AI-first era." description={description} />
      <Body>
        <Reveal>
          <Expandable label="Show all 17 features">
          <div className="overflow-hidden rounded-[20px] border border-black/[0.08] bg-white sm:rounded-[24px]">
            <table className="w-full table-fixed border-collapse text-left">
              <thead>
                <tr className="border-b border-black/[0.07]">
                  <th scope="col" className="px-4 py-4 font-body text-[11px] font-medium uppercase tracking-[0.14em] text-black/45 sm:px-7 sm:text-[12px]">
                    Feature
                  </th>
                  <th scope="col" className="w-[27%] px-2 py-4 text-center font-display text-[13px] font-semibold text-black/50 sm:w-[24%] sm:px-3 sm:text-[15px]">
                    Others
                  </th>
                  <th scope="col" className="w-[29%] border-x-2 border-t-2 border-brand-green/40 bg-brand-green-50 px-2 py-4 text-center font-display text-[13px] font-semibold text-brand-green sm:w-[26%] sm:px-3 sm:text-[15px]">
                    VibeLevel.ai
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map(([f, o, v]) => (
                  <tr key={f} className="border-b border-dashed border-black/[0.07] transition-colors last:border-0 hover:bg-black/[0.015]">
                    <th scope="row" className="px-4 py-3.5 font-body text-[14px] leading-[1.35] font-normal text-ink-900 sm:px-7 sm:text-[15px]">
                      {f}
                    </th>
                    <td className="px-2 py-3.5 text-center sm:px-3">
                      <CellView v={o} />
                    </td>
                    <td className="border-x-2 border-brand-green/40 bg-brand-green-50/70 px-2 py-3.5 text-center sm:px-3">
                      <CellView v={v} us />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </Expandable>
        </Reveal>
      </Body>
    </Section>
  );
}

/* ---------- FAQ ---------- */

// The first answer is VibeLevel's own; the rest are drawn from what this page says.
const FAQS: FAQItem[] = [
  {
    q: "Is VibeLevel a replacement for interviews?",
    a: "No. VibeLevel helps hiring teams filter for candidates who have already demonstrated the skills a role needs, so you spend less time on people who only look qualified on paper. It can replace or shorten a screening step; interviews remain valuable for deeper discussion and human judgment.",
  },
  {
    q: "Are candidates allowed to use AI?",
    a: "Yes. Candidates work with built-in AI tools such as Claude Code, GitHub Copilot and Claude inside a real AI IDE. Use of external AI tools is flagged by proctoring.",
  },
  {
    q: "What does the hiring team receive after an assessment?",
    a: "A scored report you can review in about 5 minutes: what the candidate built, how they used AI, their Human Contribution Score, integrity and identity signals, and a level from Novice to Advanced.",
  },
  {
    q: "How are required skills tied to the role?",
    a: "Each assessment draws its target skills from a structured taxonomy, calibrated to the stack, role and level, and every skill is evidenced one by one.",
  },
  {
    q: "Does VibeLevel integrate with our ATS?",
    a: "Yes: native Ashby and Lever integrations trigger assessments from a pipeline stage and sync results back. You can also share a direct link or embed it in your careers page.",
  },
  {
    q: "How do integrity signals work?",
    a: "A multi-signal layer watches for external AI tool use and only flags when several signals agree. Each session gets a Low, Medium or High confidence summary for reviewers.",
  },
  {
    q: "Is identity verification available?",
    a: "Yes. A live photo is captured and checked during the session, and candidates can sign in with LinkedIn so a verified profile is attached to every submission.",
  },
  {
    q: "Does VibeLevel automatically decide who to hire?",
    a: "No. VibeLevel ranks candidates on evidence so you interview only the standouts. The hiring decision stays with your team.",
  },
  {
    q: "Can we start with one open role?",
    a: "Yes. Pricing is pay-as-you-go with a free tier, so you can start with a single role.",
  },
];

export function HiringFAQSection() {
  return (
    <section aria-labelledby="hiring-faq-heading" className="border-t border-dashed border-black/10 bg-white px-4 sm:px-8">
      <div className="mx-auto grid max-w-[1200px] gap-10 border-x border-black/[0.06] px-5 py-16 sm:px-10 md:py-24 lg:grid-cols-[1fr_1.5fr] lg:gap-16 lg:px-16 lg:py-28">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>FAQ</Eyebrow>
          <h2
            id="hiring-faq-heading"
            className="mt-5 text-balance font-heading text-[32px] leading-[1.1] font-medium tracking-[-1px] text-black sm:text-[40px] lg:text-[44px]"
          >
            Questions hiring{" "}
            <em className="text-headline-accent italic">
              <TypedPhrase text="teams ask." startOnView reserveSpace />
            </em>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <FAQAccordion items={FAQS} />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Closing CTA ---------- */

export function HiringCTASection() {
  return (
    <section aria-labelledby="hiring-cta-heading" className="border-t border-dashed border-black/10 bg-white px-4 sm:px-8">
      <div className="mx-auto max-w-[1200px] border-x border-black/[0.06] px-4 py-12 sm:px-8 md:py-16 lg:px-12">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[28px] px-6 py-20 text-center ring-1 ring-black/[0.04] sm:px-12 md:py-28" style={{ backgroundImage: GRADIENT }}>
            <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-50 sm:opacity-100">
              <ScreeningPixels />
            </div>
            <h2
              id="hiring-cta-heading"
              className="mx-auto max-w-[760px] text-balance font-heading text-[36px] leading-[1.08] font-medium tracking-[-1.2px] text-black sm:text-[48px] lg:text-[56px]"
            >
              From 1,000 applicants{" "}
              <em className="text-headline-accent italic">
                <TypedPhrase text="to 3 finalists." startOnView reserveSpace />
              </em>
            </h2>
            <p className="mx-auto mt-5 max-w-[480px] text-pretty font-body text-[17px] leading-[1.55] text-black/60 md:text-[19px]">
              Measure what matters, not vibes. Interview only the standouts.
            </p>
            <div className="mx-auto mt-9 grid w-full max-w-[330px] gap-3 sm:flex sm:max-w-none sm:justify-center sm:gap-4">
              <PrimaryButton href="/request-demo" size="lg">
                Book a call
              </PrimaryButton>
              <WatchDemo size="lg" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
