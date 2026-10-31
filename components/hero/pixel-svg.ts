// Builds the hero pixel-field dot markup. Shared by the interactive field (PixelField) and the
// static SVGs served at /pixels/left.svg and /pixels/right.svg, which paint on first load.

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
export function buildDots(dots: readonly number[], { cycle, seed }: PixelFieldTiming) {
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

export const LEFT_TIMING: PixelFieldTiming = { cycle: 5.5, seed: 17 };
export const RIGHT_TIMING: PixelFieldTiming = { cycle: 6.5, seed: 53 };

/**
 * Self-contained, already-blinking SVG of one field (colour and keyframes inlined, since an
 * SVG loaded as an image can't see the page's CSS). Mirrors the pf-blink rules in globals.css.
 */
export function fieldSvg(dots: readonly number[], timing: PixelFieldTiming) {
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${FIELD_W}" height="${FIELD_H}" viewBox="0 0 ${FIELD_W} ${FIELD_H}" fill="#1dc804" shape-rendering="crispEdges">` +
    `<style>@keyframes pf-blink{0%,20%,100%{fill-opacity:var(--o)}6%,12%{fill-opacity:calc(var(--o)*0.4 + 0.6)}}` +
    `.pf-blink{animation:pf-blink ${timing.cycle}s ease-in-out var(--pf-delay,0s) infinite}` +
    `@media (prefers-reduced-motion:reduce){.pf-blink{animation:none}}</style>` +
    buildDots(dots, timing) +
    `</svg>`
  );
}
