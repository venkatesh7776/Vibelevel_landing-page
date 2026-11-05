import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import TypedPhrase from "./TypedPhrase";

export default function HeroContent() {
  return (
    <div className="flex w-full max-w-[732px] flex-col items-center gap-[22px] text-center sm:gap-[26px]">
      {/* Each sentence is its own block (one line from tablet up), so typing in the second never reflows the first. */}
      <h1 className="hero-rise text-balance font-heading text-[34px] leading-[1.1] font-medium tracking-[-1px] text-ink md:w-max md:text-[40px] lg:my-[-4px] lg:text-[46px]">
        <span className="block md:whitespace-nowrap">Good code is easy to generate.</span>
        <span className="block md:whitespace-nowrap">
          <em className="text-headline-accent italic">
            <TypedPhrase text="Great engineers" />
          </em>{" "}
          are harder to find.
        </span>
      </h1>
      <p
        className="hero-rise max-w-[628px] text-pretty text-[16px] leading-[23px] text-ink/80 sm:text-[18px] sm:leading-[25.4px] lg:my-[-0.9px]"
        style={{ animationDelay: "150ms" }}
      >
        Move beyond coding puzzles. Evaluate real engineering skills, AI collaboration, and problem-solving through
        practical assessments through VibeLevel.
      </p>
      {/* Two equal halves around the centre line keep the gap between the buttons exactly centred,
          whatever each button's width (and the primary grows leftward when its hover arrow appears). */}
      <div className="hero-rise grid w-full grid-cols-2 items-start gap-[12px]" style={{ animationDelay: "300ms" }}>
        <PrimaryButton href="/signup" className="justify-self-end">
          Sign up for free
        </PrimaryButton>
        <SecondaryButton href="/request-demo" className="justify-self-start">
          Book a demo
        </SecondaryButton>
      </div>
    </div>
  );
}
