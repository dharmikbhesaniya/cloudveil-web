export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingTier {
  id: string;
  name: string;
  priceMonthly: number | null;
  priceAnnual: number | null;
  priceLabel: string;
  billingNote: string;
  description: string;
  features: PricingFeature[];
  cta: string;
  ctaHref: string;
  featured: boolean;
  badge?: string;
}

export const PRICING: PricingTier[] = [
  {
    id: "free",
    name: "Free",
    priceMonthly: 0,
    priceAnnual: 0,
    priceLabel: "$0",
    billingNote: "Forever free · No card required",
    description:
      "Perfect for occasional private browsing and trying out CloudVeil.",
    features: [
      { text: "2 sessions per day", included: true },
      { text: "30 min max session duration", included: true },
      { text: "1 browser type (Chromium)", included: true },
      { text: "US region only", included: true },
      { text: "Community support", included: true },
      { text: "Multi-browser support", included: false },
      { text: "Cloud provider switching", included: false },
      { text: "Priority support", included: false },
    ],
    cta: "Get Started Free",
    ctaHref: "https://app.cloudveil.app/sign-up",
    featured: false,
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: 12,
    priceAnnual: 9,
    priceLabel: "$12",
    billingNote: "per month · $9/mo billed annually",
    description:
      "For professionals who need reliable, daily private browsing with full flexibility.",
    features: [
      { text: "20 sessions per day", included: true },
      { text: "4 hour max session duration", included: true },
      { text: "5 browsers (Chromium, Firefox, WebKit + more)", included: true },
      { text: "US, EU, India, Singapore regions", included: true },
      { text: "Cloud provider switching", included: true },
      { text: "Email support (24h response)", included: true },
      { text: "Session history & usage dashboard", included: true },
      { text: "SSO & enterprise admin", included: false },
    ],
    cta: "Start Pro Trial",
    ctaHref: "https://app.cloudveil.app/sign-up?plan=pro",
    featured: true,
    badge: "Most Popular",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    priceMonthly: null,
    priceAnnual: null,
    priceLabel: "Custom",
    billingNote: "Volume pricing · Annual contracts",
    description:
      "Dedicated infrastructure, compliance controls, and SLA guarantees for teams and organisations.",
    features: [
      { text: "Unlimited sessions", included: true },
      { text: "Unlimited session duration", included: true },
      { text: "All browsers + custom builds", included: true },
      { text: "Dedicated cloud tenancy", included: true },
      { text: "SSO via SAML 2.0", included: true },
      { text: "Audit log SIEM export", included: true },
      { text: "99.9% SLA with credits", included: true },
      { text: "Priority support & dedicated CSM", included: true },
    ],
    cta: "Contact Sales",
    ctaHref: "mailto:sales@cloudveil.app",
    featured: false,
  },
];
