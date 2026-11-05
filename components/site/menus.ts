import type { PixelIconName } from "@/components/ui/PixelIcon";

// Navigation content shared by the navbar (desktop dropdowns + mobile menu).
// An item without `href` has no page yet and renders as plain text.

export type MenuLink = { label: string; description?: string; icon?: PixelIconName; href?: string };

export type ProductColumn = {
  name: string;
  description: string;
  icon: PixelIconName;
  href?: string;
  features: string[];
};

export const PRODUCTS: ProductColumn[] = [
  {
    name: "Hiring",
    description: "Application funnel, pre-screen, live tech interviews.",
    icon: "doc",
    href: "/#screening-heading",
    features: [
      "AI Resume Scoring & Auto-Filter",
      "ID & LinkedIn Verification",
      "Proctoring & Anti-Cheat",
      "Human Collaboration Score",
      "AI Assessment Builder",
    ],
  },
  {
    name: "Aura",
    description: "Aura · Your AI Style Insights",
    icon: "aura",
    href: "/#aura",
    features: ["Aura Profile", "Leaderboard", "Human Contribution Score", "Verified Skill Badges"],
  },
  {
    name: "Teams",
    description: "Measure & level up workforce AI fluency.",
    icon: "team",
    features: ["AI Skills Sprints", "Org Challenges Library", "Org Leaderboard", "Proctoring & Anti-Cheat"],
  },
  {
    name: "Campus",
    description: "Vibeathons + campus leaderboard + talent pipeline.",
    icon: "campus",
    href: "/#campus",
    features: [
      "Proctoring & Anti-Cheat",
      "Human Contribution Score",
      "Live Leaderboard",
      "Roster Management",
      "AI Assessment Builder",
    ],
  },
];

export const RESOURCES: { title: string; links: MenuLink[] }[] = [
  {
    title: "Resources",
    links: [
      { label: "Documentation", description: "Product guides & FAQs.", icon: "book" },
      { label: "Who It’s For", description: "Builders, Students, Hiring, Campus.", icon: "person", href: "/signin" },
      { label: "Compare", description: "VibeLevel vs Others.", icon: "compare" },
      { label: "FAQ", description: "Answers to common questions.", icon: "faq", href: "/#faq-heading" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", description: "Our story, founder, and address.", icon: "compass", href: "/about" },
      { label: "Contact", description: "Get in touch with our team.", icon: "mail", href: "/request-demo" },
      { label: "Terms", description: "Terms of Service.", icon: "shield" },
    ],
  },
];
