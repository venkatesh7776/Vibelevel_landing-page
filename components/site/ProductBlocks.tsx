import type { ReactNode } from "react";
import PrimaryButton from "@/components/hero/PrimaryButton";
import SecondaryButton from "@/components/hero/SecondaryButton";
import TypedPhrase from "@/components/hero/TypedPhrase";
import { Body, CenterHeading, Check, GRADIENT, Section } from "@/components/hiring/parts";
import Reveal from "@/components/sections/Reveal";
import ScreeningPixels from "@/components/sections/screening/ScreeningPixels";
import PixelIcon, { type PixelIconName } from "@/components/ui/PixelIcon";

// Blocks shared by the product pages. They read the page's accent from CSS variables.

/* ---------- Top builders ticker ---------- */

const BUILDERS = [
  { name: "AgileBuilder_4b12", score: "8.2" },
  { name: "SharpBuilder_3985", score: "8.2" },
  { name: "LunarBuilder_e454", score: "7.9" },
  { name: "AgileBuilder_27de", score: "7.9" },
  { name: "ZenBuilder_3d97", score: "7.8" },
];

function BuilderRun({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {BUILDERS.map((b, i) => (
        <li key={b.name} className="flex shrink-0 items-center gap-2.5 px-7 font-body text-[14px]">
          <span className={`font-mono text-[13px] font-medium ${i === 0 ? "text-brand-green" : "text-black/40"}`}>#{i + 1}</span>
          <span className="font-medium text-ink-900">{b.name}</span>
          <span className="font-mono text-[13.5px] font-semibold text-brand-green">{b.score}</span>
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-brand-green/70">Capable</span>
          <span aria-hidden="true" className="ml-5 size-1.5 rotate-45 bg-black/15" />
        </li>
      ))}
    </ul>
  );
}

/**
 * "★ Top builders": a full-width strip docked under the fixed navbar, the leaderboard drifting
 * past in a slow loop. Place it as the first child of a hero section (it bleeds to the edges).
 */
export function BuilderTicker() {
  return (
    <div className="hero-fade -mx-4 flex items-stretch border-y border-black/[0.07] bg-[#f6faf5]/90 backdrop-blur-sm sm:-mx-8">
      <p className="flex shrink-0 items-center gap-2 border-r border-black/[0.07] bg-white/70 px-4 py-2.5 font-body text-[11.5px] font-semibold uppercase tracking-[0.16em] text-brand-green sm:px-6">
        <span aria-hidden="true">★</span>
        <span className="hidden sm:inline">Top builders</span>
      </p>
      <div
        className="marquee flex flex-1 items-center overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
        }}
      >
        <div className="marquee-track flex w-max [--marquee-dur:40s]">
          <BuilderRun />
          <BuilderRun hidden />
        </div>
      </div>
    </div>
  );
}

/* ---------- Product hero ---------- */

export function ProductHero({
  id,
  badge,
  lead,
  accent,
  intro,
  primary,
  secondary,
  children,
  stacked,
  equalButtons,
}: {
  /** On phones, stack the two buttons at one shared width. */
  equalButtons?: boolean;
  /** Put the accent phrase on its own line. */
  stacked?: boolean;
  id: string;
  badge: string;
  lead: string;
  accent: string;
  intro: ReactNode;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  children?: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="px-4 sm:px-8">
      <BuilderTicker />
      <div className="mx-auto max-w-[1200px] pb-16 pt-12 text-center sm:pt-16 md:pb-20 lg:pt-20">
        <p className="hero-rise mx-auto inline-flex items-center gap-2 rounded-full bg-brand-green-50 px-3 py-1.5 font-body text-[10.5px] font-medium uppercase tracking-[0.1em] text-brand-green ring-1 ring-brand-green/15 sm:text-[12px] sm:tracking-[0.16em]">
          <span aria-hidden="true" className="size-[5px] bg-brand-green" />
          {badge}
        </p>
        <h1
          id={id}
          className="hero-rise mx-auto mt-6 max-w-[900px] text-balance font-heading text-[34px] leading-[1.1] font-medium tracking-[-1px] text-ink md:text-[40px] lg:text-[46px]"
          style={{ animationDelay: "100ms" }}
        >
          {lead}{" "}
          {stacked && <br />}
          <em className="text-headline-accent italic">
            <TypedPhrase text={accent} reserveSpace />
          </em>
        </h1>
        <p
          className="hero-rise mx-auto mt-[22px] max-w-[628px] text-pretty font-body text-[16px] leading-[23px] text-ink/80 sm:mt-[26px] sm:text-[18px] sm:leading-[25.4px]"
          style={{ animationDelay: "200ms" }}
        >
          {intro}
        </p>
        <div className={`hero-rise mx-auto mt-[22px] gap-[12px] sm:mt-[26px] ${
            equalButtons ? "grid w-fit grid-cols-1 gap-3 sm:flex sm:w-auto sm:justify-center" : "flex flex-wrap justify-center"
          }`} style={{ animationDelay: "300ms" }}>
          <PrimaryButton href={primary.href}>{primary.label}</PrimaryButton>
          <SecondaryButton href={secondary.href}>{secondary.label}</SecondaryButton>
        </div>
        {children}
      </div>
    </section>
  );
}

