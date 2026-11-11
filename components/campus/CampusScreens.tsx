import { AppChrome, Avatar, Panel, Tag, type Level } from "@/components/teams/TeamsScreens";

// Redesigned VibeLevel Campus coordinator screens for the landing page. Illustrative data for a
// campus mid-way through its vibeathon season (scores on the 0–10 ladder).

const CAMPUS = {
  product: "Campus",
  org: "Northfield University · 412 students",
  orgInitials: "NU",
  tabs: ["Dashboard", "Challenges", "Vibeathons", "Submissions", "Campus Leaderboard", "Members"],
};

/* ---------- Coordinator dashboard ---------- */

const KPIS = [
  { label: "Avg campus score", value: "7.1", unit: "/10", delta: "+0.8 since last vibeathon" },
  { label: "Students competing", value: "312", unit: "/412", delta: "76% of the cohort" },
  { label: "Capable + Advanced", value: "48", unit: "%", delta: "+15 pts this term" },
  { label: "Vibeathons run", value: "9", unit: "", delta: "Spring Vibeathon live" },
];

const DIST: { level: Level; n: number; cls: string }[] = [
  { level: "Advanced", n: 41, cls: "bg-brand-green" },
  { level: "Capable", n: 109, cls: "bg-brand-green/60" },
  { level: "Developing", n: 118, cls: "bg-[#e6c867]" },
  { level: "Novice", n: 44, cls: "bg-black/15" },
];

const DEPTS = [
  { dept: "Computer Science", score: 7.8 },
  { dept: "AI & ML", score: 7.6 },
  { dept: "Data Science", score: 7.2 },
  { dept: "Electronics", score: 6.7 },
  { dept: "Business", score: 6.4 },
];

const TRACKS = [
  { track: "Coding", n: 148 },
  { track: "System design", n: 72 },
  { track: "Agentic solutions", n: 54 },
  { track: "Non-coding", n: 38 },
];

const FUNNEL = [
  { stage: "Registered", n: 356 },
  { stage: "Started", n: 331 },
  { stage: "Submitted", n: 312 },
  { stage: "Graded", n: 309 },
];

const TOP: { name: string; dept: string; batch: string; score: number; level: Level }[] = [
  { name: "Aisha Khan", dept: "Computer Science", batch: "2026", score: 9.3, level: "Advanced" },
  { name: "Rohan Gupta", dept: "AI & ML", batch: "2027", score: 9.0, level: "Advanced" },
  { name: "Mei Chen", dept: "Data Science", batch: "2026", score: 8.8, level: "Advanced" },
  { name: "Arjun Patel", dept: "Computer Science", batch: "2027", score: 8.5, level: "Capable" },
  { name: "Zara Ahmed", dept: "AI & ML", batch: "2028", score: 8.2, level: "Capable" },
];

const VIBEATHONS = [
  { title: "Spring Vibeathon", status: "Live", meta: "2 days left · 4 tracks" },
  { title: "Agentic Arena", status: "Ended", meta: "Avg 7.0 · 186 submissions" },
  { title: "AI Product Sprint", status: "Ended", meta: "Avg 6.7 · 142 submissions" },
];

