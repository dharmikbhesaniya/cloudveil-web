export const APP_NAME = "Intractify";

export const PUBLIC_NAV = [
  { title: "Features", href: "#features" },
  { title: "Comparison", href: "#comparison" },
  { title: "How It Works", href: "#how-it-works" },
  // { title: "Pricing", href: "#pricing" },
  { title: "FAQ", href: "#faq" },
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
      "Each session runs in its own isolated container with a fresh Chromium browser. The container has no persistent storage — when your session ends, the entire container is destroyed, including all cookies, history, cache, and downloaded files.",
  },
  {
    question: "Is there more than one container tier?",
    answer:
      "No. Today every session runs in its own dedicated container with the same isolation for every user. A lighter-weight shared tier is a possible future option, not something we offer yet.",
  },
  {
    question: "Can websites detect that I am using Intractify?",
    answer:
      "Because the browser runs on our infrastructure and not on your device, a site sees the session's characteristics rather than your machine's — your real IP, operating system, and installed fonts are never exposed to it. Altering the session's own profile is on the roadmap and is not yet active; we will say so here when it ships.",
  },
  {
    question: "What happens when my session ends?",
    answer:
      "When your session ends — whether you end it manually, it times out, or you close the tab — the container running your browser is permanently destroyed. All data, including cookies, passwords typed, downloads, and browsing history, is permanently erased. A new session always starts with a clean, fresh container.",
  },
  {
    question: "Is my browsing activity logged?",
    answer:
      "Intractify logs only basic session metadata — session start time, end time, and duration — used to manage session lifecycle and concurrency. We never log URLs visited, passwords typed, screen content, keyboard input, mouse movements, cookies, or any browsing activity.",
  },
  {
    question: "How fast does a session start?",
    answer:
      "A new browser session is provisioned on demand. Actual start time varies — a container must boot and become ready before streaming begins, which can take anywhere from seconds to a few minutes.",
  },
  {
    question: "Is Intractify free?",
    answer:
      "Yes — we are pre-launch and do not charge for anything yet. There are no paid plans and no way to take payment. Join the waitlist on this page to be notified when access opens.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "There is no billing yet, so no refund policy applies. We are pre-launch; if paid plans arrive later, any applicable policy will be published on our refund page at that time.",
  },
  {
    question: "How is Intractify different from a VPN or Incognito mode?",
    answer:
      "A VPN hides your IP address but the browser still runs on your device — websites can still identify you from device attributes like canvas and font rendering. Incognito mode runs locally too, just without saving history after the session. Intractify runs the entire browser in the cloud: your device is only a screen. No browser code runs on your machine, no device attributes are read, and nothing is stored anywhere when your session ends.",
  },
  {
    question: "How does Intractify stop websites from tracking my device?",
    answer:
      "Trackers identify you from device attributes — screen resolution, installed fonts, canvas rendering, and audio processing — even without cookies. Because Intractify runs the browser on our infrastructure, none of those attributes are read from your device: a site only sees the disposable session, not your machine, and that session is destroyed when you close it. Altering the session's own profile is on the roadmap and is not yet active.",
  },
  {
    question: "Is Intractify available on mobile?",
    answer:
      "Yes. Intractify runs in any modern web browser — desktop or mobile. Because the browser session runs in the cloud and streams to your screen through a secure WebSocket, there is nothing to install. Open intractify.com on your phone, launch a session, and the cloud browser appears in your mobile browser window.",
  },
];
