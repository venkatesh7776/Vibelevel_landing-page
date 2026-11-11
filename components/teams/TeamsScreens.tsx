import type { ReactNode } from "react";
import PixelIcon, { type PixelIconName } from "@/components/ui/PixelIcon";

// Redesigned VibeLevel Teams app screens for the landing page. Illustrative data: a mid-size org
// part-way up the fluency curve (scores on the 0–10 ladder, levels Novice → Advanced).

const W = 1200;

type Level = "Advanced" | "Capable" | "Developing" | "Novice";
export type { Level };
const LEVEL_TAG: Record<Level, string> = {
  Advanced: "bg-brand-green text-white",
  Capable: "bg-brand-green-50 text-brand-green ring-1 ring-brand-green/20",
  Developing: "bg-[#fdf6dc] text-[#7a6200] ring-1 ring-[#e9d48a]/60",
  Novice: "bg-black/[0.05] text-black/55",
};

export function Tag({ level }: { level: Level }) {
  return <span className={`rounded-full px-2.5 py-[3px] font-body text-[11.5px] font-medium ${LEVEL_TAG[level]}`}>{level}</span>;
}

export function Avatar({ name, i }: { name: string; i: number }) {
  const tones = ["bg-[#d4f1dd] text-[#00753a]", "bg-[#fdf1c7] text-[#7a6200]", "bg-[#e7ecff] text-[#3b4bb0]", "bg-[#fde4dc] text-[#a14a2f]", "bg-[#eef6df] text-[#4d6b14]"];
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("");
  return <span className={`flex size-8 shrink-0 items-center justify-center rounded-full font-body text-[12px] font-semibold ${tones[i % tones.length]}`}>{initials}</span>;
}

