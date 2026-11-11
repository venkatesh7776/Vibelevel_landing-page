import type { Metadata } from "next";
import AuraHero from "@/components/aura/AuraHero";
import {
  AnalysisSection,
  ArchetypesSection,
  AuraCTASection,
  ConnectorSection,
  HowItWorksSection,
  LabsSection,
  LevelsSection,
  ProfileSection,
  ScoringSection,
} from "@/components/aura/AuraSections";
import PageShell from "@/components/site/PageShell";

export const metadata: Metadata = {
  title: "VibeLevel Aura – Discover your AI Style",
  description: "Connect your AI tools and get a score, archetype and skill dimensions from your real sessions, plus a shareable profile.",
};

export default function AuraPage() {
  return (
    <PageShell tinted nav={{ primary: { label: "Discover Aura free", href: "/aura/signup" }, signin: "/aura/signin" }}>
      <AuraHero />
      <HowItWorksSection />
      <ConnectorSection />
      <AnalysisSection />
      <ScoringSection />
      <ProfileSection />
      <LevelsSection />
      <LabsSection />
      <ArchetypesSection />
      <AuraCTASection />
    </PageShell>
  );
}
