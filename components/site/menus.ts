import type { PixelIconName } from "@/components/ui/PixelIcon";

// Navigation content shared by the navbar (desktop dropdowns + mobile menu).
// An item without `href` has no page yet and renders as plain text.
// Feature links point at the matching section of a product page (its heading id).

export type MenuLink = { label: string; description?: string; icon?: PixelIconName; href?: string };
export type FeatureLink = { label: string; href?: string };

export type ProductColumn = {
  name: string;
  description: string;
  icon: PixelIconName;
  href?: string;
  features: FeatureLink[];
};

export const PRODUCTS: ProductColumn[] = [
  {
    name: "Hiring",
    description: "Application funnel, pre-screen, live tech interviews.",
    icon: "doc",
    href: "/products/hiring",
    features: [
      { label: "AI Resume Scoring & Auto-Filter", href: "/products/hiring#shortlist-heading" },
      { label: "ID & LinkedIn Verification", href: "/products/hiring#identity-heading" },
      { label: "Proctoring & Anti-Cheat", href: "/products/hiring#proctor-heading" },
      { label: "Human Collaboration Score", href: "/products/hiring#engine-heading" },
      { label: "AI Assessment Builder", href: "/products/hiring#builder-heading" },
    ],
  },
  {
    name: "Aura",
    description: "Aura · Your AI Style Insights",
    icon: "aura",
    href: "/products/aura",
    features: [
      { label: "Aura Profile", href: "/products/aura#profile-heading" },
      { label: "Leaderboard", href: "/products/aura#aura-heading" },
      { label: "Human Contribution Score", href: "/products/aura#aura-scoring-heading" },
      { label: "Verified Skill Badges", href: "/products/aura#levels-heading" },
    ],
  },
  {
    name: "Teams",
    description: "Measure & level up workforce AI fluency.",
    icon: "team",
    href: "/products/teams",
    features: [
      { label: "AI Skills Sprints", href: "/products/teams#includes-heading" },
      { label: "Org Challenges Library", href: "/products/teams#challenge-builder-heading" },
      { label: "Org Leaderboard", href: "/products/teams#growth-heading" },
      { label: "Proctoring & Anti-Cheat", href: "/products/hiring#proctor-heading" },
    ],
  },
  {
    name: "Campus",
    description: "Vibeathons + campus leaderboard + talent pipeline.",
    icon: "campus",
    href: "/products/campus",
    features: [
      { label: "Proctoring & Anti-Cheat", href: "/products/hiring#proctor-heading" },
      { label: "Human Contribution Score", href: "/products/campus#campus-includes-heading" },
      { label: "Live Leaderboard", href: "/products/campus#leaderboard-heading" },
      { label: "Roster Management", href: "/products/campus#campus-audience-heading" },
      { label: "AI Assessment Builder", href: "/products/campus#campus-builder-heading" },
    ],
  },
];

export const RESOURCES: { title: string; links: MenuLink[] }[] = [
  {
    title: "Resources",
    links: [
      { label: "Documentation", description: "Product guides & FAQs.", icon: "book", href: "https://docs.vibelevel.ai/" },
      { label: "Who It’s For", description: "Builders, Students, Hiring, Campus.", icon: "person", href: "/#ecosystem-heading" },
      { label: "Compare", description: "VibeLevel vs Others.", icon: "compare", href: "/products/hiring#compare-heading" },
      { label: "FAQ", description: "Answers to common questions.", icon: "faq", href: "/products/hiring#scoring-heading" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", description: "Our story, founder, and address.", icon: "compass", href: "/about" },
      { label: "Contact", description: "Get in touch with our team.", icon: "mail", href: "/request-demo" },
      { label: "Terms", description: "Terms of Service.", icon: "shield", href: "/terms" },
    ],
  },
];
