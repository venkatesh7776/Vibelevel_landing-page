import HeroSection from "@/components/hero/HeroSection";
import CTASection from "@/components/sections/CTASection";
import EcosystemSection from "@/components/sections/EcosystemSection";
import FAQSection from "@/components/sections/FAQSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import Footer from "@/components/sections/Footer";
import ProblemSection from "@/components/sections/ProblemSection";
import RolesSection from "@/components/sections/RolesSection";
import ScreeningSection from "@/components/sections/ScreeningSection";

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <ProblemSection />
        <ScreeningSection />
        <FeaturesSection />
        <RolesSection />
        <EcosystemSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
