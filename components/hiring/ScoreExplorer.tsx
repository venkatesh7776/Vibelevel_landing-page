"use client";

import { useState } from "react";

type Row = { title: string; tags: string[] };
type Q = { q: string; short: string; rows: Row[] };

const QUESTIONS: Q[] = [
  {
    q: "Did they demonstrate the skills?",
    short: "Skills",
    rows: [
      { title: "Role-specific skills", tags: ["Technical", "Subject-matter", "Evidence per skill"] },
      { title: "Product & requirements", tags: ["Outcome focus", "Acceptance criteria", "Constraints"] },
      { title: "Design & strategic thinking", tags: ["Decomposition", "Architecture", "Tradeoffs"] },
    ],
  },
  {
    q: "Is the work reliable?",
    short: "Reliability",
    rows: [
      { title: "Code understanding", tags: ["Debugging", "Code reading", "Ownership"] },
      { title: "Testing & deliverable quality", tags: ["Verification", "Manual validation", "Polish"] },
    ],
  },
  {
    q: "Did they drive it, or did the AI?",
    short: "Contribution",
    rows: [
      { title: "Plan & decompose", tags: ["Sequencing", "Approach up front"] },
      { title: "Define goals, spec & steer", tags: ["Clear intent", "Course correction"] },
      { title: "Verify & iterate", tags: ["Testing", "Acting on results"] },
      { title: "Human Contribution Score", tags: ["Person-led vs AI-led", "Behaviour telemetry"] },
    ],
  },
  {
    q: "Do they understand what they built?",
    short: "Understanding",
    rows: [
      { title: "Thin evidence gets a question", tags: ["Auto-generated", "Tied to their code"] },
      { title: "Short video answers", tags: ["Explain, not just ship", "Understanding level"] },
    ],
  },
];

/** The four questions behind every score. Pick one to see what the engine looks at to answer it. */
export default function ScoreExplorer() {
  const [active, setActive] = useState(0);
  const cur = QUESTIONS[active];

  return (
    <div className="overflow-hidden rounded-[26px] bg-white ring-1 ring-black/[0.07] shadow-[0_40px_80px_-60px_rgba(6,36,24,0.5)]">
      <div role="tablist" aria-label="The four questions" className="grid grid-cols-2 gap-px border-b border-black/[0.06] bg-black/[0.06] lg:grid-cols-4">
        {QUESTIONS.map((x, i) => {
          const on = i === active;
          return (
            <button
              key={x.q}
              role="tab"
              id={`score-tab-${i}`}
              aria-selected={on}
              aria-controls="score-panel"
              onClick={() => setActive(i)}
              className={`group relative px-4 py-4 text-left transition-colors duration-300 sm:px-6 sm:py-5 ${on ? "bg-brand-green-50" : "bg-white hover:bg-[#fbfbfa]"}`}
            >
              <span className={`font-heading text-[22px] leading-none italic ${on ? "text-headline-accent" : "text-black/30"}`}>{i + 1}</span>
              <span className={`mt-2 block font-display text-[14.5px] leading-[1.35] font-semibold sm:text-[15.5px] ${on ? "text-ink-900" : "text-black/55 group-hover:text-ink-900"}`}>
                {x.q}
              </span>
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 bottom-0 h-[3px] origin-left bg-brand-green transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${on ? "scale-x-100" : "scale-x-0"}`}
              />
            </button>
          );
        })}
      </div>

      <div key={active} role="tabpanel" id="score-panel" aria-labelledby={`score-tab-${active}`} className="grid gap-3 p-4 sm:grid-cols-2 sm:p-6 lg:p-8">
        {cur.rows.map((r, i) => (
          <div
            key={r.title}
            className="pc-rise rounded-[16px] bg-[#f8f8f7] p-5"
            style={{
              animationDelay: `${i * 70}ms`,
            }}
          >
            <h4 className="font-display text-[16px] font-semibold text-ink-900">{r.title}</h4>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {r.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full bg-white px-2.5 py-1 font-body text-[12.5px] text-black/60 ring-1 ring-black/[0.06]"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
