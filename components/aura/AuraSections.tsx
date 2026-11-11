import type { CSSProperties } from "react";
import PrimaryButton from "@/components/hero/PrimaryButton";
import SecondaryButton from "@/components/hero/SecondaryButton";
import TypedPhrase from "@/components/hero/TypedPhrase";
import { Body, CenterHeading, Check, GRADIENT, Section, ShotStage } from "@/components/hiring/parts";
import Reveal from "@/components/sections/Reveal";
import ScreeningPixels from "@/components/sections/screening/ScreeningPixels";
import PixelIcon, { type PixelIconName } from "@/components/ui/PixelIcon";
import profileShot from "@/public/Aura_profile_sample.png";
import mcpShot from "@/public/MCP_Connect_Agent.png";
import Archetypes from "./Archetypes";
import { StepsSection } from "@/components/site/ProductBlocks";

const Tag = ({ children }: { children: string }) => (
  <li className="rounded-full bg-black/[0.04] px-2.5 py-1 font-body text-[12.5px] text-black/60">{children}</li>
);

/* ---------- Discover · Learn · Prove ---------- */

const PILLARS: { icon: PixelIconName; name: string; tag: string; title: string; points: string[] }[] = [
  {
    icon: "aura",
    name: "Aura",
    tag: "Discover",
    title: "See your AI style",
    points: ["Connect via MCP", "Get your score & archetype", "Share your profile"],
  },
  {
    icon: "code",
    name: "AI Labs",
    tag: "Learn by building",
    title: "Mentor + Coder",
    points: ["An AI Mentor that teaches", "A Coding Agent that pairs", "Understand every line"],
  },
  {
    icon: "skill",
    name: "Practice",
    tag: "Prove",
    title: "Practice & improve",
    points: ["AI-native challenges", "Target weak dimensions", "Earn verified badges"],
  },
];

