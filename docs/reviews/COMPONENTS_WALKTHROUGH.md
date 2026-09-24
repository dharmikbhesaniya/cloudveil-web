# web/ — Components Walkthrough

> Every user-facing component in `src/components/` and every section in
> `src/sections/`, with exact behaviour noted during the 2026-09-24 review.

---

## 1. `src/components/common/`

### Navbar.tsx (client)
- Sticky header `z-[100]`, translucent bg `--navbar-bg{,-scrolled}` + backdrop
  blur(12px); border hardens on scroll (`scrollY > 12`).
- **Wordmark:** `Link href="/"` with serif "Intractify" (26px, `--font-display`,
  normal weight — italic removed) **+ green pulsing dot** (6px, `#4B5C3A`,
  `animate-pulse-dot`).
- Desktop nav (hidden < lg): `PUBLIC_NAV` items (Features, Comparison, How It
  Works, FAQ — **Pricing is commented out in constants**).
- CTA (desktop): `#pricing` "Join Waitlist →" `btn-ink`. Old
  sign-in / "Launch a browser" links **commented out** (pre-launch).
- Mobile: `Menu`/`X` toggle, `aria-expanded`, aria-controls `mobile-navigation`.
  Mobile dropdown lists `PUBLIC_NAV` + "Join Priority Waitlist →" button.
- IDs: `navbar-logo`, `navbar-desktop-nav`, `navbar-get-started`,
  `navbar-mobile-toggle`.

### Footer.tsx (client)
- `bg --secondary`, top border, grid `1.6fr 1fr 1fr 1fr`
  (`footer-grid` responsive: 2-col ≤768px, 1-col ≤480px).
- Colophon: serif **Intractify** (36px) + serif tagline (16px) "A private space
  in the cloud, built fresh…" + mono "— Est. 2025 · Mumbai & Bengaluru".
