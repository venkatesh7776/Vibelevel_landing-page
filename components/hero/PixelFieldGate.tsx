"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Pauses the pixel-field CSS animations while the hero is off-screen or the tab is hidden.
 * Writes a data attribute directly so toggling never re-renders React.
 */
export default function PixelFieldGate({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let inView = true;
    const sync = () => el.setAttribute("data-pf-paused", String(!inView || document.hidden));

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {children}
    </div>
  );
}
