// Product visuals for the features section, built in code so they stay sharp and on-theme.
// Lines build up with the shared 6s `pc-in` story (see globals.css), staggered by animation-delay.

const card = "rounded-[16px] bg-white shadow-[0_24px_48px_-28px_rgba(6,36,24,0.45)] ring-1 ring-black/[0.05]";
const delay = (s: number) => ({ animationDelay: `${s}s` });

function Check({ className = "text-brand-green" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 12 12" className={`size-3 shrink-0 ${className}`}>
      <path d="M2.5 6.2 5 8.5l4.5-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** 01 — an agentic coding session: the candidate directs an AI agent inside a real repo. */
export function AgentVisual() {
  return (
    <div className="w-full max-w-[560px] overflow-hidden rounded-[16px] bg-[#0c1210] font-mono text-[11.5px] leading-[1.6] text-white/70 shadow-[0_32px_64px_-30px_rgba(6,36,24,0.7)] ring-1 ring-white/[0.06]">
      <div className="flex items-center gap-3 border-b border-white/[0.07] px-4 py-2.5">
        <span className="hidden gap-1.5 sm:flex">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2.5 rounded-full bg-white/15" />
          ))}
        </span>
        <span className="flex gap-1 whitespace-nowrap font-body text-[11px]">
          <span className="rounded-[6px] bg-white/[0.08] px-2 py-0.5 text-white/85">Claude Code</span>
          <span className="px-2 py-0.5 text-white/40">GitHub Copilot</span>
        </span>
        <span className="ml-auto flex items-center gap-2 whitespace-nowrap font-body text-[11px]">
          <span className="hidden text-white/45 sm:inline">38:50</span>
          <span className="rounded-[6px] bg-cta px-2 py-0.5 font-medium text-white">Run tests</span>
        </span>
      </div>
      <div className="grid sm:grid-cols-[120px_1fr]">
        <div className="hidden space-y-1 border-r border-white/[0.07] p-3 text-[10.5px] text-white/40 sm:block">
          <p className="text-white/30">src/</p>
          {["checkout.ts", "payments.ts", "retry.test.ts", "README.md"].map((f, i) => (
            <p key={f} className={`truncate rounded-[4px] px-1.5 ${i === 0 ? "bg-white/[0.06] text-white/80" : ""}`}>
              {f}
            </p>
          ))}
        </div>
        <div className="min-h-[230px] space-y-2 p-4">
          <p className="pc-in" style={delay(0.1)}>
            <span className="text-glow">›</span> /plan
          </p>
          <p className="pc-in -mt-1 pl-3 text-white/40" style={delay(0.4)}>
            └ Enabled plan mode
          </p>
          <p className="pc-in rounded-[6px] bg-white/[0.06] px-2 py-1 text-white/85" style={delay(0.9)}>
            <span className="text-glow">›</span> review the retry logic before changing anything
          </p>
          <p className="pc-in text-[#f5c46b]" style={delay(1.5)}>
            ✻ Thinking<span className="text-white/40">…</span>
          </p>
          <p className="pc-in pl-3 text-white/55" style={delay(2.1)}>
            └ Retries can charge twice: checkout.ts:42
          </p>
          <p className="pc-in flex items-center gap-2 text-glow" style={delay(2.8)}>
            <Check className="text-glow" /> Tests passing · 12/12
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 border-t border-white/[0.07] px-4 py-2 font-body text-[10.5px] text-white/40">
        <span className="size-1.5 animate-pulse rounded-full bg-[#ff5f57]" />
        Session recorded · prompts, edits and test runs
      </div>
    </div>
  );
}