/* ---------- Image placeholder ---------- */

/** Stands in for a product screenshot until the real image is added: our gradient, pixels and a browser frame. */
export function ShotPlaceholder({ label, className = "aspect-[16/9]" }: { label: string; className?: string }) {
  return (
    <div className="relative isolate overflow-hidden rounded-[24px] p-4 ring-1 ring-black/[0.05] sm:p-8 lg:p-10" style={{ backgroundImage: GRADIENT }}>
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-70">
        <ScreeningPixels />
      </div>
      <div className="overflow-hidden rounded-[14px] bg-white/80 shadow-[0_40px_80px_-40px_rgba(20,10,60,0.5)] ring-1 ring-black/[0.08] backdrop-blur">
        <div className="flex items-center gap-1.5 border-b border-black/[0.06] bg-[#f8f8f7] px-3.5 py-2.5">
          <span className="size-2.5 rounded-full bg-black/10" />
          <span className="size-2.5 rounded-full bg-black/10" />
          <span className="size-2.5 rounded-full bg-black/10" />
        </div>
        <div role="img" aria-label={label} className={`flex flex-col items-center justify-center gap-3 p-6 text-center ${className}`}>
          {/* Skeleton rows hint at a dashboard */}
          <div aria-hidden="true" className="grid w-full max-w-[560px] grid-cols-3 gap-3 opacity-70">
            {[0, 1, 2].map((k) => (
              <span key={k} className="h-14 rounded-[10px] bg-brand-green-50 ring-1 ring-brand-green/10" />
            ))}
            <span className="col-span-2 h-24 rounded-[10px] bg-black/[0.04]" />
            <span className="h-24 rounded-[10px] bg-black/[0.04]" />
          </div>
          <p className="mt-2 font-body text-[13px] text-black/40">{label}</p>
        </div>
      </div>
    </div>
  );
}

/** A product screen in a browser frame on our gradient (screens are drawn in code, so they stay sharp). */
export function ScreenFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate overflow-hidden rounded-[24px] p-3 ring-1 ring-black/[0.05] sm:p-6 lg:p-8" style={{ backgroundImage: GRADIENT }}>
      <div className="overflow-hidden rounded-[14px] bg-white shadow-[0_40px_80px_-40px_rgba(6,36,24,0.5)] ring-1 ring-black/[0.08]">
        {children}
      </div>
    </div>
  );
}

/* ---------- Feature grid ---------- */

