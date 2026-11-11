import type { Metadata } from "next";
import ChallengePreview from "@/components/assessments/ChallengePreview";
import PageShell, { PageIntro } from "@/components/site/PageShell";

export const metadata: Metadata = {
  title: "Browse Assessments – VibeLevel",
  description: "Real AI challenges in a real IDE: coding and non-coding, beginner to advanced.",
};

// Counts from the live library.
const STATS = [
  { n: "38", label: "Challenges" },
  { n: "35 + 3", label: "Coding + non-coding" },
  { n: "4", label: "Languages" },
  { n: "3", label: "Difficulty levels" },
];

export default function AssessmentsPage() {
  return (
    <PageShell>
      <PageIntro
        eyebrow="Browse assessments"
        title={
          <>
            Real tasks. <em className="text-headline-accent italic">Real AI tools.</em>
          </>
        }
        lead="Build in a real AI IDE, from beginner to advanced. Here's a taste of the library."
      />
      <div className="mx-auto max-w-[1200px] px-5 pb-24 pt-10 sm:px-8 lg:px-12">
        <ul className="hero-rise mx-auto mb-12 grid max-w-[820px] grid-cols-2 gap-px overflow-hidden rounded-[18px] bg-black/[0.06] ring-1 ring-black/[0.06] sm:grid-cols-4" style={{ animationDelay: "250ms" }}>
          {STATS.map((s) => (
            <li key={s.label} className="bg-white px-4 py-4 text-center">
              <p className="font-heading text-[26px] leading-none text-headline-accent italic">{s.n}</p>
              <p className="mt-1.5 font-body text-[13px] text-black/50">{s.label}</p>
            </li>
          ))}
        </ul>
        <ChallengePreview />
      </div>
    </PageShell>
  );
}
