"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import mountains from "@/public/images/screening-mountains.jpg";
import ScreeningPixels from "./ScreeningPixels";

/* ---------- Content ---------- */

type Side = "traditional" | "vibelevel";

type Point = {
  icon: keyof typeof ICONS;
  /** Short name shown in the pill and as the card's heading. */
  label: string;
  traditional: string;
  vibelevel: string;
  /** Desktop position of the icon bubble's centre, in % of the frame. */
  x: number;
  y: number;
};

const POINTS: Point[] = [
  { icon: "skill", label: "Screening", traditional: "Resume-based evaluation", vibelevel: "Skill-based evaluation", x: 18, y: 22 },
  { icon: "workspace", label: "Interviews", traditional: "Video interviews", vibelevel: "Practical, real-world tasks", x: 40, y: 58 },
  { icon: "code", label: "Technical tests", traditional: "Standard coding tests", vibelevel: "Production-like tasks in a real workspace", x: 62, y: 18 },
  { icon: "report", label: "Scoring", traditional: "Manual evaluation across different signals", vibelevel: "Structured, evidence-backed scoring", x: 82, y: 56 },
];

/* ---------- Pixel icons (the hero's pixel language, on a 9×9 grid) ---------- */

const ICONS = {
  skill: [
    "........#",
    "......#.#",
    "......#.#",
    "....#.#.#",
    "....#.#.#",
    "..#.#.#.#",
    "..#.#.#.#",
    "#.#.#.#.#",
    "#########",
  ],
  workspace: [
    "#########",
    "#.#.#...#",
    "#########",
    "#.......#",
    "#.###...#",
    "#.......#",
    "#.#####.#",
    "#.......#",
    "#########",
  ],
  code: [
    "#########",
    "#.......#",
    "#.#.....#",
    "#..#....#",
    "#...#...#",
    "#..#....#",
    "#.#..##.#",
    "#.......#",
    "#########",
  ],
  report: [
    "######...",
    "#....##..",
    "#.##..##.",
    "#......#.",
    "#.####.#.",
    "#......#.",
    "#.##...#.",
    "#......#.",
    "########.",
  ],
} satisfies Record<string, string[]>;

function PixelIcon({ name }: { name: keyof typeof ICONS }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 18 18" className="size-[30px] text-brand-green" shapeRendering="crispEdges">
      {ICONS[name].flatMap((row, y) =>
        [...row].map((c, x) =>
          c === "#" ? <rect key={`${x}-${y}`} x={x * 2} y={y * 2} width="1.6" height="1.6" fill="currentColor" /> : null,
        ),
      )}
    </svg>
  );
}

/* ---------- Shared layout ----------
 * The colour layer, the black-and-white layer and the label overlay all render this same layout, so
 * every bubble and pill lines up exactly across the three. Desktop: points placed by %. Mobile: a zigzag column.
 */

function Points({ render }: { render: (p: Point, i: number) => React.ReactNode }) {
  return (
    <ul className="relative flex flex-col gap-[60px] px-4 pb-16 pt-10 sm:px-8 md:block md:aspect-[16/9] md:p-0 lg:aspect-auto lg:h-[530px]">
      {POINTS.map((p, i) => (
        <li
          key={p.label}
          className={`relative flex w-[min(210px,64%)] flex-col items-center gap-2.5 md:absolute md:left-[var(--x)] md:top-[var(--y)] md:w-[220px] md:-translate-x-1/2 md:-translate-y-[32px] ${i % 2 ? "self-end" : "self-start"}`}
          style={{ "--x": `${p.x}%`, "--y": `${p.y}%` } as CSSProperties}
        >
          {render(p, i)}
        </li>
      ))}
    </ul>
  );
}

const BUBBLE = "size-16 shrink-0 rounded-full";
const PILL = "h-[30px] rounded-full px-3.5 font-display text-[13px] leading-[30px] font-medium";

/** The artwork + icon bubbles for one side. Labels live in the overlay, above both sides. */
function ArtLayer({ side }: { side: Side }) {
  const mono = side === "traditional";
  return (
    <>
      <Image
        src={mountains}
        alt=""
        fill
        placeholder="blur"
        sizes="(min-width: 1280px) 1100px, 100vw"
        // There's no black-and-white artwork, so the colour image is desaturated and given a little more contrast.
        className={`object-cover object-[60%_70%] ${mono ? "[filter:grayscale(1)_brightness(0.8)_contrast(1.15)]" : ""}`}
      />
      {!mono && <ScreeningPixels />}
      <Points
        render={(p) => (
          <>
            <span
              className={`flex items-center justify-center border-[3px] border-white shadow-[0_12px_28px_-14px_rgba(6,36,24,0.5)] ${BUBBLE} ${mono ? "grayscale" : ""}`}
              style={{ backgroundImage: "linear-gradient(135deg in oklab, #d4f1dd 0%, #eef6df 50%, #fdf1c7 100%)" }}
            >
              <PixelIcon name={p.icon} />
            </span>
            <span aria-hidden="true" className={`invisible ${PILL}`}>
              {p.label}
            </span>
          </>
        )}
      />
    </>
  );
}