export function FeatureGrid({ items }: { items: { icon: PixelIconName; title: string; body: string }[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((f, i) => (
        <Reveal as="li" key={f.title} delay={(i % 3) * 100}>
          <div className="group h-full rounded-[20px] bg-white p-6 ring-1 ring-black/[0.07] transition-[box-shadow,translate] duration-500 hover:-translate-y-1 hover:shadow-[0_28px_56px_-36px_rgba(20,10,60,0.45)]">
            <span className="flex size-11 items-center justify-center rounded-[12px] text-brand-green ring-1 ring-brand-green/10 transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: GRADIENT }}>
              <PixelIcon name={f.icon} className="size-[22px]" />
            </span>
            <h3 className="mt-5 font-display text-[17px] font-semibold text-ink-900">{f.title}</h3>
            <p className="mt-1.5 font-body text-[15px] leading-[1.5] text-black/55">{f.body}</p>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}

/* ---------- Two audiences ---------- */

export function AudienceColumns({ columns }: { columns: { title: string; points: string[] }[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {columns.map((c, i) => (
        <Reveal key={c.title} delay={i * 120}>
          <div
            className={`h-full rounded-[22px] p-6 sm:p-8 ${i === 0 ? "ring-1 ring-black/[0.05]" : "bg-white ring-1 ring-black/[0.07]"}`}
            style={i === 0 ? { backgroundImage: GRADIENT } : undefined}
          >
            <p className="font-body text-[11.5px] font-medium uppercase tracking-[0.16em] text-brand-green">{c.title}</p>
            <ul className="mt-5 space-y-3">
              {c.points.map((p) => (
                <li key={p} className="flex items-start gap-3 font-body text-[15.5px] leading-[1.45] text-black/70">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-green text-white">
                    <Check className="size-3" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ---------- Image + four points ---------- */

export function ShowcaseSection({
  id,
  eyebrow,
  lead,
  accent,
  description,
  shotLabel,
  points,
  visual,
}: {
  id: string;
  eyebrow: string;
  lead: string;
  accent: string;
  description: string;
  shotLabel: string;
  points: { title: string; body: string }[];
  /** The real screen; falls back to a labelled placeholder. */
  visual?: ReactNode;
}) {
  return (
    <Section labelledBy={id}>
      <CenterHeading id={id} eyebrow={eyebrow} lead={lead} accent={accent} description={description} />
      <Body>
        <Reveal>
          {visual ?? <ShotPlaceholder label={shotLabel} />}
        </Reveal>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 100}>
              <div className="border-l-2 border-brand-green/25 pl-4 transition-colors duration-300 hover:border-brand-green">
                <h3 className="font-display text-[16px] font-semibold text-ink-900">{p.title}</h3>
                <p className="mt-1 font-body text-[14.5px] leading-[1.5] text-black/55">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Body>
    </Section>
  );
}

/* ---------- How it works (four steps) ---------- */

export type Step = { icon: PixelIconName; title: string; body: string };

/**
 * Four steps on a rail. On scroll-in the rail draws left → right, each icon pops in as the line
 * reaches it, then dots keep flowing along the rail, the icons float and a ring pings step to step.
 */
export function AnimatedSteps({ steps }: { steps: Step[] }) {
  const DRAW = 1.4; // seconds for the rail to cross all four steps
  return (
    <Reveal className="group">
      <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {/* Rail: a faint track, the green line drawing over it, then dots flowing along. */}
        <span aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-[32px] hidden h-[2px] lg:block">
          <span className="absolute inset-0 border-t-2 border-dotted border-brand-green/20" />
          <span
            className="absolute inset-0 origin-left scale-x-0 bg-brand-green/50 transition-transform ease-in-out group-data-[shown=true]:scale-x-100"
            style={{ transitionDuration: `${DRAW}s` }}
          />
          <span
            className="engine-stream-x absolute -top-px left-0 right-0 block h-[4px] opacity-0 transition-opacity duration-500 group-data-[shown=true]:opacity-100"
            style={{ transitionDelay: `${DRAW}s` }}
          />
        </span>
        {steps.map((s, i) => {
          const at = (i / (steps.length - 1)) * DRAW; // when the line reaches this step
          return (
            <li key={s.title} className="relative text-center">
              <span
                className="relative mx-auto flex size-16 scale-50 items-center justify-center rounded-full text-brand-green opacity-0 shadow-[0_14px_30px_-16px_rgba(6,36,24,0.5)] ring-4 ring-white transition-[scale,opacity] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-data-[shown=true]:scale-100 group-data-[shown=true]:opacity-100"
                style={{ backgroundImage: GRADIENT, transitionDelay: `${at}s` }}
              >
                <span className="role-float flex items-center justify-center" style={{ animationDelay: `${-i * 1.1}s` }}>
                  <PixelIcon name={s.icon} className="size-7" />
                </span>
                {/* Ring that pings from one step to the next, on a loop. */}
                <span
                  aria-hidden="true"
                  className="journey-ping absolute inset-0 rounded-full ring-2 ring-brand-green/50"
                  style={{ animationDelay: `${DRAW + i * 0.9}s` }}
                />
                <span className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-ink-900 font-body text-[11px] font-medium text-white">{i + 1}</span>
              </span>
              <div
                className="translate-y-2 opacity-0 transition-[opacity,translate] duration-700 group-data-[shown=true]:translate-y-0 group-data-[shown=true]:opacity-100"
                style={{ transitionDelay: `${at + 0.15}s` }}
              >
                <h3 className="mt-5 font-display text-[17px] font-semibold text-ink-900">{s.title}</h3>
                <p className="mx-auto mt-1.5 max-w-[240px] font-body text-[15px] leading-[1.5] text-black/55">{s.body}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </Reveal>
  );
}

export function StepsSection({
  id,
  eyebrow,
  lead,
  accent,
  audience,
  steps,
  sectionId,
}: {
  id: string;
  eyebrow: string;
  lead: string;
  accent: string;
  audience: string;
  steps: Step[];
  sectionId?: string;
}) {
  return (
    <Section labelledBy={id} id={sectionId}>
      <CenterHeading id={id} eyebrow={eyebrow} lead={lead} accent={accent} description={audience} />
      <Body>
        <AnimatedSteps steps={steps} />
      </Body>
    </Section>
  );
}

/* ---------- Verified skill badges ---------- */

const BADGES = [
  { name: "Novice", range: "0–4", line: "In the right direction." },
  { name: "Developing", range: "4.01–7", line: "Solid foundation. Keep building." },
  { name: "Capable", range: "7.01–8.5", line: "Steers AI with intent and precision." },
  { name: "Advanced", range: "8.51–10", line: "Architects with AI. Full command." },
];

export function BadgesSection({ id }: { id: string }) {
  return (
    <Section labelledBy={id}>
      <CenterHeading
        id={id}
        eyebrow="AI skill signals"
        lead="Verified"
        accent="skill badges."
        description="Earned from structured assessments and challenge performance. Shareable to LinkedIn."
      />
      <Body>
        <ol className="grid items-end gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {BADGES.map((l, i) => (
            <Reveal as="li" key={l.name} delay={i * 130}>
              <div
                className={`flex flex-col justify-end rounded-[20px] p-5 ring-1 transition-transform duration-500 hover:-translate-y-1 ${
                  i === 3 ? "ring-brand-green/25 shadow-[0_24px_50px_-34px_rgba(6,36,24,0.5)]" : "bg-white ring-black/[0.07]"
                } ${["lg:min-h-[150px]", "lg:min-h-[190px]", "lg:min-h-[230px]", "lg:min-h-[270px]"][i]}`}
                style={i === 3 ? { backgroundImage: GRADIENT } : undefined}
              >
                <span className="font-mono text-[12.5px] text-brand-green">{l.range}</span>
                <h3 className={`mt-1 font-heading text-[24px] ${i === 3 ? "text-headline-accent italic" : "text-black"}`}>{l.name}</h3>
                <p className="mt-1 font-body text-[14.5px] leading-[1.45] text-black/60">{l.line}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Body>
    </Section>
  );
}

/* ---------- Closing CTA ---------- */

export function ProductCTA({
  id,
  lead,
  accent,
  body,
  primary,
  secondary,
}: {
  id: string;
  lead: string;
  accent: string;
  body: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
}) {
  return (
    <section aria-labelledby={id} className="border-t border-dashed border-black/10 bg-white px-4 sm:px-8">
      <div className="mx-auto max-w-[1200px] border-x border-black/[0.06] px-4 py-12 sm:px-8 md:py-16 lg:px-12">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[28px] px-6 py-20 text-center ring-1 ring-black/[0.04] sm:px-12 md:py-28" style={{ backgroundImage: GRADIENT }}>
            <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-50 sm:opacity-100">
              <ScreeningPixels />
            </div>
            <h2 id={id} className="mx-auto max-w-[760px] text-balance font-heading text-[36px] leading-[1.08] font-medium tracking-[-1.2px] text-black sm:text-[48px] lg:text-[56px]">
              {lead}{" "}
              <em className="text-headline-accent italic">
                <TypedPhrase text={accent} startOnView reserveSpace />
              </em>
            </h2>
            <p className="mx-auto mt-5 max-w-[480px] text-pretty font-body text-[17px] leading-[1.55] text-black/60 md:text-[19px]">{body}</p>
            <div className="mx-auto mt-9 grid w-full max-w-[330px] gap-3 sm:flex sm:max-w-none sm:justify-center sm:gap-4">
              <PrimaryButton href={primary.href} size="lg">
                {primary.label}
              </PrimaryButton>
              <SecondaryButton href={secondary.href} size="lg" className="bg-white/70">
                {secondary.label}
              </SecondaryButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
