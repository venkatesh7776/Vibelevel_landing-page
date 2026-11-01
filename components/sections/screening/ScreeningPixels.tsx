"use client";

import { useRef } from "react";
import { buildDots } from "@/components/hero/pixel-svg";
import { usePixelRepel } from "@/components/hero/usePixelRepel";

// Same dot size and grid as the hero pixel fields.
const W = 260;
const H = 180;
const PITCH = 7;
const SIZE = 3.5;

// Deterministic hash so the pattern is the same on the server and the client.
function hash(i: number, seed: number) {
  let h = (i + 1) * 374761393 + seed * 668265263;
  h = (h ^ (h >>> 13)) * 1274126177;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

/** The hero field's opacity steps: most dots faint, a few strong, so the blink reads clearly. */
const LEVELS = [0.04, 0.08, 0.144, 0.289, 0.433, 0.578, 0.722];

/** A corner cluster in the hero's style: dense and bright at the corner, thinning and fading away from it. */
function cornerDots(seed: number) {
  const dots: number[] = [];
  const cols = Math.floor(W / PITCH);
  const rows = Math.floor(H / PITCH);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const k = r * 100 + c;
      const d = Math.hypot(c / cols, r / rows) / Math.SQRT2; // 0 at the corner → 1 at the far edge
      const near = Math.max(0, 1 - d * 1.25);
      if (hash(k, seed) > near ** 1.1 * 0.95) continue;
      const level = Math.round(near * (0.3 + 0.7 * hash(k, seed + 7)) * (LEVELS.length - 1));
      dots.push(c * PITCH, r * PITCH, SIZE, LEVELS[level]);
    }
  }
  return dots;
}

// One cluster per corner. Mirrored in data (not with a CSS transform) so the cursor repel maps correctly.
const mirror = (dots: number[], flipX: boolean, flipY: boolean) =>
  dots.map((v, i) =>
    i % 4 === 0 && flipX ? W - SIZE - v : i % 4 === 1 && flipY ? H - SIZE - v : v,
  );
const CORNERS = [
  { dots: mirror(cornerDots(11), false, false), seed: 41, className: "left-0 top-0" },
  { dots: mirror(cornerDots(29), false, true), seed: 59, className: "bottom-0 left-0" },
  { dots: mirror(cornerDots(37), true, false), seed: 77, className: "right-0 top-0" },
  { dots: mirror(cornerDots(53), true, true), seed: 93, className: "bottom-0 right-0" },
];

function Cluster({ dots, className, seed }: { dots: number[]; className: string; seed: number }) {
  const ref = useRef<SVGSVGElement>(null);
  usePixelRepel(ref, W, dots);
  return (
    <svg
      ref={ref}
      aria-hidden="true"
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      shapeRendering="crispEdges"
      className={`pointer-events-none absolute fill-pixel [--pf-cycle:6s] ${className}`}
      dangerouslySetInnerHTML={{ __html: buildDots(dots, { cycle: 6, seed }) }}
    />
  );
}

/**
 * The hero's live pixels, used sparingly on the colour artwork: a small cluster in each
 * corner that blink and slide away from the cursor. They sit in the colour layer only, so the
 * black-and-white side never shows them.
 */
export default function ScreeningPixels() {
  return (
    <>
      {CORNERS.map((c) => (
        <Cluster key={c.className} dots={c.dots} seed={c.seed} className={c.className} />
      ))}
    </>
  );
}
