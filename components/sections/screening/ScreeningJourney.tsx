"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import mountains from "@/public/images/screening-mountains.jpg";
import ScreeningPixels from "./ScreeningPixels";
import { ICONS } from "@/components/ui/glyphs";

/* ---------- Content: how a VibeLevel screen runs, start to shortlist ---------- */

type Step = {
  icon: keyof typeof ICONS;
  /** Big green figure (counts up when it's a number). */
  figure?: { value: number; prefix?: string };
  title: string;
  body: string;
};

const STEPS: Step[] = [
  { icon: "people", figure: { value: 1000 }, title: "candidates", body: "Everyone gets the same real production task." },
  { icon: "code", title: "Ship a deliverable", body: "They plan, iterate, and build production-grade work in a real AI IDE." },
  { icon: "report", title: "5-minute report", body: "See exactly what they built and how they used AI — scored, not guessed." },
  { icon: "check", figure: { value: 5, prefix: "Top " }, title: "to interview", body: "Only the real builders reach your calendar." },
];

/** Seconds between one step lighting up and the next; the path draws over the same span. */
const STAGGER = 0.75;

function PixelIcon({ name, className = "size-[26px] lg:size-[28px]" }: { name: keyof typeof ICONS; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 18 18" className={className} shapeRendering="crispEdges">
      {ICONS[name].flatMap((row, y) =>
        [...row].map((c, x) =>
          c === "#" ? <rect key={`${x}-${y}`} x={x * 2} y={y * 2} width="1.8" height="1.8" fill="currentColor" /> : null,
        ),
      )}
    </svg>
  );
}

/* ---------- Count-up figure ---------- */

