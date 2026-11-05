import HeroContent from "./HeroContent";
import HeroNavigation from "./HeroNavigation";
import HeroToolStrip from "./HeroToolStrip";
import HeroVideo from "./HeroVideo";
import LeftPixelField from "./LeftPixelField";
import PixelFieldGate from "./PixelFieldGate";
import RightPixelField from "./RightPixelField";

// Fields sit 20px outside each viewport edge, as in Figma. They shrink a little on smaller screens
// but stay at full strength, so on phones they still run down the sides of the hero.
const fieldScale =
  "scale-[0.62] sm:scale-[0.7] lg:scale-[0.85] xl:scale-100";

export default function HeroSection() {
  return (
    <>
      <HeroNavigation />
      <section className="relative isolate overflow-hidden bg-white">
        {/* On phones the two fields would meet behind the copy, so the middle fades out and leaves a gap. */}
        <PixelFieldGate className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[900px] max-sm:[mask-image:linear-gradient(to_right,#000_0%,#000_10%,transparent_26%,transparent_74%,#000_90%,#000_100%)]">
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
