import type { Metadata } from "next";
import PricingPlans from "@/components/pricing/PricingPlans";
import PageShell, { PageIntro } from "@/components/site/PageShell";

export const metadata: Metadata = {
  title: "Pricing – VibeLevel",
  description: "Plans for hiring teams, teams, campuses and individual builders. No per-seat fees.",
};

export default function PricingPage() {
  return (
    <PageShell>
      <PageIntro
        eyebrow="Pricing"
        title={
          <>
            Join Forward-Thinking <em className="text-headline-accent italic">Teams &amp; Builders</em>
          </>
        }
        lead="The AI-first era demands new skills and new ways to hire. Meta, Anthropic, Stripe, and OpenAI have moved to AI-enabled, project-based assessments — VibeLevel brings that model to everyone."
      />
      <div className="pb-20 pt-10 sm:pb-28 sm:pt-12">
        <PricingPlans />
      </div>
    </PageShell>
  );
}
