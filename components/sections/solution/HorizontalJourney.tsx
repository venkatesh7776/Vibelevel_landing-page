"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Eyebrow from "../Eyebrow";
import {
  ReportVisual,
  ShiftVisual,
  TraditionalVisual,
  WorkspaceVisual,
} from "./JourneyVisuals";

type Panel = {
  id: string;
  step: string;
  eyebrow: string;
  kicker?: string;
  title: ReactNode;
  body: string;
  chips?: string[];
  tone: "muted" | "brand";
  visual: ReactNode;
};

const PANELS: Panel[] = [
  {
    id: "traditional",
    step: "Traditional",
    eyebrow: "01 — Traditional screening",
    kicker: "The old approach",
    title: "Test the answers.",
    body: "Screen candidates through what they present, explain, and solve in conventional assessments.",
    chips: ["Resumes", "Video Q&A", "Coding tests"],
    tone: "muted",
    visual: <TraditionalVisual />,
  },
  {
    id: "shift",
    step: "The shift",
    eyebrow: "02 — The shift",
    title: (
      <>
        From answers to{" "}
        <em className="text-headline-accent italic">actual work.</em>
      </>
    ),
    body: "Move beyond what candidates say. See how they approach problems, use AI, and make decisions.",
    tone: "brand",
    visual: <ShiftVisual />,
  },
  {
    id: "vibelevel",
    step: "VibeLevel",
    eyebrow: "03 — VibeLevel screening",
    kicker: "The new approach",
    title: (
      <>
        Evaluate the <em className="text-headline-accent italic">work.</em>
      </>
    ),
    body: "Give candidates real tasks in an AI-powered workspace and evaluate how they deliver the outcome.",
    chips: ["Real tasks", "AI collaboration", "Skill evidence"],
    tone: "brand",
    visual: <WorkspaceVisual />,
  },
  {
    id: "report",
    step: "Evaluation",
    eyebrow: "The result",
    title: (
      <>
        Evidence you can{" "}
        <em className="text-headline-accent italic">review.</em>
      </>
    ),
    body: "Every score comes with a written justification tied to the candidate’s actual work.",
    tone: "brand",
    visual: <ReportVisual />,
  },
];

/**
 * One continuous journey from traditional screening to the VibeLevel report. On desktop the
 * section pins to the viewport and vertical scroll drives the track sideways; each panel gets
 * --t (its signed distance from the screen centre) so text fades and visuals drift as it passes.
 * On smaller screens and with reduced motion, the panels simply stack vertically — the same
 * --t still drives the "shift" morph as you scroll down.
 */
export default function HorizontalJourney() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;
    const panels = Array.from(
      track.querySelectorAll<HTMLElement>("[data-panel]"),
    );
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;

    const update = () => {
      raf = 0;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const horizontal = desktop.matches && !reduce.matches;
      wrap.dataset.mode = horizontal ? "h" : "v";

      if (horizontal) {
        const distance = wrap.offsetHeight - vh;
        const progress = Math.min(
          1,
          Math.max(0, -wrap.getBoundingClientRect().top / distance),
        );
        track.style.transform = `translate3d(${(-progress * (track.scrollWidth - vw)).toFixed(1)}px, 0, 0)`;
        wrap.style.setProperty("--progress", progress.toFixed(4));
      } else {
        track.style.transform = "";
        wrap.style.setProperty("--progress", "0");
      }

      for (const panel of panels) {
        const r = panel.getBoundingClientRect();
        const raw = horizontal
          ? (r.left + r.width / 2 - vw / 2) / vw
          : (r.top + r.height / 2 - vh / 2) / vh;
        const t = Math.max(-1.5, Math.min(1.5, raw));
        panel.style.setProperty("--t", t.toFixed(4));
        panel.style.setProperty("--ta", Math.abs(t).toFixed(4));
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    desktop.addEventListener("change", schedule);
    reduce.addEventListener("change", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      desktop.removeEventListener("change", schedule);
      reduce.removeEventListener("change", schedule);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      data-mode="v"
      className="journey relative lg:h-[400vh]"
      aria-label="From traditional screening to VibeLevel"
    >
      <div className="lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-col will-change-transform lg:h-full lg:w-max lg:flex-row"
        >
          {PANELS.map((p, i) => (
            <section
              key={p.id}
              data-panel
              aria-labelledby={`journey-${p.id}`}
              className={`flex items-center px-5 py-16 sm:px-10 md:py-20 lg:h-full lg:w-screen lg:px-0 lg:py-0 ${
                i > 0
                  ? "border-t border-dashed border-black/10 lg:border-t-0"
                  : ""
              }`}
            >
              <div className="mx-auto grid w-full max-w-[1200px] items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-16 lg:pt-10">
                <div className="journey-text">
                  <Eyebrow tone={p.tone}>{p.eyebrow}</Eyebrow>
                  {p.kicker && (
                    <p className="mt-6 font-body text-[13px] font-medium uppercase tracking-[0.16em] text-black/35">
                      {p.kicker}
                    </p>
                  )}
                  <h3
                    id={`journey-${p.id}`}
                    className={`${p.kicker ? "mt-2" : "mt-6"} font-heading text-[34px] leading-[1.1] font-medium tracking-[-1px] text-black sm:text-[40px] lg:text-[44px]`}
                  >
                    {p.title}
                  </h3>
                  <p className="mt-5 max-w-[440px] text-pretty font-body text-[18px] leading-[1.55] text-black/55 lg:text-[19px]">
                    {p.body}
                  </p>
                  {p.chips && (
                    <ul className="mt-7 flex flex-wrap gap-2">
                      {p.chips.map((c) => (
                        <li
                          key={c}
                          className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 font-body text-[14px] font-medium ${
                            p.tone === "muted"
                              ? "bg-black/[0.04] text-black/50"
                              : "bg-brand-green-50 text-black/75 ring-1 ring-brand-green/15"
                          }`}
                        >
                          <span
                            className={`size-[6px] ${p.tone === "muted" ? "bg-black/25" : "bg-brand-green"}`}
                          />
                          {c}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="journey-visual">{p.visual}</div>
              </div>
            </section>
          ))}
        </div>

        {/* Desktop progress: steps, a fill bar, and a hint that fades once scrolling starts. */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-8 hidden lg:block"
          aria-hidden="true"
        >
          <div className="mx-auto max-w-[1200px] px-16">
            <div className="flex items-center justify-between font-body text-[13px] font-medium text-black/40">
              <span className="journey-hint flex items-center gap-2 text-black/50">
                Scroll to explore the transformation
                <svg
                  viewBox="0 0 16 16"
                  className="size-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </span>
              <span className="flex gap-6">
                {PANELS.map((p) => (
                  <span key={p.id}>{p.step}</span>
                ))}
              </span>
            </div>
            <div className="mt-3 h-[2px] overflow-hidden rounded-full bg-black/[0.07]">
              <div
                className="h-full origin-left bg-brand-green"
                style={{ transform: "scaleX(var(--progress, 0))" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
