"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { usePixelRepel } from "./usePixelRepel";

/** Field size in px — matches the 412 x 900 pixel image in Figma. */
export const FIELD_W = 412;
export const FIELD_H = 900;

/** Neighbourhood size (≈3 x 3 dots) that blinks together as one small group. */
const CLUSTER_PX = 21;
/** Share of neighbourhoods that take part; the rest never blink. */
const BLINK_SHARE = 0.6;
/** Dots fainter than this sit near the copy and fade-out edge; keep them static so blinks stay in the pattern. */
const MIN_BLINK_OPACITY = 0.08;

export type PixelFieldTiming = {
  /** Length of one blink cycle in seconds. */
  cycle: number;
  /** Salt so left and right fields never share a sequence. */
  seed: number;
};

type PixelFieldProps = {
  dots: readonly number[];
  timing: PixelFieldTiming;
};

// Deterministic hash so both fields keep stable, distinct sequences.
function hash(i: number, seed: number) {
  let h = (i + 1) * 374761393 + seed * 668265263;
  h = (h ^ (h >>> 13)) * 1274126177;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

/**
 * Builds the dot markup: one <rect> per dot at its original position and size.
 * Every dot rests at its original opacity. Each participating neighbourhood gets its own
 * moment in the cycle to blink — brighten, hold, settle back — so at any time only a few
 * small groups are lit and the blink hops around the field. Only fill-opacity animates.
 */
function buildDots(dots: readonly number[], { cycle, seed }: PixelFieldTiming) {
  let out = "";
  for (let i = 0; i < dots.length; i += 4) {
    const n = i / 4;
    const [x, y, s, o] = [dots[i], dots[i + 1], dots[i + 2], dots[i + 3]];
    let rect = `<rect x="${x}" y="${y}" width="${s}" height="${s}" fill-opacity="${o}"`;

    const cluster = Math.floor(x / CLUSTER_PX) * 1000 + Math.floor(y / CLUSTER_PX);
    if (o >= MIN_BLINK_OPACITY && hash(cluster, seed + 1) < BLINK_SHARE) {
      // The neighbourhood picks its moment; a tiny per-dot jitter softens the group's edges.
      const delay = -((hash(cluster, seed) + hash(n, seed + 2) * 0.012) * cycle);
      rect += ` class="pf-blink" style="--o:${o};--pf-delay:${delay.toFixed(2)}s"`;
    }
    out += rect + "/>";
  }
  return out;
}

/**
 * Vector reconstruction of a Figma pixel image: every dot is its own SVG element on an even grid.
 * The "Pixel Blink" animation brightens small neighbourhoods in turn; the cursor pushes nearby
 * dots aside (see usePixelRepel) and they spring back to their exact positions.
 *
 * The fields are decorative, so dots are built on the client from compact data instead of
 * shipping ~6.5k elements twice (HTML + RSC payload). They fade in once mounted.
 */
export default function PixelField({ dots, timing }: PixelFieldProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const { cycle, seed } = timing;

  useEffect(() => {
    if (!svgRef.current || !wrapRef.current) return;
    svgRef.current.innerHTML = buildDots(dots, { cycle, seed });
    wrapRef.current.style.opacity = "1";
  }, [dots, cycle, seed]);

  // Runs after the dots are built (effects run in order), so it sees the fresh <rect>s.
  usePixelRepel(svgRef, FIELD_W, dots);

  return (
    <div ref={wrapRef} className="relative h-[900px] w-[412px] opacity-0 transition-opacity duration-[2000ms] ease-[cubic-bezier(0.33,0,0.2,1)]">
      <svg
        ref={svgRef}
        width={FIELD_W}
        height={FIELD_H}
        viewBox={`0 0 ${FIELD_W} ${FIELD_H}`}
        fill="var(--color-pixel)"
        className="absolute inset-0"
        style={{ "--pf-cycle": `${cycle}s` } as CSSProperties}
        shapeRendering="crispEdges"
        focusable="false"
      />
    </div>
  );
}
