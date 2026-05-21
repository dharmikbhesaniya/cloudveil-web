import { PLANS } from "@/lib/constants";

const BASE_URL = "https://intractify.com";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: "Intractify",
  legalName: "Intractify Technologies",
  alternateName: "Intractify",
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/logo.png`,
    width: 512,
    height: 512,
  },
  description:
    "Cloud-based privacy platform providing fully isolated browser sessions. Container-level isolation, zero fingerprint, zero logs — browser destroyed on session end.",
  foundingDate: "2025",
  address: [
    {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
    },
    {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      email: "support@intractify.com",
      contactType: "customer support",
      areaServed: "Worldwide",
      availableLanguage: ["English"],
    },
    {
      "@type": "ContactPoint",
      email: "privacy@intractify.com",
      contactType: "data protection officer",
      areaServed: "Worldwide",
    },
    {
      "@type": "ContactPoint",
      email: "billing@intractify.com",
      contactType: "billing support",
      areaServed: "Worldwide",
    },
  ],
  sameAs: [
    "https://twitter.com/intractify",
    "https://github.com/intractify",
    "https://www.linkedin.com/company/intractify",
  ],
  knowsAbout: [
    "Browser Isolation",
    "Cloud Browser Technology",
    "Anti-Fingerprinting",
    "Privacy Technology",
    "Ephemeral Computing",
    "Zero-Log Browsing",
    "Container Security",
  ],
  areaServed: {
    "@type": "Place",
    name: "Worldwide",
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  url: BASE_URL,
  name: "Intractify",
  description: "Cloud-based private browser platform",
  publisher: {
    "@id": `${BASE_URL}/#organization`,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
  hasPart: [
    {
      "@type": "WebPage",
      "@id": `${BASE_URL}/#webpage`,
      url: BASE_URL,
      name: "Intractify — Private Cloud Browser",
    },
    {
      "@type": "WebPage",
      url: `${BASE_URL}/contact`,
      name: "Contact Intractify",
    },
    {
      "@type": "WebPage",
      url: `${BASE_URL}/privacy-policy`,
      name: "Privacy Policy",
    },
    {
      "@type": "WebPage",
      url: `${BASE_URL}/terms-of-service`,
      name: "Terms of Service",
    },
  ],
};

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${BASE_URL}/#software`,
  name: "Intractify",
  url: BASE_URL,
  applicationCategory: "SecurityApplication",
  applicationSubCategory: "PrivacyApplication",
  operatingSystem: "Web Browser",
  browserRequirements: "Requires a modern web browser with WebRTC support",
  description:
    "Launch a fully isolated cloud browser in under 5 seconds. Container-level kernel isolation, anti-fingerprinting, zero-log architecture. Your device is only a viewer — the browser runs entirely in the cloud and is destroyed when your session ends.",
  featureList: [
    "Container-isolated browser sessions (ECS task per session)",
    "Anti-fingerprinting: canvas, WebGL, audio, font randomization",
    "Zero data retention — container destroyed on session end",
    "14 exit regions (residential and datacenter IPs)",
    "Sub-5-second boot via pre-warmed container pools",
    "Automatic session termination on idle or tab close",
    "No activity logging — URLs, passwords, screen content never recorded",
    "End-to-end proxy — real IP never touches public internet",
    "99.98% uptime SLA",
  ],
  softwareVersion: "1.0",
  releaseNotes: `${BASE_URL}/`,
  screenshot: `${BASE_URL}/og-image.png`,
  offers: PLANS.filter((p) => p.price >= 0).map((plan) => ({
    "@type": "Offer",
    name: plan.name,
    price: plan.price.toString(),
    priceCurrency: "INR",
    description: plan.description,
    eligibleRegion: { "@type": "Place", name: "Worldwide" },
    url: `${BASE_URL}/#pricing`,
  })),
  provider: {
    "@id": `${BASE_URL}/#organization`,
  },
  audience: {
    "@type": "Audience",
    audienceType:
      "Privacy-conscious individuals, journalists, researchers, security professionals, teams needing isolated browsing",
  },
};

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
