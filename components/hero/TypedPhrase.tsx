"use client";

import { useEffect, useRef, useState } from "react";

const START_DELAY_MS = 600;
const CHAR_MS = 75;
const SPACE_MS = 140;

/**
 * Types its text out once — on load, or when it first scrolls into view with `startOnView` —
 * letter by letter, behind a caret that fades away after. The text flows
 * inline, so the rest of the line moves along as each letter appears. The caret is absolutely
 * positioned and takes no width, so removing it at the end causes no shift. Reduced motion shows the full text at once.
 */
type TypedPhraseProps = {
  text: string;
  className?: string;
  startOnView?: boolean;
  /** Hold the full phrase's space from the start, so surrounding lines never reflow. */
  reserveSpace?: boolean;
};

export default function TypedPhrase({
  text,
  className = "",
  startOnView = false,
  reserveSpace = false,
}: TypedPhraseProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const done = count >= text.length;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(text.length);
      return;
    }
    let n = 0;
    let timer: number | undefined;
    const step = () => {
      n += 1;
      setCount(n);
      if (n < text.length)
        timer = window.setTimeout(step, text[n] === " " ? SPACE_MS : CHAR_MS);
    };
    const start = () => {
      timer = window.setTimeout(step, START_DELAY_MS);
    };

    let io: IntersectionObserver | undefined;
    if (startOnView && ref.current) {
      io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          io?.disconnect();
          start();
        },
        { rootMargin: "0px 0px -15% 0px" },
      );
      io.observe(ref.current);
    } else start();

    return () => {
      io?.disconnect();
      window.clearTimeout(timer);
    };
  }, [text, startOnView]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden="true" className={`whitespace-nowrap ${className}`}>
        <span className="relative">
          {text.slice(0, count)}
          <span
            className={`absolute left-full top-[0.16em] ml-[0.05em] h-[0.84em] w-[0.05em] bg-current transition-opacity duration-500 ${
              done ? "opacity-0 delay-500" : ""
            }`}
          />
        </span>
        {reserveSpace && <span className="invisible">{text.slice(count)}</span>}
      </span>
    </>
  );
}
