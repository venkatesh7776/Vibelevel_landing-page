import { Body, CenterHeading, GRADIENT, Section } from "@/components/hiring/parts";
import Reveal from "@/components/sections/Reveal";
import PixelIcon, { type PixelIconName } from "@/components/ui/PixelIcon";
import { AudienceColumns, ScreenFrame } from "@/components/site/ProductBlocks";
import ScaledScreen from "./ScaledScreen";
import { TeamsLeaderboardScreen } from "./TeamsScreens";

/* ---------- AI adoption curve ---------- */

type Mix = { novice?: number; developing?: number; capable?: number; advanced?: number; unmeasured?: number };

const LEVELS: { n: number; name: string; stage: string; gain?: string; line: string; mix: Mix }[] = [
  { n: 1, name: "Not yet started", stage: "Exploring", line: "AI is on the radar. No tools deployed yet.", mix: { unmeasured: 100 } },
  { n: 2, name: "Novice org", stage: "Tools enabled", line: "Licences, SSO and security in place.", mix: { novice: 90, developing: 10 } },
  { n: 3, name: "Developing org", stage: "Teams using", line: "Prompt volume is up. Adoption looks real.", mix: { novice: 60, developing: 30, capable: 10 } },
  { n: 4, name: "Proficient org", stage: "Using it wisely", gain: "1–2× productivity", line: "Teams know how to steer AI, and when not to.", mix: { novice: 15, developing: 35, capable: 40, advanced: 10 } },
  { n: 5, name: "Expert org", stage: "AI-native workforce", gain: "10× productivity", line: "Humans steer with intent; AI does the heavy lifting.", mix: { developing: 20, capable: 50, advanced: 30 } },
];

const SEG: { key: keyof Mix; label: string; cls: string }[] = [
  { key: "unmeasured", label: "Not measured", cls: "bg-black/10" },
  { key: "novice", label: "Novice", cls: "bg-brand-green/20" },
  { key: "developing", label: "Developing", cls: "bg-brand-green/45" },
  { key: "capable", label: "Capable", cls: "bg-brand-green/75" },
  { key: "advanced", label: "Advanced", cls: "bg-brand-green" },
];

function MixBar({ mix, delay }: { mix: Mix; delay: number }) {
  return (
    <div className="mt-4">
      <div
        className="flex h-2.5 origin-left scale-x-0 overflow-hidden rounded-full transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-data-[shown=true]:scale-x-100"
        style={{ transitionDelay: `${delay}ms` }}
      >
        {SEG.filter((s) => mix[s.key]).map((s) => (
          <span key={s.key} className={s.cls} style={{ width: `${mix[s.key]}%` }} title={`${mix[s.key]}% ${s.label}`} />
        ))}
      </div>
      <p className="mt-2 font-body text-[12.5px] leading-[1.45] text-black/50">
        {SEG.filter((s) => mix[s.key])
          .map((s) => `${mix[s.key]}% ${s.label}`)
          .join(" · ")}
      </p>
    </div>
  );
}

