import type { PixelIconName } from "@/components/ui/PixelIcon";

// The four ways to use VibeLevel, as shown on the sign-in chooser and the sign-up page.

export type AudienceId = "aura" | "hiring" | "campus" | "teams";

export type Audience = {
  id: AudienceId;
  label: string;
  icon: PixelIconName;
  /** Sign-in chooser card. */
  title: string;
  description: string;
  cta: string;
  /** Sign-up page heading and lead. */
  signupTitle: string;
  signupLead: string;
  /** Ask for a company name on sign-up. */
  company: boolean;
};

export const AUDIENCES: Audience[] = [
  {
    id: "aura",
    label: "Aura",
    icon: "aura",
    title: "Individual Builders",
    description: "Score your AI sessions, take challenges, and track your skills growth.",
    cta: "Get Started Free",
    signupTitle: "Discover your AI Style",
    signupLead: "Score your AI sessions, take challenges, and track your skills growth.",
    company: false,
  },
  {
    id: "hiring",
    label: "Hiring",
    icon: "doc",
    title: "Recruiters & Hiring Managers",
    description: "Build assessments, evaluate candidates on real AI skills, and track results.",
    cta: "Start Hiring Free",
    signupTitle: "Recruit & Hire Smart",
    signupLead: "Create custom assessments, evaluate candidates on real AI collaboration skills, and track results.",
    company: true,
  },
  {
    id: "campus",
    label: "Campus",
    icon: "campus",
    title: "Students & Coordinators",
    description: "Get your Aura profile, compete in Vibeathons, and showcase skills to recruiters.",
    cta: "Join Campus",
    signupTitle: "Students & Coordinators",
    signupLead: "Get your Aura profile, compete in Vibeathons, and showcase skills to recruiters.",
    company: false,
  },
  {
    id: "teams",
    label: "Teams",
    icon: "team",
    title: "Enterprise & Workforce",
    description: "AI Skills Sprints, shared challenges, and leaderboards for your whole org.",
    cta: "Set Up Your Team",
    signupTitle: "Enterprise & Workforce",
    signupLead: "AI Skills Sprints, shared challenges, and leaderboards for your whole org.",
    company: true,
  },
];

export const audience = (id: string | null | undefined) =>
  AUDIENCES.find((a) => a.id === id) ?? AUDIENCES.find((a) => a.id === "hiring")!;
