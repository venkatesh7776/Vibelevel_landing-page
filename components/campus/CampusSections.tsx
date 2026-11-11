import { Body, CenterHeading, Check, Section } from "@/components/hiring/parts";
import Reveal from "@/components/sections/Reveal";
import PixelIcon from "@/components/ui/PixelIcon";
import { AudienceColumns, FeatureGrid, ScreenFrame } from "@/components/site/ProductBlocks";
import ScaledScreen from "@/components/teams/ScaledScreen";
import { CampusLeaderboardScreen } from "./CampusScreens";

/* ---------- Hero extras: the three sides of Campus ---------- */

const SIDES = [
  { who: "Students", line: "Discover their AI Style and compete" },
  { who: "Coordinators", line: "Run vibeathons with real IDE challenges" },
  { who: "Recruiters", line: "See top performers on their radar" },
];

export function CampusSides() {
  return (
    <ul className="hero-rise mx-auto mt-10 grid max-w-[880px] gap-2 text-left sm:grid-cols-3" style={{ animationDelay: "400ms" }}>
      {SIDES.map((s) => (
        <li key={s.who} className="flex items-start gap-2.5 rounded-[14px] bg-white px-4 py-3 ring-1 ring-black/[0.07]">
          <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-brand-green text-white">
            <Check className="size-2.5" />
          </span>
          <span className="font-body text-[14px] leading-[1.4] text-black/60">
            <strong className="font-semibold text-ink-900">{s.who}</strong> · {s.line}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ---------- What Campus includes ---------- */

export function IncludesSection() {
  return (
    <Section labelledBy="campus-includes-heading">
      <CenterHeading id="campus-includes-heading" eyebrow="What Campus includes" lead="Built for coordinators." accent="Loved by students." />
      <Body>
        <FeatureGrid
          items={[
            { icon: "aura", title: "Aura for students", body: "An AI Style profile from real sessions, with archetype and level." },
            { icon: "skill", title: "Run a vibeathon", body: "Multi-track, timed. You set the rules; AI scores in real time." },
            { icon: "report", title: "Live leaderboard", body: "Students see where they stand; you see who to highlight." },
            { icon: "workspace", title: "Coordinator dashboard", body: "Roster, tracks, review queue and audit trail." },
            { icon: "compass", title: "Campus-wide insights", body: "Engagement, cohorts, scores and top departments." },
            { icon: "people", title: "Talent pipeline", body: "Top performers reach hiring partners with verified levels." },
          ]}
        />
      </Body>
    </Section>
  );
}

/* ---------- Coordinators / students ---------- */

export function AudienceSection() {
  return (
    <Section labelledBy="campus-audience-heading">
      <CenterHeading id="campus-audience-heading" eyebrow="Two sides, one platform" lead="Easy to run." accent="Fun to compete." />
      <Body>
        <AudienceColumns
          columns={[
            {
              title: "For coordinators",
              points: ["Roster import via CSV, campus email auto-detected", "Multi-track events with custom rules and time limits", "Live review queue for flagged sessions", "Export rankings for hiring partners"],
            },
            {
              title: "For students",
              points: ["Compete in campus vibeathons (.edu auto-detected)", "Solo practice any time: same IDE, same AI", "Earn shareable Novice → Advanced badges", "Get surfaced to hiring partners"],
            },
          ]}
        />
      </Body>
    </Section>
  );
}

/* ---------- Live leaderboard ---------- */

export function LeaderboardSection() {
  return (
    <Section labelledBy="leaderboard-heading">
      <CenterHeading
        id="leaderboard-heading"
        eyebrow="Live leaderboard"
        lead="Cohort-wide ranking,"
        accent="scored automatically."
        description="Every submission is scored and ranked the moment it lands."
      />
      <Body>
        <Reveal>
          <ScreenFrame>
            <ScaledScreen width={1200} height={675} label="VibeLevel Campus leaderboard: podium of top students, then ranked students with department, vibeathon, challenge, score and level">
              <CampusLeaderboardScreen />
            </ScaledScreen>
          </ScreenFrame>
        </Reveal>
        <Reveal className="mt-6">
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {[
              { icon: "people" as const, t: "Students see where they stand" },
              { icon: "skill" as const, t: "Coordinators see who to highlight" },
              { icon: "person" as const, t: "Recruiters see who to talk to" },
            ].map((x) => (
              <li key={x.t} className="flex items-center gap-2.5 font-display text-[15px] font-semibold text-ink-900">
                <PixelIcon name={x.icon} className="size-5 text-brand-green" />
                {x.t}
              </li>
            ))}
          </ul>
        </Reveal>
      </Body>
    </Section>
  );
}