export function CurveSection() {
  return (
    <Section labelledBy="curve-heading">
      <CenterHeading
        id="curve-heading"
        eyebrow="AI adoption curve"
        lead="Where is your workforce on"
        accent="the AI adoption curve?"
        description="Most orgs are stuck at Level 2 or 3. VibeLevel Teams moves them to Level 5."
      />
      <Body>
        {/* A rising staircase: each level a step taller, the last one in the accent. */}
        <ol className="grid items-end gap-3 md:grid-cols-2 lg:grid-cols-5">
          {LEVELS.map((l, i) => {
            const top = i === LEVELS.length - 1;
            return (
              <Reveal as="li" key={l.n} delay={i * 130} className="group">
                <div
                  className={`flex flex-col rounded-[20px] p-5 ring-1 transition-transform duration-500 hover:-translate-y-1 ${
                    top ? "ring-brand-green/25" : "bg-white ring-black/[0.07]"
                  } ${["lg:min-h-[250px]", "lg:min-h-[285px]", "lg:min-h-[320px]", "lg:min-h-[355px]", "lg:min-h-[390px]"][i]}`}
                  style={top ? { backgroundImage: GRADIENT } : undefined}
                >
                  <p className="font-body text-[11.5px] font-medium uppercase tracking-[0.14em] text-brand-green">Level {l.n}</p>
                  <h3 className="mt-2 font-heading text-[22px] leading-[1.15] text-black">{l.name}</h3>
                  <p className="mt-1 font-display text-[14px] font-semibold text-ink-900">{l.stage}</p>
                  {l.gain && (
                    <span className="mt-2 w-fit rounded-full bg-brand-green px-2.5 py-0.5 font-body text-[12px] font-medium text-white">{l.gain}</span>
                  )}
                  <p className="mt-3 font-body text-[14px] leading-[1.5] text-black/55">{l.line}</p>
                  <div className="mt-auto">
                    <MixBar mix={l.mix} delay={300 + i * 130} />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>
        <Reveal className="mt-8 flex flex-col items-center gap-4">
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {SEG.map((s) => (
              <li key={s.key} className="flex items-center gap-2 font-body text-[13px] text-black/55">
                <span className={`size-2.5 rounded-sm ${s.cls}`} />
                {s.label}
              </li>
            ))}
          </ul>
          <p className="text-center font-heading text-[22px] leading-[1.3] text-black sm:text-[26px]">
            Tooling gets you to Level 1. <em className="text-headline-accent italic">Fluency gets you to Level 5.</em>
          </p>
        </Reveal>
      </Body>
    </Section>
  );
}

/* ---------- What Teams includes ---------- */

const CAPABILITIES: { icon: PixelIconName; title: string; body: string; tags: string[] }[] = [
  { icon: "skill", title: "AI fluency ladder", body: "Every employee measured Novice → Advanced, with verified, shareable badges.", tags: ["Four tiers", "Verified badges"] },
  { icon: "team", title: "Human-AI collaboration scoring", body: "Seven coding dimensions, plus a Human Contribution Score: AI-led or person-led?", tags: ["AI Pairing", "Product Thinking", "Testing"] },
  { icon: "report", title: "Insights & benchmarking", body: "Compare fluency across teams, departments and roles. Find the gaps.", tags: ["Org-wide", "Cross-team"] },
  { icon: "people", title: "Practice & AI Skills Sprints", body: "A role-scoped Org Challenges Library for daily practice, and timed sprints to measure.", tags: ["Challenges library", "Sprints"] },
];

export function IncludesSection() {
  return (
    <Section labelledBy="includes-heading">
      <CenterHeading id="includes-heading" eyebrow="What Teams includes" lead="Four capabilities." accent="One AI fluency engine." />
      <Body>
        <ul className="grid gap-3 md:grid-cols-2">
          {CAPABILITIES.map((c, i) => (
            <Reveal as="li" key={c.title} delay={(i % 2) * 120}>
              <div className="group flex h-full gap-5 rounded-[22px] bg-white p-6 ring-1 ring-black/[0.07] transition-[box-shadow,translate] duration-500 hover:-translate-y-1 hover:shadow-[0_28px_56px_-36px_rgba(20,20,80,0.45)] sm:p-7">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-[14px] text-brand-green ring-1 ring-brand-green/10 transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: GRADIENT }}>
                  <PixelIcon name={c.icon} className="size-6" />
                </span>
                <div>
                  <h3 className="font-display text-[18px] font-semibold text-ink-900">{c.title}</h3>
                  <p className="mt-1.5 font-body text-[15px] leading-[1.5] text-black/55">{c.body}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {c.tags.map((t) => (
                      <li key={t} className="rounded-full bg-brand-green-50 px-2.5 py-0.5 font-body text-[12.5px] text-brand-green">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
        {/* What a sprint is, in one line */}
        <Reveal className="mt-4">
          <div
            className="flex flex-col gap-2 rounded-[22px] p-6 ring-1 ring-brand-green/15 sm:flex-row sm:items-center sm:gap-6 sm:p-7"
            style={{ backgroundImage: GRADIENT }}
          >
            <p className="shrink-0 font-heading text-[22px] text-headline-accent italic">What&rsquo;s an AI Skills Sprint?</p>
            <p className="font-body text-[15px] leading-[1.55] text-black/65">
              A timed, multi-track, org-wide event, like a quarterly fluency challenge. Same scoring as daily practice, plus leaderboards and a readout for leadership.
            </p>
          </div>
        </Reveal>
      </Body>
    </Section>
  );
}

/* ---------- Leadership / workforce ---------- */

export function AudienceSection() {
  return (
    <Section labelledBy="teams-audience-heading">
      <CenterHeading id="teams-audience-heading" eyebrow="Two views" lead="Built for leadership." accent="Felt by your workforce." />
      <Body>
        <AudienceColumns
          columns={[
            {
              title: "For leadership",
              points: ["A workforce AI fluency dashboard", "Cross-team benchmarking", "Quarterly AI Skills Sprints to track movement", "Admin views scoped by org or team"],
            },
            {
              title: "For your workforce",
              points: ["Sign in with work email, auto-routed to your org", "Practice on demand in the same IDE", "A real fluency score: 7 dimensions + Human Contribution", "Verified badges, shareable to LinkedIn"],
            },
          ]}
        />
      </Body>
    </Section>
  );
}

/* ---------- Fluency growth ---------- */

export function GrowthSection() {
  return (
    <Section labelledBy="growth-heading">
      <CenterHeading
        id="growth-heading"
        eyebrow="Track fluency growth"
        lead="Watch fluency climb,"
        accent="quarter over quarter."
        description="% Capable + Advanced becomes a board-level metric. Sprints create the jumps; daily practice creates the slope."
      />
      <Body>
        <Reveal>
          <ScreenFrame>
            <ScaledScreen width={1200} height={750} label="VibeLevel Teams org leaderboard: podium, ranked members with levels and score gains, and fluency growth by quarter">
              <TeamsLeaderboardScreen />
            </ScaledScreen>
          </ScreenFrame>
        </Reveal>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "Quarterly inflection points", b: "Sprints surface movement in the fluency mix." },
            { t: "Continuous baseline", b: "Daily practice keeps the curve climbing." },
            { t: "Board-ready metric", b: "% Capable + Advanced, reported up by your CIO." },
            { t: "Verified, not self-reported", b: "Every score comes from real challenge output." },
          ].map((p, i) => (
            <Reveal as="li" key={p.t} delay={i * 100}>
              <div className="border-l-2 border-brand-green/25 pl-4 transition-colors duration-300 hover:border-brand-green">
                <h3 className="font-display text-[16px] font-semibold text-ink-900">{p.t}</h3>
                <p className="mt-1 font-body text-[14.5px] leading-[1.5] text-black/55">{p.b}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Body>
    </Section>
  );
}
