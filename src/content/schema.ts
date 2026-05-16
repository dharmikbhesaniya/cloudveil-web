import { FAQ } from "./faq";

const DOMAIN = "https://cloudveil.app";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CloudVeil",
  url: DOMAIN,
  logo: `${DOMAIN}/logo.png`,
  sameAs: [
    "https://twitter.com/cloudveil",
    "https://linkedin.com/company/cloudveil",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "support@cloudveil.app",
    availableLanguage: "English",
  },
} as const;

export const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "CloudVeil",
  applicationCategory: "SecurityApplication",
  operatingSystem: "Web",
  url: DOMAIN,
  offers: [
    {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      name: "Free Plan",
    },
    {
      "@type": "Offer",
      price: "12",
      priceCurrency: "USD",
      name: "Pro Plan",
      billingIncrement: "P1M",
    },
  ],
  description:
    "CloudVeil is a cloud-based private browser platform that runs fully isolated, ephemeral browser sessions in the cloud with zero logs.",
  screenshot: `${DOMAIN}/screenshot.png`,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "284",
  },
} as const;

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
