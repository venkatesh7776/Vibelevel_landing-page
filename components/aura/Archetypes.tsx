"use client";

import { useState } from "react";

type A = { name: string; line: string };

const SETS: Record<"coding" | "writing", A[]> = {
  coding: [
    { name: "The Delegator", line: "Hands the wheel to the AI, takes what it ships." },
    { name: "The Collaborator", line: "Pairs tightly, steers and iterates until it's right." },
    { name: "The Director", line: "Sets crisp intent up front, lets the AI execute." },
    { name: "The Product Builder", line: "Every move serves the user, not just the output." },
    { name: "The Architect", line: "Plans first, builds scaffolding that compounds." },
    { name: "The Craftsperson", line: "Design and product taste in the smallest decision." },
  ],
  writing: [
    { name: "The Delegator", line: "Hands the pen to the AI, takes what it drafts." },
    { name: "The Co-writer", line: "Writes shoulder-to-shoulder, revises until it sings." },
    { name: "The Director", line: "Frames the brief cleanly, lets the AI draft." },
    { name: "The Strategist", line: "Thinks in audience; every word earns its place." },
    { name: "The Architect", line: "Outlines first, turns the messy into the clear." },
    { name: "The Wordsmith", line: "Polish applied to the smallest phrase." },
  ],
};

/** Coding / writing archetypes. The peak archetype, AI Steerer, is shared by both. */
export default function Archetypes() {
  const [kind, setKind] = useState<"coding" | "writing">("coding");
  return (
    <div>
      <div role="tablist" aria-label="Archetype type" className="mx-auto flex w-fit gap-1 rounded-full bg-black/[0.04] p-1 ring-1 ring-black/[0.05]">
        {(["coding", "writing"] as const).map((k) => (
          <button
            key={k}
            role="tab"
            aria-selected={kind === k}
            onClick={() => setKind(k)}
            className={`rounded-full px-5 py-2 font-body text-[15px] font-medium capitalize transition-[background-color,color,box-shadow] duration-300 ${
              kind === k ? "bg-white text-ink-900 shadow-[0_4px_12px_-6px_rgba(20,10,60,0.35)]" : "text-black/50 hover:text-ink-900"
            }`}
          >
            {k}
          </button>
        ))}
      </div>

      <ul key={kind} className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SETS[kind].map((a, i) => (
          <li
            key={a.name}
            className="pc-rise group rounded-[18px] bg-white p-5 ring-1 ring-black/[0.07] transition-[box-shadow,translate] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-26px_rgba(20,10,60,0.45)]"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <h3 className="font-heading text-[20px] leading-[1.2] text-black">{a.name}</h3>
            <p className="mt-1.5 font-body text-[14.5px] leading-[1.5] text-black/55">{a.line}</p>
          </li>
        ))}
        <li
          className="pc-rise rounded-[18px] p-5 ring-1 ring-brand-green/20 sm:col-span-2 lg:col-span-3"
          style={{ animationDelay: "380ms", backgroundImage: "linear-gradient(135deg in oklab, #d4f1dd 0%, #eef6df 50%, #fdf1c7 100%)" }}
        >
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
            <h3 className="font-heading text-[22px] text-headline-accent italic">AI Steerer</h3>
            <p className="font-body text-[15px] text-black/60">Peak human contribution. The AI is a pure force-multiplier.</p>
          </div>
        </li>
      </ul>
    </div>
  );
}
