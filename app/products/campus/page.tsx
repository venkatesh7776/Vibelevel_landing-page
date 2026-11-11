import type { Metadata } from "next";
import { AudienceSection, CampusSides, IncludesSection, LeaderboardSection } from "@/components/campus/CampusSections";
import { BuilderSection } from "@/components/hiring/ProofSections";
import { CompareSection } from "@/components/hiring/TrustSections";
import PageShell from "@/components/site/PageShell";
import { CampusDashboardScreen } from "@/components/campus/CampusScreens";
import { BadgesSection, ProductCTA, ProductHero, ScreenFrame, ShowcaseSection, StepsSection } from "@/components/site/ProductBlocks";
import ScaledScreen from "@/components/teams/ScaledScreen";

export const metadata: Metadata = {
  title: "VibeLevel Campus – Campus-wide vibeathons & talent pipeline",
  description: "Students discover their AI Style and compete in vibeathons. Coordinators run events. Top performers reach recruiters.",
};

const SIGN_IN = { label: "Sign in with campus email", href: "/campus/signin" };

export default function CampusPage() {
  return (
    <PageShell tinted nav={{ primary: { label: "Book a call", href: "/request-demo" }, signin: "/campus/signin" }}>
      <ProductHero
        id="campus-heading"
        badge="VibeLevel Campus"
        stacked
        equalButtons
        lead="Campus-wide vibeathons &"
        accent="talent pipeline."
        intro="Students discover their AI Style and compete in real IDE challenges. Top performers go straight onto the recruiter radar."
        primary={SIGN_IN}
        secondary={{ label: "See how it works", href: "#campus-how-heading" }}
      >
        <CampusSides />
      </ProductHero>
      <IncludesSection />
      <AudienceSection />
      <ShowcaseSection
        id="insights-heading"
        eyebrow="Campus-wide insights"
        lead="Every event. Every track."
        accent="One dashboard."
        description="Engagement, performance and pipeline in one view, ready for department heads and hiring partners."
        shotLabel="VibeLevel Campus coordinator insights dashboard"
        visual={
          <ScreenFrame>
            <ScaledScreen width={1200} height={1165} label="VibeLevel Campus coordinator dashboard: campus KPIs, score distribution, top departments, engagement funnel, top students, vibeathons and tracks">
              <CampusDashboardScreen />
            </ScaledScreen>
          </ScreenFrame>
        }
        points={[
          { title: "Engagement funnel", body: "Registered → submitted → graded. See where students drop off." },
          { title: "Cohort breakdown", body: "Participation by department, year or program." },
          { title: "Top departments & tracks", body: "Highlights for the next campus newsletter." },
          { title: "Top students", body: "One ranking across every vibeathon." },
        ]}
      />
      <LeaderboardSection />
      <BuilderSection
        id="campus-builder-heading"
        description="Describe the challenge and rubric. It's validated in a live sandbox and published, no templates."
        steps={["Describe the challenge", "Validated in a live sandbox", "Published to your event"]}
      />
      <StepsSection
        id="campus-how-heading"
        eyebrow="How Campus works"
        lead="From sign-up"
        accent="to the leaderboard."
        audience="For students"
        steps={[
          { icon: "compass", title: "Find your vibeathon", body: "Dates, tracks, prizes and rules on the event page." },
          { icon: "person", title: "Sign in & pick a track", body: "Use your campus email and lock your seat." },
          { icon: "code", title: "Build with AI", body: "Code or write in a real IDE with the AI assistant." },
          { icon: "skill", title: "See your score", body: "A multi-dimension report, live on the leaderboard." },
        ]}
      />
      <BadgesSection id="campus-badges-heading" />
      <CompareSection id="campus-compare-heading" description="2–3× more capability at 50% less cost. Aura and Assessments on one AI-native platform." />
      <ProductCTA
        id="campus-cta-heading"
        lead="Run your"
        accent="campus vibeathon."
        body="Coordinators run events. Students compete. Hiring partners watch the leaderboard."
        primary={SIGN_IN}
        secondary={{ label: "Talk to us", href: "/request-demo" }}
      />
    </PageShell>
  );
}
