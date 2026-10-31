"use client";

import { useEffect, useRef } from "react";

const COUNT = 16; // pixels per click
const SIZE = 4; // px, close to the hero field's 3.5px dots
const LIFE_MS = 800;
const SPEED = 0.3; // px per ms at launch
const DRAG = 0.0035; // per ms, so pixels slow down as they fly out
const GRAVITY = 0.0004; // px per ms², a gentle fall at the end

type Pixel = { x: number; y: number; vx: number; vy: number; born: number; size: number };

/**
 * Click feedback for the whole site: a small burst of green pixels from the click point that
 * drift out, slow down and fade. Drawn on one fixed, click-through canvas that only animates
 * while pixels are alive. Skipped with reduced motion.
 */
export default function ClickPixels() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const color = getComputedStyle(document.documentElement).getPropertyValue("--color-pixel").trim() || "#1dc804";
    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
    };
    resize();

    let pixels: Pixel[] = [];
    let raf = 0;
    let last = 0;

    const frame = (now: number) => {
      const dt = last ? Math.min(now - last, 40) : 16;
      last = now;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.fillStyle = color;
      pixels = pixels.filter((p) => now - p.born < LIFE_MS);
      for (const p of pixels) {
        const k = Math.exp(-DRAG * dt);
        p.vx *= k;
        p.vy = p.vy * k + GRAVITY * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        const life = (now - p.born) / LIFE_MS;
        ctx.globalAlpha = 1 - life * life;
        // Snap to whole pixels so the squares stay crisp, like the hero field.
        ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
      }
      if (pixels.length) raf = requestAnimationFrame(frame);
      else {
        raf = 0;
        last = 0;
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    };

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      const now = performance.now();
      for (let i = 0; i < COUNT; i++) {
        const angle = (i / COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
        const speed = SPEED * (0.45 + Math.random() * 0.75);
        pixels.push({
          x: e.clientX - SIZE / 2,
          y: e.clientY - SIZE / 2,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          born: now,
          size: Math.random() < 0.3 ? SIZE - 1 : SIZE,
        });
      }
      if (!raf) raf = requestAnimationFrame(frame);
    };

    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100] size-full" />;
}
