"use client";

import { useState } from "react";
import PrimaryButton from "@/components/hero/PrimaryButton";

type Level = "Beginner" | "Intermediate" | "Advanced";
type Challenge = { type: "Coding" | "Non-coding"; lang: string; level: Level; title: string; body: string; tags: string[]; mins: number };

// A taste of the library — the full catalogue sits behind sign-up.
const CHALLENGES: Challenge[] = [
  { type: "Coding", lang: "JavaScript", level: "Beginner", title: "Password Generator", body: "Configurable options and a visual strength indicator.", tags: ["Frontend"], mins: 45 },
  { type: "Coding", lang: "JavaScript", level: "Intermediate", title: "Memory Card Game", body: "A classic card-matching game that runs in the browser.", tags: ["Frontend", "Algorithms"], mins: 60 },
  { type: "Coding", lang: "TypeScript", level: "Intermediate", title: "Pomodoro Timer", body: "Work and break intervals, right in the browser.", tags: ["Frontend"], mins: 60 },
  { type: "Coding", lang: "TypeScript", level: "Intermediate", title: "Expense Splitter", body: "Work out who owes whom after a group outing.", tags: ["Frontend"], mins: 60 },
  { type: "Coding", lang: "Python", level: "Intermediate", title: "Ship an MCP Server", body: "Expose a real inventory system to AI assistants, safely.", tags: ["AI"], mins: 60 },
  { type: "Coding", lang: "Python", level: "Beginner", title: "LeetCode Patterns: Stacks", body: "Build the markup validator for an email template engine.", tags: ["Algorithms"], mins: 60 },
];

const FILTERS = ["All", "Beginner", "Intermediate"] as const;
const SEE_ALL = "/aura/signup";

const LEVEL_DOT: Record<Level, string> = { Beginner: "bg-brand-green/40", Intermediate: "bg-brand-green/75", Advanced: "bg-brand-green" };

/** A few challenges with quick filters; the grid fades out into "See all challenges". */
export default function ChallengePreview() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const shown = CHALLENGES.filter((c) => filter === "All" || c.level === filter);

  return (
    <div>
      <div role="tablist" aria-label="Difficulty" className="mx-auto flex w-fit gap-1 rounded-full bg-black/[0.04] p-1 ring-1 ring-black/[0.05]">
        {FILTERS.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-2 font-body text-[14px] font-medium transition-[background-color,color,box-shadow] duration-300 ${
              filter === f ? "bg-white text-ink-900 shadow-[0_4px_12px_-6px_rgba(6,36,24,0.35)]" : "text-black/50 hover:text-ink-900"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="relative mt-8">
        <ul key={filter} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((c, i) => (
            <li
              key={c.title}
              className="pc-rise group flex flex-col rounded-[20px] bg-white p-6 ring-1 ring-black/[0.07] transition-[box-shadow,translate] duration-500 hover:-translate-y-1 hover:shadow-[0_28px_56px_-36px_rgba(6,36,24,0.45)]"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-body text-[11.5px] font-medium uppercase tracking-[0.14em]">
                  <span className="text-brand-green">{c.type}</span>
                  <span className="text-black/30"> · </span>
                  <span className="text-black/50">{c.lang}</span>
                </p>
                <span className="flex items-center gap-1.5 rounded-full bg-black/[0.04] px-2.5 py-1 font-body text-[12.5px] text-black/60">
                  <span className={`size-1.5 rounded-full ${LEVEL_DOT[c.level]}`} />
                  {c.level}
                </span>
              </div>
              <h3 className="mt-4 font-display text-[18px] font-semibold text-ink-900">{c.title}</h3>
              <p className="mt-1.5 font-body text-[15px] leading-[1.5] text-black/55">{c.body}</p>
              <ul className="mb-5 mt-4 flex flex-wrap gap-1.5">
                {c.tags.map((t) => (
                  <li key={t} className="rounded-md bg-brand-green-50 px-2 py-0.5 font-body text-[11.5px] font-medium uppercase tracking-[0.08em] text-brand-green">
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex items-center justify-between border-t border-dashed border-black/10 pt-4">
                <span className="flex items-center gap-1.5 font-mono text-[12.5px] text-black/50">
                  <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5">
                    <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M8 5v3l2 1.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                  {c.mins} min
                </span>
                <a
                  href={SEE_ALL}
                  className="inline-flex items-center gap-1.5 font-body text-[14px] font-medium text-brand-green underline-offset-4 transition-[gap] duration-300 hover:gap-2.5 hover:underline"
                >
                  Take this challenge
                  <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5">
                    <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </li>
          ))}
          {/* Ghost cards: the rest of the library, locked. */}
          {[0, 1, 2].map((k) => (
            <li key={`ghost-${k}`} aria-hidden="true" className="hidden h-[230px] rounded-[20px] bg-white p-6 ring-1 ring-black/[0.05] lg:block">
              <span className="block h-3 w-24 rounded-full bg-black/[0.06]" />
              <span className="mt-6 block h-4 w-40 rounded-full bg-black/[0.08]" />
              <span className="mt-4 block h-3 w-full rounded-full bg-black/[0.05]" />
              <span className="mt-2 block h-3 w-2/3 rounded-full bg-black/[0.05]" />
            </li>
          ))}
        </ul>

        {/* Fade over the ghost row, with the way in */}
        <div className="relative z-10 -mt-24 flex flex-col items-center bg-gradient-to-t from-white via-white to-transparent pb-2 pt-24 text-center lg:-mt-[200px] lg:pt-[120px]">
          <p className="font-heading text-[24px] leading-[1.2] text-black sm:text-[28px]">
            38 challenges. <em className="text-headline-accent italic">This is just a taste.</em>
          </p>
          <p className="mt-2 font-body text-[15px] text-black/55">Sign up free to see the full library and start building.</p>
          <div className="mt-6">
            <PrimaryButton href={SEE_ALL}>See all challenges</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
