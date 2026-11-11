import type { Metadata } from "next";
import { BuilderSection } from "@/components/hiring/ProofSections";
import PageShell from "@/components/site/PageShell";
import { BadgesSection, ProductCTA, ProductHero, ScreenFrame, ShowcaseSection, StepsSection } from "@/components/site/ProductBlocks";
import ScaledScreen from "@/components/teams/ScaledScreen";
import { TeamsDashboardScreen } from "@/components/teams/TeamsScreens";
import { AudienceSection, CurveSection, GrowthSection, IncludesSection } from "@/components/teams/TeamsSections";

export const metadata: Metadata = {
  title: "VibeLevel Teams – Measure & level up workforce AI fluency",
  description: "Measure every employee on the Human-AI Collaboration ladder, spot skill gaps and build them up with practice and AI Skills Sprints.",
};

const SIGN_IN = { label: "Sign in with work email", href: "/teams/signin" };

export default function TeamsPage() {
  return (
    <PageShell tinted nav={{ primary: { label: "Book a call", href: "/request-demo" }, signin: "/teams/signin" }}>
      <ProductHero
        id="teams-heading"
        badge="VibeLevel Teams"
        lead="Measure & level up your"
        accent="workforce AI fluency."
        intro="Your org rolled out Copilot, Claude and ChatGPT. Adoption looks fine; productivity doesn't. The gap is how people steer the tools."
        primary={SIGN_IN}
        secondary={{ label: "Talk to us", href: "/request-demo" }}
      >
        <p className="hero-rise mx-auto mt-10 max-w-[560px] font-heading text-[20px] leading-[1.35] text-black/70 italic sm:text-[22px]" style={{ animationDelay: "400ms" }}>
          &ldquo;The bottleneck to AI productivity isn&rsquo;t the tools. It&rsquo;s fluency.&rdquo;
        </p>
      </ProductHero>
      <CurveSection />
      <IncludesSection />
      <AudienceSection />
      <ShowcaseSection
        id="dashboard-heading"
        eyebrow="Workforce fluency dashboard"
        lead="See your org's AI fluency"
        accent="at a glance."
        description="Fluency distribution, team comparison and engagement, scoped to each admin's teams."
        shotLabel="VibeLevel Teams workforce fluency dashboard"
        visual={
          <ScreenFrame>
            <ScaledScreen width={1200} height={1040} label="VibeLevel Teams dashboard: fluency KPIs, distribution, team breakdown, engagement funnel, top performers and sprints">
              <TeamsDashboardScreen />
            </ScaledScreen>
          </ScreenFrame>
        }
        points={[
          { title: "Fluency distribution", body: "Advanced to Novice counts across your org." },
          { title: "Team & department breakdown", body: "Strongest and weakest teams at a glance." },
          { title: "Top performers", body: "Your champions, ready to mentor or lead a sprint." },
          { title: "Engagement funnel", body: "Registered → submitted → graded, and where people drop off." },
        ]}
      />
      <GrowthSection />
      <BuilderSection
        id="challenge-builder-heading"
        eyebrow="AI Skills Challenge builder"
        lead="Chat your AI challenge"
        description="Describe the role and rubric. It's validated in a live sandbox and published to your Org Challenges Library."
        steps={["Describe the role", "Validated in a live sandbox", "Added to your library"]}
      />
      <StepsSection
        id="teams-how-heading"
        eyebrow="How Teams works"
        lead="From sign-in"
        accent="to fluency level."
        audience="For your workforce"
        steps={[
          { icon: "mail", title: "Sign in with work email", body: "Auto-routed to your org." },
          { icon: "doc", title: "Take a challenge", body: "Practice from the library or join a sprint." },
          { icon: "code", title: "Build with AI", body: "In the web IDE with a real AI assistant." },
          { icon: "skill", title: "See your level", body: "Climb the ladder, earn shareable badges." },
        ]}
      />
      <BadgesSection id="teams-badges-heading" />
      <ProductCTA
        id="teams-cta-heading"
        lead="Build your team's"
        accent="AI fluency."
        body="Measure fluency. Build skills. Watch your team level up, on one platform."
        primary={SIGN_IN}
        secondary={{ label: "Talk to us", href: "/request-demo" }}
      />
    </PageShell>
  );
}
