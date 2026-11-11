import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import TypedPhrase from "@/components/hero/TypedPhrase";
import Reveal from "@/components/sections/Reveal";
import ScreeningPixels from "@/components/sections/screening/ScreeningPixels";

export const GRADIENT = "linear-gradient(135deg in oklab, var(--grad-a) 0%, var(--grad-b) 50%, var(--grad-c) 100%)";

/** A page section in the home page's frame: dashed rule on top, hairline side rules, 1200px column. */
export function Section({ labelledBy, id, children }: { labelledBy: string; id?: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className="scroll-mt-20 border-t border-dashed border-black/10 bg-white px-4 sm:px-8">
      <div className="mx-auto max-w-[1200px] border-x border-black/[0.06]">{children}</div>
    </section>
  );
}

/** Content area under a SectionHeading. */
export function Body({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`px-4 pb-16 sm:px-8 md:pb-24 lg:px-12 lg:pb-28 ${className}`}>{children}</div>;
}

/** Small rounded tag. */
export function Chip({ children, tone = "plain" }: { children: ReactNode; tone?: "plain" | "green" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 font-body text-[13px] leading-[1.4] ${
        tone === "green" ? "bg-brand-green-50 text-brand-green ring-1 ring-brand-green/15" : "bg-black/[0.04] text-black/65"
      }`}
    >
      {children}
    </span>
  );
}

/** Sub-heading inside a section body. */
export function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-2 font-body text-[12px] font-medium uppercase tracking-[0.16em] text-black/45">
      <span aria-hidden="true" className="size-[5px] bg-brand-green" />
      {children}
    </p>
  );
}

/**
 * A product screenshot in a light browser frame, set on our gradient with live corner pixels.
 * `crop` keeps the top of tall screenshots in view.
 */
export function ShotStage({
  src,
  alt,
  className = "",
  frameClassName = "",
  sizes = "(min-width: 1024px) 900px, 100vw",
  priority,
  fit,
}: {
  src: StaticImageData;
  alt: string;
  className?: string;
  frameClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** Crop to a fixed 16:10 window from the top-left, so shots of different sizes line up. */
  fit?: boolean;
}) {
  return (
    <div
      className={`group/stage relative isolate overflow-hidden rounded-[24px] p-4 ring-1 ring-black/[0.05] sm:p-8 lg:p-10 ${className}`}
      style={{ backgroundImage: GRADIENT }}
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-70">
        <ScreeningPixels />
      </div>
      <div
        className={`overflow-hidden rounded-[14px] bg-white shadow-[0_40px_80px_-40px_rgba(6,36,24,0.55),0_12px_30px_-18px_rgba(6,36,24,0.25)] ring-1 ring-black/[0.08] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/stage:-translate-y-1 ${frameClassName}`}
      >
        <div className="flex items-center gap-1.5 border-b border-black/[0.06] bg-[#f8f8f7] px-3.5 py-2.5">
          <span className="size-2.5 rounded-full bg-black/10" />
          <span className="size-2.5 rounded-full bg-black/10" />
          <span className="size-2.5 rounded-full bg-black/10" />
        </div>
        {fit ? (
          <div className="relative aspect-[16/10]">
            <Image src={src} alt={alt} fill sizes={sizes} placeholder="blur" priority={priority} className="object-cover object-left-top" />
          </div>
        ) : (
          <Image src={src} alt={alt} sizes={sizes} placeholder="blur" priority={priority} className="block h-auto w-full" />
        )}
      </div>
    </div>
  );
}

export function Check({ className = "size-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={className}>
      <path d="m3.5 8.5 3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Cross({ className = "size-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={className}>
      <path d="m4.5 4.5 7 7m0-7-7 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function Arrow({ className = "size-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={className}>
      <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Centred section header: eyebrow, serif heading whose accent types in, short description. */
export function CenterHeading({
  id,
  eyebrow,
  lead,
  accent,
  description,
}: {
  id: string;
  eyebrow?: string;
  lead: string;
  accent: string;
  description?: ReactNode;
}) {
  return (
    <Reveal className="mx-auto max-w-[760px] px-5 pb-10 pt-16 text-center sm:px-8 md:pb-12 md:pt-24 lg:pt-28">
      {eyebrow && (
        <p className="flex items-center justify-center gap-2 font-body text-[12px] font-medium uppercase tracking-[0.16em] text-brand-green">
          <span aria-hidden="true" className="size-[5px] bg-brand-green" />
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className="mt-4 text-balance font-heading text-[32px] leading-[1.1] font-medium tracking-[-1px] text-black sm:text-[40px] lg:text-[44px]"
      >
        {lead}{" "}
        <em className="text-headline-accent italic">
          <TypedPhrase text={accent} startOnView reserveSpace />
        </em>
      </h2>
      {description && (
        <p className="mx-auto mt-5 max-w-[620px] text-pretty font-body text-[18px] leading-[1.55] text-black/55 lg:text-[20px]">{description}</p>
      )}
    </Reveal>
  );
}
