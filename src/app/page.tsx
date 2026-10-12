import type { Metadata } from "next";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { Hero } from "@/sections/hero/HeroSection";
import { DemoVideoSection } from "@/sections/demo/DemoVideoSection";
import { TrustSignals } from "@/sections/trust/TrustSignals";
import { Features } from "@/sections/features/FeaturesSection";
import { ComparisonSection } from "@/sections/comparison/ComparisonSection";
import { HowItWorks } from "@/sections/how-it-works/HowItWorksSection";
import { Stats } from "@/sections/stats/Stats";
import { PullQuote } from "@/sections/pullquote/PullQuote";
import { AudienceSection } from "@/sections/audience/AudienceSection";
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
    "Launch fully isolated cloud browsers in the cloud. Container-level isolation, zero logs — nothing survives your session. Pre-launch, join the waitlist.",
  alternates: { canonical: "https://intractify.com" },
  openGraph: {
    title: "Intractify — Isolated Cloud Browser | Browse Without a Trace",
    description:
      "Launch isolated cloud browser sessions with zero logs. The container is destroyed when your session ends — your device and its data stay out of it.",
    url: "https://intractify.com",
    type: "website",
    images: [
      {
        url: "https://intractify.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Intractify — Private Cloud Browser. Browse Freely. Leave Nothing.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Intractify — Isolated Cloud Browser | Browse Without a Trace",
    description:
      "Launch isolated cloud browser sessions with zero logs. No trace, no local footprint, no leaks.",
    images: ["https://intractify.com/og-image.png"],
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
        <DemoVideoSection />
        <TrustSignals />
        <Features />
        <ComparisonSection />
        <HowItWorks />
        <Stats />
        <PullQuote />
        <AudienceSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
