"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger in ms. */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article";
};

/**
 * Fades content up once it enters the viewport. Opacity + transform only; reduced motion
 * shows content immediately.
 */
export default function Reveal({ children, delay = 0, className = "", as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      data-shown={shown}
      style={{ transitionDelay: `${delay}ms` }}
      className={`translate-y-6 opacity-0 transition-[opacity,translate] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] data-[shown=true]:translate-y-0 data-[shown=true]:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${className}`}
    >
      {children}
    </Tag>
  );
}
