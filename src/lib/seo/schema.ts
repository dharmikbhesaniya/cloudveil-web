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
  "@type": ["SoftwareApplication", "WebApplication"],
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

// How It Works — 4-step process schema for rich results and AI extraction
export const howItWorksSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": `${BASE_URL}/#howto`,
  name: "How to launch a private cloud browser with Intractify",
  description:
    "Launch a fully isolated cloud browser session in under 5 seconds. Three steps — click, browse, vanish.",
  totalTime: "PT5S",
  tool: [
    { "@type": "HowToTool", name: "Web browser (any modern browser)" },
    { "@type": "HowToTool", name: "Intractify account" },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Click — Launch a session",
      text: "One click in your Intractify dashboard. Choose a region and a duration cap, or accept the defaults. No setup, no installs, no extensions required.",
      url: `${BASE_URL}/#how-it-works`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Provision — Container spins up",
      text: "A fresh ECS task boots a stripped Chromium with randomized fingerprints in its own kernel namespace. The session streams over WebRTC to your viewport in under five seconds.",
      url: `${BASE_URL}/#how-it-works`,
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Browse — Use the cloud browser normally",
      text: "Your device is only a screen. All browsing — cookies, history, downloads, passwords — exists only inside the isolated container in the cloud. Nothing runs on your device.",
      url: `${BASE_URL}/#how-it-works`,
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Done — Nothing survives",
      text: "End the session manually, let it time out, or close the tab. The container is permanently destroyed and its storage zeroed. The next session always starts completely fresh.",
      url: `${BASE_URL}/#how-it-works`,
    },
  ],
};

// WebPage schema with Speakable selectors — signals to voice assistants and AI what to read
export const homePageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${BASE_URL}/#webpage`,
  url: BASE_URL,
  name: "Intractify — Private Cloud Browser",
  description:
    "Launch a fully isolated cloud browser in under 5 seconds. Container-level isolation, zero fingerprint, zero logs — browser destroyed when your session ends.",
  isPartOf: { "@id": `${BASE_URL}/#website` },
  about: { "@id": `${BASE_URL}/#software` },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: `${BASE_URL}/og-image.png`,
    width: 1200,
    height: 630,
  },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "#faq", "#features", "#how-it-works"],
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    ],
  },
};

// DefinedTermSet — teaches AI engines and Google what Intractify's core vocabulary means
export const definedTermSetSchema = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": `${BASE_URL}/#glossary`,
  name: "Intractify Privacy & Browser Isolation Glossary",
  description:
    "Definitions of core technical concepts used by Intractify's cloud browser platform.",
  hasDefinedTerm: [
    {
      "@type": "DefinedTerm",
      "@id": `${BASE_URL}/#term-browser-isolation`,
      name: "Browser Isolation",
      termCode: "browser-isolation",
      description:
        "A security technique that runs the web browser in a remote, isolated container rather than on the user's local device. Only the visual output is streamed to the user — malware, fingerprinting scripts, and trackers cannot reach the actual device.",
      inDefinedTermSet: `${BASE_URL}/#glossary`,
    },
    {
      "@type": "DefinedTerm",
      "@id": `${BASE_URL}/#term-ephemeral-browser`,
      name: "Ephemeral Browser",
      termCode: "ephemeral-browser",
      description:
        "A browser session with no persistent storage. Cookies, history, cache, and downloads exist only for the duration of the session and are permanently destroyed when the session ends — by design, not by deletion.",
      inDefinedTermSet: `${BASE_URL}/#glossary`,
    },
    {
      "@type": "DefinedTerm",
      "@id": `${BASE_URL}/#term-anti-fingerprinting`,
      name: "Anti-Fingerprinting",
      termCode: "anti-fingerprinting",
      description:
        "Techniques that prevent websites from identifying a user by randomizing browser attributes — canvas rendering, WebGL output, audio context, installed fonts, and timing — so each session presents a unique, untrackable identity.",
      inDefinedTermSet: `${BASE_URL}/#glossary`,
    },
    {
      "@type": "DefinedTerm",
      "@id": `${BASE_URL}/#term-container-isolation`,
      name: "Container Isolation",
      termCode: "container-isolation",
      description:
        "Running each browser session in its own operating system container with a private kernel namespace, filesystem, and network stack — ensuring no data, state, or identity leaks between sessions or between different users.",
      inDefinedTermSet: `${BASE_URL}/#glossary`,
    },
    {
      "@type": "DefinedTerm",
      "@id": `${BASE_URL}/#term-zero-log`,
      name: "Zero-Log Architecture",
      termCode: "zero-log",
      description:
        "A system design where no record of user activity (URLs visited, passwords typed, screen content, keystrokes) is ever written to storage. Intractify logs only session metadata (start, end, duration) for billing — never browsing content.",
      inDefinedTermSet: `${BASE_URL}/#glossary`,
    },
    {
      "@type": "DefinedTerm",
      "@id": `${BASE_URL}/#term-rbi`,
      name: "Remote Browser Isolation (RBI)",
      termCode: "remote-browser-isolation",
      description:
        "Enterprise-grade security architecture where browsing is executed in a remote cloud environment and only a visual stream is delivered to the end user. Intractify makes RBI available to individuals and small teams at consumer pricing.",
      inDefinedTermSet: `${BASE_URL}/#glossary`,
    },
  ],
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

export function generateWebPageSchema(opts: {
  name: string;
  description: string;
  url: string;
  breadcrumb: { name: string; url: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    isPartOf: { "@id": `${BASE_URL}/#website` },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: opts.breadcrumb.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    },
  };
}
