"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Same pixel language as the hero field: 3.5px dots on a 7px grid.
const GRID = 7;
const SIZE = 3.5;
const RADIUS = 64; // px around the cursor that lights up
const DENSITY = 0.5; // share of cells that take part, so the trail reads as scattered pixels
const MAX_ALPHA = 0.75;
const DECAY_MS = 260; // how quickly lit pixels fade once the cursor moves on
const TILT_DEG = 14;
const SHIFT_PX = 10; // the card also drifts this far toward the cursor

/** Stable per-cell pseudo-random value in [0, 1). */
function hash(i: number) {
  const s = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}

/**
 * Card shell with two hover effects for mouse users: a trail of green pixels that follows the
 * cursor and fades behind it (canvas, only animating while pixels are lit), and a soft 3D tilt
 * toward the cursor. Touch devices and reduced motion get the plain card.
 */
type PixelCardProps = {
  children: ReactNode;
  className?: string;
  /** Any CSS colour, including a `var(--token)`. Defaults to the hero pixel green. */
  pixelColor?: string;
};

export default function PixelCard({ children, className = "", pixelColor = "var(--color-pixel)" }: PixelCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!card || !canvas || !ctx) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Canvas can't read CSS variables, so resolve a var(--token) to its value first.
    const token = pixelColor.match(/^var\((--[\w-]+)\)$/)?.[1];
    const color = (token ? getComputedStyle(card).getPropertyValue(token).trim() : pixelColor) || "#1dc804";
    let w = 0;
    let h = 0;
    let cols = 0;
    let rows = 0;
    let cells = new Float32Array(0);
    let dpr = 1;

    const resize = () => {
      w = card.offsetWidth;
      h = card.offsetHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      cols = Math.ceil(w / GRID);
      rows = Math.ceil(h / GRID);
      cells = new Float32Array(cols * rows);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(card);

    let raf = 0;
    let last = 0;
    let hovering = false;

    const frame = (t: number) => {
      const decay = last ? Math.exp(-(t - last) / DECAY_MS) : 1;
      last = t;
      let alive = false;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color;
      for (let i = 0; i < cells.length; i++) {
        let v = cells[i];
        if (!v) continue;
        v *= decay;
        if (v < 0.02) v = 0;
        else alive = true;
        cells[i] = v;
        if (!v) continue;
        ctx.globalAlpha = v;
        ctx.fillRect((i % cols) * GRID, Math.floor(i / cols) * GRID, SIZE, SIZE);
      }
      if (alive || hovering) raf = requestAnimationFrame(frame);
      else {
        raf = 0;
        last = 0;
      }
    };

    const light = (x: number, y: number) => {
      const c0 = Math.max(0, Math.floor((x - RADIUS) / GRID));
      const c1 = Math.min(cols - 1, Math.ceil((x + RADIUS) / GRID));
      const r0 = Math.max(0, Math.floor((y - RADIUS) / GRID));
      const r1 = Math.min(rows - 1, Math.ceil((y + RADIUS) / GRID));
      for (let r = r0; r <= r1; r++) {
        for (let c = c0; c <= c1; c++) {
          const i = r * cols + c;
          if (hash(i) > DENSITY) continue;
          const d = Math.hypot(c * GRID + SIZE / 2 - x, r * GRID + SIZE / 2 - y);
          if (d > RADIUS) continue;
          const v = (1 - d / RADIUS) ** 1.4 * MAX_ALPHA * (0.55 + 0.45 * hash(i + 7));
          if (v > cells[i]) cells[i] = v;
        }
      }
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      hovering = true;
      const rect = card.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      // Quick ease while following the cursor, so the card feels attached to it.
      card.style.transition = "transform 220ms cubic-bezier(0.22, 1, 0.36, 1), border-color 500ms";
      card.style.transform = `perspective(900px) rotateX(${(-ny * TILT_DEG).toFixed(2)}deg) rotateY(${(nx * TILT_DEG).toFixed(2)}deg) translate3d(${(nx * SHIFT_PX).toFixed(1)}px, ${(ny * SHIFT_PX - 6).toFixed(1)}px, 0) scale(1.02)`;
      // The tilt scales the card on screen, so map back to its own (untransformed) size.
      light(((e.clientX - rect.left) / rect.width) * w, ((e.clientY - rect.top) / rect.height) * h);
    };
    const onLeave = () => {
      hovering = false;
      // Slower settle back to rest.
      card.style.transition = "transform 800ms cubic-bezier(0.22, 1, 0.36, 1), border-color 500ms";
      card.style.transform = "";
    };

    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", onLeave);
    return () => {
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerleave", onLeave);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [pixelColor]);

  return (
    <div
      ref={cardRef}
      className={`group/card relative h-full overflow-hidden transition-[transform,border-color] duration-500 ease-out-soft will-change-transform ${className}`}
    >
      {children}
      <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 size-full" />
    </div>
  );
}
