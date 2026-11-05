import type { Metadata } from "next";
import Image from "next/image";
import PrimaryButton from "@/components/hero/PrimaryButton";
import SecondaryButton from "@/components/hero/SecondaryButton";
import Eyebrow from "@/components/sections/Eyebrow";
import Reveal from "@/components/sections/Reveal";
import ScreeningPixels from "@/components/sections/screening/ScreeningPixels";
import PageShell, { PageIntro } from "@/components/site/PageShell";
import founder from "@/public/founder-sathish.jpg";

export const metadata: Metadata = {
  title: "About – VibeLevel",
  description: "Our vision, our founder, and where we operate.",
};

// Social profile URLs. Buttons and links only appear once a URL is filled in here.
const SOCIAL = { linkedin: "", x: "", founderLinkedin: "" };

const ACHIEVEMENTS = [
  {
    title: "Multi-agent + Advanced RAG patent (2024)",
    body: "Key inventor on a patent filed in 2024 covering multi-agent orchestration and advanced retrieval-augmented generation.",
  },
  {
    title: "CodePal — Industry-first multi-agent dev assistant",
    body: "Designed and shipped a 10+ agent developer-assistance platform inside PayPal in 2023.",
  },
  {
    title: "AI Gateway",
    body: "PayPal’s internal ChatGPT-Enterprise-class platform — built ground-up to bring frontier AI to a regulated, enterprise environment.",
  },
  {
    title: "Conversational BI",
    body: "A natural-language analytics platform — in-house equivalent of ThoughtSpot.",
  },
  {
    title: "20+ years building 0→1 products and high-performing teams",
    body: "A career converting AI / ML ideas into revenue-generating systems at PayPal, JPMC, CarMax, and earlier.",
  },
];

const INTERESTS = [
  "AI Native Engineering",
  "AI Fluency",
  "AI Pairing",
  "AI Collaboration",
  "Generative AI",
  "LLMs",
  "Multi-Agent Systems",
  "Enterprise AI Adoption",
  "Talent Transformation",
];

const OFFICES = [
  {
    tag: "Headquarters · United States",
    city: "Wilmington, Delaware",
    lines: ["300 Delaware Ave", "Corporate Service Center", "Wilmington, DE — United States"],
    gradient: "linear-gradient(150deg in oklab, #d4f1dd 0%, #eef6df 100%)",
  },
  {
    tag: "Engineering · India",
    city: "Hyderabad, Telangana",
    lines: ["Hitech City Madhapur Road", "Serilingampalli", "Telangana — India"],
    gradient: "linear-gradient(150deg in oklab, #eef6df 0%, #fdf1c7 100%)",
  },
];

const FRAME = "mx-auto max-w-[1200px] border-x border-black/[0.06]";