/** 02 — a role-specific task generated from the job description, stack and workflow. */
export function TaskVisual() {
  return (
    <div className="relative w-full max-w-[520px]">
      <div className={`${card} w-[72%] p-4 pb-9`}>
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-black/35">Job description</p>
        <p className="mt-1.5 text-[14px] font-medium text-black/80">Backend Engineer, Payments</p>
        <div className="mt-3 space-y-1.5">
          {[92, 78, 85].map((w, i) => (
            <div key={i} className="h-[5px] rounded-full bg-black/[0.07]" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {["Node.js", "PostgreSQL", "Stripe", "Code review"].map((t) => (
            <span key={t} className="rounded-full bg-black/[0.04] px-2 py-0.5 text-[11px] font-medium text-black/55">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className={`${card} relative -mt-6 ml-auto w-[78%] p-4 ring-brand-green/20`}>
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-brand-green">Generated assessment</p>
          <span className="rounded-full bg-brand-green-50 px-2 py-0.5 text-[11px] font-medium text-brand-green">90 min</span>
        </div>
        <p className="mt-1.5 text-[15px] font-medium text-black/85">Make checkout retries safe</p>
        <ul className="mt-3 space-y-2 text-[12.5px] text-black/60">
          {["Reproduce the double-charge bug", "Add idempotency to the payment flow", "Cover retries with tests", "Open a PR for review"].map(
            (s, i) => (
              <li key={s} className="pc-in flex items-center gap-2" style={delay(0.3 + i * 0.45)}>
                <Check />
                {s}
              </li>
            ),
          )}
        </ul>
        <p className="mt-3 border-t border-dashed border-black/10 pt-2.5 text-[11px] text-black/40">
          Production repo · your stack · your workflow
        </p>
      </div>
    </div>
  );
}

const SIGNALS = [
  { name: "AI fluency", score: 4.6 },
  { name: "Engineering judgment", score: 4.3 },
  { name: "Job-specific skills", score: 4.1 },
  { name: "Human contribution", score: 4.4 },
];

/** 03 — four signals instead of a single prompting score. */
export function SignalsVisual() {
  return (
    <div className={`${card} w-full max-w-[480px] p-5 sm:p-6`}>
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-black/35">Skill profile</p>
        <span className="text-[11px] text-black/40">Candidate A-1042</span>
      </div>
      <div className="mt-4 flex items-center justify-between rounded-[10px] border border-dashed border-black/15 px-3 py-2 text-[12.5px] text-black/40">
        <span className="line-through decoration-black/30">Prompting score</span>
        <span className="font-mono line-through decoration-black/30">82%</span>
      </div>
      <ul className="mt-4 space-y-3.5">
        {SIGNALS.map((s, i) => (
          <li key={s.name}>
            <div className="flex justify-between text-[13px]">
              <span className="font-medium text-black/75">{s.name}</span>
              <span className="font-mono text-black/50">{s.score.toFixed(1)}</span>
            </div>
            <div className="mt-1.5 h-[6px] rounded-full bg-black/[0.06]">
              <div
                className="pc-grow h-full rounded-full bg-brand-green/80"
                style={{ width: `${(s.score / 5) * 100}%`, ...delay(0.2 + i * 0.25) }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const SCORES = [
  { skill: "Problem solving", score: 4.5, note: "Isolated the race condition before writing a fix." },
  { skill: "AI collaboration", score: 4.8, note: "Rejected an unsafe AI suggestion and explained why." },
  { skill: "Code quality", score: 4.2, note: "Added tests that cover the retry path." },
];

/** 04 — skill-level scores, each with a written justification tied to the candidate's work. */
export function EvidenceVisual() {
  return (
    <div className={`${card} w-full max-w-[500px] p-5 sm:p-6`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-black/35">Evaluation report</p>
          <p className="mt-1 text-[15px] font-medium text-black/80">Backend Engineer · A-1042</p>
        </div>
        <div className="shrink-0 rounded-[10px] bg-brand-green-50 px-3 py-2 text-center ring-1 ring-brand-green/15">
          <p className="font-heading text-[24px] leading-none font-medium text-brand-green">4.5</p>
          <p className="mt-1 text-[10px] text-black/45">of 5</p>
        </div>
      </div>
      <ul className="mt-5 space-y-4">
        {SCORES.map((s, i) => (
          <li key={s.skill}>
            <div className="flex justify-between text-[12.5px]">
              <span className="font-medium text-black/70">{s.skill}</span>
              <span className="font-mono text-black/50">{s.score.toFixed(1)}</span>
            </div>
            <div className="mt-1.5 h-[5px] rounded-full bg-black/[0.06]">
              <div className="h-full rounded-full bg-brand-green/80" style={{ width: `${(s.score / 5) * 100}%` }} />
            </div>
            <p className="pc-in mt-1.5 text-[12px] leading-snug text-black/45" style={delay(0.3 + i * 0.5)}>
              &ldquo;{s.note}&rdquo;
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap gap-2 border-t border-dashed border-black/10 pt-4">
        {["Session replay", "Prompt log", "Commits"].map((e) => (
          <span key={e} className="rounded-full bg-black/[0.04] px-2.5 py-1 text-[11px] font-medium text-black/55">
            {e}
          </span>
        ))}
      </div>
    </div>
  );
}
