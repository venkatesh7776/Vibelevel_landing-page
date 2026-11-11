// Small icons drawn on a 9×9 pixel grid — the site's pixel language, used in menus and cards.

import { ICONS as GLYPHS } from "./glyphs";

const ICONS = {
  // Hiring: a document
  doc: [
    "..#####..",
    "..#...##.",
    "..#....#.",
    "..#.##.#.",
    "..#....#.",
    "..#.##.#.",
    "..#....#.",
    "..######.",
    ".........",
  ],
  // Aura: concentric target
  aura: [
    "..#####..",
    ".#.....#.",
    "#..###..#",
    "#.#...#.#",
    "#.#.#.#.#",
    "#.#...#.#",
    "#..###..#",
    ".#.....#.",
    "..#####..",
  ],
  // Teams: two people
  team: [
    ".........",
    ".##...##.",
    ".##...##.",
    ".........",
    "####.####",
    "#..#.#..#",
    "#..#.#..#",
    ".........",
    ".........",
  ],
  // Campus: graduation cap
  campus: [
    ".........",
    "....#....",
    "..##.##..",
    "##.....##",
    "..##.##.#",
    "..#.#.#.#",
    "..#...#.#",
    "...###...",
    ".........",
  ],
  // Documentation: open book
  book: [
    ".........",
    "###...###",
    "#..#.#..#",
    "#..#.#..#",
    "#..#.#..#",
    "#..#.#..#",
    "####.####",
    "....#....",
    ".........",
  ],
  // Who it's for: a person
  person: [
    "...###...",
    "...###...",
    "...###...",
    ".........",
    "..#####..",
    ".#.....#.",
    ".#.....#.",
    ".#.....#.",
    ".........",
  ],
  // Compare: two bars
  compare: [
    ".........",
    "......##.",
    "......##.",
    ".##...##.",
    ".##...##.",
    ".##...##.",
    ".##...##.",
    "#########",
    ".........",
  ],
  // FAQ: question mark
  faq: [
    "..####...",
    ".#....#..",
    "......#..",
    ".....#...",
    "....#....",
    "....#....",
    ".........",
    "....#....",
    ".........",
  ],
  // About: compass
  compass: [
    "..#####..",
    ".#.....#.",
    "#.....#.#",
    "#....##.#",
    "#...#...#",
    "#.##....#",
    "#.#.....#",
    ".#.....#.",
    "..#####..",
  ],
  // Contact: envelope
  mail: [
    ".........",
    "#########",
    "##.....##",
    "#.#...#.#",
    "#..#.#..#",
    "#...#...#",
    "#.......#",
    "#########",
    ".........",
  ],
  // Terms: shield
  shield: [
    "#########",
    "#.......#",
    "#.....#.#",
    "#....#..#",
    "#.#.#...#",
    "#..#....#",
    ".#.....#.",
    "..#...#..",
    "...###...",
  ],
} satisfies Record<string, string[]>;

const ALL = { ...ICONS, ...GLYPHS };

export type PixelIconName = keyof typeof ALL;

export default function PixelIcon({ name, className = "size-5" }: { name: PixelIconName; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 18 18" shapeRendering="crispEdges" className={className}>
      {ALL[name].flatMap((row, y) =>
        [...row].map((c, x) =>
          c === "#" ? <rect key={`${x}-${y}`} x={x * 2} y={y * 2} width="1.7" height="1.7" fill="currentColor" /> : null,
        ),
      )}
    </svg>
  );
}

/** Rounded tile on the theme gradient holding a pixel icon. */
export function IconTile({ name, size = "md" }: { name: PixelIconName; size?: "sm" | "md" }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center text-brand-green ring-1 ring-brand-green/10 ${
        size === "md" ? "size-11 rounded-[12px]" : "size-9 rounded-[10px]"
      }`}
      style={{ backgroundImage: "linear-gradient(135deg in oklab, #d4f1dd 0%, #eef6df 50%, #fdf1c7 100%)" }}
    >
      <PixelIcon name={name} className={size === "md" ? "size-[22px]" : "size-[18px]"} />
    </span>
  );
}