export function PillarsSection() {
  return (
    <Section labelledBy="pillars-heading">
      <CenterHeading id="pillars-heading" eyebrow="One home for your AI skills" lead="Discover. Learn." accent="Prove." />
      <Body>
        <ol className="grid gap-4 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal as="li" key={p.name} delay={i * 120}>
              <article className="group h-full rounded-[22px] bg-white p-6 ring-1 ring-black/[0.07] transition-[box-shadow,translate] duration-500 hover:-translate-y-1 hover:shadow-[0_28px_56px_-36px_rgba(20,10,60,0.45)] sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-[14px] text-brand-green ring-1 ring-brand-green/10 transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: GRADIENT }}>
                    <PixelIcon name={p.icon} className="size-6" />
                  </span>
                  <span className="font-body text-[11.5px] font-medium uppercase tracking-[0.16em] text-brand-green">{p.tag}</span>
                </div>
                <p className="mt-6 font-display text-[14px] font-medium text-black/45">{p.name}</p>
                <h3 className="mt-1 font-heading text-[24px] leading-[1.2] text-black">{p.title}</h3>
                <ul className="mt-5 space-y-2.5 border-t border-dashed border-black/10 pt-5">
                  {p.points.map((x) => (
                    <li key={x} className="flex items-center gap-2.5 font-body text-[15px] text-black/65">
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-green-50 text-brand-green">
                        <Check className="size-3" />
                      </span>
                      {x}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ol>
      </Body>
    </Section>
  );
}

/* ---------- How it works ---------- */

const STEPS: { icon: PixelIconName; title: string; body: string }[] = [
  { icon: "compass", title: "Connect via MCP", body: "One connector for Claude Code, Cursor, Codex and more." },
  { icon: "workspace", title: "Work as usual", body: "No test, no new IDE. Coding or writing." },
  { icon: "aura", title: "Get your Aura", body: "Score, archetype and skill dimensions." },
  { icon: "person", title: "Share & climb", body: "Public profile and a leaderboard rank." },
];

export function HowItWorksSection() {
  return (
    <StepsSection
      id="how-heading"
      sectionId="how-it-works"
      eyebrow="How it works"
      lead="Your real work,"
      accent="scored."
      audience="Four steps. Nothing new to learn."
      steps={STEPS}
    />
  );
}

/* ---------- MCP connector ---------- */

const TOOLS = ["Claude Code", "Cursor", "VS Code", "Claude Desktop", "Codex", "Perplexity", "Windsurf", "Other"];

export function ConnectorSection() {
  return (
    <Section labelledBy="mcp-heading">
      <CenterHeading
        id="mcp-heading"
        eyebrow="MCP connector"
        lead="One connector,"
        accent="all your AI tools."
        description="Generate one token in Aura settings. Your local AI sessions are scored automatically."
      />
      <Body>
        <Reveal>
          <ul className="mb-6 flex flex-wrap justify-center gap-2">
            {TOOLS.map((t) => (
              <li key={t} className="rounded-full bg-white px-3.5 py-1.5 font-body text-[14px] text-ink-900 ring-1 ring-black/[0.08] transition-colors hover:bg-brand-green-50">
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal>
          <ShotStage src={mcpShot} alt="VibeLevel Aura MCP connector setup for Claude Code, Cursor, VS Code and other AI tools" sizes="(min-width: 1100px) 1000px, 100vw" />
        </Reveal>
      </Body>
    </Section>
  );
}

/* ---------- Session analysis ---------- */

const ANALYSIS: { icon: PixelIconName; step: string; title: string; body: string; tags: string[] }[] = [
  { icon: "doc", step: "Evidence capture", title: "Redacted session data", body: "Prompts, file changes and flow, with personal data stripped.", tags: ["Prompt quality", "Context", "Tool usage"] },
  { icon: "aura", step: "Pattern recognition", title: "How you steer the AI", body: "When you intervene, how you structure problems.", tags: ["Delegation vs pairing", "Iteration loops", "Human vs AI"] },
  { icon: "report", step: "Insights & growth", title: "Feedback every session", body: "Strongest dimensions, gaps, and what to practise next.", tags: ["Dimension breakdowns", "Archetype tracking", "Next challenges"] },
];

export function AnalysisSection() {
  return (
    <Section labelledBy="analysis-heading">
      <CenterHeading
        id="analysis-heading"
        eyebrow="Session analysis"
        lead="Deep analysis of your sessions,"
        accent="in 5 minutes."
        description="For developers and non-developers alike."
      />
      <Body>
        <ol className="relative grid gap-4 lg:grid-cols-3">
          {ANALYSIS.map((a, i) => (
            <Reveal as="li" key={a.step} delay={i * 130}>
              <article className="h-full rounded-[22px] bg-white p-6 ring-1 ring-black/[0.07] transition-[box-shadow,translate] duration-500 hover:-translate-y-1 hover:shadow-[0_28px_56px_-36px_rgba(20,10,60,0.45)]">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-[12px] text-brand-green ring-1 ring-brand-green/10" style={{ backgroundImage: GRADIENT }}>
                    <PixelIcon name={a.icon} className="size-5" />
                  </span>
                  <span className="font-body text-[11.5px] font-medium uppercase tracking-[0.16em] text-brand-green">
                    0{i + 1} · {a.step}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-[18px] font-semibold text-ink-900">{a.title}</h3>
                <p className="mt-1.5 font-body text-[15px] leading-[1.5] text-black/55">{a.body}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {a.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ol>
        {/* Privacy, said once */}
        <Reveal className="mt-6">
          <div className="flex flex-col items-start gap-4 rounded-[20px] bg-brand-green-50 p-5 ring-1 ring-brand-green/15 sm:flex-row sm:items-center sm:p-6">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-brand-green ring-1 ring-brand-green/15">
              <PixelIcon name="shield" className="size-5" />
            </span>
            <p className="font-body text-[15.5px] leading-[1.55] text-black/65">
              <strong className="font-semibold text-ink-900">Privacy-first by design.</strong> Everything is redacted on your machine. We never see your full prompts, files or
              transcripts, only truncated excerpts and skill signals.
            </p>
          </div>
        </Reveal>
      </Body>
    </Section>
  );
}

/* ---------- Scoring engine ---------- */

const DIMENSIONS: { icon: PixelIconName; title: string; body: string }[] = [
  { icon: "faq", title: "Prompting", body: "Clear intent and context." },
  { icon: "team", title: "AI Collaboration", body: "Pairing and steering quality." },
  { icon: "compass", title: "Product Thinking", body: "Outcomes and tradeoffs." },
  { icon: "skill", title: "Design Sense", body: "Polish and craft." },
  { icon: "person", title: "You vs AI", body: "The value only you add." },
];

export function ScoringSection() {
  return (
    <Section labelledBy="aura-scoring-heading">
      <CenterHeading
        id="aura-scoring-heading"
        eyebrow="Scoring engine"
        lead="Five dimensions."
        accent="One Aura score."
        description="Each scored 0–10 from evidence in your real sessions, never test scenarios."
      />
      <Body>
        <ol className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {DIMENSIONS.map((d, i) => (
            <Reveal as="li" key={d.title} delay={i * 90} className={i === 4 ? "col-span-2 md:col-span-1" : ""}>
              <div className="group h-full rounded-[18px] bg-white p-5 text-center ring-1 ring-black/[0.07] transition-[box-shadow,translate] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_-26px_rgba(20,10,60,0.45)]">
                <span className="mx-auto flex size-11 items-center justify-center rounded-full text-brand-green transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: GRADIENT }}>
                  <PixelIcon name={d.icon} className="size-5" />
                </span>
                <p className="mt-3 font-body text-[11px] tracking-[0.14em] text-black/40">{i + 1} / 5</p>
                <h3 className="mt-1 font-display text-[16px] font-semibold text-ink-900">{d.title}</h3>
                <p className="mt-1 font-body text-[14px] leading-[1.45] text-black/55">{d.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
        {/* Overall score: the five feed one weighted average. */}
        <Reveal className="mt-4">
          <div
            className="relative isolate overflow-hidden rounded-[22px] p-6 ring-1 ring-brand-green/15 sm:p-8"
            style={{ backgroundImage: GRADIENT }}
          >
            <div className="grid items-center gap-6 md:grid-cols-[1fr_1.2fr]">
              <div>
                <p className="font-body text-[11.5px] font-medium uppercase tracking-[0.16em] text-brand-green">Overall Aura score</p>
                <h3 className="mt-2 font-heading text-[26px] leading-[1.2] text-black">
                  A weighted average of <em className="text-headline-accent italic">all five.</em>
                </h3>
                <p className="mt-2 font-body text-[15px] text-black/60">Higher scores unlock verified badges you can share on LinkedIn.</p>
              </div>
              <div>
                <div className="h-2.5 overflow-hidden rounded-full bg-white/80 ring-1 ring-black/[0.04]">
                  <div className="h-full w-[74%] rounded-full bg-brand-green" />
                </div>
                <div className="mt-2 flex justify-between font-mono text-[12px] text-black/50">
                  <span>0.0</span>
                  <span>Novice → Advanced</span>
                  <span>10.0</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Body>
    </Section>
  );
}

/* ---------- Sample profile ---------- */

const PROFILE = [
  { label: "Prompting", v: 7.7 },
  { label: "AI Collaboration", v: 7.1 },
  { label: "Product Thinking", v: 5.8 },
  { label: "Design Sense", v: 5.7 },
  { label: "You vs AI", v: 6.8 },
];

export function ProfileSection() {
  return (
    <Section labelledBy="profile-heading">
      <CenterHeading
        id="profile-heading"
        eyebrow="Sample profile"
        lead="See your"
        accent="AI Style Profile."
        description="Style insights, an Aura score, an archetype and core dimensions, all from your sessions."
      />
      <Body>
        <div className="grid items-center gap-6 lg:grid-cols-[360px_1fr]">
          {/* Score card: the bars fill when it scrolls in. */}
          <Reveal className="group">
            <div className="rounded-[22px] bg-white p-6 ring-1 ring-black/[0.07] shadow-[0_30px_60px_-40px_rgba(20,10,60,0.5)]">
              <div className="flex items-end justify-between">
                <p className="font-heading text-[48px] leading-none text-headline-accent italic">
                  7.4<span className="font-body text-[16px] not-italic text-black/40">/10</span>
                </p>
                <div className="text-right">
                  <span className="rounded-full bg-brand-green-50 px-2.5 py-1 font-body text-[12.5px] font-medium text-brand-green ring-1 ring-brand-green/15">Strong</span>
                  <p className="mt-2 font-display text-[15px] font-semibold text-ink-900">AI Steerer</p>
                </div>
              </div>
              <ul className="mt-6 space-y-3.5">
                {PROFILE.map((d, i) => (
                  <li key={d.label}>
                    <div className="flex justify-between font-body text-[14px]">
                      <span className="text-black/60">{d.label}</span>
                      <span className="font-mono text-ink-900">{d.v}</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-black/[0.06]">
                      <div
                        className="h-full origin-left scale-x-0 rounded-full bg-brand-green transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[shown=true]:scale-x-[var(--v)]"
                        style={{ "--v": d.v / 10, transitionDelay: `${300 + i * 110}ms` } as CSSProperties}
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-dashed border-black/10 pt-4 font-mono text-[12px] text-black/45">120K tokens · 5 agents / session</p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <ShotStage src={profileShot} alt="Sample VibeLevel Aura profile with insight cards" sizes="(min-width: 1024px) 780px, 100vw" />
          </Reveal>
        </div>
      </Body>
    </Section>
  );
}

/* ---------- Levels + badges ---------- */

const LEVELS = [
  { name: "Emerging", range: "0–5", line: "Early signal. Keep practising." },
  { name: "Capable", range: "5.01–7", line: "Clear momentum, room to sharpen." },
  { name: "Strong", range: "7.01–8.5", line: "Reliable style, strong execution." },
  { name: "Exceptional", range: "8.51+", line: "Consistent, high-impact AI work." },
];

export function LevelsSection() {
  return (
    <Section labelledBy="levels-heading">
      <CenterHeading
        id="levels-heading"
        eyebrow="AI skill signals"
        lead="Aura levels +"
        accent="verified badges."
        description="Levels sum up your real-work style. Badges are earned from challenges and assessments."
      />
      <Body>
        {/* A rising staircase, Emerging → Exceptional. */}
        <ol className="grid items-end gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {LEVELS.map((l, i) => (
            <Reveal as="li" key={l.name} delay={i * 130}>
              <div
                className={`flex flex-col justify-end rounded-[20px] p-5 ring-1 transition-transform duration-500 hover:-translate-y-1 ${
                  i === 3 ? "ring-brand-green/25 shadow-[0_24px_50px_-34px_rgba(6,36,24,0.5)]" : "bg-white ring-black/[0.07]"
                } ${["lg:min-h-[150px]", "lg:min-h-[190px]", "lg:min-h-[230px]", "lg:min-h-[270px]"][i]}`}
                style={i === 3 ? { backgroundImage: GRADIENT } : undefined}
              >
                <span className="font-mono text-[12.5px] text-brand-green">{l.range}</span>
                <h3 className={`mt-1 font-heading text-[24px] ${i === 3 ? "text-headline-accent italic" : "text-black"}`}>{l.name}</h3>
                <p className="mt-1 font-body text-[14.5px] leading-[1.45] text-black/60">{l.line}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Body>
    </Section>
  );
}

/* ---------- AI Labs ---------- */

const LABS: { icon: PixelIconName; title: string; body: string }[] = [
  { icon: "team", title: "Mentor + Coder pair", body: "A Mentor explains; a Coding Agent builds with you." },
  { icon: "book", title: "Concept → Lab", body: "Learn the idea, then run it live." },
  { icon: "compass", title: "Targets weak spots", body: "Courses map to your Aura dimensions." },
  { icon: "report", title: "Tracks your growth", body: "Reports and skill trends over time." },
];

export function LabsSection() {
  return (
    <Section labelledBy="labs-heading" id="labs">
      <CenterHeading
        id="labs-heading"
        eyebrow="AI Labs · Learn by building"
        lead="Build real projects."
        accent="Understand every line."
        description="Coding and non-coding concepts, learned while you build with AI, not building blind."
      />
      <Body>
        <div className="relative isolate overflow-hidden rounded-[26px] p-4 ring-1 ring-black/[0.05] sm:p-8 lg:p-10" style={{ backgroundImage: GRADIENT }}>
          <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-60">
            <ScreeningPixels />
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {LABS.map((l, i) => (
              <Reveal as="li" key={l.title} delay={i * 110}>
                <div className="group h-full rounded-[18px] bg-white p-5 shadow-[0_20px_44px_-30px_rgba(20,10,60,0.5)] ring-1 ring-black/[0.05] transition-transform duration-500 hover:-translate-y-1">
                  <PixelIcon name={l.icon} className="size-6 text-brand-green transition-transform duration-500 group-hover:scale-110" />
                  <h3 className="mt-4 font-display text-[16px] font-semibold text-ink-900">{l.title}</h3>
                  <p className="mt-1 font-body text-[14.5px] leading-[1.5] text-black/55">{l.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <div className="mt-8 flex justify-center">
            <PrimaryButton href="/assessments">Browse challenges</PrimaryButton>
          </div>
        </div>
      </Body>
    </Section>
  );
}

/* ---------- Archetypes ---------- */

export function ArchetypesSection() {
  return (
    <Section labelledBy="archetypes-heading">
      <CenterHeading
        id="archetypes-heading"
        eyebrow="Aura scoring model"
        lead="Which"
        accent="archetype are you?"
        description="Assigned from your collaboration patterns across coding and writing sessions."
      />
      <Body>
        <Reveal>
          <Archetypes />
        </Reveal>
      </Body>
    </Section>
  );
}

/* ---------- Closing CTA ---------- */

export function AuraCTASection() {
  return (
    <section aria-labelledby="aura-cta-heading" className="border-t border-dashed border-black/10 bg-white px-4 sm:px-8">
      <div className="mx-auto max-w-[1200px] border-x border-black/[0.06] px-4 py-12 sm:px-8 md:py-16 lg:px-12">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[28px] px-6 py-20 text-center ring-1 ring-black/[0.04] sm:px-12 md:py-28" style={{ backgroundImage: GRADIENT }}>
            <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-50 sm:opacity-100">
              <ScreeningPixels />
            </div>
            <h2
              id="aura-cta-heading"
              className="mx-auto max-w-[760px] text-balance font-heading text-[36px] leading-[1.08] font-medium tracking-[-1.2px] text-black sm:text-[48px] lg:text-[56px]"
            >
              Discover your{" "}
              <em className="text-headline-accent italic">
                <TypedPhrase text="AI Style." startOnView reserveSpace />
              </em>
            </h2>
            <p className="mx-auto mt-5 max-w-[480px] text-pretty font-body text-[17px] leading-[1.55] text-black/60 md:text-[19px]">
              Connect your tools, see your Aura, climb the leaderboard. Free, no credit card.
            </p>
            <div className="mx-auto mt-9 grid w-full max-w-[330px] gap-3 sm:flex sm:max-w-none sm:justify-center sm:gap-4">
              <PrimaryButton href="/aura/signup" size="lg">
                Discover your Aura free
              </PrimaryButton>
              <SecondaryButton href="/assessments" size="lg" className="bg-white/70">
                Browse assessments
              </SecondaryButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
