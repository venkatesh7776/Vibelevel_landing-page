import TypedPhrase from "@/components/hero/TypedPhrase";
import PrimaryButton from "@/components/hero/PrimaryButton";
import Eyebrow from "./Eyebrow";
import PixelCard from "./PixelCard";
import Reveal from "./Reveal";
import HorizontalJourney from "./solution/HorizontalJourney";

/* ---------- Pixel icons (the hero's pixel language, drawn on a 9×9 grid) ---------- */

const ICONS: Record<string, string[]> = {
  workspace: [
    "#########",
    "#.#.#...#",
    "#########",
    "#.......#",
    "#.###...#",
    "#.......#",
    "#.#####.#",
    "#.......#",
    "#########",
  ],

  ai: [
    "######...",
    "#....#...",
    "#.##.#...",
    "#....#...",
    "#..#.##.#",
    "...#....#",
    "...#.##.#",
    "...#....#",
    "...######",
  ],
  skill: [
    "........#",
    "......#.#",
    "......#.#",
    "....#.#.#",
    "....#.#.#",
    "..#.#.#.#",
    "..#.#.#.#",
    "#.#.#.#.#",
    "#..#.##.#",
  ],
  report: [
    "######...",
    "#....##..",
    "#.##..##.",
    "#......#.",
    "#.####.#.",
    "#......#.",
    "#.##...#.",
    "#.....##.",
    "#..#.##.#",
  ],
};

function PixelIcon({ name }: { name: keyof typeof ICONS }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 18 18"
      className="size-[54px]"
      shapeRendering="crispEdges"
    >
      {ICONS[name].flatMap((row, y) =>
        [...row].map((c, x) =>
          c === "#" ? (
            <rect
              key={`${x}-${y}`}
              x={x * 2}
              y={y * 2}
              width="1.6"
              height="1.6"
              fill="var(--color-brand-green)"
            />
          ) : null,
        ),
      )}
    </svg>
  );
}

const FEATURES: { icon: keyof typeof ICONS; title: string; body: string }[] = [
  {
    icon: "workspace",
    title: "Real-world workspace",
    body: "Candidates solve role-specific tasks in a practical workspace.",
  },
  {
    icon: "ai",
    title: "AI collaboration",
    body: "See how candidates plan, direct, review, and iterate with AI.",
  },
  {
    icon: "skill",
    title: "Skill evaluation",
    body: "Measure job-required skills and the quality of demonstrated work.",
  },
  {
    icon: "report",
    title: "Evidence-backed reports",
    body: "Review scores with written justifications tied to candidate work.",
  },
];

const PILLARS = [
  "Real-world assessments",
  "Agentic workflows",
  "Evidence-backed evaluation",
];

const frame = "mx-auto max-w-[1200px] border-x border-black/[0.06]";

