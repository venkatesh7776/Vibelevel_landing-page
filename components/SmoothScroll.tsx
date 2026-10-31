"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/**
 * Eased, inertial wheel scrolling for the whole page. Touch keeps the native scroll, and
 * reduced motion keeps the browser default.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true, anchors: true, autoRaf: true });
    return () => lenis.destroy();
  }, []);

  return null;
}
