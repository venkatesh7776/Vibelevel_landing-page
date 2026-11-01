import TypedPhrase from "@/components/hero/TypedPhrase";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";
import FAQAccordion, { type FAQItem } from "./faq/FAQAccordion";

// Answers are drawn only from what the page already says about the product.
const FAQS: FAQItem[] = [
  {
    q: "What is VibeLevel Screening?",
    a: "An AI-powered assessment platform that helps companies evaluate candidates through real-world tasks, AI collaboration, and evidence-backed skill assessment.",
  },
  {
    q: "How does VibeLevel evaluate candidates?",
    a: "Instead of resumes, video interviews or standard coding tests, candidates complete practical, production-like tasks in a real workspace. VibeLevel evaluates the skills they show in that work and scores them with evidence.",
  },
  {
    q: "Which roles can be assessed through VibeLevel?",
    a: "Roles across engineering and business teams, such as software engineers, product managers, product designers, marketing managers, GTM engineers and customer support.",
  },
  {
    q: "How does VibeLevel evaluate AI collaboration?",
    a: "Candidates work with AI tools like Claude Code and GitHub Copilot in a real development environment. VibeLevel looks beyond a prompting score, at AI fluency, engineering judgment, job-specific skills and human contribution.",
  },
  {
    q: "Can we create assessments based on our job descriptions?",
    a: "Yes. You can create role-specific assessments based on your job description, technology stack and actual workflows.",
  },
  {
    q: "How are candidate scores generated?",
    a: "Candidates receive skill-level scores, each with a written justification based on their actual work in the assessment.",
  },
  {
    q: "Does VibeLevel support both technical and non-technical roles?",
    a: "Yes. VibeLevel is built for teams from engineering to business, evaluating the skills people bring to their roles and how effectively they work with AI.",
  },
  {
    q: "Can recruiters review the evidence behind candidate scores?",
    a: "Yes. Every score comes with a written justification grounded in the candidate's actual work, so you can see why a candidate scored the way they did.",
  },
];

/** Section 7 — FAQ: heading on the left (sticky on desktop), accordion on the right. */
export default function FAQSection() {
  return (
    <section aria-labelledby="faq-heading" className="border-t border-dashed border-black/10 bg-white px-4 sm:px-8">
      <div className="mx-auto grid max-w-[1200px] gap-10 border-x border-black/[0.06] px-5 py-16 sm:px-10 md:py-24 lg:grid-cols-[1fr_1.5fr] lg:gap-16 lg:px-16 lg:py-28">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <Eyebrow>FAQ</Eyebrow>
          <h2
            id="faq-heading"
            className="mt-5 text-balance font-heading text-[32px] leading-[1.1] font-medium tracking-[-1px] text-black sm:text-[40px] lg:text-[44px]"
          >
            Frequently asked{" "}
            <em className="text-headline-accent italic">
              <TypedPhrase text="questions." startOnView reserveSpace />
            </em>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <FAQAccordion items={FAQS} />
        </Reveal>
      </div>
    </section>
  );
}
