import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { Hero } from "@/sections/hero/HeroSection";
import { TrustSignals } from "@/sections/trust/TrustSignals";
import { Features } from "@/sections/features/FeaturesSection";
import { HowItWorks } from "@/sections/how-it-works/HowItWorksSection";
import { Stats } from "@/sections/stats/Stats";
import { PullQuote } from "@/sections/pullquote/PullQuote";
import { PricingSection } from "@/sections/pricing/PricingSection";
import { FAQSection } from "@/sections/faq/FAQSection";
import { CTASection } from "@/sections/cta/CTASection";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustSignals />
        <Features />
        <HowItWorks />
        <Stats />
        <PullQuote />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
