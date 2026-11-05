import type { Metadata } from "next";
import DemoForm from "@/components/demo/DemoForm";
import ScreeningPixels from "@/components/sections/screening/ScreeningPixels";
import PageShell, { PageIntro } from "@/components/site/PageShell";

export const metadata: Metadata = {
  title: "Request a demo – VibeLevel",
  description: "Book a personalized walkthrough of the VibeLevel platform.",
};

const EXPECT = [
  "Live walkthrough of the AI-native IDE shared across all product lines",
  "See how Aura, Campus, Teams, and Hiring fit together on one platform",
  "Review the Human-AI collaboration scoring engine and proctoring",
  "Discuss which product mix fits your needs",
  "Get answers to all your questions",
];

const GRADIENT = "linear-gradient(150deg in oklab, #d4f1dd 0%, #eef6df 55%, #fdf1c7 100%)";

function Check() {
  return (
    <svg aria-hidden="true" viewBox="0 0 12 12" className="mt-[6px] size-3.5 shrink-0 text-brand-green">
      <path d="M2.5 6.2 5 8.5l4.5-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function RequestDemoPage() {
  return (
    <PageShell>
      <PageIntro
        eyebrow="Request a demo"
        title={
          <>
            See VibeLevel <em className="text-headline-accent italic">in action.</em>
          </>
        }
        lead="Book a personalized walkthrough of the VibeLevel platform. We’ll reach out within 24 hours."
      />

      <div className="mx-auto grid max-w-[1160px] items-start gap-6 px-4 pb-20 pt-12 sm:px-8 sm:pb-28 sm:pt-16 lg:grid-cols-[1.4fr_1fr]">
        <section
          aria-labelledby="demo-form-heading"
          className="pc-rise rounded-[24px] bg-white p-6 ring-1 ring-black/[0.07] shadow-[0_32px_64px_-48px_rgba(6,36,24,0.45)] sm:p-9"
        >
          <h2 id="demo-form-heading" className="font-display text-[22px] font-medium text-ink-900">
            Request a demo
          </h2>
          <p className="mt-1.5 mb-7 font-body text-[15px] text-black/55">
            Tell us a bit about your team and we&rsquo;ll tailor the walkthrough.
          </p>
          <DemoForm />
        </section>

        <aside className="grid gap-6">
          <div
            className="pc-rise relative isolate overflow-hidden rounded-[24px] p-7 ring-1 ring-black/[0.05] sm:p-8"
            style={{ backgroundImage: GRADIENT, animationDelay: "120ms" }}
          >
            <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-35">
              <ScreeningPixels />
            </div>
            <p className="font-body text-[12px] font-medium uppercase tracking-[0.16em] text-brand-green">What to expect</p>
            <ul className="mt-5 space-y-3.5">
              {EXPECT.map((e) => (
                <li key={e} className="flex gap-3 font-body text-[15px] leading-[1.55] text-black/75">
                  <Check />
                  {e}
                </li>
              ))}
            </ul>
          </div>

          <div className="pc-rise rounded-[24px] bg-white p-7 ring-1 ring-black/[0.07] sm:p-8" style={{ animationDelay: "220ms" }}>
            <p className="font-body text-[12px] font-medium uppercase tracking-[0.16em] text-brand-green">Prefer email?</p>
            <a
              href="mailto:contact@vibelevel.ai"
              className="mt-3 block font-display text-[20px] font-medium text-ink-900 transition-colors hover:text-brand-green"
            >
              contact@vibelevel.ai
            </a>
            <p className="mt-2 font-body text-[14px] text-black/55">Reach us directly — we reply within one business day.</p>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
