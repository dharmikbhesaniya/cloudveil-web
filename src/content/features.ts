export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export const FEATURES: Feature[] = [
  {
    id: "privacy-isolation",
    icon: "🛡️",
    title: "Privacy Isolation",
    description:
      "Every session runs inside a dedicated, ephemeral container with its own network stack — completely isolated from every other user on the platform. Cookies, fingerprints, and local storage are wiped automatically when the session ends.",
  },
  {
    id: "multi-browser",
    icon: "🌐",
    title: "Multi-Browser Support",
    description:
      "Choose from Chromium, Firefox, and WebKit-based browsers without installing anything on your device. Switch browsers per session and test across rendering engines with a single click.",
  },
  {
    id: "cloud-provider-switching",
    icon: "☁️",
    title: "Cloud Provider Switching",
    description:
      "Route your sessions through AWS, GCP, or Azure infrastructure across US, EU, India, and Singapore regions. Change your apparent geographic origin on demand without VPN configuration or IP leaks.",
  },
  {
    id: "zero-logs",
    icon: "🔒",
    title: "Zero Logs",
    description:
      "CloudVeil never logs your browsing activity, URLs visited, search queries, or any session content — by architecture, not just policy. Our containers have no persistent disk writes, and our network proxy discards traffic without inspection.",
  },
  {
    id: "instant-launch",
    icon: "⚡",
    title: "Instant Launch",
    description:
      "Sessions spin up in under 3 seconds thanks to pre-warmed container pools and optimised image layers. No waiting for VMs to boot — your private browser is ready before you finish your coffee.",
  },
  {
    id: "enterprise-grade",
    icon: "🏢",
    title: "Enterprise Grade",
    description:
      "SSO via SAML 2.0, audit logs exported to your SIEM, dedicated cloud tenancy, SLA-backed uptime, and a team admin dashboard. CloudVeil integrates into your existing zero-trust security stack without friction.",
  },
];
