"use client";

import { useEffect, useRef, useState } from "react";

/** "Watch Demo": opens the product demo in a dialog over the page. Escape or the backdrop closes it. */
export default function WatchDemo({ size = "md" }: { size?: "md" | "lg" } = {}) {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      void video.current?.play();
    }
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`group inline-flex items-center justify-center gap-2 rounded-pill border border-ink-900 font-body font-medium ${size === "lg" ? "bg-white/70 px-[26px] py-[13px] text-[17px]" : "bg-white px-[18px] py-[10px] text-[16px] sm:px-[20px]"} leading-[20.4px] tracking-[-0.51px] text-ink-900 transition-[background-color,border-color,color,translate] duration-200 hover:-translate-y-px hover:border-brand-green hover:bg-brand-green hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green`}
      >
        <span className="flex size-5 items-center justify-center rounded-full bg-ink-900 text-white transition-colors group-hover:bg-white group-hover:text-brand-green">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="ml-px size-2.5 fill-current">
            <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.6-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
          </svg>
        </span>
        Watch Demo
      </button>

      <dialog
        ref={dialog}
        onClose={() => {
          setOpen(false);
          video.current?.pause();
        }}
        onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        aria-label="VibeLevel Hiring demo"
        className="m-auto w-[min(1080px,calc(100vw-32px))] overflow-visible bg-transparent p-0 backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      >
        <div className="relative overflow-hidden rounded-[18px] bg-black shadow-2xl">
          <video
            ref={video}
            src="/videos/vibelevel-screening-demo.mp4"
            controls
            playsInline
            preload="none"
            className="block aspect-video w-full"
          />
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close video"
          className="absolute -top-12 right-0 flex size-10 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/30 transition-colors hover:bg-white/25"
        >
          <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4">
            <path d="m4 4 8 8m0-8-8 8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </dialog>
    </>
  );
}