function CountUp({ to, on, delay }: { to: number; on: boolean; delay: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!on) return;
    // With reduced motion the figure lands on its value in the first frame.
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const start = performance.now() + (still ? 0 : delay * 1000);
    const dur = still ? 1 : 1100;
    const tick = (t: number) => {
      const k = Math.min(1, Math.max(0, (t - start) / dur));
      setN(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [on, to, delay]);
  return <>{n.toLocaleString("en-US")}</>;
}

/* ---------- Pieces ---------- */

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";
const delayStyle = (i: number, extra = 0) => ({ transitionDelay: `${i * STAGGER + extra}s` }) as CSSProperties;

function Node({ step, i, on }: { step: Step; i: number; on: boolean }) {
  const last = i === STEPS.length - 1;
  return (
    <span
      className={`relative flex size-14 items-center justify-center rounded-full ring-1 transition-[opacity,scale,background-color,color] duration-500 lg:size-16 ${EASE} ${
        on ? "scale-100 opacity-100" : "scale-50 opacity-0"
      } ${last ? "bg-brand-green text-white ring-brand-green/30" : "bg-white text-brand-green ring-black/[0.08]"} shadow-[0_12px_28px_-14px_rgba(6,36,24,0.5)]`}
      style={delayStyle(i)}
    >
      {/* A ring that pings from one step to the next, on a loop, once the path has drawn. */}
      {on && (
        <span
          aria-hidden="true"
          className="journey-ping absolute inset-0 rounded-full ring-2 ring-brand-green/50"
          style={{ animationDelay: `${STEPS.length * STAGGER + i * 0.9}s` }}
        />
      )}
      <PixelIcon name={step.icon} />
    </span>
  );
}

/** A step's words, sitting directly under (or beside) its node — no card of its own. */
function StepText({ step, i, on, center }: { step: Step; i: number; on: boolean; center?: boolean }) {
  return (
    <div
      className={`transition-[opacity,translate] duration-700 ${EASE} ${on ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"} ${
        center ? "text-center" : ""
      }`}
      style={delayStyle(i, 0.15)}
    >
      <p className="font-body text-[11.5px] font-medium tracking-[0.18em] text-brand-green">STEP {String(i + 1).padStart(2, "0")}</p>
      <h3 className="mt-1.5 font-display text-[18px] leading-[1.25] font-semibold tracking-[-0.2px] text-ink-900">
        {step.figure && (
          <span className="tabular-nums text-brand-green">
            {step.figure.prefix}
            <CountUp to={step.figure.value} on={on} delay={i * STAGGER + 0.15} />{" "}
          </span>
        )}
        {step.title}
      </h3>
      <p className={`mt-1.5 text-pretty font-body text-[14.5px] leading-[1.5] text-black/55 ${center ? "mx-auto max-w-[220px]" : ""}`}>
        {step.body}
      </p>
    </div>
  );
}

/* ---------- Desktop path ---------- */

// Node centres in the path's 1000×130 box; they alternate low/high like a wave.
const PTS = [
  [125, 88],
  [375, 42],
  [625, 88],
  [875, 42],
] as const;
const D = `M${PTS[0]} C250 88, 250 42, ${PTS[1]} S500 88, ${PTS[2]} S750 42, ${PTS[3]}`;

/**
 * Section 3's showcase: on the mountain artwork, the four steps of a VibeLevel screen. When the
 * frame scrolls into view a green line draws along a dotted wave, each step's node pops in as the
 * line reaches it and its words rise beneath; the figures count up, then a ring pings from step to
 * step on a loop. Below lg the wave becomes a vertical timeline.
 */
export default function ScreeningJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="group/frame relative isolate overflow-hidden rounded-[24px] ring-1 ring-black/[0.06]"
    >
      <Image
        src={mountains}
        alt=""
        fill
        placeholder="blur"
        sizes="(min-width: 1280px) 1100px, 100vw"
        className="-z-20 object-cover object-[60%_70%] transition-transform duration-[2000ms] ease-out group-hover/frame:scale-[1.03]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <ScreeningPixels />
      </div>
      {/* A soft white wash at the bottom so the steps read cleanly over the art. */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-3/4 bg-gradient-to-t from-white/75 to-transparent" />

      {/* Desktop: one glass panel holding the wave, its nodes, and each step's words under its node. */}
      <div className="hidden p-8 lg:block">
        <div className="rounded-[22px] bg-white/55 px-6 pb-8 pt-6 ring-1 ring-white/70 backdrop-blur-[6px] shadow-[0_24px_60px_-36px_rgba(6,36,24,0.45)]">
        <div className="relative h-[130px]">
          <svg aria-hidden="true" viewBox="0 0 1000 130" preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible">
            <path d={D} fill="none" strokeWidth="3" strokeLinecap="round" strokeDasharray="0.1 9" className="journey-flow stroke-brand-green/35" />
            {/* The green line is dotted too: a solid stroke that draws along the wave reveals it. */}
            <mask id="journey-draw" maskUnits="userSpaceOnUse" x="-20" y="-20" width="1040" height="170">
              <path
                d={D}
                fill="none"
                stroke="#fff"
                strokeWidth="10"
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray="1"
                className={`transition-[stroke-dashoffset] ease-in-out ${on ? "[stroke-dashoffset:0]" : "[stroke-dashoffset:1]"}`}
                style={{ transitionDuration: `${(STEPS.length - 1) * STAGGER}s` }}
              />
            </mask>
            <path d={D} fill="none" strokeWidth="4" strokeLinecap="round" strokeDasharray="0.1 9" mask="url(#journey-draw)" className="journey-flow stroke-brand-green" />
          </svg>
          {STEPS.map((s, i) => (
            <span
              key={s.title}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${PTS[i][0] / 10}%`, top: `${(PTS[i][1] / 130) * 100}%` }}
            >
              <Node step={s} i={i} on={on} />
            </span>
          ))}
        </div>
        {/* Equal columns, so each column's centre sits under its node (12.5%, 37.5%, …). */}
        <ol className="mt-5 grid grid-cols-4 gap-6">
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <StepText step={s} i={i} on={on} center />
            </li>
          ))}
        </ol>
        </div>
      </div>

      {/* Below lg: a vertical timeline. */}
      <div className="p-4 sm:p-6 lg:hidden">
      <ol className="space-y-7 rounded-[22px] bg-white/65 px-4 py-6 ring-1 ring-white/70 backdrop-blur-[6px] shadow-[0_24px_60px_-36px_rgba(6,36,24,0.45)] sm:px-6">
        {STEPS.map((s, i) => (
          <li key={s.title} className="relative grid grid-cols-[56px_1fr] gap-3 sm:gap-4">
            <div className="relative flex justify-center">
              <Node step={s} i={i} on={on} />
              {i < STEPS.length - 1 && (
                <span aria-hidden="true" className="absolute left-1/2 top-[60px] bottom-[-24px] w-0 -translate-x-1/2 border-l-2 border-dotted border-brand-green/35">
                  <span
                    className={`absolute -left-[2px] top-0 h-full w-[2px] origin-top bg-brand-green transition-transform ease-in-out ${on ? "scale-y-100" : "scale-y-0"}`}
                    style={{ transitionDuration: `${STAGGER}s`, transitionDelay: `${i * STAGGER}s` }}
                  />
                </span>
              )}
            </div>
            <div className="pt-1">
              <StepText step={s} i={i} on={on} />
            </div>
          </li>
        ))}
      </ol>
      </div>
    </div>
  );
}
