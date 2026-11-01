"use client";

import { useId, useState } from "react";

export type FAQItem = { q: string; a: string };

/**
 * One answer open at a time; clicking the open question closes it. Answers slide open with a
 * grid-rows transition (no measured heights), and the plus turns into a minus.
 */
export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <ul className="border-t border-black/[0.08]">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btn = `${base}-q${i}`;
        const panel = `${base}-a${i}`;
        return (
          <li key={item.q} className="border-b border-black/[0.08]">
            <h3>
              <button
                id={btn}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center gap-6 py-5 text-left font-display text-[16px] leading-[1.4] font-medium text-black/85 transition-colors duration-200 hover:text-brand-green focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green sm:py-6 sm:text-[18px]"
              >
                <span className="flex-1">{item.q}</span>
                <span
                  aria-hidden="true"
                  className={`relative flex size-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                    isOpen ? "bg-brand-green text-white" : "bg-black/[0.04] text-black/60 group-hover:bg-brand-green-50 group-hover:text-brand-green"
                  }`}
                >
                  <span className="absolute h-[1.5px] w-3 rounded-full bg-current" />
                  <span
                    className={`absolute h-3 w-[1.5px] rounded-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${isOpen ? "scale-y-0" : ""}`}
                  />
                </span>
              </button>
            </h3>
            <div
              id={panel}
              role="region"
              aria-labelledby={btn}
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <p className="max-w-[620px] pb-6 pr-12 font-body text-[16px] leading-[1.6] text-black/55 sm:text-[17px]">{item.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
