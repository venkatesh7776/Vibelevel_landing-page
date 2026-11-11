import PrimaryButton from "@/components/hero/PrimaryButton";
import SecondaryButton from "@/components/hero/SecondaryButton";
import TypedPhrase from "@/components/hero/TypedPhrase";
import { Check, GRADIENT } from "@/components/hiring/parts";
import { BuilderTicker } from "@/components/site/ProductBlocks";
import PixelIcon, { type PixelIconName } from "@/components/ui/PixelIcon";

const PRODUCTS: { icon: PixelIconName; name: string; tag: string; title: string; points: string[] }[] = [
  {
    icon: "aura",
    name: "Aura",
    tag: "Discover",
    title: "Your score, archetype and skill dimensions",
    points: ["Connect your AI tools via MCP"],
  },
  {
    icon: "code",
    name: "AI Labs",
    tag: "Learn by building",
    title: "Build real projects, understand every line",
    points: ["An AI Mentor + a Coding Agent"],
  },
  {
    icon: "skill",
    name: "Practice",
    tag: "Prove",
    title: "Sharpen weak spots, earn verified badges",
    points: ["Challenges aimed at your weak spots"],
  },
];

/** Aura hero: the Top Builders strip under the navbar, headline + CTAs, then the three parts of Aura. */
export default function AuraHero() {
  return (
    <section aria-labelledby="aura-heading" className="px-4 sm:px-8">
      <BuilderTicker />
      <div className="mx-auto max-w-[1200px] pb-16 pt-12 text-center sm:pt-16 md:pb-20 lg:pt-20">
        <p className="hero-rise mx-auto inline-flex items-center gap-2 rounded-full bg-brand-green-50 px-3 py-1.5 font-body text-[10.5px] font-medium uppercase tracking-[0.1em] text-brand-green ring-1 ring-brand-green/15 sm:text-[12px] sm:tracking-[0.16em]">
          <span aria-hidden="true" className="size-[5px] bg-brand-green" />
          VibeLevel Aura · Your AI style insights
        </p>
        <h1
          id="aura-heading"
          className="hero-rise mx-auto mt-6 max-w-[900px] text-balance font-heading text-[34px] leading-[1.1] font-medium tracking-[-1px] text-ink md:text-[40px] lg:text-[46px]"
          style={{ animationDelay: "100ms" }}
        >
          Discover your AI Style from{" "}
          <em className="text-headline-accent italic">
            <TypedPhrase text="your AI sessions." reserveSpace />
          </em>
        </h1>
        <p
          className="hero-rise mx-auto mt-[22px] max-w-[628px] text-pretty font-body text-[16px] leading-[23px] text-ink/80 sm:mt-[26px] sm:text-[18px] sm:leading-[25.4px]"
          style={{ animationDelay: "200ms" }}
        >
          Connect your AI tools. Get a real-time score, archetype and skill dimensions from your own work, plus a shareable profile.
        </p>
        <div className="hero-rise mx-auto mt-[22px] grid w-fit grid-cols-1 gap-3 sm:mt-[26px] sm:flex sm:w-auto sm:justify-center sm:gap-[12px]" style={{ animationDelay: "300ms" }}>
          <PrimaryButton href="/aura/signup">Discover your Aura free</PrimaryButton>
          <SecondaryButton href="/assessments">Browse assessments</SecondaryButton>
        </div>

        {/* The three parts of Aura: white cards on one wide gradient panel. */}
        <div
          className="hero-rise relative isolate mx-auto mt-14 max-w-[1120px] overflow-hidden rounded-[28px] bg-white p-3 text-left shadow-[0_40px_80px_-56px_rgba(6,36,24,0.55)] ring-1 ring-brand-green/15 sm:p-5 lg:p-6"
          style={{ backgroundImage: "linear-gradient(135deg in oklab, #c6ebd2 0%, #e3f1d2 50%, #fbe8b3 100%)", animationDelay: "450ms" }}
        >
          <ul className="grid gap-3 md:grid-cols-3 lg:gap-4">
            {PRODUCTS.map((p) => (
              <li
                key={p.name}
                className="group flex flex-col rounded-[20px] bg-white p-5 shadow-[0_24px_50px_-34px_rgba(6,36,24,0.5)] ring-1 ring-black/[0.05] transition-[translate,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_32px_60px_-34px_rgba(6,36,24,0.55)] sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="flex size-10 items-center justify-center rounded-[12px] text-brand-green ring-1 ring-brand-green/10 transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: GRADIENT }}
                  >
                    <PixelIcon name={p.icon} className="size-5" />
                  </span>
                  <span className="font-body text-[11px] font-medium uppercase tracking-[0.16em] text-brand-green">{p.tag}</span>
                </div>
                <p className="mt-4 font-display text-[17px] font-semibold text-ink-900">{p.name}</p>
                <h2 className="mt-1 font-heading text-[19px] leading-[1.25] text-black">{p.title}</h2>
                <ul className="mt-4 border-t border-dashed border-black/10 pt-3.5">
                  {p.points.map((x) => (
                    <li key={x} className="flex items-start gap-2.5 font-body text-[14.5px] leading-[1.45] text-black/60">
                      <span className="mt-0.5 flex size-[18px] shrink-0 items-center justify-center rounded-full bg-brand-green-50 text-brand-green">
                        <Check className="size-2.5" />
                      </span>
                      {x}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
