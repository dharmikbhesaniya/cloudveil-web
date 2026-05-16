import type { Metadata } from "next";
import { homeMeta } from "@/content/meta";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import HeroSection from "@/sections/hero/HeroSection";
import HowItWorksSection from "@/sections/how-it-works/HowItWorksSection";
import FeaturesSection from "@/sections/features/FeaturesSection";
import PricingSection from "@/sections/pricing/PricingSection";
import FAQSection from "@/sections/faq/FAQSection";
import CTASection from "@/sections/cta/CTASection";

export const metadata: Metadata = homeMeta;

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