/* ---------- Typed line ---------- */

function Typed({ text }: { text: string }) {
  const [n, setN] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? text.length : 0,
  );
  useEffect(() => {
    if (n >= text.length) return;
    const id = window.setTimeout(() => setN((v) => v + 1), 32);
    return () => clearTimeout(id);
  }, [n, text.length]);
  return (
    <>
      {text.slice(0, n)}
      {n < text.length && <span className="ml-px inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-current" />}
    </>
  );
}

/* ---------- The slider ---------- */

const START = 6; // % — where the divider rests at first: almost all VibeLevel, like the reference
const clamp = (v: number) => Math.min(100, Math.max(0, v));

type Active = { i: number; side: Side; run: number };

/**
 * Before/after comparison. The black-and-white "traditional" layer sits on top, clipped to the
 * left of the divider. Each point shows an icon and a pill; the point the divider crossed most
 * recently opens into a card that types out its line — green on the VibeLevel side, black on the
 * traditional side. With a mouse the divider follows the cursor; on touch, drag it or tap to jump; keys work too.
 * The divider position lives in a CSS variable; React only re-renders when a point changes side.
 */
export default function CompareSlider() {
  const rootRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const anchorRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const pos = useRef(START);
  const centres = useRef<number[]>([]); // bubble centres, % of the frame width
  const sides = useRef<Side[]>([]);
  const [active, setActive] = useState<Active | null>(null);

  const sideAt = (i: number, p: number): Side => (p > centres.current[i] ? "traditional" : "vibelevel");

  const set = (v: number) => {
    const p = clamp(v);
    pos.current = p;
    rootRef.current?.style.setProperty("--pos", `${p}%`);
    handleRef.current?.setAttribute("aria-valuenow", String(Math.round(p)));
    if (!sides.current.length) return;
    // Points the divider just crossed; the one nearest the divider becomes the active card.
    let best = -1;
    POINTS.forEach((_, i) => {
      const s = sideAt(i, p);
      if (s !== sides.current[i]) {
        sides.current[i] = s;
        if (best < 0 || Math.abs(centres.current[i] - p) < Math.abs(centres.current[best] - p)) best = i;
      }
    });
    if (best >= 0) setActive((a) => ({ i: best, side: sides.current[best], run: (a?.run ?? 0) + 1 }));
  };

  // Measure bubble centres (and again on resize). Open the first card once the frame is in view.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      centres.current = anchorRefs.current.map((a) => {
        const b = a!.getBoundingClientRect();
        return ((b.left + b.width / 2 - r.left) / r.width) * 100;
      });
    };
    measure();
    const ro = new ResizeObserver(() => {
      measure();
      if (sides.current.length) sides.current = POINTS.map((_, i) => sideAt(i, pos.current));
    });
    ro.observe(el);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        sides.current = POINTS.map((_, i) => sideAt(i, pos.current));
        // Start with the point nearest the divider.
        let near = 0;
        centres.current.forEach((c, i) => {
          if (Math.abs(c - pos.current) < Math.abs(centres.current[near] - pos.current)) near = i;
        });
        setActive({ i: near, side: sides.current[near], run: 1 });
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  // Mouse: the divider follows the cursor. Touch/pen: drag to move; a tap jumps the divider there.
  // touch-action: pan-y keeps vertical page scrolling on touch; a scroll cancels the gesture.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let id: number | null = null;
    let moved = false;
    let startX = 0;
    const toPct = (clientX: number) => {
      const r = el.getBoundingClientRect();
      return ((clientX - r.left) / r.width) * 100;
    };
    const down = (e: PointerEvent) => {
      if (e.button !== 0 || e.pointerType === "mouse") return;
      id = e.pointerId;
      moved = false;
      startX = e.clientX;
      if (handleRef.current?.contains(e.target as Node)) {
        moved = true;
        el.setPointerCapture(e.pointerId);
      }
    };
    const move = (e: PointerEvent) => {
      // With a mouse the divider simply follows the cursor across the frame.
      if (e.pointerType === "mouse") return set(toPct(e.clientX));
      if (e.pointerId !== id) return;
      if (!moved && Math.abs(e.clientX - startX) > 4) {
        moved = true;
        el.setPointerCapture(e.pointerId);
      }
      if (moved) set(toPct(e.clientX));
    };
    const up = (e: PointerEvent) => {
      if (e.pointerId !== id) return;
      if (!moved) set(toPct(e.clientX));
      id = null;
    };
    const cancel = () => (id = null);
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", cancel);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", cancel);
    };
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 20 : 5;
    const next =
      e.key === "ArrowLeft" ? pos.current - step
      : e.key === "ArrowRight" ? pos.current + step
      : e.key === "Home" ? 0
      : e.key === "End" ? 100
      : null;
    if (next === null) return;
    e.preventDefault();
    set(next);
  };

  return (
    <div>
      {/* The layers are visual only; this list carries the comparison for screen readers. */}
      <ul className="sr-only">
        {POINTS.map((p) => (
          <li key={p.label}>
            {p.label}. Traditional: {p.traditional}. VibeLevel: {p.vibelevel}.
          </li>
        ))}
      </ul>

      <div
        ref={rootRef}
        className="relative grid cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-[24px] ring-1 ring-black/[0.06]"
        style={{ "--pos": `${START}%` } as CSSProperties}
      >
        {/* VibeLevel (colour) underneath */}
        <div aria-hidden="true" className="relative col-start-1 row-start-1">
          <ArtLayer side="vibelevel" />
        </div>

        {/* Traditional (black and white) on top, clipped to the left of the divider */}
        <div
          aria-hidden="true"
          className="relative col-start-1 row-start-1 [clip-path:inset(0_calc(100%-var(--pos))_0_0)]"
        >
          <ArtLayer side="traditional" />
        </div>

        {/* Labels: a pill per point; the active point opens into a typed card */}
        <div aria-hidden="true" className="pointer-events-none relative z-10 col-start-1 row-start-1">
          <Points
            render={(p, i) => {
              const on = active?.i === i;
              const side = on ? active.side : "vibelevel";
              const green = side === "vibelevel";
              return (
                <>
                  <span ref={(el) => void (anchorRefs.current[i] = el)} className={`invisible ${BUBBLE}`} />
                  <span className="relative flex justify-center">
                    <span
                      className={`whitespace-nowrap bg-white/90 text-black/60 shadow-[0_6px_16px_-10px_rgba(6,36,24,0.4)] transition-opacity duration-200 ${PILL} ${on ? "opacity-0" : ""}`}
                    >
                      {p.label}
                    </span>
                    <span
                      className={`absolute top-0 w-[200px] rounded-[14px] px-4 py-3 text-center shadow-[0_16px_32px_-18px_rgba(6,36,24,0.5)] transition-[opacity,scale,background-color,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:w-[220px] ${green ? "bg-glow text-ink-900" : "bg-ink-900 text-white"} ${on ? "scale-100 opacity-100" : "scale-90 opacity-0"} origin-top`}
                    >
                      <span className={`block font-display text-[12px] font-medium ${green ? "text-ink-900/55" : "text-white/55"}`}>
                        {p.label}
                      </span>
                      <span className="mt-1 block min-h-[1.4em] font-body text-[15px] leading-[1.4] font-medium">
                        {on ? <Typed key={active.run} text={green ? p.vibelevel : p.traditional} /> : " "}
                      </span>
                    </span>
                  </span>
                </>
              );
            }}
          />
        </div>

        {/* Divider + handle */}
        <div className="pointer-events-none absolute inset-y-0 left-[var(--pos)] z-20 w-0">
          <span className="absolute inset-y-0 -left-px w-[2px] bg-white shadow-[0_0_12px_rgba(0,0,0,0.12)]" />
          <div
            ref={handleRef}
            role="slider"
            tabIndex={0}
            aria-label="Compare traditional hiring with VibeLevel"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={START}
            aria-valuetext="Percent of the view showing traditional hiring"
            onKeyDown={onKey}
            className="pointer-events-auto absolute left-0 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 cursor-grab items-center justify-center rounded-full bg-white text-ink-900 shadow-[0_6px_18px_-6px_rgba(6,36,24,0.4)] outline-none transition-transform duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-brand-green active:cursor-grabbing"
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" className="size-[18px]">
              <path
                d="M7 6 3 10l4 4M13 6l4 4-4 4M3 10h14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
