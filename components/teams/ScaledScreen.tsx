"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Renders an app screen at its design width and scales it to fit its container, like an image,
 * so the mock stays pixel-identical from phone to desktop.
 */
export default function ScaledScreen({ width, height, label, children }: { width: number; height: number; label: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(Math.min(1, e.contentRect.width / width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div ref={ref} role="img" aria-label={label} className="relative w-full overflow-hidden" style={{ aspectRatio: `${width} / ${height}` }}>
      <div aria-hidden="true" className="absolute left-0 top-0 origin-top-left" style={{ width, height, transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}
