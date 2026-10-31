import HeroContent from "./HeroContent";
import HeroNavigation from "./HeroNavigation";
import HeroToolStrip from "./HeroToolStrip";
import HeroVideo from "./HeroVideo";
import LeftPixelField from "./LeftPixelField";
import PixelFieldGate from "./PixelFieldGate";
import RightPixelField from "./RightPixelField";

// Fields sit 20px outside each viewport edge, as in Figma. They shrink and fade on
// smaller screens so the dots never crowd the headline.
const fieldScale =
  "scale-[0.42] opacity-70 sm:scale-[0.6] sm:opacity-85 lg:scale-[0.85] lg:opacity-100 xl:scale-100";

export default function HeroSection() {
  return (
    <>
      <HeroNavigation />
      <section className="relative isolate overflow-hidden bg-white">
        <PixelFieldGate className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[900px]">
          <div className={`absolute left-[-20px] top-0 origin-top-left ${fieldScale}`}>
            <LeftPixelField />
          </div>
          <div className={`absolute right-[-20px] top-0 origin-top-right ${fieldScale}`}>
            <RightPixelField />
          </div>
        </PixelFieldGate>

        {/* Reserves the fixed navbar's height so hero content keeps its Figma position. */}
        <div aria-hidden="true" className="h-[72px] lg:h-[68.4px]" />

        <div className="flex flex-col items-center gap-12 px-4 pb-20 pt-16 sm:gap-16 sm:px-8 sm:pt-20 lg:gap-[95px] lg:pb-[97px] lg:pt-[106px]">
          <HeroContent />
          <div className="flex w-full flex-col items-center gap-10 sm:gap-12 lg:gap-14">
            <HeroVideo />
            <HeroToolStrip />
          </div>
        </div>
      </section>
    </>
  );
}