export default function AboutPage() {
  return (
    <PageShell>
      <PageIntro
        eyebrow="Our vision"
        title={
          <>
            Help every organization measure AI-driven velocity at the{" "}
            <em className="text-headline-accent italic">individual</em>, team, and{" "}
            <em className="text-headline-accent italic">org</em> level.
          </>
        }
      />
      {(SOCIAL.linkedin || SOCIAL.x) && (
        <div className="mt-8 flex justify-center gap-3">
          {SOCIAL.linkedin && (
            <SecondaryButton href={SOCIAL.linkedin} size="sm">
              Follow on LinkedIn
            </SecondaryButton>
          )}
          {SOCIAL.x && (
            <SecondaryButton href={SOCIAL.x} size="sm">
              Follow on X
            </SecondaryButton>
          )}
        </div>
      )}

      {/* Founder */}
      <section aria-labelledby="founder-heading" className="mt-16 border-t border-dashed border-black/10 px-4 sm:mt-24 sm:px-8">
        <div className={`${FRAME} grid gap-10 px-5 py-16 sm:px-10 md:py-24 lg:grid-cols-[300px_1fr] lg:gap-16 lg:px-16`}>
          <Reveal>
            <Eyebrow>Founder</Eyebrow>
            <div className="group mt-6 overflow-hidden rounded-[24px] ring-1 ring-black/[0.07] shadow-[0_32px_64px_-40px_rgba(6,36,24,0.5)]">
              <Image
                src={founder}
                alt="Sathish Rama, Founder and CEO of VibeLevel"
                placeholder="blur"
                sizes="(min-width: 1024px) 300px, 90vw"
                className="aspect-square w-full object-cover object-[50%_20%] transition-transform duration-[1200ms] ease-out-soft group-hover:scale-[1.03]"
              />
            </div>
            <h2 id="founder-heading" className="mt-6 font-heading text-[28px] leading-[1.15] font-medium tracking-[-0.6px] text-black">
              Sathish Rama
            </h2>
            <p className="mt-1 font-body text-[15px] font-medium text-brand-green">Founder &amp; CEO, VibeLevel.ai</p>
            <ul className="mt-4 space-y-1.5 font-body text-[14px] text-black/55">
              {SOCIAL.founderLinkedin && (
                <li>
                  <a href={SOCIAL.founderLinkedin} className="hover:text-brand-green">
                    LinkedIn profile
                  </a>
                </li>
              )}
              <li>
                <a href="mailto:contact@vibelevel.ai" className="hover:text-brand-green">
                  contact@vibelevel.ai
                </a>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={120} className="lg:pt-12">
            <p className="text-pretty font-body text-[18px] leading-[1.6] text-black/60 lg:text-[20px]">
              Sathish has spent <strong className="font-medium text-black">20+ years</strong> building high-performing teams,
              enterprise-scale platforms, and 0→1 products — converting AI and ML ideas into revenue-generating systems at
              PayPal, JPMorgan Chase, CarMax, and earlier.
            </p>

            <p className="mt-10 font-body text-[12px] font-medium uppercase tracking-[0.16em] text-black/45">Selected achievements</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {ACHIEVEMENTS.map((a) => (
                <li
                  key={a.title}
                  className="rounded-[16px] bg-white p-5 ring-1 ring-black/[0.07] transition-[translate,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-30px_rgba(6,36,24,0.45)]"
                >
                  <p className="font-display text-[15px] leading-[1.35] font-medium text-ink-900">{a.title}</p>
                  <p className="mt-1.5 font-body text-[14px] leading-[1.55] text-black/55">{a.body}</p>
                </li>
              ))}
            </ul>

            <p className="mt-10 font-body text-[12px] font-medium uppercase tracking-[0.16em] text-black/45">Interests</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {INTERESTS.map((t) => (
                <li key={t} className="rounded-full bg-brand-green-50 px-3 py-1.5 font-body text-[13px] font-medium text-brand-green ring-1 ring-brand-green/15">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Where we operate */}
      <section aria-labelledby="where-heading" className="border-t border-dashed border-black/10 px-4 sm:px-8">
        <div className={`${FRAME} px-5 py-16 text-center sm:px-10 md:py-24 lg:px-16`}>
          <Reveal>
            <Eyebrow className="justify-center">Company</Eyebrow>
            <h2 id="where-heading" className="mt-5 font-heading text-[32px] leading-[1.1] font-medium tracking-[-1px] text-black sm:text-[40px] lg:text-[44px]">
              Where we <em className="text-headline-accent italic">operate.</em>
            </h2>
            <p className="mx-auto mt-4 max-w-[600px] font-body text-[17px] leading-[1.55] text-black/55 sm:text-[18px]">
              VibeLevel.ai is operated by GPTSocial LLC. Headquartered in Delaware, with an engineering presence in Hyderabad.
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-5 text-left md:grid-cols-2">
            {OFFICES.map((o, i) => (
              <Reveal as="li" key={o.city} delay={i * 120}>
                <div className="relative isolate h-full overflow-hidden rounded-[24px] p-7 ring-1 ring-black/[0.05] sm:p-8" style={{ backgroundImage: o.gradient }}>
                  <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-30">
                    <ScreeningPixels />
                  </div>
                  <p className="font-body text-[12px] font-medium uppercase tracking-[0.16em] text-brand-green">{o.tag}</p>
                  <p className="mt-3 font-display text-[20px] font-medium text-ink-900">{o.city}</p>
                  <address className="mt-2 font-body text-[15px] leading-[1.65] not-italic text-black/60">
                    {o.lines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </address>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Closing CTA */}
      <section aria-labelledby="about-cta" className="border-t border-dashed border-black/10 px-4 sm:px-8">
        <div className={`${FRAME} px-4 py-12 sm:px-8 md:py-16 lg:px-12`}>
          <Reveal>
            <div
              className="relative isolate overflow-hidden rounded-[28px] px-6 py-16 text-center ring-1 ring-black/[0.04] sm:px-12 md:py-20"
              style={{ backgroundImage: "linear-gradient(135deg in oklab, #d4f1dd 0%, #eef6df 50%, #fdf1c7 100%)" }}
            >
              <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-50 sm:opacity-100">
                <ScreeningPixels />
              </div>
              <h2 id="about-cta" className="mx-auto max-w-[720px] text-balance font-heading text-[34px] leading-[1.1] font-medium tracking-[-1px] text-black sm:text-[44px]">
                Hire the best. <em className="text-headline-accent italic">Discover your AI Style.</em>
              </h2>
              <p className="mx-auto mt-4 max-w-[560px] font-body text-[17px] leading-[1.55] text-black/60">
                Pick your path. Hiring teams get evidence-backed candidate reports; individuals practice and earn shareable
                skill signals — one AI-native platform.
              </p>
              <div className="mx-auto mt-8 grid w-full max-w-[330px] gap-3 sm:flex sm:max-w-none sm:justify-center sm:gap-4">
                <PrimaryButton href="/#screening-heading" size="lg">
                  Explore Hiring
                </PrimaryButton>
                <SecondaryButton href="/signup?product=aura" size="lg" className="bg-white/70">
                  Start Practicing Free
                </SecondaryButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
