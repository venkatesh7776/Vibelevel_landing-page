import Image from "next/image";
import mountains from "@/public/images/screening-mountains.jpg";
import Reveal from "../Reveal";
import ScreeningPixels from "./ScreeningPixels";

/* ---------- Content: the four pillars of VibeLevel Screening ---------- */

const PILLARS = [
  { icon: "skill", label: "Screening", line: "Skill-based evaluation" },
  { icon: "workspace", label: "Interviews", line: "Practical, real-world tasks" },
  { icon: "code", label: "Technical tests", line: "Production-like tasks in a real workspace" },
  { icon: "report", label: "Scoring", line: "Structured, evidence-backed scoring" },
] as const;

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
    <svg aria-hidden="true" viewBox="0 0 18 18" className="size-[26px] text-brand-green" shapeRendering="crispEdges">
      {ICONS[name].flatMap((row, y) =>
        [...row].map((c, x) =>
          c === "#" ? <rect key={`${x}-${y}`} x={x * 2} y={y * 2} width="1.6" height="1.6" fill="currentColor" /> : null,
        ),
      )}
    </svg>
  );
}

const BUBBLE_BG = "linear-gradient(135deg in oklab, #d4f1dd 0%, #eef6df 50%, #fdf1c7 100%)";

/**
 * The four pillars on the mountain artwork: the art and live pixels fill the frame, and four glass
 * cards rise in one after another along the bottom. Each lifts on hover.
 */
export default function PillarsShowcase() {
  return (
    <div className="group/frame relative isolate flex min-h-[460px] flex-col justify-end overflow-hidden rounded-[24px] ring-1 ring-black/[0.06] sm:min-h-[520px] lg:min-h-[540px]">
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
      {/* A soft white wash at the bottom so the cards read cleanly over the art. */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-white/70 to-transparent" />

      <ol className="grid grid-cols-2 gap-2.5 p-2.5 pt-44 sm:gap-3 sm:p-5 sm:pt-56 lg:grid-cols-4 lg:gap-4 lg:p-6 lg:pt-0">
        {PILLARS.map((p, i) => (
          <Reveal as="li" key={p.label} delay={i * 110}>
            <div className="group flex h-full flex-col rounded-[18px] bg-white/85 p-4 sm:p-5 ring-1 ring-black/[0.06] backdrop-blur-md shadow-[0_18px_40px_-28px_rgba(6,36,24,0.5)] transition-[translate,box-shadow,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:bg-white hover:shadow-[0_28px_50px_-30px_rgba(6,36,24,0.55)]">
              <div className="flex items-center justify-between">
                <span
                  className="flex size-10 sm:size-12 items-center justify-center rounded-full border-2 border-white shadow-[0_10px_22px_-12px_rgba(6,36,24,0.45)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                  style={{ backgroundImage: BUBBLE_BG }}
                >
                  <PixelIcon name={p.icon} />
                </span>
                <span className="font-body text-[12px] font-medium tracking-[0.16em] text-brand-green">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-4 font-display text-[15px] sm:mt-5 sm:text-[17px] font-semibold tracking-[-0.2px] text-ink-900">{p.label}</h3>
              <p className="mt-1 text-pretty font-body text-[13.5px] sm:mt-1.5 sm:text-[15px] leading-[1.45] text-black/55">{p.line}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
