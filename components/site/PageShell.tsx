import type { ReactNode } from "react";
import HeroNavigation from "@/components/hero/HeroNavigation";
import LeftPixelField from "@/components/hero/LeftPixelField";
import PixelFieldGate from "@/components/hero/PixelFieldGate";
import RightPixelField from "@/components/hero/RightPixelField";
import Footer from "@/components/sections/Footer";

const fieldScale = "scale-[0.45] sm:scale-[0.55] lg:scale-[0.7]";

/**
 * Frame for every page other than the home page: the same navbar, the hero's live pixel fields
 * fading down from the top corners, and the footer.
 */
export default function PageShell({ children, fields = true }: { children: ReactNode; /** Corner pixel fields. */ fields?: boolean }) {
  return (
    <>
      <HeroNavigation />
      <main className="relative isolate overflow-hidden bg-white">
        {fields && (
        <PixelFieldGate className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] [mask-image:linear-gradient(to_bottom,#000_55%,transparent)]">
          <div className={`absolute left-[-20px] top-0 origin-top-left ${fieldScale}`}>
            <LeftPixelField />
          </div>
          <div className={`absolute right-[-20px] top-0 origin-top-right ${fieldScale}`}>
            <RightPixelField />
          </div>
        </PixelFieldGate>
        )}
        {/* Clears the fixed navbar. */}
        <div aria-hidden="true" className="h-[72px] lg:h-[68.4px]" />
        {children}
      </main>
      <Footer />
    </>
  );
}

/** Centred page title block: eyebrow chip, serif heading, lead paragraph. */
export function PageIntro({ eyebrow, title, lead }: { eyebrow?: string; title: ReactNode; lead?: ReactNode }) {
  return (
    <div className="mx-auto max-w-[820px] px-5 pt-14 text-center sm:pt-20 lg:pt-24">
      {eyebrow && (
        <p className="hero-rise mx-auto mb-5 inline-flex items-center gap-2 rounded-full bg-brand-green-50 px-3 py-1.5 font-body text-[12px] font-medium uppercase tracking-[0.16em] text-brand-green ring-1 ring-brand-green/15">
          <span aria-hidden="true" className="size-[5px] bg-brand-green" />
          {eyebrow}
        </p>
      )}
      <h1 className="hero-rise text-balance font-heading text-[36px] leading-[1.08] font-medium tracking-[-1.2px] text-black sm:text-[46px] lg:text-[52px]">
        {title}
      </h1>
      {lead && (
        <p
          className="hero-rise mx-auto mt-5 max-w-[640px] text-pretty font-body text-[17px] leading-[1.55] text-black/55 sm:text-[19px]"
          style={{ animationDelay: "150ms" }}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