- Columns:
  - **Product:** Features, Comparison, Method (#how-it-works), **Pricing
    (#pricing — present here, hidden in nav → inconsistency)**, Questions (#faq).
  - **House:** Contact, Refund policy, Data deletion.
  - **Quietly stated:** Privacy, Terms, Cookies (#privacy-policy#cookies), DPA.
- Bottom bar mono: "© Intractify Systems Inc. {year} · All quietly reserved."
  + Contact/Privacy/Terms links.
- Hover: link titles shift to `--primary`.

### UTMTracker.tsx (client, in layout body) — see API_REFERENCE §8.

---

## 2. `src/components/features/contact/ContactForm.tsx` (client)

- Fields: name*, email*, subject* (6 options), message* (≥10 chars) — all with
  `inputClass` (rounded-xl, focus ring `--primary`).
- On submit: reads `intractify_attribution` / visitor / session ids → POST
  `/api/contact`.
- **429** → friendly "Too many requests" error; other `!res.ok` → `data.error`;
  network error message; on success shows success panel with check + reset.
- `role="alert"` on error; agreed privacy-policy link text.
- Success view: "Message sent" + 24h reply note + "Send another message".

---

## 3. Sections (`src/sections/`) — page order

### 3.0 Demo Video — `src/sections/demo/DemoVideoSection.tsx`
- **Added 2026-09-24** between Hero and TrustSignals (conversion placement —
  demo the product before selling features).
- Heading "Watch a session **disappear**." + "The 60-second proof" stamp;
  16/9 `MediaSlot` video placeholder ("Watch launch → browse → vanish") with
  pulse-dot caption "Real session · recorded on a live container".
- Swap-in point: replace `MediaSlot` with muted `<video poster>` (play on
  click, per motion-hygiene rule). See `VISUAL_CONTENT_PLACEMENT_PLAN.md`.

### 3.1 Hero — `src/sections/hero/HeroSection.tsx` (1160 lines)
- Staggered headline "Your **private** space, kept **elsewhere**." (serif on
  accent words, underline-draw animation); `aria-label` set, words
  `aria-hidden`.
- Eyebrow mono `— N° 01 / Cloud privacy / Est. 2025`.
- Lede: "A complete browser, lent to you in the cloud…".
- CTAs: `#pricing` "Join Waitlist →" (btn-ink, `hero-cta-primary`);
  `#features` "read the method" (serif-link, `hero-cta-secondary`). Old
  app sign-up link **commented out**.
- Meta row: 3 animate-on-view numbers — "1 container per session / 0 bytes
  retained / 5 max concurrent sessions".
- **Right: browser preview mockup** — chrome bar with 3 dots, typed URL
  `session.intractify.com/s/8f4a2c1e` (~2.5s typewriter, caret blink), live
  boot sequence (`> Allocating sandbox…` etc.), then **4 phases**:
  `STREAM` (progress bar) → `ACTIVE` (Shield icon, "Isolated · session
  active", IP/PLATFORM/BROWSER/SESSION mono readout) → `DESTROYED`
  (`> Container destroyed.`).
- **Step snapshot tabs** (4 buttons: BOOT/STREAM/ACTIVE/DESTROYED) — clicking
  jumps phase instantly (clears prior timers).
- Countdown footer "12:48 left" ticks down per second.
- Respects `prefers-reduced-motion` (jumps to ACTIVE, stops animations).
- Mobile: separate condensed preview (same phases) + tabs, shown < lg.
- Keyframes injected via `<style dangerouslySetInnerHTML>`: `scan-sweep`,
  `pulse-red`, `progress-fill`.

### 3.2 TrustSignals — `src/sections/trust/TrustSignals.tsx`
- Honesty strip: `— Built for privacy-first people and teams · pre-launch`.
- 4 pillars (mono label + para): Zero data retention / Isolated containers /
  No activity logging / No local egress. `.trust-grid` (4-col).
- **Note:** historically logos existed; currently text-only (no fake logos).

### 3.3 Features — `src/sections/features/FeaturesSection.tsx`
- Heading "Six layers of **isolation**, in sequence."
- 6 rows (num `i.`..`vi.`, serif title, mono tech tag, body):
  1. Container isolation
  2. Isolated from your device
  3. Ephemeral by design
  4. Fresh container per session
  5. Cloud egress
  6. Auto-terminate (= `body:null`, renders lifecycle phrase + animated bar
     `launched → running → idle → ended → ∅ 0 bytes`).
- `.feature-row` grid `80px 1fr 2fr`; hover pushes number to primary.
- `.lifecycle-rule` shimmer (traverse 7s linear infinite).

### 3.4 Comparison — `src/sections/comparison/ComparisonSection.tsx` (1044 lines)
- Heading "VPNs hide your location. **Intractify** isolates your session."
- **Desktop:** left sticky-scrolled stepper (5 steps: Local Storage / Device
  Tracking / Script Execution / IP & Location / Session Lifecycle), right
  sticky `VisualMockup` — split panel: dark `#15161A` "✕ VPN" vs ivory "✓
  Intractify" that morphs per active step (scroll-linked via IntersectionObserver
  midpoint logic).
- **Mobile:** sticky heading + stacked sticky cards with depth scaling
  (scrollOffset push logic, NAVBAR_HEIGHT=76, CARD_STACK_OFFSET=14).
- Honest copy (intractify side states exactly what's implemented).

### 3.5 HowItWorks — `src/sections/how-it-works/HowItWorksSection.tsx`
- 4 cards: CLICK / PROVISION / BROWSE / DONE — lucide icons, numbered circles,
  connector line with indigo gradient. Copy: noVNC stream, container destroyed.

### 3.6 Stats — `src/sections/stats/Stats.tsx`
- Grid: 1 container/session · 5 concurrent · 0 bytes retained (navy) · 1 cloud
  egress. Animated counters (ease-out cubic, 1800ms) on view.
- Closer serif line: "Every session is its own room…". Stamp: `— By the
  numbers, as of May 2026`.

### 3.7 PullQuote — `src/sections/pullquote/PullQuote.tsx`
- Word-by-word reveal of "A private browser tab is a curtain. **Intractify is
  a different room** — built fresh, lived in once, demolished as you leave."
  (red words = `#6F2530` serif).
- Attribution: `— Dharmik Bhesaniya · founder & head of platform` (mono, fades
  in 1.5s after).
- Decorative giant `"` quote mark (serif 220px, opacity 0.16).
- Section id `method`.

### 3.8 Audience — `src/sections/audience/AudienceSection.tsx`
- Heading "Built for the **paranoid**."
- 4 cards: Developers / Security Teams / Journalists & Researchers / Crypto
  Users. 4-col grid, `--cv-card-bg`, no icons (text only).

### 3.9 Pricing — `src/sections/pricing/PricingSection.tsx`
- Heading "Completely free at **launch**." (pre-launch honest).
- **Waitlist form card** (glass bg, blur 12px): email + plan `free` hardcoded.
  Reads attribution storage; POST `/api/waitlist`; success panel with ✓ +
  "Register another email"; duplicate → 409 message shown via error.
- No pricing tiers/plans — single CTA.

### 3.10 FAQ — `src/sections/faq/FAQSection.tsx`
- Accordion from `FAQ_DATA` (12 honest Q&As): What is Intractify, how privacy
  works, container tier (no second tier), site detection (session profile =
  roadmap note), session end, logging (metadata only), start speed, free/pre-
  launch, refund, VPN/incognito diff, tracking prevention, mobile availability.
- Unique `button`/`panel` ids for a11y, `aria-expanded`/`aria-controls`,
  rotate `+`.

### 3.11 CTA — `src/sections/cta/CTASection.tsx`
- Stamp `— A closing argument`; headline "Open a browser. **Disappear** when
  done." (serif accent `#6F2530`).
- "Join Waitlist →" (btn-ink `#pricing`); mono note
  "5s to launch · 0s of trace · no card". Old app launch link commented out.

---

## 4. Shared hooks & utils

- `src/hooks/use-scroll-reveal.ts` — IntersectionObserver reveal hook:
  `{threshold=0.12, rootMargin="0px 0px -60px 0px", once=true}` → `{ref,
  isRevealed}`.
- `src/lib/cn.ts` — clsx + tailwind-merge `cn()`.
- `src/lib/constants.ts` — `APP_NAME="Intractify"`, `PUBLIC_NAV` (Pricing
  **commented out**), `FAQ_DATA`.
- `src/components/common/MediaSlot.tsx` — glass placeholder for not-yet-produced
  media: `type` (`image | video | portrait | wash`), `label`, `hint`,
  `aspect`, `circular`. Used by HowItWorks (video), Stats (image), PullQuote
  (portrait), CTA (wash). Swap for real `next/image` / `<video>` when assets
  land. See `docs/reviews/VISUAL_CONTENT_PLACEMENT_PLAN.md` §3.5.

## 5. Visual-content gaps (from session discussion)

Zero photographic/video media anywhere; the only "visual" is the animated
browser mock in Hero and the Comparison `VisualMockup`. **Implemented
2026-09-24 (Phase 1):** hero ambient schematic + LIVE SESSION caption, trust
shield SVGs, 6 feature micro-diagrams, audience icon chips, pricing seal, plus
glass `MediaSlot` placeholders for the four missing real-media slots. Detailed
placement plan: `docs/reviews/VISUAL_CONTENT_PLACEMENT_PLAN.md`.