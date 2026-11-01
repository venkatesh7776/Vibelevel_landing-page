import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import RoleLandscape from "./roles/RoleLandscape";

/** Section 5 — the roles VibeLevel covers, gathered around the logo on the landscape. */
export default function RolesSection() {
  return (
    <section aria-labelledby="roles-heading" className="border-t border-dashed border-black/10 bg-white px-4 sm:px-8">
      <div className="mx-auto max-w-[1200px] border-x border-black/[0.06]">
        <SectionHeading
          id="roles-heading"
          eyebrow="Built for the agentic era"
          lead="Build your team for the"
          accent="agentic era."
          description="From engineering to business teams, evaluate the skills people bring to their roles and how effectively they work with AI."
        />
        <Reveal className="px-4 sm:px-8 lg:px-12">
          <RoleLandscape />
        </Reveal>
        <Reveal className="px-5 pb-16 pt-8 text-center sm:px-10 md:pb-24 md:pt-10">
          <p className="mx-auto max-w-[620px] text-balance font-body text-[17px] leading-[1.55] text-black/55 md:text-[19px]">
            Different roles. Different skills.{" "}
            <span className="text-black/85">One platform to evaluate how people work with AI.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