export default function SolutionSection() {
  return (
    <section aria-labelledby="solution-heading" className="bg-white">
      {/* 1 · Solution introduction */}
      <div className="px-4 sm:px-8">
        <div
          className={`${frame} px-5 pb-16 pt-20 text-center sm:px-10 md:pb-20 md:pt-28 lg:px-16 lg:pt-32`}
        >
          <Reveal className="flex justify-center">
            <Eyebrow>The next-gen hiring process</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h2
              id="solution-heading"
              className="mt-6 font-heading text-[34px] leading-[1.1] font-medium tracking-[-1px] text-black sm:text-[40px] lg:text-[46px]"
            >
              Meet{" "}
              <em className="text-headline-accent italic">
                <TypedPhrase
                  text="VibeLevel Screening."
                  startOnView
                  reserveSpace
                />
              </em>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-6 max-w-[640px] text-pretty font-body text-[18px] leading-[1.55] text-black/55 lg:text-[20px]">
              An AI-powered assessment experience where candidates work on
              real-world tasks, collaborate with AI, and demonstrate the skills
              that matter for the role.
            </p>
          </Reveal>

          {/* Product introduction */}
          <Reveal delay={300}>
            <div className="mx-auto mt-12 max-w-[760px] rounded-[20px] border border-black/[0.05] bg-[#f8f8f7] p-2">
              <div
                className="flex flex-col items-center gap-4 rounded-[14px] px-6 py-6 sm:flex-row sm:justify-between sm:text-left"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg in oklab, #d4f1dd 0%, #eef6df 50%, #fdf1c7 100%)",
                }}
              >
                <div>
                  <p className="font-body text-[11px] font-medium uppercase tracking-[0.16em] text-black/45">
                    Product introduction
                  </p>
                  <p className="mt-1.5 font-display text-[22px] font-semibold tracking-[-0.5px] text-black">
                    VibeLevel Screening
                  </p>
                </div>
                <ul className="flex flex-col items-center gap-2 sm:items-start">
                  {PILLARS.map((p) => (
                    <li
                      key={p}
                      className="flex items-center gap-2.5 font-body text-[15px] font-medium text-black/70"
                    >
                      <span
                        aria-hidden="true"
                        className="size-[6px] bg-brand-green"
                      />
                      {p}.
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* 2 · Traditional vs agentic screening — one continuous horizontal journey */}
      <div className="border-y border-dashed border-black/10">
        <HorizontalJourney />
      </div>

      {/* 3 · Product experience */}
      <div className="px-4 sm:px-8">
        <div className={`${frame} px-4 py-20 sm:px-8 md:py-28 lg:px-12`}>
          <div className="mx-auto max-w-[720px] px-1 text-center">
            <Reveal className="flex justify-center">
              <Eyebrow>Inside VibeLevel</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-6 text-balance font-heading text-[32px] leading-[1.1] font-medium tracking-[-1px] text-black sm:text-[40px] lg:text-[44px]">
                <span className="block">One assessment.</span>
                <em className="text-headline-accent italic">
                  A deeper view of capability.
                </em>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mx-auto mt-6 max-w-[600px] text-pretty font-body text-[18px] leading-[1.55] text-black/55 lg:text-[20px]">
                Candidates work in a realistic environment while VibeLevel
                captures their work and evaluates demonstrated skills.
              </p>
            </Reveal>
          </div>

          <ul className="mx-auto mt-14 grid max-w-[560px] gap-5 sm:max-w-none sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {FEATURES.map((f, i) => (
              <Reveal as="li" key={f.title} delay={i * 100} className="min-w-0">
                <PixelCard className="rounded-[20px] border border-black/[0.035] bg-[#f8f8f7] hover:border-brand-green/20">
                  <article className="relative flex h-full flex-col p-2.5">
                    <div
                      aria-hidden="true"
                      className="flex aspect-[16/10] items-center justify-center rounded-[14px]"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg in oklab, #d4f1dd 0%, #eef6df 50%, #fdf1c7 100%)",
                      }}
                    >
                      <PixelIcon name={f.icon} />
                    </div>
                    <div className="px-3 pb-4 pt-5">
                      <h3 className="font-display text-[18px] leading-[1.3] font-medium tracking-[-0.3px] text-black">
                        {f.title}
                      </h3>
                      <p className="mt-2 font-body text-[15px] leading-[1.55] text-black/55">
                        {f.body}
                      </p>
                    </div>
                  </article>
                </PixelCard>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>

      {/* 4 · Closing message and CTA */}
      <div className="border-t border-dashed border-black/10 px-4 sm:px-8">
        <div
          className={`${frame} relative overflow-hidden px-5 py-24 text-center sm:px-10 md:py-32`}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 -z-0 h-[70%]"
            style={{
              background:
                "radial-gradient(60% 80% at 50% 100%, rgba(76,251,108,0.18), transparent 70%)",
            }}
          />
          <div className="relative">
            <Reveal>
              <h2 className="mx-auto max-w-[760px] font-heading text-[32px] leading-[1.1] font-medium tracking-[-1px] text-black sm:text-[40px] lg:text-[46px]">
                <span className="block">
                  Don&rsquo;t just see what candidates know.
                </span>
                <em className="text-headline-accent italic">
                  See what they can do.
                </em>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mx-auto mt-6 max-w-[560px] text-pretty font-body text-[18px] leading-[1.55] text-black/55 lg:text-[20px]">
                Evaluate real skills, AI fluency, and human contribution through
                practical assessments.
              </p>
            </Reveal>
            <Reveal delay={240} className="mt-10 flex justify-center">
              <PrimaryButton href="#" size="lg">
                Explore VibeLevel Screening
              </PrimaryButton>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
