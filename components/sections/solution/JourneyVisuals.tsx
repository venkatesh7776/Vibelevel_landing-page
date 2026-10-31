// Visuals for the horizontal journey. Built in code (no images) so they stay sharp and on-theme.
// Panel motion is driven by CSS variables set from scroll in HorizontalJourney:
//   --t   signed offset of the panel from the viewport centre (0 = centred, ±1 = one screen away)

const card =
  "rounded-[14px] bg-white shadow-[0_24px_48px_-30px_rgba(6,36,24,0.35)] ring-1 ring-black/[0.04]";

/** 01 — the conventional artefacts: a resume, a recorded answer, a timed puzzle. Muted on purpose. */
export function TraditionalVisual() {
  return (
    <div className="relative mx-auto aspect-[5/4] w-full max-w-[520px]">
      {/* Resume */}
      <div
        className={`${card} absolute left-0 top-[6%] w-[48%] -rotate-[4deg] p-4`}
      >
        <div className="flex items-center gap-2.5">
          <span className="size-8 rounded-full bg-black/[0.06]" />
          <div className="flex-1 space-y-1.5">
            <div className="h-[6px] w-[55%] rounded-full bg-black/15" />
            <div className="h-[5px] w-[35%] rounded-full bg-black/[0.07]" />
          </div>
        </div>
        <div className="mt-4 space-y-2">
          {[92, 74, 86, 60, 80, 52].map((w, i) => (
            <div
              key={i}
              className="h-[5px] rounded-full bg-black/[0.07]"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
        <p className="mt-4 text-[11px] font-medium text-black/35">Resume.pdf</p>
      </div>

      {/* Video Q&A */}
      <div
        className={`${card} absolute right-0 top-0 w-[50%] rotate-[3deg] overflow-hidden`}
      >
        <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-[#e9ebe9] to-[#dcdfdc]">
          <span className="size-12 rounded-full bg-black/10" />
          <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/55 px-2 py-0.5 text-[10px] font-medium text-white">
            <span className="size-1.5 rounded-full bg-white" />
            REC 01:42
          </span>
        </div>
        <p className="p-3 text-[12px] leading-snug text-black/55">
          &ldquo;Tell us about a time you solved a hard problem.&rdquo;
        </p>
      </div>

      {/* Coding test */}
      <div className={`${card} absolute bottom-0 left-[20%] w-[60%] p-4`}>
        <div className="flex items-center justify-between text-[11px] text-black/40">
          <span>Puzzle 2 of 4</span>
          <span className="font-mono">00:18:42</span>
        </div>
        <p className="mt-2 text-[13px] font-medium text-black/60">
          Find the longest palindrome
        </p>
        <div className="mt-3 space-y-2 rounded-[8px] bg-black/[0.03] p-3">
          {[70, 52, 84].map((w, i) => (
            <div
              key={i}
              className="h-[5px] rounded-full bg-black/10"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const OLD = ["Resumes", "Video Q&A", "Coding tests"];
const NEW = ["Real tasks", "AI collaboration", "Skill evidence"];

/**
 * 02 — the shift. Each conventional signal turns into its VibeLevel counterpart as the panel
 * crosses the centre of the screen (--m runs 0 → 1, rows staggered).
 */
export function ShiftVisual() {
  return (
    <div
      className="mx-auto w-full max-w-[460px]"
      style={{
        ["--m" as string]: "clamp(0, calc((0.55 - var(--t, -1)) / 1.1), 1)",
      }}
    >
      <div className={`${card} p-5 sm:p-6`}>
        <div className="flex items-center justify-between text-[12px] font-medium text-black/40">
          <span>What you assess</span>
          <span className="font-mono">signal</span>
        </div>
        <ul className="mt-5 space-y-3">
          {OLD.map((old, i) => {
            // Rows switch one after another; a steep ramp keeps each row mostly fully old or fully new.
            const m = `clamp(0, calc(var(--m) * 3.2 - ${i * 0.95 + 0.1}), 1)`;
            return (
              <li key={old} className="relative h-[52px] overflow-hidden rounded-[10px]">
                <span
                  className="absolute inset-0 flex items-center gap-3 rounded-[10px] border border-dashed border-black/15 px-4 text-[15px] text-black/45"
                  style={{
                    opacity: `calc(1 - ${m})`,
                    transform: `translate3d(0, calc(${m} * -100%), 0)`,
                  }}
                >
                  <span className="size-[7px] bg-black/25" />
                  <span className="line-through decoration-black/25">
                    {old}
                  </span>
                </span>
                <span
                  className="absolute inset-0 flex items-center justify-between gap-3 rounded-[10px] bg-brand-green-50 px-4 text-[15px] font-medium text-black/80 ring-1 ring-inset ring-brand-green/20"
                  style={{
                    opacity: m,
                    transform: `translate3d(0, calc((1 - ${m}) * 100%), 0)`,
                  }}
                >
                  <span className="flex items-center gap-3">
                    <span className="size-[7px] bg-brand-green" />
                    {NEW[i]}
                  </span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 12 12"
                    className="size-3.5 text-brand-green"
                  >
                    <path
                      d="M2.5 6.2 5 8.5l4.5-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </li>
            );
          })}
        </ul>
        <div className="mt-5 h-[3px] overflow-hidden rounded-full bg-black/[0.06]">
          <div
            className="h-full origin-left rounded-full bg-brand-green"
            style={{ transform: "scaleX(var(--m))" }}
          />
        </div>
        <div className="mt-2 flex justify-between text-[11px] text-black/40">
          <span>Answers</span>
          <span>Actual work</span>
        </div>
      </div>
    </div>
  );
}

/** 03 — the VibeLevel workspace: a real task, the code, and an AI collaborator side by side. */
export function WorkspaceVisual() {
  return (
    <div className={`${card} mx-auto w-full max-w-[600px] overflow-hidden`}>
      <div className="flex items-center gap-3 border-b border-black/[0.05] px-4 py-3">
        <span className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2.5 rounded-full bg-black/10" />
          ))}
        </span>
        <span className="text-[12px] font-medium text-black/60">
          VibeLevel Workspace
        </span>
        <span className="ml-auto truncate rounded-full bg-brand-green-50 px-2.5 py-1 text-[11px] font-medium text-brand-green ring-1 ring-brand-green/15">
          Task: make checkout retries safe
        </span>
      </div>
      <div className="grid grid-cols-[1fr] sm:grid-cols-[110px_1fr_170px]">
        <div className="hidden space-y-2 border-r border-black/[0.05] p-3 text-[11px] text-black/45 sm:block">
          {["checkout.ts", "payments.ts", "retry.test.ts"].map((f, i) => (
            <p
              key={f}
              className={`truncate rounded-[6px] px-2 py-1 font-mono ${i === 0 ? "bg-black/[0.04] text-black/70" : ""}`}
            >
              {f}
            </p>
          ))}
        </div>
        <div className="space-y-2 p-4">
          {[62, 80, 44].map((w, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <span className="w-3 text-right font-mono text-[9px] text-black/25">
                {i + 1}
              </span>
              <span
                className="h-[5px] rounded-full bg-black/10"
                style={{ width: `${w}%` }}
              />
            </div>
          ))}
          <div className="-mx-4 truncate border-l-2 border-brand-green bg-brand-green/[0.07] px-4 py-1.5 font-mono text-[11px] text-black/70">
            + withIdempotencyKey(order.id)
          </div>
          {[70, 50].map((w, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <span className="w-3 text-right font-mono text-[9px] text-black/25">
                {i + 5}
              </span>
              <span
                className="h-[5px] rounded-full bg-black/10"
                style={{ width: `${w}%` }}
              />
            </div>
          ))}
        </div>
        <div className="hidden space-y-2 border-l border-black/[0.05] bg-[#fafaf9] p-3 sm:block">
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-black/35">
            AI pair
          </p>
          <p className="rounded-[8px] bg-white p-2 text-[11px] leading-snug text-black/60 ring-1 ring-black/[0.05]">
            Could a retry charge twice?
          </p>
          <p className="rounded-[8px] bg-brand-green-50 p-2 text-[11px] leading-snug text-black/70 ring-1 ring-brand-green/15">
            Yes. Add an idempotency key per order.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 border-t border-black/[0.05] px-4 py-2.5 text-[11px] font-medium text-brand-green">
        <span className="size-[6px] bg-brand-green" />
        Tests passing · 3 decisions logged
      </div>
    </div>
  );
}

const SKILLS = [
  {
    skill: "Problem solving",
    score: 4.5,
    note: "Isolated the race condition before writing a fix.",
  },
  {
    skill: "AI collaboration",
    score: 4.8,
    note: "Rejected an unsafe AI suggestion and explained why.",
  },
  {
    skill: "Code quality",
    score: 4.2,
    note: "Added tests that cover the retry path.",
  },
];

/** 04 — the outcome: scores with written justification tied to the candidate's work. */
export function ReportVisual() {
  return (
    <div className={`${card} mx-auto w-full max-w-[520px] p-5 sm:p-6`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-black/35">
            Evaluation report
          </p>
          <p className="mt-1 text-[15px] font-medium text-black/80">
            Backend Engineer · Candidate A-1042
          </p>
        </div>
        <div className="shrink-0 rounded-[10px] bg-brand-green-50 px-3 py-2 text-center ring-1 ring-brand-green/15">
          <p className="font-heading text-[24px] leading-none font-medium text-brand-green">
            4.5
          </p>
          <p className="mt-1 text-[10px] text-black/45">of 5</p>
        </div>
      </div>
      <ul className="mt-5 space-y-4">
        {SKILLS.map((s) => (
          <li key={s.skill}>
            <div className="flex justify-between text-[12.5px]">
              <span className="font-medium text-black/70">{s.skill}</span>
              <span className="font-mono text-black/50">
                {s.score.toFixed(1)}
              </span>
            </div>
            <div className="mt-1.5 h-[5px] rounded-full bg-black/[0.06]">
              <div
                className="h-full rounded-full bg-brand-green/80"
                style={{ width: `${(s.score / 5) * 100}%` }}
              />
            </div>
            <p className="mt-1.5 text-[12px] leading-snug text-black/45">
              &ldquo;{s.note}&rdquo;
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap gap-2 border-t border-dashed border-black/10 pt-4">
        {["Session replay", "Prompt log", "Commits"].map((e) => (
          <span
            key={e}
            className="rounded-full bg-black/[0.04] px-2.5 py-1 text-[11px] font-medium text-black/55"
          >
            {e}
          </span>
        ))}
      </div>
    </div>
  );
}
