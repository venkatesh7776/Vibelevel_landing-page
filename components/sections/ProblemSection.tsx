import type { ReactNode } from "react";
import TypedPhrase from "@/components/hero/TypedPhrase";
import PixelCard from "./PixelCard";
import Reveal from "./Reveal";

// Each visual shows the gap in today's hiring signals, drawn in the page's own UI language.

function Check() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      className="size-3 shrink-0 text-brand-green"
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
  );
}

function Lock() {
  return (
    <svg aria-hidden="true" viewBox="0 0 14 14" className="size-3.5 shrink-0">
      <rect x="2.5" y="6" width="9" height="6.5" rx="1.5" fill="currentColor" />
      <path
        d="M4.5 6V4.5a2.5 2.5 0 0 1 5 0V6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

/** 01 — the resume ticks every box, but can't answer the question that matters. */
function ResumeVisual() {
  return (
    <div className="flex h-full items-center justify-center px-[8%]">
      <div className="w-full rounded-[12px] bg-white p-4 shadow-[0_16px_32px_-22px_rgba(6,36,24,0.35)]">
        <div className="flex items-center gap-2.5">
          <span className="size-7 rounded-full bg-black/[0.06]" />
          <div className="flex-1 space-y-1.5">
            <div className="h-[6px] w-[45%] rounded-full bg-black/15" />
            <div className="h-[5px] w-[30%] rounded-full bg-black/[0.07]" />
          </div>
        </div>
        <ul className="mt-3.5 space-y-2 text-[12px] text-black/60">
          {["8 years of experience", "CS degree", "Big-name companies"].map(
            (s, i) => (
              <li
                key={s}
                className="pc-in flex items-center gap-2"
                style={{ animationDelay: `${0.2 + i * 0.35}s` }}
              >
                <Check />
                <span className="truncate">{s}</span>
              </li>
            ),
          )}
        </ul>
        <div
          className="pc-in mt-3 flex items-center justify-between gap-2 rounded-[8px] border border-dashed border-black/15 px-2.5 py-2 text-[12px] text-black/45"
          style={{ animationDelay: "1.4s" }}
        >
          <span className="truncate">Can they actually deliver?</span>
          <span className="pc-pulse flex size-5 shrink-0 items-center justify-center rounded-full bg-black/[0.06] font-medium text-black/45">
            ?
          </span>
        </div>
      </div>
    </div>
  );
}

/** 02 — real work happens with AI, but the test switches it off. */
function BlockedAiVisual() {
  return (
    <div className="flex h-full items-center px-[8%]">
      <div className="relative w-full overflow-hidden rounded-[12px] bg-white shadow-[0_16px_32px_-22px_rgba(6,36,24,0.35)]">
        <div className="flex items-center justify-between border-b border-black/[0.05] px-3.5 py-2.5 text-[11px] text-black/40">
          <span>Coding test</span>
          <span className="font-mono">00:45:00</span>
        </div>
        <div className="space-y-2 p-3.5 opacity-60">
          {[64, 82, 48, 72].map((w, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <span className="w-2 text-right font-mono text-[9px] text-black/25">
                {i + 1}
              </span>
              <span
                className="pc-grow h-[5px] rounded-full bg-black/10"
                style={{ width: `${w}%`, animationDelay: `${i * 0.3}s` }}
              />
            </div>
          ))}
        </div>
        <div className="pc-banner absolute inset-x-3 bottom-3 flex items-center gap-2 rounded-[8px] bg-ink-900 px-3 py-2 text-[11.5px] text-white/85">
          <Lock />
          <span className="truncate">AI assistance disabled for this test</span>
        </div>
      </div>
    </div>
  );
}

/** 03 — a pass/fail score, with the reasoning behind it nowhere to be seen. */
function ScoreOnlyVisual() {
  return (
    <div className="flex h-full items-center px-[8%]">
      <div className="w-full rounded-[12px] bg-white p-4 shadow-[0_16px_32px_-22px_rgba(6,36,24,0.35)]">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] text-black/40">Result</p>
            <p
              className="pc-in mt-0.5 text-[20px] font-medium leading-none text-black/80"
              style={{ animationDelay: "0.2s" }}
            >
              Passed
            </p>
          </div>
          <span className="font-mono text-[12px] text-black/45">
            12 / 12 tests
          </span>
        </div>
        <div className="mt-4 border-t border-dashed border-black/10 pt-3">
          <p className="text-[11px] text-black/40">How they got there</p>
          <div className="mt-2.5 space-y-2 blur-[2.5px]" aria-hidden="true">
            {[88, 66, 78].map((w, i) => (
              <div
                key={i}
                className="pc-shimmer h-[6px] rounded-full"
                style={{ width: `${w}%`, animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
          <p
            className="pc-in mt-3 text-[11.5px] font-medium text-black/45"
            style={{ animationDelay: "1.2s" }}
          >
            Decisions not captured
          </p>
        </div>
      </div>
    </div>
  );
}

type Card = { title: string; body: string; visual: ReactNode };

const cards: Card[] = [
  {
    title: "Skills go beyond what’s on a resume.",
    body: "Experience and qualifications matter, but practical skills reveal what candidates can actually deliver.",
    visual: <ResumeVisual />,
  },
  {
    title: "AI is changing how work gets done.",
    body: "Today’s engineers work alongside AI. Assessing technical ability and AI collaboration gives a more complete picture.",
    visual: <BlockedAiVisual />,
  },
  {
    title: "Great outcomes need deeper evaluation.",
    body: "Understanding decisions, problem-solving, and individual contribution helps teams make more informed hiring decisions.",
    visual: <ScoreOnlyVisual />,
  },
];

export default function ProblemSection() {
  return (
    <section
      aria-labelledby="problem-heading"
      className="border-t border-dashed border-black/10 bg-white px-4 sm:px-8"
    >
      {/* Full-bleed dashed rule on top; inside the frame, side rules and a dashed rule under the
          cards close the intro and cards into a single block. */}
      <div className="mx-auto max-w-[1200px] border-x border-black/[0.06]">
        <div className="border-b border-dashed border-black/10">
          <div className="grid gap-8 px-5 pb-12 pt-16 sm:px-10 md:pb-16 md:pt-24 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:px-16 lg:pb-20 lg:pt-28">
            <Reveal>
              <h2
                id="problem-heading"
                className="max-w-[560px] text-balance font-heading text-[32px] leading-[1.1] font-medium tracking-[-1px] text-black sm:text-[40px] lg:text-[44px]"
              >
                The agentic era has changed{" "}
                <em className="text-headline-accent italic">
                  <TypedPhrase text="Tech Hiring." startOnView reserveSpace />
                </em>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="space-y-5 text-pretty font-body text-[18px] leading-[1.55] text-black/55 lg:pt-2 lg:text-[20px]">
                <p>
                  Developers don&rsquo;t just write code anymore. They plan,
                  build, review, and solve problems alongside AI.
                </p>
                <p>
                  VibeLevel helps you identify engineers who combine strong
                  fundamentals with AI fluency and sound engineering judgment.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="px-4 pb-12 sm:px-8 md:pb-16 lg:px-12 lg:pb-20">
            <ul className="mx-auto grid max-w-[560px] gap-5 lg:max-w-none lg:grid-cols-3 lg:gap-6">
              {cards.map((card, i) => (
                <Reveal
                  as="li"
                  key={card.title}
                  delay={i * 120}
                  className="min-w-0"
                >
                  <PixelCard className="rounded-[20px] border border-black/[0.035] bg-[#f8f8f7] hover:border-brand-green/20">
                    <article className="relative flex h-full flex-col p-2.5">
                      <div
                        aria-hidden="true"
                        className="aspect-[16/11] overflow-hidden rounded-[14px] md:aspect-[2/1] lg:aspect-[5/4] xl:aspect-[16/11]"
                        // Soft mint (top left) melting into butter yellow (bottom right); interpolated in OKLab
                        // so the blend stays clean, with no grey band where they meet.
                        style={{
                          backgroundImage:
                            "linear-gradient(135deg in oklab, #d4f1dd 0%, #eef6df 50%, #fdf1c7 100%)",
                        }}
                      >
                        {card.visual}
                      </div>
                      <div className="flex flex-1 flex-col px-3.5 pb-4 pt-6 sm:px-4">
                        <h3 className="font-display text-[20px] leading-[1.3] font-medium tracking-[-0.4px] text-black">
                          {card.title}
                        </h3>
                        <p className="mt-3 font-body text-[16px] leading-[1.55] text-black/55">
                          {card.body}
                        </p>
                      </div>
                    </article>
                  </PixelCard>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