export function Panel({ title, icon, action, children, className = "" }: { title: string; icon: PixelIconName; action?: string; children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[16px] bg-white p-5 ring-1 ring-black/[0.06] shadow-[0_8px_24px_-18px_rgba(6,36,24,0.35)] ${className}`}>
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2.5 font-display text-[15px] font-semibold text-ink-900">
          <span className="flex size-7 items-center justify-center rounded-[8px] bg-brand-green-50 text-brand-green">
            <PixelIcon name={icon} className="size-4" />
          </span>
          {title}
        </p>
        {action && <span className="font-body text-[12.5px] font-medium text-brand-green">{action} →</span>}
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

const TEAMS_TABS = ["Dashboard", "Challenges", "Sprints", "Submissions", "Org Leaderboard", "Members"];

/** App top bar + tabs, shared by the product screens. */
export function AppChrome({
  tab,
  children,
  product = "Teams",
  org = "Acme Corp · 128 members",
  orgInitials = "AC",
  tabs = TEAMS_TABS,
}: {
  tab: string;
  children: ReactNode;
  product?: string;
  org?: string;
  orgInitials?: string;
  tabs?: string[];
}) {
  const TABS = tabs;
  return (
    <div className="flex h-full flex-col bg-[#f7f9f6] text-left" style={{ width: W }}>
      <div className="flex items-center justify-between border-b border-black/[0.06] bg-white px-7 py-3.5">
        <div className="flex items-center gap-3">
          <span className="font-display text-[18px] font-bold text-brand-green">★ VibeLevel</span>
          <span className="rounded-md bg-brand-green-50 px-2 py-0.5 font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-green">{product}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-black/[0.04] px-3 py-1.5 font-body text-[13px] text-black/60">{org}</span>
          <span className="flex size-8 items-center justify-center rounded-full bg-ink-900 font-body text-[12px] font-semibold text-white">{orgInitials}</span>
        </div>
      </div>
      <div className="flex gap-1 border-b border-black/[0.06] bg-white px-5">
        {TABS.map((t) => (
          <span
            key={t}
            className={`relative px-3.5 py-3 font-body text-[13.5px] font-medium ${t === tab ? "text-brand-green" : "text-black/50"}`}
          >
            {t}
            {t === tab && <span className="absolute inset-x-2 bottom-0 h-[2px] rounded-full bg-brand-green" />}
          </span>
        ))}
      </div>
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}

/* ---------- Dashboard ---------- */

const KPIS = [
  { label: "Avg fluency score", value: "7.4", unit: "/10", delta: "+0.6 this quarter" },
  { label: "Capable + Advanced", value: "62", unit: "%", delta: "+28 pts since Q1" },
  { label: "Active members", value: "116", unit: "/128", delta: "91% participation" },
  { label: "Sprints run", value: "6", unit: "", delta: "Q3 sprint live now" },
];

const DIST: { level: Level; n: number; cls: string }[] = [
  { level: "Advanced", n: 22, cls: "bg-brand-green" },
  { level: "Capable", n: 57, cls: "bg-brand-green/60" },
  { level: "Developing", n: 38, cls: "bg-[#e6c867]" },
  { level: "Novice", n: 11, cls: "bg-black/15" },
];

const TEAMS = [
  { team: "Platform", score: 8.1 },
  { team: "Product", score: 7.7 },
  { team: "Data", score: 7.4 },
  { team: "Sales", score: 6.9 },
  { team: "Support", score: 6.6 },
];

const FUNNEL = [
  { stage: "Registered", n: 128 },
  { stage: "Started", n: 116 },
  { stage: "Submitted", n: 104 },
  { stage: "Graded", n: 101 },
];

const TOP: { name: string; team: string; score: number; level: Level }[] = [
  { name: "Ananya Rao", team: "Platform", score: 9.2, level: "Advanced" },
  { name: "Marcus Lee", team: "Product", score: 8.9, level: "Advanced" },
  { name: "Priya Nair", team: "Data", score: 8.7, level: "Advanced" },
  { name: "Diego Alvarez", team: "Platform", score: 8.4, level: "Capable" },
  { name: "Sara Kim", team: "Sales", score: 8.1, level: "Capable" },
];

const SPRINTS = [
  { title: "Q3 AI Skills Sprint", status: "Live", meta: "3 days left · 4 tracks" },
  { title: "Prompting & Steering", status: "Ended", meta: "Avg 7.2 · 98 submissions" },
  { title: "Q2 AI Skills Sprint", status: "Ended", meta: "Avg 6.8 · 91 submissions" },
];

export function TeamsDashboardScreen() {
  const total = DIST.reduce((a, d) => a + d.n, 0);
  return (
    <AppChrome tab="Dashboard">
      <div className="flex items-end justify-between">
        <div>
          <p className="font-body text-[12.5px] text-black/45">Workforce AI fluency · Q3</p>
          <h3 className="mt-0.5 font-heading text-[26px] text-black">Good morning, Acme.</h3>
        </div>
        <span className="rounded-full bg-white px-3 py-1.5 font-body text-[12.5px] text-black/60 ring-1 ring-black/[0.08]">Last 90 days ▾</span>
      </div>

      {/* KPIs */}
      <div className="mt-5 grid grid-cols-4 gap-4">
        {KPIS.map((k, i) => (
          <div key={k.label} className={`rounded-[16px] p-5 ring-1 ${i === 1 ? "bg-ink-900 text-white ring-transparent" : "bg-white ring-black/[0.06]"}`}>
            <p className={`font-body text-[12.5px] ${i === 1 ? "text-white/60" : "text-black/50"}`}>{k.label}</p>
            <p className="mt-2 font-heading text-[34px] leading-none">
              {k.value}
              <span className={`font-body text-[15px] ${i === 1 ? "text-white/50" : "text-black/35"}`}>{k.unit}</span>
            </p>
            <p className={`mt-2.5 font-body text-[12px] font-medium ${i === 1 ? "text-[#7be3a1]" : "text-brand-green"}`}>▲ {k.delta}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-[1.1fr_1fr_1fr] gap-4">
        {/* Distribution */}
        <Panel title="Fluency distribution" icon="skill">
          <div className="flex h-3.5 overflow-hidden rounded-full">
            {DIST.map((d) => (
              <span key={d.level} className={d.cls} style={{ width: `${(d.n / total) * 100}%` }} />
            ))}
          </div>
          <ul className="mt-4 space-y-2.5">
            {DIST.map((d) => (
              <li key={d.level} className="flex items-center justify-between font-body text-[13.5px]">
                <span className="flex items-center gap-2.5 text-black/65">
                  <span className={`size-2.5 rounded-sm ${d.cls}`} />
                  {d.level}
                </span>
                <span className="font-mono text-ink-900">
                  {d.n} <span className="text-black/35">· {Math.round((d.n / total) * 100)}%</span>
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        {/* Teams */}
        <Panel title="Team breakdown" icon="team" action="All teams">
          <ul className="space-y-3">
            {TEAMS.map((t) => (
              <li key={t.team}>
                <div className="flex justify-between font-body text-[13px]">
                  <span className="text-black/65">{t.team}</span>
                  <span className="font-mono font-medium text-ink-900">{t.score.toFixed(1)}</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-black/[0.06]">
                  <div className="h-full rounded-full bg-brand-green" style={{ width: `${t.score * 10}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        {/* Engagement */}
        <Panel title="Engagement funnel" icon="report">
          <ul className="space-y-2.5">
            {FUNNEL.map((f, i) => (
              <li key={f.stage} className="flex items-center gap-3">
                <span className="w-[78px] font-body text-[13px] text-black/60">{f.stage}</span>
                <span className="flex-1">
                  <span
                    className="block h-7 rounded-[8px]"
                    style={{ width: `${(f.n / FUNNEL[0].n) * 100}%`, background: `color-mix(in oklab, var(--color-brand-green) ${70 - i * 14}%, white)` }}
                  />
                </span>
                <span className="w-9 text-right font-mono text-[13px] text-ink-900">{f.n}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-[10px] bg-brand-green-50 px-3 py-2 font-body text-[12.5px] text-brand-green">79% of registered members graded</p>
        </Panel>
      </div>

      <div className="mt-4 grid grid-cols-[1.45fr_1fr] gap-4">
        {/* Top performers */}
        <Panel title="Top performers" icon="person" action="Leaderboard">
          <table className="w-full">
            <thead>
              <tr className="font-body text-[11.5px] uppercase tracking-[0.1em] text-black/40">
                <th className="pb-2 text-left font-medium">Member</th>
                <th className="pb-2 text-left font-medium">Team</th>
                <th className="pb-2 text-right font-medium">Score</th>
                <th className="pb-2 pl-4 text-left font-medium">Level</th>
              </tr>
            </thead>
            <tbody>
              {TOP.map((m, i) => (
                <tr key={m.name} className="border-t border-black/[0.05]">
                  <td className="py-2">
                    <span className="flex items-center gap-2.5 font-body text-[13.5px] font-medium text-ink-900">
                      <span className="w-4 font-mono text-[12px] text-black/35">{i + 1}</span>
                      <Avatar name={m.name} i={i} />
                      {m.name}
                    </span>
                  </td>
                  <td className="py-2 font-body text-[13px] text-black/55">{m.team}</td>
                  <td className="py-2 text-right font-mono text-[14px] font-semibold text-brand-green">{m.score.toFixed(1)}</td>
                  <td className="py-2 pl-4">
                    <Tag level={m.level} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        {/* Sprints */}
        <Panel title="Sprints" icon="compass" action="View all">
          <ul className="space-y-2.5">
            {SPRINTS.map((s) => (
              <li key={s.title} className="flex items-center justify-between rounded-[12px] bg-[#f7f9f6] px-3.5 py-3">
                <span>
                  <span className="block font-body text-[13.5px] font-medium text-ink-900">{s.title}</span>
                  <span className="block font-body text-[12px] text-black/45">{s.meta}</span>
                </span>
                <span
                  className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 font-body text-[11.5px] font-medium ${
                    s.status === "Live" ? "bg-brand-green text-white" : "bg-black/[0.05] text-black/50"
                  }`}
                >
                  {s.status === "Live" && <span className="size-1.5 rounded-full bg-white" />}
                  {s.status}
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </AppChrome>
  );
}

/* ---------- Org leaderboard ---------- */

const BOARD: { name: string; team: string; track: string; score: number; level: Level; delta: number }[] = [
  { name: "Ananya Rao", team: "Platform", track: "Full-stack", score: 9.2, level: "Advanced", delta: 1.1 },
  { name: "Marcus Lee", team: "Product", track: "Product briefs", score: 8.9, level: "Advanced", delta: 0.8 },
  { name: "Priya Nair", team: "Data", track: "Data analysis", score: 8.7, level: "Advanced", delta: 1.4 },
  { name: "Diego Alvarez", team: "Platform", track: "Backend", score: 8.4, level: "Capable", delta: 0.6 },
  { name: "Sara Kim", team: "Sales", track: "Sales enablement", score: 8.1, level: "Capable", delta: 1.9 },
  { name: "Tom Becker", team: "Support", track: "Support triage", score: 7.8, level: "Capable", delta: 0.9 },
  { name: "Lena Fischer", team: "Product", track: "Product briefs", score: 7.5, level: "Capable", delta: 0.4 },
  { name: "Ravi Menon", team: "Data", track: "Data analysis", score: 6.9, level: "Developing", delta: 1.2 },
];

const QUARTERS = [
  { q: "Q1", v: 34 },
  { q: "Q2", v: 44 },
  { q: "Q3", v: 62 },
];

export function TeamsLeaderboardScreen() {
  const podium = [BOARD[1], BOARD[0], BOARD[2]];
  return (
    <AppChrome tab="Org Leaderboard">
      <div className="flex items-end justify-between">
        <div>
          <p className="font-body text-[12.5px] text-black/45">Q3 AI Skills Sprint · 104 submissions</p>
          <h3 className="mt-0.5 font-heading text-[26px] text-black">Org leaderboard</h3>
        </div>
        <div className="flex gap-1 rounded-full bg-white p-1 ring-1 ring-black/[0.08]">
          {["This sprint", "Quarter", "All time"].map((t, i) => (
            <span key={t} className={`rounded-full px-3 py-1 font-body text-[12.5px] ${i === 0 ? "bg-ink-900 text-white" : "text-black/55"}`}>
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-[1fr_330px] gap-4">
        <div className="space-y-4">
          {/* Podium */}
          <div className="grid grid-cols-3 items-end gap-3">
            {podium.map((m, k) => {
              const rank = k === 1 ? 1 : k === 0 ? 2 : 3;
              return (
                <div
                  key={m.name}
                  className={`flex flex-col items-center rounded-[16px] px-4 text-center ring-1 ${
                    rank === 1 ? "pb-5 pt-6 ring-brand-green/25" : "bg-white pb-4 pt-4 ring-black/[0.06]"
                  }`}
                  style={rank === 1 ? { backgroundImage: "linear-gradient(135deg in oklab, #d4f1dd 0%, #eef6df 50%, #fdf1c7 100%)" } : undefined}
                >
                  <span className={`font-mono text-[12px] font-semibold ${rank === 1 ? "text-brand-green" : "text-black/40"}`}>#{rank}</span>
                  <span className="mt-2">
                    <Avatar name={m.name} i={rank} />
                  </span>
                  <span className="mt-2 font-body text-[14px] font-semibold text-ink-900">{m.name}</span>
                  <span className="font-body text-[12px] text-black/45">{m.team}</span>
                  <span className={`mt-2 font-heading leading-none text-headline-accent italic ${rank === 1 ? "text-[34px]" : "text-[26px]"}`}>{m.score.toFixed(1)}</span>
                </div>
              );
            })}
          </div>

          {/* Table */}
          <div className="rounded-[16px] bg-white ring-1 ring-black/[0.06]">
            <div className="grid grid-cols-[36px_1.5fr_1fr_1fr_70px_90px_70px] items-center gap-2 border-b border-black/[0.06] px-5 py-3 font-body text-[11.5px] uppercase tracking-[0.1em] text-black/40">
              <span>#</span>
              <span>Member</span>
              <span>Team</span>
              <span>Track</span>
              <span className="text-right">Score</span>
              <span className="pl-3">Level</span>
              <span className="text-right">Δ</span>
            </div>
            {BOARD.slice(3).map((m, i) => (
              <div
                key={m.name}
                className="grid grid-cols-[36px_1.5fr_1fr_1fr_70px_90px_70px] items-center gap-2 border-b border-black/[0.04] px-5 py-2.5 last:border-0"
              >
                <span className="font-mono text-[12.5px] text-black/40">{i + 4}</span>
                <span className="flex items-center gap-2.5 font-body text-[13.5px] font-medium text-ink-900">
                  <Avatar name={m.name} i={i + 3} />
                  {m.name}
                </span>
                <span className="font-body text-[13px] text-black/55">{m.team}</span>
                <span className="font-body text-[13px] text-black/55">{m.track}</span>
                <span className="text-right font-mono text-[14px] font-semibold text-brand-green">{m.score.toFixed(1)}</span>
                <span className="pl-3">
                  <Tag level={m.level} />
                </span>
                <span className="text-right font-mono text-[12.5px] text-brand-green">▲ {m.delta.toFixed(1)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Growth */}
        <div className="space-y-4">
          <Panel title="Fluency growth" icon="report">
            <p className="font-body text-[12.5px] text-black/50">% Capable + Advanced</p>
            <div className="mt-4 flex h-[150px] items-end gap-4">
              {QUARTERS.map((q, i) => (
                <div key={q.q} className="flex flex-1 flex-col items-center gap-2">
                  <span className="font-mono text-[13px] font-semibold text-ink-900">{q.v}%</span>
                  <span
                    className={`w-full rounded-t-[8px] ${i === QUARTERS.length - 1 ? "bg-brand-green" : "bg-brand-green/30"}`}
                    style={{ height: `${q.v * 1.6}px` }}
                  />
                  <span className="font-body text-[12px] text-black/45">{q.q}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 rounded-[10px] bg-brand-green-50 px-3 py-2 font-body text-[12.5px] text-brand-green">▲ +18 pts this sprint</p>
          </Panel>
          <Panel title="Most improved team" icon="team">
            <div className="flex items-center justify-between">
              <span>
                <span className="block font-display text-[16px] font-semibold text-ink-900">Sales</span>
                <span className="block font-body text-[12.5px] text-black/45">5.4 → 6.9 avg score</span>
              </span>
              <span className="font-heading text-[28px] text-headline-accent italic">+1.5</span>
            </div>
          </Panel>
        </div>
      </div>
    </AppChrome>
  );
}
