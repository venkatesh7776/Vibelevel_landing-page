"use client";

import { useState, type ReactNode } from "react";

/** Shows the top of its content with a fade, and a button to reveal the rest. */
export default function Expandable({ children, collapsed = 470, label }: { children: ReactNode; collapsed?: number; label: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="relative overflow-hidden transition-[max-height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" style={{ maxHeight: open ? 2000 : collapsed }}>
        {children}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white to-transparent transition-opacity duration-500 ${open ? "opacity-0" : "opacity-100"}`}
        />
      </div>
      <div className="mt-5 flex justify-center">
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-body text-[15px] font-medium text-ink-900 ring-1 ring-black/[0.1] transition-[background-color,color] hover:bg-brand-green hover:text-white"
        >
          {open ? "Show less" : label}
          <svg aria-hidden="true" viewBox="0 0 16 16" className={`size-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
            <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
