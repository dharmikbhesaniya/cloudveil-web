export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ: FAQItem[] = [
  {
    id: "what-is-cloudveil",
    question: "What is CloudVeil?",
    answer:
      "CloudVeil is a cloud-based private browser platform that runs fully isolated browser sessions in the cloud, so your real IP address, device fingerprint, and local network are never exposed to the websites you visit.",
  },
  {
    id: "vpn-difference",
    question: "How is CloudVeil different from a VPN?",
    answer:
      "A VPN only masks your IP address while your actual browser still runs on your device, leaving fingerprints and local data behind; CloudVeil runs the entire browser in an isolated cloud container that is permanently destroyed after each session, eliminating fingerprints, cookies, and all browsing history by design.",
  },
  {
    id: "data-stored",
    question: "What data does CloudVeil store about my browsing?",
    answer:
      "CloudVeil stores zero browsing data — no URLs, no search queries, no page content, no cookies, and no session recordings; the only information retained is a session-duration counter used for quota enforcement, which contains no browsing content whatsoever.",
  },
  {
    id: "browser-support",
    question: "Which browsers does CloudVeil support?",
    answer:
      "CloudVeil supports Chromium, Firefox, and WebKit-based browsers on Pro and Enterprise plans; the Free plan includes Chromium, and Enterprise customers can request custom browser builds or specific versions for compatibility testing.",
  },
  {
    id: "cancellation",
    question: "Can I cancel my subscription at any time?",
    answer:
      "Yes, you can cancel your CloudVeil subscription at any time from the billing dashboard, and you will retain full access to your plan features until the end of the current billing period with no cancellation fees.",
  },
  {
    id: "refund",
    question: "What is the refund policy?",
    answer:
      "New subscribers are eligible for a full refund within 7 days of their first payment if they have not used the service significantly; refunds are processed within 5–7 business days to the original payment method, and annual plan subscribers who cancel within 3 months of purchase may be eligible for a pro-rated refund for unused months.",
  },
  {
    id: "enterprise-teams",
    question: "Does CloudVeil offer plans for teams and enterprises?",
    answer:
      "Yes, the Enterprise plan provides dedicated cloud tenancy, SSO via SAML 2.0, audit log export to your SIEM, a 99.9% SLA with service credits, unlimited sessions, and a dedicated customer success manager — contact sales@cloudveil.app for custom pricing.",
  },
  {
    id: "data-jurisdiction",
    question: "Where is my session data processed, and in which countries?",
    answer:
      "CloudVeil operates infrastructure in the United States, European Union, India, and Singapore, and Pro/Enterprise users can select their preferred region; no browsing data persists in any region because containers are permanently destroyed at session end, making data residency a non-issue for browsing content.",
  },
];
