"use client";

import { useEffect, type RefObject } from "react";

/** Radius of the pocket the cursor clears, in field px. */
const RADIUS = 90;
/** How far the dots closest to the cursor are pushed out, in field px. */
const PUSH = 20;
/** Follow speed while the cursor is pushing (fraction per 60fps frame; scaled by real frame time). */
const PUSH_EASE = 0.22;
/** Spring-back speed once the cursor moves on (~0.6s to settle at any frame rate). */
const RETURN_EASE = 0.12;
const FRAME_MS = 1000 / 60;
const CELL = 30;

/**
 * Cursor "repel": dots near the pointer slide outward and fade, opening a pocket that
 * follows the cursor; they spring back when it leaves. Only dots in or returning from the
 * pocket are touched each frame, and only via transform/opacity, so the blink keeps running.
 * Listens on window because the fields sit behind the hero content (pointer-events: none).
 */
export function usePixelRepel(svgRef: RefObject<SVGSVGElement | null>, fieldWidth: number, ready: unknown) {
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    // Off-screen fields sleep: their blink pauses (see [data-pf-paused] in globals.css) and they
    // ignore scroll/pointer events, so a page full of pixel cards costs nothing while scrolling.
    let visible = true;
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        svg.setAttribute("data-pf-paused", String(!visible));
      },
      { rootMargin: "100px" },
    );
    io.observe(svg);

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return () => io.disconnect();

    const rects = Array.from(svg.querySelectorAll("rect"));
    const n = rects.length;
    const cx = new Float32Array(n);
    const cy = new Float32Array(n);
    const dx = new Float32Array(n);
    const dy = new Float32Array(n);
    const fade = new Float32Array(n);
    const grid = new Map<number, number[]>();
    rects.forEach((r, i) => {
      const s = +(r.getAttribute("width") ?? 0);
      cx[i] = +(r.getAttribute("x") ?? 0) + s / 2;
      cy[i] = +(r.getAttribute("y") ?? 0) + s / 2;
      const key = Math.floor(cx[i] / CELL) * 1000 + Math.floor(cy[i] / CELL);
      const bucket = grid.get(key);
      if (bucket) bucket.push(i);
      else grid.set(key, [i]);
    });

    const active = new Set<number>();
    let pointer: { x: number; y: number } | null = null;
    let raf = 0;
    let last = 0;

    const frame = (now: number) => {
      raf = 0;
      // Frame-rate independent easing: the same feel at 30, 60 or 120 fps.
      const steps = last ? Math.min((now - last) / FRAME_MS, 6) : 1;
      last = now;
      const pushK = 1 - Math.pow(1 - PUSH_EASE, steps);
      const returnK = 1 - Math.pow(1 - RETURN_EASE, steps);
      // Cursor in field coordinates (the field may be scaled on smaller screens).
      let lx = 0;
      let ly = 0;
      const inside = new Set<number>();
      if (pointer) {
        const box = svg.getBoundingClientRect();
        const scale = box.width / fieldWidth;
        lx = (pointer.x - box.left) / scale;
        ly = (pointer.y - box.top) / scale;
        const span = Math.ceil(RADIUS / CELL);
        const gx = Math.floor(lx / CELL);
        const gy = Math.floor(ly / CELL);
        for (let x = gx - span; x <= gx + span; x++) {
          for (let y = gy - span; y <= gy + span; y++) {
            for (const i of grid.get(x * 1000 + y) ?? []) {
              if (Math.hypot(cx[i] - lx, cy[i] - ly) < RADIUS) {
                inside.add(i);
                active.add(i);
              }
            }
          }
        }
      }

      for (const i of active) {
        let tx = 0;
        let ty = 0;
        let tf = 0;
        if (inside.has(i)) {
          const vx = cx[i] - lx;
          const vy = cy[i] - ly;
          const d = Math.hypot(vx, vy);
          if (d < RADIUS) {
            const t = 1 - d / RADIUS;
            const strength = t * t * (3 - 2 * t); // smoothstep: strong at centre, soft at the rim
            const ux = d > 0.001 ? vx / d : 0;
            const uy = d > 0.001 ? vy / d : -1;
            tx = ux * PUSH * strength;
            ty = uy * PUSH * strength;
            tf = strength;
          }
        }
        const ease = tf > fade[i] ? pushK : returnK;
        dx[i] += (tx - dx[i]) * ease;
        dy[i] += (ty - dy[i]) * ease;
        fade[i] += (tf - fade[i]) * ease;

        const el = rects[i];
        if (Math.abs(dx[i]) < 0.05 && Math.abs(dy[i]) < 0.05 && fade[i] < 0.005 && tf === 0) {
          dx[i] = dy[i] = fade[i] = 0;
          el.style.transform = "";
          el.style.opacity = "";
          active.delete(i);
        } else {
          el.style.transform = `translate(${dx[i].toFixed(2)}px, ${dy[i].toFixed(2)}px)`;
          el.style.opacity = (1 - fade[i]).toFixed(3);
        }
      }

      if (active.size) raf = requestAnimationFrame(frame);
      else last = 0;
    };

    const schedule = () => {
      // Off-screen with nothing still springing back: no work at all.
      if (!visible && !active.size) return;
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || !visible) return;
      pointer = { x: e.clientX, y: e.clientY };
      schedule();
    };
    const onLeave = () => {
      pointer = null;
      schedule();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("scroll", schedule);
      rects.forEach((r) => {
        r.style.transform = "";
        r.style.opacity = "";
      });
    };
  }, [svgRef, fieldWidth, ready]);
}
