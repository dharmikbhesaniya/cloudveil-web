import type { Metadata } from "next";
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
import { StructuredData } from "@/lib/seo/structured-data";
import {
  softwareApplicationSchema,
  howItWorksSchema,
  homePageSchema,
  definedTermSetSchema,
  generateFAQSchema,
} from "@/lib/seo/schema";
import { FAQ_DATA } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Intractify — Isolated Cloud Browser | Browse Without a Trace",
  description:
    "Launch a fully isolated cloud browser in under 5 seconds. Container-level isolation, zero fingerprint, zero logs — nothing survives your session. Free to start, no card required.",
  alternates: { canonical: "https://intractify.com" },
  openGraph: {
    title: "Intractify — Isolated Cloud Browser | Browse Without a Trace",
    description:
      "Launch isolated cloud browser sessions with zero logs. Container destroyed when your session ends — your IP, fingerprint, and history stay invisible.",
    url: "https://intractify.com",
    type: "website",
  },
};

export default function LandingPage() {
  const faqSchema = generateFAQSchema(FAQ_DATA);

  return (
    <>
      <StructuredData
        data={[
          softwareApplicationSchema,
          howItWorksSchema,
          homePageSchema,
          definedTermSetSchema,
          faqSchema,
        ]}
      />
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
