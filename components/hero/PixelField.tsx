"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { buildDots, FIELD_H, FIELD_W, type PixelFieldTiming } from "./pixel-svg";
import { usePixelRepel } from "./usePixelRepel";

type PixelFieldProps = {
  dots: readonly number[];
  timing: PixelFieldTiming;
  /** Pre-rendered, already-blinking SVG of the same field (see app/pixels). */
  src: string;
};

/**
 * Vector reconstruction of a Figma pixel image: every dot is its own SVG element on an even grid.
 * The "Pixel Blink" animation brightens small neighbourhoods in turn; the cursor pushes nearby
 * dots aside (see usePixelRepel) and they spring back to their exact positions.
 *
 * First paint shows a static SVG image of the field, so the dots are there and blinking the
 * moment the hero lands. Once JavaScript runs, the same dots are rebuilt as live elements
 * (needed for the cursor repel), phase-matched to the image's blink, and the image is removed.
 */
export default function PixelField({ dots, timing, src }: PixelFieldProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const { cycle, seed } = timing;

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    // The image's blink timeline started when it loaded; shift the live dots to the same phase.
    const loaded = performance.getEntriesByName(new URL(src, location.href).href)[0] as PerformanceResourceTiming | undefined;
    const shift = loaded ? (performance.now() - loaded.responseEnd) / 1000 : 0;
    svg.style.setProperty("--pf-shift", `${shift.toFixed(2)}s`);
    svg.innerHTML = buildDots(dots, { cycle, seed });
    imgRef.current?.remove();
  }, [dots, cycle, seed, src]);

  // Runs after the dots are built (effects run in order), so it sees the fresh <rect>s.
  usePixelRepel(svgRef, FIELD_W, dots);

  return (
    <div className="pf-in relative h-[900px] w-[412px]">
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative static SVG, swapped out once hydrated */}
      <img ref={imgRef} src={src} alt="" width={FIELD_W} height={FIELD_H} fetchPriority="high" decoding="async" className="absolute inset-0" />
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