export function CampusDashboardScreen() {
  const total = DIST.reduce((a, d) => a + d.n, 0);
  const maxTrack = TRACKS[0].n;
  return (
    <AppChrome tab="Dashboard" {...CAMPUS}>
      <div className="flex items-end justify-between">
        <div>
          <p className="font-body text-[12.5px] text-black/45">Coordinator insights · Spring term</p>
          <h3 className="mt-0.5 font-heading text-[26px] text-black">Northfield at a glance.</h3>
        </div>
        <span className="rounded-full bg-white px-3 py-1.5 font-body text-[12.5px] text-black/60 ring-1 ring-black/[0.08]">All vibeathons ▾</span>
      </div>

      <div className="mt-5 grid grid-cols-4 gap-4">
        {KPIS.map((k, i) => (
          <div key={k.label} className={`rounded-[16px] p-5 ring-1 ${i === 0 ? "bg-ink-900 text-white ring-transparent" : "bg-white ring-black/[0.06]"}`}>
            <p className={`font-body text-[12.5px] ${i === 0 ? "text-white/60" : "text-black/50"}`}>{k.label}</p>
            <p className="mt-2 font-heading text-[34px] leading-none">
              {k.value}
              <span className={`font-body text-[15px] ${i === 0 ? "text-white/50" : "text-black/35"}`}>{k.unit}</span>
            </p>
            <p className={`mt-2.5 font-body text-[12px] font-medium ${i === 0 ? "text-[#7be3a1]" : "text-brand-green"}`}>▲ {k.delta}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-[1.1fr_1fr_1fr] gap-4">
        <Panel title="Score distribution" icon="skill">
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

        <Panel title="Top departments" icon="campus" action="All">
          <ul className="space-y-3">
            {DEPTS.map((d) => (
              <li key={d.dept}>
                <div className="flex justify-between font-body text-[13px]">
                  <span className="text-black/65">{d.dept}</span>
                  <span className="font-mono font-medium text-ink-900">{d.score.toFixed(1)}</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-black/[0.06]">
                  <div className="h-full rounded-full bg-brand-green" style={{ width: `${d.score * 10}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Panel>

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
          <p className="mt-4 rounded-[10px] bg-brand-green-50 px-3 py-2 font-body text-[12.5px] text-brand-green">87% of registered students graded</p>
        </Panel>
      </div>

      <div className="mt-4 grid grid-cols-[1.45fr_1fr] gap-4">
        <Panel title="Top students" icon="person" action="Leaderboard">
          <table className="w-full">
            <thead>
              <tr className="font-body text-[11.5px] uppercase tracking-[0.1em] text-black/40">
                <th className="pb-2 text-left font-medium">Student</th>
                <th className="pb-2 text-left font-medium">Department</th>
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
                  <td className="py-2 font-body text-[13px] text-black/55">
                    {m.dept} <span className="text-black/35">· {m.batch}</span>
                  </td>
                  <td className="py-2 text-right font-mono text-[14px] font-semibold text-brand-green">{m.score.toFixed(1)}</td>
                  <td className="py-2 pl-4">
                    <Tag level={m.level} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <div className="space-y-4">
          <Panel title="Vibeathons" icon="compass" action="View all">
            <ul className="space-y-2">
              {VIBEATHONS.map((s) => (
                <li key={s.title} className="flex items-center justify-between rounded-[12px] bg-[#f7f9f6] px-3.5 py-2.5">
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
          <Panel title="By track" icon="workspace">
            <ul className="space-y-2">
              {TRACKS.map((t) => (
                <li key={t.track} className="flex items-center gap-3 font-body text-[13px]">
                  <span className="w-[120px] text-black/60">{t.track}</span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/[0.06]">
                    <span className="block h-full rounded-full bg-brand-green/70" style={{ width: `${(t.n / maxTrack) * 100}%` }} />
                  </span>
                  <span className="w-8 text-right font-mono text-ink-900">{t.n}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </AppChrome>
  );
}

/* ---------- Campus leaderboard ---------- */

const BOARD: { name: string; dept: string; batch: string; event: string; challenge: string; score: number; level: Level }[] = [
  { name: "Aisha Khan", dept: "CS", batch: "2026", event: "Spring Vibeathon", challenge: "Sharding Design", score: 9.3, level: "Advanced" },
  { name: "Rohan Gupta", dept: "AI & ML", batch: "2027", event: "Agentic Arena", challenge: "Support Triage Agent", score: 9.0, level: "Advanced" },
  { name: "Mei Chen", dept: "Data Science", batch: "2026", event: "Spring Vibeathon", challenge: "Document Q&A Bot", score: 8.8, level: "Advanced" },
  { name: "Arjun Patel", dept: "CS", batch: "2027", event: "AI Product Sprint", challenge: "GTM Outreach Strategy", score: 8.5, level: "Capable" },
  { name: "Zara Ahmed", dept: "AI & ML", batch: "2028", event: "Agentic Arena", challenge: "Meeting Notes Processor", score: 8.2, level: "Capable" },
  { name: "Leo Martins", dept: "Electronics", batch: "2026", event: "Spring Vibeathon", challenge: "Maximum Subarray", score: 7.9, level: "Capable" },
  { name: "Nisha Verma", dept: "Business", batch: "2027", event: "AI Product Sprint", challenge: "Product Brief", score: 7.6, level: "Capable" },
  { name: "Omar Haddad", dept: "Data Science", batch: "2028", event: "Agentic Arena", challenge: "Tool-calling Agent", score: 6.9, level: "Developing" },
];

export function CampusLeaderboardScreen() {
  const podium = [BOARD[1], BOARD[0], BOARD[2]];
  return (
    <AppChrome tab="Campus Leaderboard" {...CAMPUS}>
      <div className="flex items-end justify-between">
        <div>
          <p className="font-body text-[12.5px] text-black/45">All vibeathons · 309 graded submissions</p>
          <h3 className="mt-0.5 font-heading text-[26px] text-black">Campus leaderboard</h3>
        </div>
        <div className="flex gap-2">
          {["All departments", "All batches", "All vibeathons"].map((f) => (
            <span key={f} className="rounded-full bg-white px-3 py-1.5 font-body text-[12.5px] text-black/60 ring-1 ring-black/[0.08]">
              {f} ▾
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 items-end gap-3">
        {podium.map((m, k) => {
          const rank = k === 1 ? 1 : k === 0 ? 2 : 3;
          return (
            <div
              key={m.name}
              className={`flex items-center gap-4 rounded-[16px] px-5 ring-1 ${rank === 1 ? "py-6 ring-brand-green/25" : "bg-white py-4 ring-black/[0.06]"}`}
              style={rank === 1 ? { backgroundImage: "linear-gradient(135deg in oklab, #d4f1dd 0%, #eef6df 50%, #fdf1c7 100%)" } : undefined}
            >
              <span className={`font-mono text-[13px] font-semibold ${rank === 1 ? "text-brand-green" : "text-black/40"}`}>#{rank}</span>
              <Avatar name={m.name} i={rank} />
              <span className="flex-1">
                <span className="block font-body text-[14px] font-semibold text-ink-900">{m.name}</span>
                <span className="block font-body text-[12px] text-black/45">
                  {m.dept} · {m.batch}
                </span>
              </span>
              <span className={`font-heading leading-none text-headline-accent italic ${rank === 1 ? "text-[34px]" : "text-[26px]"}`}>{m.score.toFixed(1)}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 rounded-[16px] bg-white ring-1 ring-black/[0.06]">
        <div className="grid grid-cols-[40px_1.3fr_1fr_1.1fr_1.3fr_70px_100px] items-center gap-2 border-b border-black/[0.06] px-5 py-3 font-body text-[11.5px] uppercase tracking-[0.1em] text-black/40">
          <span>Rank</span>
          <span>Student</span>
          <span>Department</span>
          <span>Vibeathon</span>
          <span>Challenge</span>
          <span className="text-right">Score</span>
          <span className="pl-3">Level</span>
        </div>
        {BOARD.slice(3).map((m, i) => (
          <div key={m.name} className="grid grid-cols-[40px_1.3fr_1fr_1.1fr_1.3fr_70px_100px] items-center gap-2 border-b border-black/[0.04] px-5 py-2.5 last:border-0">
            <span className="font-mono text-[12.5px] text-black/40">{i + 4}</span>
            <span className="flex items-center gap-2.5 font-body text-[13.5px] font-medium text-ink-900">
              <Avatar name={m.name} i={i + 3} />
              {m.name}
            </span>
            <span className="font-body text-[13px] text-black/55">
              {m.dept} <span className="rounded-md bg-black/[0.04] px-1.5 py-0.5 text-[11.5px] text-black/50">{m.batch}</span>
            </span>
            <span className="font-body text-[13px] text-black/55">{m.event}</span>
            <span className="font-body text-[13px] text-ink-900">{m.challenge}</span>
            <span className="text-right font-mono text-[14px] font-semibold text-brand-green">{m.score.toFixed(1)}</span>
            <span className="pl-3">
              <Tag level={m.level} />
            </span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-right font-body text-[12px] text-black/40">Click any row to open the student&rsquo;s score report.</p>
    </AppChrome>
  );
}
