export const APP_NAME = "Intractify";

export const PUBLIC_NAV = [
  { title: "Features", href: "#features" },
  { title: "How It Works", href: "#how-it-works" },
  { title: "Pricing", href: "#pricing" },
  { title: "FAQ", href: "#faq" },
];

export const PLANS = [
  {
    id: "free",
    name: "Free",
    description: "Get started with basic private browsing.",
    price: 0,
    currency: "INR",
    interval: "month",
    popular: false,
    features: [
      "5 shared browser sessions per month",
      "10-minute session limit",
      "1 concurrent session",
      "Basic privacy protections",
      "Community support",
    ],
  },
  {
    id: "starter",
    name: "Starter",
    description: "Ideal for regular private browsing with dedicated resources.",
    price: 499,
    currency: "INR",
    interval: "month",
    popular: true,
    features: [
      "30 shared sessions per month",
      "10 personal (dedicated) sessions",
      "30-minute session limit",
      "1 concurrent session",
      "Full privacy protections",
      "Priority support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "For power users who need maximum privacy and flexibility.",
    price: 1999,
    currency: "INR",
    interval: "month",
    popular: false,
    features: [
      "100 shared sessions per month",
      "50 personal (dedicated) sessions",
      "60-minute session limit",
      "3 concurrent sessions",
      "Advanced fingerprint masking",
      "Priority support",
      "Session history export",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Custom solutions for teams and organizations.",
    price: -1,
    currency: "INR",
    interval: "month",
    popular: false,
    features: [
      "Unlimited sessions",
      "Custom session duration",
      "10+ concurrent sessions",
      "Dedicated infrastructure",
      "SLA guarantee",
      "Dedicated account manager",
      "Custom integrations",
      "Team management",
    ],
  },
];

export const FAQ_DATA = [
  {
    question: "What is Intractify?",
    answer:
      "Intractify is a cloud-based privacy platform where you launch and use a fully isolated browser through your web browser. The browser runs on secure cloud infrastructure — your device is only a viewer. No browsing data, history, or activity is ever stored.",
  },
  {
    question: "How does Intractify protect my privacy?",
    answer:
      "Each session runs in its own isolated container with a fresh Chromium browser. The container has no persistent storage — when your session ends, the entire container is destroyed, including all cookies, history, cache, and downloaded files. Anti-fingerprinting protections are applied automatically.",
  },
  {
    question: "What is the difference between Personal and Shared mode?",
    answer:
      "Personal mode provides a dedicated container with guaranteed resources (1 vCPU, 2 GB RAM) — ideal for banking, email, and sensitive work. Shared mode uses lightweight containers on shared infrastructure — ideal for casual browsing and quick searches.",
  },
  {
    question: "Can websites detect that I am using Intractify?",
    answer:
      "Intractify applies anti-fingerprinting protections including user-agent rotation, canvas fingerprint masking, WebGL spoofing, and font normalization. These measures make it difficult for websites to distinguish your Intractify session from a regular browser.",
  },
  {
    question: "What happens when my session ends?",
    answer:
      "When your session ends — whether you end it manually, it times out, or you close the tab — the container running your browser is permanently destroyed. All data, including cookies, passwords typed, downloads, and browsing history, is permanently erased. A new session always starts with a clean, fresh container.",
  },
  {
    question: "Is my browsing activity logged?",
    answer:
      "Intractify logs only basic session metadata for billing: session start time, end time, and duration. We never log URLs visited, passwords typed, screen content, keyboard input, mouse movements, cookies, or any browsing activity.",
  },
  {
    question: "How fast does a session start?",
    answer:
      "A new browser session typically starts within 3 to 5 seconds. During peak usage, you may be placed in a short queue with an estimated wait time displayed on screen.",
  },
  {
    question: "Can I cancel my subscription?",
    answer:
      "Yes, you can cancel at any time from your billing settings. Your plan will remain active until the end of the current billing period. After that, your account reverts to the free plan.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "We offer a 7-day refund window for new subscriptions. If you are not satisfied within 7 days of your first payment and have not used the service significantly, contact billing@intractify.com with your order ID for a full refund. Annual plans qualify for pro-rated refunds for unused months.",
  },
];
