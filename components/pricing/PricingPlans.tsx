"use client";

import { useState } from "react";
import PrimaryButton from "@/components/hero/PrimaryButton";
import SecondaryButton from "@/components/hero/SecondaryButton";
import ScreeningPixels from "@/components/sections/screening/ScreeningPixels";

type Plan = {
  name: string;
  price: string;
  per?: string;
  credits: string;
  description: string;
  cta: { label: string; href: string; primary: boolean };
  includesTitle: string;
  includes: string[];
  featured?: boolean;
};

const HIRING: Plan[] = [
  {
    name: "Free",
    price: "$0",
    credits: "6 credits/mo",
    description: "For Solo Recruiters to explore the hiring platform.",
    cta: { label: "Get Started Free", href: "/signup?product=hiring", primary: true },
    includesTitle: "Includes:",
    includes: [
      "Monthly credits to run AI assessment sessions",
      "AI Assessment IDE — editor, terminal, file tree",
      "VibeLevel Inhouse AI Coding Agent (Copilot-class)",
      "Application forms & resume collection",
      "Candidate invitations & shortlisting",
      "AI session transcripts",
      "Top Up for additional credits",
    ],
  },
  {
    name: "Hire Plus",
    price: "$99",
    per: "/ month",
    credits: "100 credits/mo",
    description: "For Solo Recruiters with full agentic assessments, screening & advanced features",
    cta: { label: "Upgrade to Hire Plus", href: "/signup?product=hiring", primary: true },
    includesTitle: "Everything in Free, plus:",
    includes: [
      "Everything in Free and more credits",
      "Claude Code agent",
      "Self-service custom assessment builder",
      "AI resume scoring & auto-filter",
      "Candidate ranking & comparison",
      "Identity verification & proctoring signals",
      "Custom AI instructions & scoring weights",
      "Top Up for additional credits",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "$999",
    per: "/ month",
    credits: "1000 credits/mo",
    description: "No seat based charge. Use across your org with dedicated support.",
    cta: { label: "Contact Sales", href: "/request-demo", primary: false },
    includesTitle: "Everything in Hire Plus, plus:",
    includes: [
      "Everything in Plus and higher limits",
      "Video Q&A & Understanding Check",
      "Advanced AI model for scoring",
      "Hiring Team roles",
      "Volume pricing & annual contracts",
      "Priority support & onboarding",
      "Dedicated support & account manager",
    ],
  },
];

const TABS = [
  { id: "hiring", label: "For Hiring" },
  { id: "teams", label: "For Teams" },
  { id: "campus", label: "For Campus" },
  { id: "builders", label: "For Builders & Individuals" },
] as const;
type TabId = (typeof TABS)[number]["id"];

const GRADIENT = "linear-gradient(160deg in oklab, #d4f1dd 0%, #eef6df 55%, #fdf1c7 100%)";

function Check() {
  return (
    <svg aria-hidden="true" viewBox="0 0 12 12" className="mt-[6px] size-3.5 shrink-0 text-brand-green">
      <path d="M2.5 6.2 5 8.5l4.5-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  return (
    <article
      className={`pc-rise relative flex flex-col rounded-[24px] p-7 ring-1 transition-[translate,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 sm:p-8 ${
        plan.featured
          ? "isolate overflow-hidden ring-brand-green/25 shadow-[0_32px_64px_-36px_rgba(6,36,24,0.45)]"
          : "bg-white ring-black/[0.07] hover:shadow-[0_28px_56px_-40px_rgba(6,36,24,0.4)]"
      }`}
      style={{ ...(plan.featured ? { backgroundImage: GRADIENT } : {}), animationDelay: `${index * 90}ms` }}
    >
      {plan.featured && (
        <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-60">
          <ScreeningPixels />
        </div>
      )}
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-[19px] font-medium text-ink-900">{plan.name}</h3>
        <span className="rounded-full bg-ink-900 px-2.5 py-1 font-body text-[11px] font-medium text-white">Available</span>
      </div>
      <p className="mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-2">
        <span className="font-heading text-[44px] leading-none font-medium tracking-[-1px] text-black">{plan.price}</span>
        {plan.per && <span className="font-body text-[15px] text-black/50">{plan.per}</span>}
        <span className="rounded-full bg-white px-2.5 py-1 font-body text-[12px] font-medium text-brand-green ring-1 ring-brand-green/20">
          {plan.credits}
        </span>
      </p>
      <p className="mt-5 min-h-[72px] font-body text-[15px] leading-[1.55] text-black/60">{plan.description}</p>

      <div className="mt-6 grid">
        {plan.cta.primary ? (
          <PrimaryButton href={plan.cta.href} className="w-full">
            {plan.cta.label}
          </PrimaryButton>
        ) : (
          <SecondaryButton href={plan.cta.href} className="w-full">
            {plan.cta.label}
          </SecondaryButton>
        )}
      </div>

      <div className="mt-7 border-t border-dashed border-black/10 pt-6">
        <p className="font-body text-[12px] font-medium uppercase tracking-[0.14em] text-black/45">{plan.includesTitle}</p>
        <ul className="mt-4 space-y-2.5">
          {plan.includes.map((f) => (
            <li key={f} className="flex gap-2.5 font-body text-[15px] leading-[1.5] text-black/70">
              <Check />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/** Plan tabs. Only the hiring plans are published so far; the other tabs point to sales. */
export default function PricingPlans() {
  const [tab, setTab] = useState<TabId>("hiring");
  const label = TABS.find((t) => t.id === tab)!.label;

  return (
    <div>
      <div className="flex justify-center px-4">
        <div role="tablist" aria-label="Pricing by audience" className="flex max-w-full gap-1 overflow-x-auto rounded-full bg-black/[0.04] p-1 ring-1 ring-black/[0.05]">
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              type="button"
              aria-selected={tab === t.id}
              aria-controls="pricing-panel"
              onClick={() => setTab(t.id)}
              className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 font-body text-[14px] font-medium transition-[background-color,color,box-shadow] duration-300 sm:px-5 ${
                tab === t.id ? "bg-ink-900 text-white shadow-[0_6px_16px_-8px_rgba(6,36,24,0.5)]" : "text-black/60 hover:text-ink-900"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div id="pricing-panel" role="tabpanel" aria-label={label} className="mx-auto mt-10 max-w-[1200px] px-4 sm:px-8 lg:px-12">
        {tab === "hiring" ? (
          <div key="hiring" className="grid gap-5 lg:grid-cols-3">
            {HIRING.map((p, i) => (
              <PlanCard key={p.name} plan={p} index={i} />
            ))}
          </div>
        ) : (
          <div
            key={tab}
            className="pc-rise relative isolate mx-auto max-w-[720px] overflow-hidden rounded-[24px] px-6 py-14 text-center ring-1 ring-black/[0.05]"
            style={{ backgroundImage: GRADIENT }}
          >
            <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-60">
              <ScreeningPixels />
            </div>
            <h3 className="font-heading text-[30px] leading-[1.15] font-medium tracking-[-0.6px] text-black">{label}</h3>
            <p className="mx-auto mt-3 max-w-[440px] font-body text-[16px] leading-[1.55] text-black/60">
              Talk to our team about plans for your needs.
            </p>
            <div className="mt-7 flex justify-center">
              <PrimaryButton href="/request-demo" size="lg">
                Contact Sales
              </PrimaryButton>
            </div>
          </div>
        )}
        <p className="mx-auto mt-12 max-w-[760px] text-center font-body text-[15px] leading-[1.6] text-black/50">
          All plans include full access to their respective features — Aura sessions, assessments, AI agents, IDE, and
          multi-dimensional analytics. No per-seat fees.
        </p>
      </div>
    </div>
  );
}
