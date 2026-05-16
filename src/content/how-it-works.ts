export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
  detail: string;
}

export const HOW_IT_WORKS: HowItWorksStep[] = [
  {
    step: 1,
    title: "Launch a Session",
    description:
      "Click \"Launch Session\" and CloudVeil instantly provisions an isolated cloud container with a fresh browser instance — no setup, no plugins, no configuration.",
    detail:
      "Containers are allocated from a pre-warmed pool in your chosen region, reaching a ready state in under 3 seconds via optimised OCI image layers.",
  },
  {
    step: 2,
    title: "Browse Privately",
    description:
      "A secure, encrypted stream delivers the browser UI directly to your screen. Your real IP, device fingerprint, and network are never exposed to any website you visit.",
    detail:
      "Traffic flows through an in-container Chromium process over end-to-end encrypted WebSockets — no traffic touches your local network stack.",
  },
  {
    step: 3,
    title: "Session Ends. Nothing Remains.",
    description:
      "When you close the session, the container is immediately and permanently destroyed. Cookies, history, cache, and all session data vanish with it — with no recovery possible.",
    detail:
      "Container destruction triggers a secure wipe of ephemeral storage; CloudVeil retains only a session-duration counter for quota enforcement — never any browsing content.",
  },
];
