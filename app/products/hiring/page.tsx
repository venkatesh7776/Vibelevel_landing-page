import type { Metadata } from "next";
import HiringHero from "@/components/hiring/HiringHero";
import { BuilderSection, ManagerJourneySection, ScoringSection, UnderstandingSection } from "@/components/hiring/ProofSections";
import { NewSkillSection, RealTasksSection, ShortlistSection } from "@/components/hiring/SkillSections";
import {
  ATSSection,
  CompareSection,
  EngineSection,
  HiringCTASection,
  HiringFAQSection,
  IdentitySection,
  ProctoringSection,
} from "@/components/hiring/TrustSections";
import PageShell from "@/components/site/PageShell";

export const metadata: Metadata = {
  title: "VibeLevel Hiring – The AI-native skills assessment platform",
  description: "See who can build production-grade work with AI, not just vibe-code. Real tasks, real AI tools, evidence-backed scores.",
};

export default function HiringPage() {
  return (
    <PageShell>
      <HiringHero />
      <ShortlistSection />
      <NewSkillSection />
      <RealTasksSection />
      <ScoringSection />
      <UnderstandingSection />
      <ManagerJourneySection />
      <BuilderSection />
      <ATSSection />
      <ProctoringSection />
      <IdentitySection />
      <EngineSection />
      <CompareSection />
      <HiringFAQSection />
      <HiringCTASection />
    </PageShell>
  );
}
