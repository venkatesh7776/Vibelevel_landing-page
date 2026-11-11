"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = [
  { figure: { to: 1000 }, title: "Candidates", body: "All get the same real production task." },
  { title: "Ship a deliverable", body: "They plan, iterate and build in a real AI IDE." },
  { title: "5-minute report", body: "What they built and how they used AI. Scored, not guessed." },
  { figure: { to: 5, prefix: "Top " }, title: "To interview", body: "Only real builders reach your calendar." },
];

function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, on] as const;
}

function CountUp({ to, on, delay }: { to: number; on: boolean; delay: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!on) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now() + (still ? 0 : delay);
    const dur = still ? 1 : 1200;
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, Math.max(0, (t - start) / dur));
      setN(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [on, to, delay]);
  return <>{n.toLocaleString("en-US")}</>;
}

/** The four steps from flood to shortlist, as cards that rise in turn; the big figures count up. */
export default function StepCards() {
  const [ref, on] = useInView<HTMLOListElement>();
  return (
    <ol ref={ref} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      {STEPS.map((s, i) => (
        <li
          key={s.title}
          className={`group relative rounded-[20px] p-6 ring-1 ${i === STEPS.length - 1 ? "bg-brand-green-50 ring-brand-green/20" : "bg-white ring-black/[0.07]"} shadow-[0_18px_40px_-32px_rgba(6,36,24,0.5)] transition-[opacity,translate,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_28px_50px_-30px_rgba(6,36,24,0.5)] ${
            on ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
          style={{ transitionDelay: on ? `${i * 120}ms, ${i * 120}ms, 0ms` : "0ms" }}
        >
          {/* Arrow into the next step (desktop). */}
          {i < STEPS.length - 1 && (
            <span
              aria-hidden="true"
              className="absolute -right-[18px] top-1/2 z-10 hidden size-7 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-green shadow-[0_6px_16px_-8px_rgba(6,36,24,0.5)] ring-1 ring-black/[0.06] lg:flex"
            >
              <svg viewBox="0 0 16 16" className="size-3.5">
                <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          )}
          <p className="font-body text-[11.5px] font-medium tracking-[0.16em] text-black/45">STEP {String(i + 1).padStart(2, "0")}</p>
          {s.figure ? (
            <>
              <p className="mt-3 font-heading text-[44px] leading-none font-medium tracking-[-1px] text-headline-accent italic tabular-nums">
                {s.figure.prefix}
                <CountUp to={s.figure.to} on={on} delay={i * 120} />
              </p>
              <h3 className="mt-3 font-display text-[16px] font-semibold text-ink-900">{s.title}</h3>
            </>
          ) : (
            <h3 className="mt-3 font-display text-[20px] leading-[1.25] font-semibold tracking-[-0.2px] text-ink-900">{s.title}</h3>
          )}
          <p className="mt-2 font-body text-[15px] leading-[1.5] text-black/55">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
